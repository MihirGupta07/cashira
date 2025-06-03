/**
 * Client-side API service for interacting with the backend API
 */
import { API_ROUTES, TransactionType } from './constants';

// Transaction interfaces
export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  note?: string;
  date: string;
  createdAt: string;
  userId: string;
}

export interface CreateTransactionData {
  amount: number;
  type: TransactionType;
  category: string;
  note?: string;
  date?: string;
}

export interface UpdateTransactionData {
  amount?: number;
  type?: TransactionType;
  category?: string;
  note?: string;
  date?: string;
}

// API service for transactions
export const transactionApi = {
  // Get all transactions
  getAll: async (): Promise<Transaction[]> => {
    const response = await fetch(API_ROUTES.TRANSACTIONS.BASE);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transactions');
    }
    
    return response.json();
  },
  
  // Get a single transaction
  getById: async (id: string): Promise<Transaction> => {
    const response = await fetch(API_ROUTES.TRANSACTIONS.BY_ID(id));
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transaction');
    }
    
    return response.json();
  },
  
  // Create a new transaction
  create: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await fetch(API_ROUTES.TRANSACTIONS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create transaction');
    }
    
    return response.json();
  },
  
  // Update a transaction
  update: async (id: string, data: UpdateTransactionData): Promise<Transaction> => {
    const response = await fetch(API_ROUTES.TRANSACTIONS.BY_ID(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update transaction');
    }
    
    return response.json();
  },
  
  // Delete a transaction
  delete: async (id: string): Promise<{ id: string; deleted: boolean }> => {
    const response = await fetch(API_ROUTES.TRANSACTIONS.BY_ID(id), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete transaction');
    }
    
    return response.json();
  },
}; 