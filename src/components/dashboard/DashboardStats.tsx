'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { useTransactions } from '@/lib/TransactionContext';

interface Stats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function DashboardStats() {
  const { colors } = useTheme();
  const { formatAmount, isLoading: isCurrencyLoading } = useCurrency();
  const { transactions, loading: isTransactionsLoading, error: transactionError } = useTransactions();
  const [stats, setStats] = useState<Stats>({ totalIncome: 0, totalExpenses: 0, balance: 0 });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    calculateStats();
  }, [transactions]);

  const calculateStats = () => {
    try {
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setStats({
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses,
      });
    } catch (err) {
      console.error('Error calculating stats:', err);
      setError('Failed to calculate transaction stats');
    }
  };

  if (isCurrencyLoading || isTransactionsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`${colors.componentColors.card} p-6 animate-pulse`}>
            <div className={`h-4 ${colors.semanticColors.loading.background} rounded w-1/3 mb-4`}></div>
            <div className={`h-8 ${colors.semanticColors.loading.background} rounded w-2/3`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || transactionError) {
    return (
      <div className={`${colors.componentColors.errorAlert} p-4`}>
        <p className={colors.semanticColors.text.error}>{error || transactionError}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Income */}
      <div className={`${colors.componentColors.card} p-6 h-24 flex items-center`}>
        <div className="flex items-center w-full">
          <div className={`p-3 rounded-full ${colors.semanticColors.background.success} mr-4 flex-shrink-0`}>
            <ArrowTrendingUpIcon className={`h-6 w-6 ${colors.semanticColors.text.success}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>Total Income</p>
            <p className={`text-2xl numeric ${colors.semanticColors.text.primary}`}>
              {formatAmount(stats.totalIncome)}
            </p>
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className={`${colors.componentColors.card} p-6 h-24 flex items-center`}>
        <div className="flex items-center w-full">
          <div className={`p-3 rounded-full ${colors.semanticColors.background.error} mr-4 flex-shrink-0`}>
            <ArrowTrendingDownIcon className={`h-6 w-6 ${colors.semanticColors.text.expense}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>Total Expenses</p>
            <p className={`text-2xl numeric ${colors.semanticColors.text.primary}`}>
              {formatAmount(stats.totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className={`${colors.componentColors.card} p-6 h-24 flex items-center`}>
        <div className="flex items-center w-full">
          <div className={`p-3 rounded-full ${colors.semanticColors.background.primaryButton} mr-4 flex-shrink-0`}>
            <BanknotesIcon className={`h-6 w-6 ${colors.semanticColors.text.brand}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>Balance</p>
            <p className={`text-2xl numeric ${
              stats.balance >= 0 
                ? colors.semanticColors.text.income
                : colors.semanticColors.text.expense
            }`}>
              {formatAmount(stats.balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
