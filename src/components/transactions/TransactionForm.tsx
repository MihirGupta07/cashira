'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { transactionApi } from '@/lib/api-client';
import { CategoryGrid } from './CategoryGrid';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useTransactions } from '@/lib/TransactionContext';
import { DEFAULT_CATEGORIES, TransactionType } from '@/lib/constants';


type TransactionFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function TransactionForm({ onSuccess, onCancel }: TransactionFormProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const { refreshTransactions } = useTransactions();
  
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in');
      return;
    }
    
    if (!amount || !category) {
      setError('Amount and category are required');
      return;
    }
    
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Amount must be a positive number');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await transactionApi.create({
        amount: numAmount,
        type,
        category,
        note: note || undefined,
        date: date,
      });
      
      // Refresh all transaction data
      await refreshTransactions();
      
      setAmount('');
      setType('expense');
      setCategory('');
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/transactions');
        router.refresh();
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className={`${colors.componentColors.errorAlert} p-4 mb-4`}>
          <p className={colors.semanticColors.text.error}>{error}</p>
        </div>
      )}
      
      {/* Amount */}
      <div>
        <label htmlFor="amount" className={`block text-sm font-medium ${colors.semanticColors.text.secondary}`}>
          Amount
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm text-sm ${colors.componentColors.input} ${colors.semanticColors.text.placeholder}`}
            placeholder="0.00"
          />
        </div>
      </div>
      
      {/* Transaction Type */}
      <div>
        <label className={`block text-sm font-medium ${colors.semanticColors.text.secondary} mb-2`}>
          Transaction Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
              type === 'expense'
                ? `${colors.semanticColors.background.error} ${colors.semanticColors.text.error} ${colors.semanticColors.border.error}`
                : `${colors.semanticColors.background.tertiary} ${colors.semanticColors.text.secondary} ${colors.semanticColors.border.primary}`
            }`}
          >
            <MinusIcon className="h-5 w-5" />
            <span>Expense</span>
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
              type === 'income'
                ? `${colors.semanticColors.background.success} ${colors.semanticColors.text.success} ${colors.semanticColors.border.success}`
                : `${colors.semanticColors.background.tertiary} ${colors.semanticColors.text.secondary} ${colors.semanticColors.border.primary}`
            }`}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Income</span>
          </button>
        </div>
      </div>
      {/* Date */}
      <div>
        <label htmlFor="date" className={`block text-sm font-medium ${colors.semanticColors.text.secondary}`}>
          Date
        </label>
        <div className="mt-1">
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm ${colors.componentColors.input}`}
          />
        </div>
      </div>
      
      {/* Note */}
      <div>
        <label htmlFor="note" className={`block text-sm font-medium ${colors.semanticColors.text.secondary}`}>
          Note (Optional)
        </label>
        <div className="mt-1">
          <textarea
            name="note"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm text-sm ${colors.componentColors.input} ${colors.semanticColors.text.placeholder}`}
            placeholder="Add a note..."
          />
        </div>
      </div>
      {/* Category */}
      <div>
        <label className={`block text-sm font-medium ${colors.semanticColors.text.secondary} mb-2`}>
          Category
        </label>
        <CategoryGrid 
          categories={DEFAULT_CATEGORIES} 
          selectedCategoryId={category} 
          onSelectCategory={(id) => setCategory(id)} 
        />
      </div>
      
      
      
      {/* Actions */}
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium disabled:opacity-50 ${colors.componentColors.button.primary}`}
        >
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`py-2 px-4 rounded-md shadow-sm text-sm font-medium ${colors.componentColors.button.secondary}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 
