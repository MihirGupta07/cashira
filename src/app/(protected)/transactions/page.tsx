'use client';

import { useState, useRef } from 'react';
import { TransactionList, TransactionListRef } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const transactionListRef = useRef<TransactionListRef>(null);
  
  const handleAddSuccess = async () => {
    setShowForm(false);
    // Refresh the transaction list to show the new transaction
    if (transactionListRef.current) {
      await transactionListRef.current.refresh();
    }
  };
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button 
          onClick={toggleForm}
          className="flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md"
        >
          {showForm ? (
            <>
              <XMarkIcon className="h-5 w-5" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <PlusIcon className="h-5 w-5" />
              <span>Add Transaction</span>
            </>
          )}
        </button>
      </div>
      
      {/* Transaction Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm onSuccess={handleAddSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <TransactionList ref={transactionListRef} />
      </div>
    </div>
  );
} 