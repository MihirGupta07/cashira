'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { transactionApi } from '@/lib/api-client';
import { transformApiTransactionsToType } from '@/lib/transaction-utils';
import { Transaction, ChartTimeframe } from '@/types';
import { DailyChart } from './DailyChart';
import { WeeklyChart } from './WeeklyChart';
import { MonthlyChart } from './MonthlyChart';
import { Spinner } from '../ui/Spinner';

export function ChartSwitcher() {
  const { user } = useAuthContext();
  const { colors } = useTheme();
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
        <div className="flex justify-center items-center h-64">
          <Spinner size="medium" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className={`flex justify-center items-center h-64 ${colors.semanticColors.text.error}`}>
          {error}
        </div>
      );
    }
    
    if (transactions.length === 0) {
      return (
        <div className={`flex justify-center items-center h-64 ${colors.semanticColors.text.tertiary}`}>
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
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            timeframe === 'daily'
              ? `${colors.semanticColors.background.primaryButton} ${colors.semanticColors.text.primary}`
              : `${colors.semanticColors.background.primary} ${colors.semanticColors.text.secondary} ${colors.semanticColors.hover.background}`
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeframe('weekly')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            timeframe === 'weekly'
              ? `${colors.semanticColors.background.primaryButton} ${colors.semanticColors.text.primary}`
              : `${colors.semanticColors.background.primary} ${colors.semanticColors.text.secondary} ${colors.semanticColors.hover.background}`
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe('monthly')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            timeframe === 'monthly'
              ? `${colors.semanticColors.background.primaryButton} ${colors.semanticColors.text.primary}`
              : `${colors.semanticColors.background.primary} ${colors.semanticColors.text.secondary} ${colors.semanticColors.hover.background}`
          }`}
        >
          Monthly
        </button>
      </div>
      
      <div className={`${colors.componentColors.card} p-4 w-full`}>
        <div className={`w-full ${timeframe === 'monthly' ? 'py-2' : ''}`}>
          {renderChart()}
        </div>
      </div>
    </div>
  );
} 
