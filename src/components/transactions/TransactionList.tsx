'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from '@/lib/AuthContext';
import { transactionApi, Transaction } from '@/lib/api-client';
import { TransactionItem } from './TransactionItem';
import { useTheme } from '@/lib/ThemeContext';
import { useTransactions } from '@/lib/TransactionContext';

type GroupedTransactions = {
  [key: string]: Transaction[];
};

export interface TransactionListRef {
  refresh: () => Promise<void>;
}

export const TransactionList = forwardRef<TransactionListRef>(function TransactionList(props, ref) {
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const { transactions, loading, error: transactionError, refreshTransactions } = useTransactions();
  const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Group transactions by date whenever transactions change
    groupTransactionsByDate();
  }, [transactions]);

  const groupTransactionsByDate = () => {
    try {
      // Group transactions by date
      const grouped = transactions.reduce<GroupedTransactions>((acc, transaction) => {
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
      console.error('Error grouping transactions:', err);
      setError('Failed to process transactions');
    }
  };

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: refreshTransactions
  }));
  
  const handleDelete = async (transactionId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionApi.delete(transactionId);
        // After successful deletion, refresh all transactions
        refreshTransactions();
      } catch (err) {
        console.error('Error deleting transaction:', err);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-8 min-h-[200px]">
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${colors.semanticColors.loading.spinner}`}></div>
      </div>
    );
  }
  
  if (error || transactionError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 min-h-[100px] transition-all duration-300 ease-in-out">
        <p className="text-red-700">{error || transactionError}</p>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 min-h-[200px] transition-all duration-300 ease-in-out">
        <p className="text-gray-500">No transactions yet. Add your first one!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 transition-all duration-300 ease-in-out min-h-[200px]">
      {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 mb-2 transition-colors duration-300 ease-in-out">{date}</h3>
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
