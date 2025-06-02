import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Check if we're in a production environment
const serviceAccount = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

// Initialize Firebase Admin SDK
if (!getApps().length) {
  if (serviceAccount) {
    // Initialize with service account in production
    initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    // Local development - may need alternative setup or mock
    console.warn('Firebase Admin SDK initialized without service account');
    initializeApp();
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth(); 