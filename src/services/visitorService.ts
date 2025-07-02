import { ENV } from "../config/env";
import { Visitor, CreateVisitorDto } from '../types/visitor';

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

  async getVisitorById(id: string): Promise<Visitor | null> {
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

  async createVisitor(visitor: CreateVisitorDto): Promise<Visitor | null> {
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

  async updateVisitor(id: string, visitor: Partial<CreateVisitorDto>): Promise<Visitor | null> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.VISITORS}/${id}`, {
        method: 'PUT',
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

  async deleteVisitor(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.VISITORS}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete visitor');
      }
      return true;
    } catch (error) {
      console.error(`Error deleting visitor with id ${id}:`, error);
      throw error;
    }
  },
};