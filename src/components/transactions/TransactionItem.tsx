'use client';

import { format } from 'date-fns';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Transaction } from '@/lib/api-client';

// Default category emoji mapping
const CATEGORY_EMOJI: { [key: string]: string } = {
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  entertainment: '🎬',
  health: '💊',
  education: '📚',
  bills: '📄',
  home: '🏠',
  salary: '💰',
  gifts: '🎁',
  savings: '💵',
  other: '❓'
};

type TransactionItemProps = {
  transaction: Transaction;
  onDelete: () => void;
};

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const { amount, type, category, note, date } = transaction;
  const formattedDate = format(new Date(date), 'h:mm a');
  const isIncome = type === 'income';
  
  // Get emoji for category or fallback to question mark
  const emoji = CATEGORY_EMOJI[category] || '❓';
  
  return (
    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex-shrink-0 mr-3 h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <span className="text-xl">{emoji}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
        {note && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {note}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isIncome ? (
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm font-medium">${amount.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1"
          aria-label="Delete transaction"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 