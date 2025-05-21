import { ENV } from "../config/env";

export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitorDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
}

export const visitorService = {
  async getVisitors(): Promise<Visitor[]> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.VISITORS);
      if (!response.ok) {
        throw new Error('Failed to fetch visitors');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching visitors:', error);
      throw error;
    }
  },

  async getVisitorById(id: string): Promise<Visitor> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.VISITORS}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch visitor');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching visitor with id ${id}:`, error);
      throw error;
    }
  },

  async createVisitor(visitor: CreateVisitorDto): Promise<Visitor> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.VISITORS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitor),
      });
      if (!response.ok) {
        throw new Error('Failed to create visitor');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating visitor:', error);
      throw error;
    }
  },

  async updateVisitor(id: string, visitor: Partial<CreateVisitorDto>): Promise<Visitor> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.VISITORS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitor),
      });
      if (!response.ok) {
        throw new Error('Failed to update visitor');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating visitor with id ${id}:`, error);
      throw error;
    }
  },

  async deleteVisitor(id: string): Promise<void> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.VISITORS}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete visitor');
      }
    } catch (error) {
      console.error(`Error deleting visitor with id ${id}:`, error);
      throw error;
    }
  },
};