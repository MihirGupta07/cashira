// Script to migrate transactions from root collection to user-specific subcollections
// Run with: node scripts/migrate-transactions.js

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!serviceAccount) {
  console.error('No service account key found. Set NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY environment variable.');
  process.exit(1);
}

// Initialize the app with admin privileges
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateTransactions() {
  console.log('Starting transaction migration...');
  
  try {
    // Get all transactions from the root collection
    const transactionsSnapshot = await db.collection('transactions').get();
    
    if (transactionsSnapshot.empty) {
      console.log('No transactions found in root collection. No migration needed.');
      return;
    }
    
    console.log(`Found ${transactionsSnapshot.size} transactions to migrate.`);
    
    // Group transactions by userId
    const transactionsByUser = {};
    
    transactionsSnapshot.forEach(doc => {
      const transaction = doc.data();
      const userId = transaction.userId;
      
      if (!userId) {
        console.warn(`Transaction ${doc.id} has no userId, skipping...`);
        return;
      }
      
      if (!transactionsByUser[userId]) {
        transactionsByUser[userId] = [];
      }
      
      transactionsByUser[userId].push({
        id: doc.id,
        ...transaction
      });
    });
    
    // Migrate each transaction to the user's subcollection
    let batch = db.batch();
    let operationCount = 0;
    const MAX_BATCH_SIZE = 500; // Firestore limit
    
    for (const userId in transactionsByUser) {
      console.log(`Migrating ${transactionsByUser[userId].length} transactions for user ${userId}`);
      
      for (const transaction of transactionsByUser[userId]) {
        // Extract fields but ignore userId since it's not needed in the new structure
        const { id, userId: removedUserId, ...transactionData } = transaction;
        const newDocRef = db.collection('users').doc(userId).collection('transactions').doc(id);
        
        batch.set(newDocRef, transactionData);
        operationCount++;
        
        // If we reach the batch limit, commit and start a new batch
        if (operationCount >= MAX_BATCH_SIZE) {
          await batch.commit();
          console.log(`Committed batch of ${operationCount} operations`);
          operationCount = 0;
          batch = db.batch();
        }
      }
    }
    
    // Commit any remaining operations
    if (operationCount > 0) {
      await batch.commit();
      console.log(`Committed final batch of ${operationCount} operations`);
    }
    
    console.log('Migration completed successfully!');
    console.log('You can now safely delete the root transactions collection.');
    console.log('To delete root transactions, run a separate script or use Firebase Console.');
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrateTransactions().catch(console.error); 