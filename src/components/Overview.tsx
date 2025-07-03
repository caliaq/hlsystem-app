import { useEffect, useState, useCallback, useRef } from "react";
import { Product as ProductType } from "../types/product";
import { OrderProduct } from "../types/order";
import { orderService, CreateOrderDto } from "../services/orderService";
import { printerService } from "../services/printerService";

interface OverviewProps {
    selectedProducts?: ProductType[];
    onClearOrder?: () => void;
}

export default function Overview({ selectedProducts = [], onClearOrder }: OverviewProps) {
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastAddedItemId, setLastAddedItemId] = useState<string | null>(null);
    const [quantityInput, setQuantityInput] = useState<string>('');
    const [isFirstInput, setIsFirstInput] = useState<boolean>(true);
    const componentRef = useRef<HTMLDivElement>(null);

    // Watch for new products being selected and add them to the order
    useEffect(() => {
        // Check if we have a new product selection
        if (selectedProducts.length > 0) {
            // Get the last selected product (the most recent one)
            const lastSelectedProduct = selectedProducts[selectedProducts.length - 1];

            // Add only the most recently selected product to avoid duplicates
            addToOrder(lastSelectedProduct);
        }
    }, [selectedProducts]);

    // Add a product to the order
    const addToOrder = (product: ProductType) => {
        setOrderProducts(prev => {
            const existing = prev.find(item => item.product._id === product._id);
            let newItemId: string;

            if (existing) {
                // Increment quantity if product already exists in order
                newItemId = existing._id!;
                const updated = prev.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setLastAddedItemId(newItemId);
                setQuantityInput((existing.quantity + 1).toString());
                setIsFirstInput(true);
                return updated;
            }

            // Add new product to order
            newItemId = `${product._id}-${Date.now()}`;
            setLastAddedItemId(newItemId);
            setQuantityInput('1');
            setIsFirstInput(true);
            return [...prev, {
                product,
                quantity: 1,
                _id: newItemId
            }];
        });
    };

    // Update item quantity
    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setOrderProducts(prev => prev.filter(item => item._id !== itemId));
            if (itemId === lastAddedItemId) {
                setLastAddedItemId(null);
                setQuantityInput('');
            }
            return;
        }

        setOrderProducts(prev =>
            prev.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );

        if (itemId === lastAddedItemId) {
            setQuantityInput(newQuantity.toString());
            // Neměníme isFirstInput při aktualizaci množství z kódu
        }
    };

    // Calculate total price
    const totalPrice = orderProducts.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 0
    );

    // Format price with Czech locale
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('cs-CZ', {
            style: 'currency',
            currency: 'CZK'
        }).format(price);
    };

    // Clear the entire order
    const clearOrder = () => {
        setOrderProducts([]);
        setLastAddedItemId(null);
        setQuantityInput('');
        setIsFirstInput(true);
        onClearOrder?.();
    };

    // Handle keyboard input for quantity changes
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!lastAddedItemId) return;

        const key = event.key;

        // Handle numeric input (0-9)
        if (/^[0-9]$/.test(key)) {
            event.preventDefault();
            
            let newInput: string;
            if (isFirstInput) {
                // První vstup přepíše stávající hodnotu
                newInput = key;
                setIsFirstInput(false);
            } else {
                // Další vstupy se připojují
                newInput = quantityInput + key;
            }
            
            const newQuantity = parseInt(newInput);
            
            if (newQuantity > 0 && newQuantity <= 999) { // Limit to reasonable quantity
                setQuantityInput(newInput);
                updateQuantity(lastAddedItemId, newQuantity);
            }
        }
        // Handle backspace
        else if (key === 'Backspace') {
            event.preventDefault();
            setIsFirstInput(false);
            
            if (quantityInput.length > 0) {
                const newInput = quantityInput.slice(0, -1);
                if (newInput === '' || newInput === '0') {
                    // If empty or zero, remove the item
                    setQuantityInput('');
                    updateQuantity(lastAddedItemId, 0);
                } else {
                    const newQuantity = parseInt(newInput);
                    setQuantityInput(newInput);
                    updateQuantity(lastAddedItemId, newQuantity);
                }
            }
        }
        // Handle Enter to confirm and clear selection
        else if (key === 'Enter') {
            event.preventDefault();
            setLastAddedItemId(null);
            setQuantityInput('');
            setIsFirstInput(true);
        }
        // Handle Escape to clear selection without changing quantity
        else if (key === 'Escape') {
            event.preventDefault();
            setLastAddedItemId(null);
            setQuantityInput('');
            setIsFirstInput(true);
        }
    }, [lastAddedItemId, quantityInput, isFirstInput, updateQuantity]);

    // Set up keyboard event listener
    useEffect(() => {
        if (lastAddedItemId) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [lastAddedItemId, handleKeyDown]);

    // Handle clicking outside to deselect active item
    const handleItemClick = (itemId: string) => {
        if (itemId === lastAddedItemId) {
            // Clicking on already active item deselects it
            setLastAddedItemId(null);
            setQuantityInput('');
            setIsFirstInput(true);
        } else {
            // Clicking on different item makes it active
            const item = orderProducts.find(p => p._id === itemId);
            if (item) {
                setLastAddedItemId(itemId);
                setQuantityInput(item.quantity.toString());
                setIsFirstInput(true);
            }
        }
    };

    // Handle completing the sale
    const handleCompleteSale = async () => {
        if (orderProducts.length === 0 || isProcessing) return;

        try {
            setIsProcessing(true);

            const orderData: CreateOrderDto = {
                products: orderProducts.map(item => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                })),
                date: new Date().toISOString()
            };

            const orderId = await orderService.createOrder(orderData);

            // Připravení dat pro tisk
            const receiptData = {
                orderNumber: orderId || 'N/A',
                date: new Date().toLocaleString('cs-CZ'),
                items: orderProducts.map(item => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    total: item.product.price * item.quantity
                })),
                totalAmount: totalPrice,
                storeName: 'Hradišťský Vrch',
                storeAddress: 'Vaše adresa zde'
            };

            // Tisk účtenky
            const printResult = await printerService.printReceipt(receiptData);

            clearOrder();

            if (printResult.success) {
                alert(`Objednávka dokončena a účtenka vytisknuta!\nCelková cena: ${formatPrice(totalPrice)}`);
            } else {
                alert(`Objednávka dokončena, ale tisk selhal: ${printResult.error}\nCelková cena: ${formatPrice(totalPrice)}`);
            }
        } catch (error) {
            console.error('Failed to complete sale:', error);
            alert('Nepodařilo se dokončit prodej. Zkuste to znovu.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div ref={componentRef} className="w-full h-full bg-primary flex flex-col p-4" tabIndex={0}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-text-primary">Objednávka</h2>
                <button
                    onClick={clearOrder}
                    disabled={orderProducts.length === 0}
                    className={`px-3 py-1 text-text-primary rounded-md text-sm transition-colors ${orderProducts.length === 0
                            ? 'bg-error/40 cursor-not-allowed'
                            : 'bg-error/80 hover:bg-error'
                        }`}
                >
                    Vymazat
                </button>
            </div>
            {lastAddedItemId && (
                <div className="mb-2 text-xs text-text-secondary bg-secondary/30 px-3 py-2 rounded">
                    <strong>Režim úpravy množství:</strong> {quantityInput || '0'} | 
                    <span className="ml-1">Enter = potvrdit | Esc = ukončit | 0-9 = změnit | Backspace = smazat</span>
                </div>
            )}

            {orderProducts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-30" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <p>Žádné produkty</p>
                    <p className="text-xs mt-1">Vyberte produkty pro objednávku</p>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-auto">
                        <div className="space-y-2">
                            {orderProducts.map((item) => {
                                const isActiveItem = item._id === lastAddedItemId;
                                return (
                                    <div 
                                        key={item._id} 
                                        onClick={() => handleItemClick(item._id!)}
                                        className={`flex items-center justify-between p-2 rounded-md transition-all cursor-pointer ${
                                            isActiveItem 
                                                ? 'bg-success/20 border-2 border-success/50 ring-2 ring-success/30' 
                                                : 'bg-secondary/30 hover:bg-secondary/50'
                                        }`}
                                    >
                                        <div className="flex-1">
                                            <h4 className="text-text-primary font-medium text-sm">{item.product.name}</h4>
                                            <p className="text-text-secondary text-xs">{formatPrice(item.product.price)}</p>
                                            {isActiveItem && (
                                                <p className="text-success text-xs font-medium mt-1">
                                                    ⌨️ Aktivní pro změnu množství (klikněte pro zrušení)
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateQuantity(item._id!, item.quantity - 1);
                                                    setIsFirstInput(true); // Po kliknutí na tlačítko můžeme začít znovu
                                                }}
                                                className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-text-primary hover:bg-primary text-sm"
                                            >
                                                -
                                            </button>
                                            <span className={`min-w-[2rem] text-center ${
                                                isActiveItem ? 'text-success font-bold' : 'text-text-primary'
                                            }`}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateQuantity(item._id!, item.quantity + 1);
                                                    setIsFirstInput(true); // Po kliknutí na tlačítko můžeme začít znovu
                                                }}
                                                className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-text-primary hover:bg-primary text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="text-text-primary font-medium text-sm">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 border-t border-text-secondary/10 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-text-primary font-medium">Celkem</span>
                            <span className="text-text-primary text-xl font-bold">{formatPrice(totalPrice)}</span>
                        </div>

                        <button
                            onClick={handleCompleteSale}
                            disabled={orderProducts.length === 0 || isProcessing}
                            className={`w-full py-3 text-text-primary rounded-md transition-colors ${orderProducts.length === 0 || isProcessing
                                    ? 'bg-success/40 cursor-not-allowed'
                                    : 'bg-success hover:bg-success/80'
                                }`}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-primary mr-2"></div>
                                    Zpracování...
                                </div>
                            ) : (
                                'Dokončit prodej'
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}