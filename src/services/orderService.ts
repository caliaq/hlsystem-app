import { ENV } from "../config/env";
import { Order } from "../types/order";

export interface CreateOrderDto {
    // Products array with productId, quantity and optional duration
    products: Array<{
        productId: string;
        quantity: number; // Must be numeric and <= 99
        duration?: number; // Optional duration field
    }>;
    // Optional visitorId (should be a valid MongoDB ObjectId)
    visitorId?: string;
    // Required date field (ISO string format)
    date: string; // ISO string format for the date
}

export interface OrderFilterParams {
    startDate: string;
    endDate: string;
}

export const orderService = {
    async getOrders(): Promise<Order[]> {
        try {
            const response = await fetch(ENV.API.ENDPOINTS.ORDERS);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            
            // Handle various response formats and normalize them
            let orders = [];
            if (Array.isArray(data)) {
                orders = data;
            } else if (data && typeof data === 'object') {
                if ('data' in data && Array.isArray(data.data)) {
                    orders = data.data;
                } else if ('orders' in data && Array.isArray(data.orders)) {
                    orders = data.orders;
                }
            }
            
            // Map to expected format if necessary
            return orders.map(order => this.normalizeOrderData(order));
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    // Helper method to normalize order data from different API formats
    normalizeOrderData(order: any): Order {
        // Map products to items if necessary
        let items = order.items || [];
        
        // If API returns products array instead of items
        if (order.products && Array.isArray(order.products) && !order.items) {
            items = order.products.map(product => {
                // Check if product is already in expected format
                if (product.product && product.quantity) {
                    return product;
                }
                // Otherwise map from backend model format
                return {
                    product: product.productId || product,
                    quantity: product.quantity || 1,
                    duration: product.duration
                };
            });
        }
        
        return {
            _id: order._id,
            items: items,
            totalPrice: order.totalPrice || 0,
            visitor: order.visitor || order.visitorId,
            createdAt: order.createdAt || order.date || new Date().toISOString(),
            completedAt: order.completedAt
        };
    },

    async getFilteredOrders(filter: OrderFilterParams): Promise<Order[]> {
        try {
            const orders = await this.getOrders();
            
            // Filter orders based on date range
            return orders.filter(order => {
                if (!order || !order.createdAt) return false;
                
                const orderDate = new Date(order.createdAt);
                const start = new Date(filter.startDate);
                const end = new Date(filter.endDate);
                end.setHours(23, 59, 59, 999); // Include the entire end day
                
                return orderDate >= start && orderDate <= end;
            });
        } catch (error) {
            console.error('Error filtering orders:', error);
            throw error;
        }
    },

    async getOrderById(id: string): Promise<Order> {
        try {
            const response = await fetch(`${ENV.API.ENDPOINTS.ORDERS}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order');
            }
            const data = await response.json();
            return this.normalizeOrderData(data);
        } catch (error) {
            console.error(`Error fetching order with id ${id}:`, error);
            throw error;
        }
    },

    async createOrder(orderData: CreateOrderDto): Promise<Order> {
        try {
            // Validate product quantities to ensure they're <= 99
            orderData.products.forEach(product => {
                if (product.quantity > 99) {
                    throw new Error(`Product quantity must be <= 99. Found: ${product.quantity}`);
                }
                if (product.quantity <= 0) {
                    throw new Error(`Product quantity must be > 0. Found: ${product.quantity}`);
                }
            });
            
            // Validate date is a valid date
            if (isNaN(new Date(orderData.date).getTime())) {
                throw new Error('Invalid date format');
            }
            
            console.log('Order payload being sent:', JSON.stringify(orderData, null, 2));
            
            const response = await fetch(ENV.API.ENDPOINTS.ORDERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Server error response:', errorData);
                throw new Error('Failed to create order');
            }
            
            const data = await response.json();
            return this.normalizeOrderData(data);
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async updateOrder(id: string, orderData: Partial<CreateOrderDto>): Promise<Order> {
        try {
            // Validate product quantities if they exist
            if (orderData.products) {
                orderData.products.forEach(product => {
                    if (product.quantity > 99) {
                        throw new Error(`Product quantity must be <= 99. Found: ${product.quantity}`);
                    }
                    if (product.quantity <= 0) {
                        throw new Error(`Product quantity must be > 0. Found: ${product.quantity}`);
                    }
                });
            }
            
            // Validate date if it exists
            if (orderData.date && isNaN(new Date(orderData.date).getTime())) {
                throw new Error('Invalid date format');
            }
            
            const response = await fetch(`${ENV.API.ENDPOINTS.ORDERS}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            const data = await response.json();
            return this.normalizeOrderData(data);
        } catch (error) {
            console.error(`Error updating order with id ${id}:`, error);
            throw error;
        }
    },

    async deleteOrder(id: string): Promise<void> {
        try {
            const response = await fetch(`${ENV.API.ENDPOINTS.ORDERS}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
        } catch (error) {
            console.error(`Error deleting order with id ${id}:`, error);
            throw error;
        }
    },

    // Utility methods for date ranges
    getDateRangeForFilter(filter: 'day' | 'month' | 'year'): OrderFilterParams {
        const today = new Date();
        let start = new Date();
        
        switch (filter) {
            case 'day':
                // Current day
                start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                break;
            case 'month':
                // Current month
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'year':
                // Current year
                start = new Date(today.getFullYear(), 0, 1);
                break;
        }
        
        return {
            startDate: start.toISOString().split('T')[0],
            endDate: today.toISOString().split('T')[0]
        };
    }
};