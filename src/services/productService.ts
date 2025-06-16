import { ENV } from "../config/env";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.PRODUCTS);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      // Konzistentní práce s API response
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.PRODUCTS}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data.success ? data.data : data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  },

  async createProduct(product: CreateProductDto): Promise<Product | null> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.PRODUCTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const data = await response.json();
      return data.success ? data.data : data;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  },

  async updateProduct(id: string, product: Partial<CreateProductDto>): Promise<Product | null> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const data = await response.json();
      return data.success ? data.data : data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      return false;
    }
  },
};
