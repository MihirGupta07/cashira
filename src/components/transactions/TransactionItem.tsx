'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/lib/api-client';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { TransactionDetailModal } from './TransactionDetailModal';
import { CATEGORY_EMOJI } from '@/lib/constants';


type TransactionItemProps = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const { colors } = useTheme();
  const { formatAmount, isLoading: isCurrencyLoading } = useCurrency();
  const { amount, type, category, note, date } = transaction;
  const [showDetails, setShowDetails] = useState(false);
  
  // Format the date from the transaction
  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  const isIncome = type === 'income';
  
  // Get emoji for category or fallback to question mark
  const emoji = CATEGORY_EMOJI[category] || '❓';

  const handleItemClick = () => {
    setShowDetails(true);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the item click from triggering
    onDelete(transaction.id);
  };
  
  return (
    <>
      <div 
        className={`flex items-center p-3 h-20 ${colors.semanticColors.background.primary} rounded-lg shadow-sm border ${colors.semanticColors.border.secondary} transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md`}
        onClick={handleItemClick}
      >
        <div className={`flex-shrink-0 mr-3 h-10 w-10 rounded-full flex items-center justify-center ${colors.semanticColors.background.tertiary}`}>
          <span className="text-xl">{emoji}</span>
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${colors.semanticColors.text.primary} truncate`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            
          </div>
          <p className={`text-xs ${colors.semanticColors.text.tertiary} min-h-[1.25rem] line-clamp-2`}>
            {note || 'No note'}
          </p>
          <p className={`text-xs ${colors.semanticColors.text.tertiary}`}>
                {formattedDate}
              </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4 min-w-[80px] justify-end">
          <div className={`flex items-center ${isIncome ? colors.semanticColors.text.income : colors.semanticColors.text.expense}`}>
            <span className="text-lg font-bold mr-1">
              {isIncome ? '+' : '-'}
            </span>
            {isCurrencyLoading ? (
              <div className={`h-4 w-12 ${colors.semanticColors.loading.background} rounded animate-pulse`}></div>
            ) : (
              <span className="text-sm font-medium">{formatAmount(amount)}</span>
            )}
          </div>
          
          <button
            onClick={handleDeleteClick}
            className={`${colors.semanticColors.text.light} ${colors.semanticColors.hover.errorText} p-1`}
            aria-label="Delete transaction"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Transaction detail modal */}
      {showDetails && (
        <TransactionDetailModal
          transaction={transaction}
          onClose={() => setShowDetails(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
} 
