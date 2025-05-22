import { ENV } from "../config/env";
import { Order } from "../types/order";

export interface CreateOrderDto {
    products: Array<{
        productId: string;
        quantity: number;
        duration?: number; // Optional duration field
    }>;
    visitorId?: string;
    date: string; // ISO string format for the date
}

export const orderService = {
    async getOrders(): Promise<Order[]> {
        try {
            const response = await fetch(ENV.API.ENDPOINTS.ORDERS);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    async getOrderById(id: string): Promise<Order> {
        try {
            const response = await fetch(`${ENV.API.ENDPOINTS.ORDERS}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching order with id ${id}:`, error);
            throw error;
        }
    },

    async createOrder(orderData: CreateOrderDto): Promise<Order> {
        try {
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
            return data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async updateOrder(id: string, orderData: Partial<CreateOrderDto>): Promise<Order> {
        try {
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
            return await response.json();
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
};