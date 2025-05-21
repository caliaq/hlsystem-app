import { ENV } from "../config/env";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.PRODUCTS);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
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
      return await response.json();
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
      return await response.json();
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
      return await response.json();
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