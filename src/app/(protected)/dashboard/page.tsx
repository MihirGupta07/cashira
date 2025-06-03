'use client';

import { useRef, useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ChartSwitcher } from '@/components/dashboard/ChartSwitcher';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionList, TransactionListRef } from '@/components/transactions/TransactionList';
import { AddTransactionButton } from '@/components/dashboard/AddTransactionButton';
import { InstallPrompt } from '@/components/ui/InstallPrompt';

export default function DashboardPage() {
  const { colors } = useTheme();
  const transactionListRef = useRef<TransactionListRef>(null);
  const [showForm, setShowForm] = useState(false);

  const handleTransactionAdded = async () => {
    setShowForm(false);
    // Refresh transaction list
    if (transactionListRef.current) {
      await transactionListRef.current.refresh();
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add Transaction Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-medium ${colors.semanticColors.text.primary}`}>Dashboard</h1>
        <AddTransactionButton showForm={showForm} onToggleForm={toggleForm} />
      </div>
      
      {/* Transaction Form */}
      {showForm && (
        <div className={`${colors.componentColors.card} p-6 mb-6`}>
          <h2 className={`text-xl font-medium mb-4 ${colors.semanticColors.text.primary}`}>Add Transaction</h2>
          <TransactionForm onSuccess={handleTransactionAdded} onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      {/* Dashboard Stats */}
      <div className="mb-8">
        <DashboardStats />
      </div>
      
      {/* Charts */}
      <div className="mb-8">
        <h2 className={`text-xl font-medium mb-4 ${colors.semanticColors.text.primary}`}>Summary</h2>
        <ChartSwitcher />
      </div>
      
      {/* Recent Transactions */}
      <div className={`${colors.componentColors.card} p-6`}>
        <h2 className={`text-xl font-medium mb-4 ${colors.semanticColors.text.primary}`}>Recent Transactions</h2>
        <TransactionList ref={transactionListRef} />
      </div>
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
} 
