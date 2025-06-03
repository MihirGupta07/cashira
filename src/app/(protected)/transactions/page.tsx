'use client';

import { useRef, useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { TransactionList, TransactionListRef } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { AddTransactionButton } from '@/components/dashboard/AddTransactionButton';

export default function TransactionsPage() {
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
      <div className="flex justify-between items-center mb-6 transition-colors duration-300 ease-in-out">
        <h1 className={`text-2xl font-medium ${colors.semanticColors.text.primary}`}>All Transactions</h1>
        <AddTransactionButton showForm={showForm} onToggleForm={toggleForm} />
      </div>
      
      {/* Transaction Form */}
      {showForm && (
        <div className={`${colors.componentColors.card} p-6 mb-6 transition-all duration-300 ease-in-out`}>
          <h2 className={`text-xl font-medium mb-4 ${colors.semanticColors.text.primary} transition-colors duration-300 ease-in-out`}>Add Transaction</h2>
          <TransactionForm onSuccess={handleTransactionAdded} onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      {/* Transaction List */}
      <div className={`${colors.componentColors.card} p-6 transition-all duration-300 ease-in-out min-h-[300px]`}>
        <h2 className={`text-xl font-medium mb-4 ${colors.semanticColors.text.primary} transition-colors duration-300 ease-in-out`}>Transaction History</h2>
        <TransactionList ref={transactionListRef} />
      </div>
    </div>
  );
} 
