'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { transactionApi } from '@/lib/api-client';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export interface DashboardStatsRef {
  refresh: () => Promise<void>;
}

export const DashboardStats = forwardRef<DashboardStatsRef>(function DashboardStats(props, ref) {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    income: 0,
    expenses: 0,
    balance: 0
  });
  
  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await transactionApi.getAll();
      
      // Calculate stats
      const income = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = data
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      setStats({
        income,
        expenses,
        balance: income - expenses
      });
    } catch (err) {
      console.log('Error fetching transactions for stats:', err);
      setError('Failed to load transaction data');
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
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Income Stat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 mr-4">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${stats.income.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Expenses Stat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20 mr-4">
            <ArrowTrendingDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${stats.expenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Balance Stat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 mr-4">
            <BanknotesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</p>
            <p className={`text-2xl font-semibold ${
              stats.balance >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              ${stats.balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}); 