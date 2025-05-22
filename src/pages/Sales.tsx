import { useState, useEffect, useCallback } from 'react';
import { orderService, OrderFilterParams } from '../services/orderService';
import { productService } from '../services/productService';
import { Order } from '../types/order';
import { Product } from '../types/product';
import Navigation from '../components/Navigation';

// Date filter options
type DateFilter = 'day' | 'month' | 'year' | 'custom';

export default function Sales() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Record<string, Product>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateFilter, setDateFilter] = useState<DateFilter>('month');
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchId, setSearchId] = useState('');

    // Fetch orders and products on component mount
    useEffect(() => {
        fetchProductsAndOrders();
    }, []);

    // Fetch all products and store them by ID for quick lookup
    const fetchProducts = async () => {
        try {
            const productsData = await productService.getProducts();
            const productsMap: Record<string, Product> = {};
            productsData.forEach(product => {
                if (product._id) {
                    productsMap[product._id] = product;
                }
            });
            setProducts(productsMap);
            return productsMap;
        } catch (err) {
            console.error("Failed to load products:", err);
            setError("Failed to load product information.");
            return {};
        }
    };

    // Combined function to fetch products and orders
    const fetchProductsAndOrders = async () => {
        try {
            setLoading(true);
            const productsMap = await fetchProducts();
            const data = await orderService.getOrders();

            const processedOrders = data.map(order => {
                const processedItems = order.items?.map(item => {
                    const productId = typeof item.product === 'string' ? item.product : item.product?._id;
                    const product = productId ? productsMap[productId] || item.product : item.product;

                    return {
                        ...item,
                        product
                    };
                }) || [];

                const totalPrice = processedItems.reduce((sum, item) => {
                    const price = typeof item.product === 'object' ? item.product?.price || 0 : 0;
                    return sum + (price * (item.quantity || 0));
                }, 0);

                return {
                    ...order,
                    items: processedItems,
                    totalPrice: totalPrice
                };
            });

            setOrders(processedOrders);
            setError(null);

            if (dateFilter === 'custom') {
                filterOrders({ startDate, endDate }, processedOrders, productsMap);
            } else {
                const filterParams = orderService.getDateRangeForFilter(dateFilter);
                setStartDate(filterParams.startDate);
                setEndDate(filterParams.endDate);
                filterOrders(filterParams, processedOrders, productsMap);
            }
        } catch (err) {
            setError("Failed to load orders. Please try again later.");
            console.error(err);
            setOrders([]);
            setFilteredOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter orders when necessary
    const filterOrders = useCallback(async (
        filterParams: OrderFilterParams,
        ordersList = orders,
        productsMap = products
    ) => {
        try {
            if (ordersList.length === 0) return;

            const filtered = await orderService.getFilteredOrders(filterParams);

            const processedFiltered = filtered.map(order => {
                const processedItems = order.items?.map(item => {
                    const productId = typeof item.product === 'string' ? item.product : item.product?._id;
                    const product = productId ? productsMap[productId] || item.product : item.product;

                    return {
                        ...item,
                        product
                    };
                }) || [];

                const totalPrice = processedItems.reduce((sum, item) => {
                    const price = typeof item.product === 'object' ? item.product?.price || 0 : 0;
                    return sum + (price * (item.quantity || 0));
                }, 0);

                return {
                    ...order,
                    items: processedItems,
                    totalPrice: totalPrice
                };
            });

            setFilteredOrders(processedFiltered);
        } catch (err) {
            console.error("Failed to filter orders:", err);
            setFilteredOrders([]);
        }
    }, [orders, products]);

    // Apply date filter when filter changes
    useEffect(() => {
        if (!orders.length) return;

        let filterParams: OrderFilterParams;

        if (dateFilter === 'custom') {
            filterParams = { startDate, endDate };
        } else {
            filterParams = orderService.getDateRangeForFilter(dateFilter);
            setStartDate(filterParams.startDate);
            setEndDate(filterParams.endDate);
        }

        filterOrders(filterParams);
    }, [dateFilter, startDate, endDate, orders, filterOrders]);

    // Add this new search function
    const handleSearch = useCallback(() => {
        if (!searchId.trim()) {
            // If search is cleared, revert to date filter
            if (dateFilter === 'custom') {
                filterOrders({ startDate, endDate });
            } else {
                const filterParams = orderService.getDateRangeForFilter(dateFilter);
                filterOrders(filterParams);
            }
            return;
        }

        // Filter orders by ID (partial match)
        const results = orders.filter(order =>
            order._id.toLowerCase().includes(searchId.toLowerCase())
        );
        setFilteredOrders(results);
    }, [searchId, orders, dateFilter, startDate, endDate, filterOrders]);

    // Add effect for search
    useEffect(() => {
        if (searchId.trim()) {
            handleSearch();
        }
    }, [searchId, handleSearch]);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('cs-CZ', {
            style: 'currency',
            currency: 'CZK'
        }).format(amount);
    };

    // Format date for display
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('cs-CZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Handle order deletion
    const handleDeleteOrder = async (id: string) => {
        try {
            await orderService.deleteOrder(id);
            setOrders(orders.filter(order => order._id !== id));
            setFilteredOrders(filteredOrders.filter(order => order._id !== id));
            setIsDeleteModalOpen(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to delete order:', error);
            alert('Failed to delete order. Please try again.');
        }
    };

    // Open view modal with order details
    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    // Helper to get product name safely
    const getProductName = (item: any) => {
        if (typeof item.product === 'object' && item.product) {
            return item.product.name || 'Neznámý produkt';
        }
        return 'Neznámý produkt';
    };

    // Helper to get product price safely
    const getProductPrice = (item: any) => {
        if (typeof item.product === 'object' && item.product) {
            return item.product.price || 0;
        }
        return 0;
    };

    // Calculate total sales amount for filtered orders
    const totalSales = filteredOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    return (
        <div className="flex w-full h-screen">
            <div className="flex-1 overflow-hidden flex flex-col">
                {/* Header with title and filters */}
                <div className="p-4 bg-primary flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-text-secondary/10 gap-2">
                    <h1 className="text-2xl font-bold text-text-primary">Prodeje</h1>

                    <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex space-x-1">
                            <button
                                onClick={() => setDateFilter('day')}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${dateFilter === 'day'
                                    ? 'bg-link text-text-primary'
                                    : 'bg-primary text-text-secondary hover:bg-secondary'
                                    }`}
                            >
                                Den
                            </button>
                            <button
                                onClick={() => setDateFilter('month')}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${dateFilter === 'month'
                                    ? 'bg-link text-text-primary'
                                    : 'bg-primary text-text-secondary hover:bg-secondary'
                                    }`}
                            >
                                Měsíc
                            </button>
                            <button
                                onClick={() => setDateFilter('year')}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${dateFilter === 'year'
                                    ? 'bg-link text-text-primary'
                                    : 'bg-primary text-text-secondary hover:bg-secondary'
                                    }`}
                            >
                                Rok
                            </button>
                            <button
                                onClick={() => setDateFilter('custom')}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${dateFilter === 'custom'
                                    ? 'bg-link text-text-primary'
                                    : 'bg-primary text-text-secondary hover:bg-secondary'
                                    }`}
                            >
                                Vlastní
                            </button>
                        </div>

                        {dateFilter === 'custom' && (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="px-2 py-1 bg-secondary text-text-primary rounded-md text-sm"
                                />
                                <span className="text-text-secondary">-</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="px-2 py-1 bg-secondary text-text-primary rounded-md text-sm"
                                />
                            </div>
                        )}

                        <div className="flex items-center space-x-2 ml-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Hledat ID..."
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="pl-8 pr-2 py-1 bg-secondary text-text-primary rounded-md text-sm w-40"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-text-secondary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                onClick={fetchProductsAndOrders}
                                className="px-3 py-1 bg-link text-text-primary rounded-md text-sm hover:bg-link/80 transition-colors"
                            >
                                Obnovit
                            </button>
                        </div>
                    </div>
                </div>
                {/* Orders table */}
                <div className="flex-1 overflow-auto p-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-link"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-primary border border-error text-error px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-primary border border-text-secondary/20 text-text-secondary px-4 py-8 rounded text-center">
                            Žádné objednávky pro vybrané období
                        </div>
                    ) : (
                        <div className="bg-primary rounded-md overflow-hidden">
                            <table className="w-full text-text-primary text-sm">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Datum</th>
                                        <th className="px-4 py-2 text-left">Položky</th>
                                        <th className="px-4 py-2 text-right">Celkem</th>
                                        <th className="px-4 py-2 text-right">Akce</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-text-secondary/10 hover:bg-secondary/30">
                                            <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    {order.items?.slice(0, 2).map((item, index) => (
                                                        <span key={index} className="text-text-secondary text-xs">
                                                            {item.quantity}x {getProductName(item)}
                                                        </span>
                                                    ))}
                                                    {(order.items?.length || 0) > 2 && (
                                                        <span className="text-text-secondary text-xs">
                                                            +{order.items!.length - 2} další
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium">
                                                {formatCurrency(order.totalPrice || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end space-x-1">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="p-1 rounded hover:bg-secondary"
                                                        title="Zobrazit detail"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="p-1 rounded hover:bg-error/20"
                                                        title="Smazat objednávku"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-primary rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-4 text-text-primary">Potvrdit smazání</h3>
                        <p className="text-text-secondary mb-6">
                            Opravdu chcete smazat tuto objednávku? Tato akce je nevratná.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 bg-secondary text-text-primary rounded-md hover:bg-secondary/70"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={() => handleDeleteOrder(selectedOrder._id)}
                                className="px-4 py-2 bg-error text-text-primary rounded-md hover:bg-error/80"
                            >
                                Smazat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Order Details Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-primary rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-text-primary">Detail objednávky</h3>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="p-1 rounded-full hover:bg-secondary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="text-text-secondary text-sm mb-1">Datum a čas</div>
                            <div className="text-text-primary">{formatDate(selectedOrder.createdAt)}</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-text-secondary text-sm mb-1">Položky</div>
                            <div className="bg-secondary rounded-md overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary/50">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-text-secondary">Produkt</th>
                                            <th className="px-3 py-2 text-center text-text-secondary">Množ.</th>
                                            <th className="px-3 py-2 text-right text-text-secondary">Cena</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.items?.map((item, index) => (
                                            <tr key={index} className="border-b border-text-secondary/10">
                                                <td className="px-3 py-2 text-text-primary">{getProductName(item)}</td>
                                                <td className="px-3 py-2 text-center text-text-primary">{item.quantity}</td>
                                                <td className="px-3 py-2 text-right text-text-primary">
                                                    {formatCurrency(getProductPrice(item) * item.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2} className="px-3 py-2 text-right font-bold text-text-primary">Celkem</td>
                                            <td className="px-3 py-2 text-right font-bold text-text-primary">{formatCurrency(selectedOrder.totalPrice || 0)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-4 py-2 bg-link text-text-primary rounded-md hover:bg-link/80"
                            >
                                Zavřít
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}