'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { transactionApi } from '@/lib/api-client';
import { transformApiTransactionsToType } from '@/lib/transaction-utils';
import { Transaction, ChartTimeframe } from '@/types';
import { DailyChart } from './DailyChart';
import { WeeklyChart } from './WeeklyChart';
import { MonthlyChart } from './MonthlyChart';

export function ChartSwitcher() {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await transactionApi.getAll();
        // Transform API transactions to the format expected by chart components
        const transformedData = transformApiTransactionsToType(data);
        setTransactions(transformedData);
      } catch (err) {
        console.log('Error fetching transactions for chart:', err);
        setError('Failed to load transaction data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, [user]);
  
  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex justify-center items-center h-64 text-red-500">
          {error}
        </div>
      );
    }
    
    if (transactions.length === 0) {
      return (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No transaction data to display
        </div>
      );
    }
    
    switch (timeframe) {
      case 'daily':
        return <DailyChart transactions={transactions} />;
      case 'weekly':
        return <WeeklyChart transactions={transactions} />;
      case 'monthly':
        return <MonthlyChart transactions={transactions} />;
      default:
        return <DailyChart transactions={transactions} />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setTimeframe('daily')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            timeframe === 'daily'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeframe('weekly')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            timeframe === 'weekly'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe('monthly')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            timeframe === 'monthly'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Monthly
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        {renderChart()}
      </div>
    </div>
  );
} 