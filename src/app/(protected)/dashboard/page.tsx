'use client';

import { useRef, useState } from 'react';
import { DashboardStats, DashboardStatsRef } from '@/components/dashboard/DashboardStats';
import { ChartSwitcher } from '@/components/dashboard/ChartSwitcher';
import { TransactionList, TransactionListRef } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { InstallPrompt } from '@/components/ui/InstallPrompt';
import { AddTransactionButton } from '@/components/dashboard/AddTransactionButton';

export default function DashboardPage() {
  const transactionListRef = useRef<TransactionListRef>(null);
  const dashboardStatsRef = useRef<DashboardStatsRef>(null);
  const [showForm, setShowForm] = useState(false);

  const handleTransactionAdded = async () => {
    setShowForm(false);
    // Refresh both stats and transaction list
    if (transactionListRef.current) {
      await transactionListRef.current.refresh();
    }
    if (dashboardStatsRef.current) {
      await dashboardStatsRef.current.refresh();
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add Transaction Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddTransactionButton showForm={showForm} onToggleForm={toggleForm} />
      </div>
      
      {/* Transaction Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm onSuccess={handleTransactionAdded} onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      {/* Stats */}
      <div className="mb-8">
        <DashboardStats ref={dashboardStatsRef} />
      </div>
      
      {/* Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <ChartSwitcher />
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <TransactionList ref={transactionListRef} />
      </div>
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
} 