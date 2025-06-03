import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Transaction } from '../types';
import { TransactionType } from './constants';
// Get user's transaction collection reference
export const getUserTransactionsRef = (userId: string) => {
  return collection(db, `users/${userId}/transactions`);
};

// Add a new transaction
export const addTransaction = async (
  userId: string, 
  transaction: Omit<Transaction, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const transactionsRef = getUserTransactionsRef(userId);
    const docRef = await addDoc(transactionsRef, {
      ...transaction,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Get all user transactions
export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const transactionsRef = getUserTransactionsRef(userId);
    const q = query(transactionsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Transaction[];
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

// Get transactions by type (income or expense)
export const getTransactionsByType = async (
  userId: string, 
  type: TransactionType
): Promise<Transaction[]> => {
  try {
    const transactionsRef = getUserTransactionsRef(userId);
    const q = query(
      transactionsRef, 
      where('type', '==', type),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Transaction[];
  } catch (error) {
    console.error('Error getting transactions by type:', error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (
  userId: string, 
  transactionId: string
): Promise<void> => {
  try {
    const transactionRef = doc(db, `users/${userId}/transactions/${transactionId}`);
    await deleteDoc(transactionRef);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Update a transaction
export const updateTransaction = async (
  userId: string, 
  transactionId: string, 
  updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>
): Promise<void> => {
  try {
    const transactionRef = doc(db, `users/${userId}/transactions/${transactionId}`);
    await updateDoc(transactionRef, updates);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}; 