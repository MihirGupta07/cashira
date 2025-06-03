'use client';

import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/lib/api-client';
import { useTheme } from '@/lib/ThemeContext';

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
  onDelete: (id: string) => void;
};

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const { colors } = useTheme();
  const { amount, type, category, note, date } = transaction;
  
  // Since API client returns string dates, we can directly parse them
  const formattedDate = format(new Date(date), 'h:mm a');
  const isIncome = type === 'income';
  
  // Get emoji for category or fallback to question mark
  const emoji = CATEGORY_EMOJI[category] || '❓';
  
  return (
    <div className={`flex items-center p-3 h-20 ${colors.semanticColors.background.primary} rounded-lg shadow-sm border ${colors.semanticColors.border.secondary} transition-all duration-300 ease-in-out`}>
      <div className={`flex-shrink-0 mr-3 h-10 w-10 rounded-full flex items-center justify-center ${colors.semanticColors.background.tertiary}`}>
        <span className="text-xl">{emoji}</span>
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${colors.semanticColors.text.primary} truncate`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
          <div className="flex items-center space-x-2">
            <p className={`text-xs ${colors.semanticColors.text.tertiary} truncate`}>
              {formattedDate}
            </p>
          </div>
        </div>
        <p className={`text-xs ${colors.semanticColors.text.tertiary} min-h-[1.25rem]`}>
          {note || 'No note'}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 ml-4 min-w-[80px] justify-end">
        <div className={`flex items-center ${isIncome ? colors.semanticColors.text.income : colors.semanticColors.text.expense}`}>
          <span className="text-lg font-bold mr-1">
            {isIncome ? '+' : '-'}
          </span>
          <span className="text-sm font-medium">${amount.toFixed(2)}</span>
        </div>
        
        <button
          onClick={() => onDelete(transaction.id)}
          className={`${colors.semanticColors.text.light} ${colors.semanticColors.hover.errorText} p-1`}
          aria-label="Delete transaction"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 
