import { ENV } from '../config/env';
import { Gate } from '../types/gate';

export async function getGate(): Promise<Gate[]> {
  const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/686eb0ee9984cab163af5d5b`, {
  });

  if (!response.ok) {
    throw new Error(`Error fetching gates: ${response.statusText}`);
  }

  const responseData = await response.json();
  
  // Check if response has success property and extract data
  if (responseData.success && responseData.data) {
    const data = responseData.data;
    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  } else {
    // Fallback for responses without success wrapper
    return Array.isArray(responseData) ? responseData : [responseData];
  }
}

export async function toggleGate(): Promise<void> {
  const response = await fetch(`${ENV.API.ENDPOINTS.GATES}/686eb0ee9984cab163af5d5b/toggle`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error toggling gate: ${response.statusText}`);
  }

  const responseData = await response.json();
  
  // Check if response has success property
  if (!responseData.success) {
    throw new Error('Failed to toggle gate');
  }
}