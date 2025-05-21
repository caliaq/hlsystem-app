import { ENV } from "../config/env";

export interface Gate {
  id: string;
  name: string;
  description: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGateDto {
  name: string;
  description: string;
  isOpen?: boolean;
}

export const gateService = {
  async getGates(): Promise<Gate[]> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.GATES);
      if (!response.ok) {
        throw new Error('Failed to fetch gates');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching gates:', error);
      throw error;
    }
  },

  async getGateById(id: string): Promise<Gate> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch gate');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching gate with id ${id}:`, error);
      throw error;
    }
  },

  async createGate(gate: CreateGateDto): Promise<Gate> {
    try {
      const response = await fetch(ENV.API.ENDPOINTS.GATES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gate),
      });
      if (!response.ok) {
        throw new Error('Failed to create gate');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating gate:', error);
      throw error;
    }
  },

  async updateGate(id: string, gate: Partial<CreateGateDto>): Promise<Gate> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gate),
      });
      if (!response.ok) {
        throw new Error('Failed to update gate');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating gate with id ${id}:`, error);
      throw error;
    }
  },

  async deleteGate(id: string): Promise<void> {
    try {
      const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete gate');
      }
    } catch (error) {
      console.error(`Error deleting gate with id ${id}:`, error);
      throw error;
    }
  },
};