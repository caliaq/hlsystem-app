import { useEffect, useState } from "react";
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

            if (existing) {
                // Increment quantity if product already exists in order
                return prev.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Add new product to order
            return [...prev, {
                product,
                quantity: 1,
                _id: `${product._id}-${Date.now()}` // Create unique ID for this order item
            }];
        });
    };

    // Update item quantity
    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setOrderProducts(prev => prev.filter(item => item._id !== itemId));
            return;
        }

        setOrderProducts(prev =>
            prev.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
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
        onClearOrder?.();
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
        <div className="w-full h-full bg-primary flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
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
                            {orderProducts.map((item) => (
                                <div key={item._id} className="flex items-center justify-between p-2 bg-secondary/30 rounded-md">
                                    <div className="flex-1">
                                        <h4 className="text-text-primary font-medium text-sm">{item.product.name}</h4>
                                        <p className="text-text-secondary text-xs">{formatPrice(item.product.price)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                                            className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-text-primary hover:bg-primary text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="text-text-primary min-w-[2rem] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id!, item.quantity + 1)}
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
                            ))}
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