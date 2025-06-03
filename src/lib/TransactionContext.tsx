'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { transactionApi, Transaction } from '@/lib/api-client';
import { useAuthContext } from './AuthContext';

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refreshTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await transactionApi.getAll();
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transaction data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, [user]);

  return (
    <TransactionContext.Provider value={{ transactions, loading, error, refreshTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
} 