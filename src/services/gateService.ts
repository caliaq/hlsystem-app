import { ENV } from '../config/env';
import { Gate } from '../types/gate';

export async function getGate(): Promise<Gate[]> {
  const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/686eb0ee9984cab163af5d5b`, {
  });

  if (!response.ok) {
    throw new Error(`Error fetching gates: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data as Gate[];
}

