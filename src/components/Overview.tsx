import { useEffect, useState } from "react";
import { Product as ProductType } from "../services/productService";
import { OrderProduct } from "../types/order";
import { orderService, CreateOrderDto } from "../services/orderService";

interface OverviewProps {
    selectedProducts?: ProductType[];
    onClearOrder?: () => void;
}

export default function Overview({ selectedProducts = [], onClearOrder }: OverviewProps) {
    const [orderproducts, setOrderproducts] = useState<OrderProduct[]>([]);
    
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
        setOrderproducts(prevproducts => {
            const existingItem = prevproducts.find(item => item.product._id === product._id);
            
            if (existingItem) {
                // Increment quantity if product already exists in order
                return prevproducts.map(item => 
                    item.product._id === product._id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            } else {
                // Add new product to order
                return [...prevproducts, { 
                    product, 
                    quantity: 1,
                    id: `${product._id}-${Date.now()}` // Create unique ID for this order item
                }];
            }
        });
    };

    // Remove an item from the order
    const removeFromOrder = (itemId: string) => {
        setOrderproducts(prevproducts => prevproducts.filter(item => item.id !== itemId));
    };

    // Update item quantity
    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromOrder(itemId);
            return;
        }

        setOrderproducts(prevProducts => 
            prevProducts.map(product => 
                product.id === itemId 
                    ? { ...product, quantity: newQuantity } 
                    : product
            )
        );
    };

    // Calculate total price
    const totalPrice = orderproducts.reduce(
        (sum, product) => sum + (product.product.price * product.quantity),
        0
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
        setOrderproducts([]);
        if (onClearOrder) {
            onClearOrder();
        }
    };

    // Handle completing the sale
    const handleCompleteSale = async () => {
        if (orderproducts.length === 0) return;

        try {
            // Create the order data according to API requirements
            const orderData: CreateOrderDto = {
                products: orderproducts.map(product => ({
                    productId: product.product._id,
                    quantity: product.quantity,
                    // Add duration if needed in the future
                })),
                // Use current date in ISO format as required by the backend
                date: new Date().toISOString()
                // visitorId can be added here if we have a selected visitor
            };
            
            // Create the order using the order service
            const createdOrder = await orderService.createOrder(orderData);
            
            // Clear the order after successful completion
            clearOrder();
            
            // Show a success message
            alert(`Sale completed! Total: ${formatPrice(totalPrice)}`);
            console.log('Order completed:', createdOrder);
        } catch (error) {
            console.error('Failed to complete sale:', error);
            alert('Failed to complete the sale. Please try again.');
        }
    };

    return (
        <div className="w-full h-full bg-primary flex flex-col p-4">
            <div className="flex justify-between products-center mb-4">
                <h2 className="text-lg font-bold text-text-primary">Current Order</h2>
                <div className="flex space-x-2">
                    <button 
                        onClick={clearOrder}
                        disabled={orderproducts.length === 0}
                        className={`px-3 py-1 text-text-primary rounded-md text-sm transition-colors ${
                            orderproducts.length === 0 
                                ? 'bg-error/40 cursor-not-allowed' 
                                : 'bg-error/80 hover:bg-error'
                        }`}
                    >
                        Clear Order
                    </button>
                </div>
            </div>

            {orderproducts.length === 0 ? (
                <div className="flex-1 flex flex-col products-center justify-center text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-30" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <p>No products in order</p>
                    <p className="text-xs mt-1">Select products to add them to your order</p>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm text-text-primary">
                            <thead className="text-xs uppercase bg-primary/30 border-b border-text-secondary/10">
                                <tr>
                                    <th className="px-2 py-2 text-left">Product</th>
                                    <th className="px-2 py-2 text-right">Price</th>
                                    <th className="px-2 py-2 text-center">Qty</th>
                                    <th className="px-2 py-2 text-right">Total</th>
                                    <th className="px-2 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderproducts.map((product) => (
                                    <tr key={product.id} className="border-b border-text-secondary/10 hover:bg-primary/30">
                                        <td className="px-2 py-2 whitespace-nowrap">{product.product.name}</td>
                                        <td className="px-2 py-2 text-right">{formatPrice(product.product.price)}</td>
                                        <td className="px-2 py-2">
                                            <div className="flex products-center justify-center space-x-1">
                                                <button 
                                                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                                    className="w-5 h-5 bg-secondary rounded-full flex products-center justify-center text-text-primary hover:bg-primary"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-1">{product.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                                    className="w-5 h-5 bg-secondary rounded-full flex products-center justify-center text-text-primary hover:bg-primary"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 text-right font-medium">{formatPrice(product.product.price * product.quantity)}</td>
                                        <td className="px-2 py-2 text-right">
                                            <button 
                                                onClick={() => removeFromOrder(product.id)}
                                                className="text-error hover:text-error/80"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-4 border-t border-text-secondary/10 pt-4">
                        <div className="flex justify-between products-center mb-4">
                            <span className="text-text-primary font-medium">Total</span>
                            <span className="text-text-primary text-xl font-bold">{formatPrice(totalPrice)}</span>
                        </div>
                        
                        <div className="flex">
                            <button 
                                onClick={handleCompleteSale}
                                disabled={orderproducts.length === 0}
                                className={`w-full py-2 text-text-primary rounded-md transition-colors ${
                                    orderproducts.length === 0 
                                        ? 'bg-success/40 cursor-not-allowed' 
                                        : 'bg-success hover:bg-success/80'
                                }`}
                            >
                                Complete Sale
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}