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

export interface TaxReductionResult {
  success: boolean;
  removedQuantity: number;
  ordersAffected: number;
  error?: string;
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
            return orders.map((order: any) => this.normalizeOrderData(order));
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
            items = order.products.map((product: any) => {
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
    },

    async reduceTaxForProduct(productId: string, targetQuantity: number): Promise<TaxReductionResult> {
    try {
      // Načteme všechny objednávky
      const orders = await this.getOrders();
      
      // Filtrujeme objednávky které obsahují požadovaný produkt
      const ordersWithProduct = orders.filter(order => 
        order.items?.some(item => {
          const itemProductId = typeof item.product === 'string' 
            ? item.product 
            : item.product?._id;
          return itemProductId === productId;
        })
      );

      if (ordersWithProduct.length === 0) {
        return {
          success: false,
          removedQuantity: 0,
          ordersAffected: 0,
          error: 'Žádné objednávky s tímto produktem nebyly nalezeny'
        };
      }

      // Zamícháme objednávky pro náhodný výběr
      const shuffledOrders = [...ordersWithProduct].sort(() => Math.random() - 0.5);
      
      let remainingQuantity = targetQuantity;
      let ordersAffected = 0;
      let totalRemovedQuantity = 0;
      const updatedOrders: string[] = [];

      // Procházíme náhodně vybrané objednávky
      for (const order of shuffledOrders) {
        if (remainingQuantity <= 0) break;

        let orderModified = false;
        const updatedItems = order.items?.map(item => {
          const itemProductId = typeof item.product === 'string' 
            ? item.product 
            : item.product?._id;
          
          if (itemProductId === productId && remainingQuantity > 0) {
            const currentQuantity = item.quantity || 0;
            const quantityToRemove = Math.min(currentQuantity, remainingQuantity);
            
            if (quantityToRemove > 0) {
              remainingQuantity -= quantityToRemove;
              totalRemovedQuantity += quantityToRemove;
              orderModified = true;
              
              const newQuantity = currentQuantity - quantityToRemove;
              return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
          }
          return item;
        }).filter(item => item !== null) || [];

        // Pokud byla objednávka upravena, aktualizujeme ji
        if (orderModified) {
          try {
            // Pokud už nemá žádné položky, smažeme celou objednávku
            if (updatedItems.length === 0) {
              await this.deleteOrder(order._id);
            } else {
              // Připravíme data pro update
              const updateData = {
                products: updatedItems.map(item => ({
                  productId: typeof item.product === 'string' 
                    ? item.product 
                    : item.product?._id || '',
                  quantity: item.quantity || 0,
                  duration: item.duration
                })).filter(p => p.productId && p.quantity > 0),
                date: order.createdAt
              };

              await this.updateOrder(order._id, updateData);
            }
            
            ordersAffected++;
            updatedOrders.push(order._id);
          } catch (error) {
            console.error(`Chyba při aktualizaci objednávky ${order._id}:`, error);
            // Pokračujeme s dalšími objednávkami i při chybě
          }
        }
      }

      return {
        success: true,
        removedQuantity: totalRemovedQuantity,
        ordersAffected: ordersAffected
      };
    } catch (error) {
      console.error('Error reducing tax for product:', error);
      return {
        success: false,
        removedQuantity: 0,
        ordersAffected: 0,
        error: error instanceof Error ? error.message : 'Neznámá chyba při krácení daní'
      };
    }
  },
};