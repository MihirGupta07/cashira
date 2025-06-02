import { Timestamp } from 'firebase/firestore';
import { Transaction as ApiTransaction } from './api-client';
import { Transaction as TypeTransaction } from '../types';

/**
 * Transforms API client transactions to the format expected by chart components
 * that still use Firebase Timestamp types
 */
export function transformApiTransactionToType(apiTransaction: ApiTransaction): TypeTransaction {
  return {
    ...apiTransaction,
    date: Timestamp.fromDate(new Date(apiTransaction.date)),
    createdAt: Timestamp.fromDate(new Date(apiTransaction.createdAt))
  };
}

/**
 * Transforms multiple API client transactions to the format expected by chart components
 */
export function transformApiTransactionsToType(apiTransactions: ApiTransaction[]): TypeTransaction[] {
  return apiTransactions.map(transformApiTransactionToType);
} 