'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from '@/lib/AuthContext';
import { transactionApi, Transaction } from '@/lib/api-client';
import { TransactionItem } from './TransactionItem';

type GroupedTransactions = {
  [key: string]: Transaction[];
};

export interface TransactionListRef {
  refresh: () => Promise<void>;
}

export const TransactionList = forwardRef<TransactionListRef>(function TransactionList(props, ref) {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions>({});
  
  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const fetchedTransactions = await transactionApi.getAll();
      setTransactions(fetchedTransactions);
      
      // Group transactions by date
      const grouped = fetchedTransactions.reduce<GroupedTransactions>((acc, transaction) => {
        const date = new Date(transaction.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let groupKey: string;
        
        if (date.toDateString() === today.toDateString()) {
          groupKey = 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
          groupKey = 'Yesterday';
        } else {
          groupKey = format(date, 'MMMM d, yyyy');
        }
        
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        
        acc[groupKey].push(transaction);
        return acc;
      }, {});
      
      setGroupedTransactions(grouped);
    } catch (err) {
      console.log('Error fetching transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: fetchTransactions
  }));
  
  const handleDelete = async (transactionId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionApi.delete(transactionId);
        setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
        
        // Update grouped transactions
        setGroupedTransactions((prev) => {
          const newGrouped = { ...prev };
          
          Object.keys(newGrouped).forEach((key) => {
            newGrouped[key] = newGrouped[key].filter((t) => t.id !== transactionId);
            
            // Remove empty groups
            if (newGrouped[key].length === 0) {
              delete newGrouped[key];
            }
          });
          
          return newGrouped;
        });
      } catch (err) {
        console.error('Error deleting transaction:', err);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <p className="text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No transactions yet. Add your first one!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{date}</h3>
          <div className="space-y-2">
            {dateTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={() => handleDelete(transaction.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}); 