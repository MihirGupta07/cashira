import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from './auth-api-client';

// User profile interface (extends the basic User interface)
export interface UserProfile extends User {
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

/**
 * Create or update a user profile in Firestore
 */
export const saveUserProfile = async (user: User): Promise<UserProfile> => {
  try {
    const userRef = doc(db, `users/${user.uid}`);
    const userDoc = await getDoc(userRef);
    
    const now = new Date().toISOString();
    
    if (!userDoc.exists()) {
      // Create new user document
      const userData: UserProfile = {
        ...user,
        createdAt: now,
        updatedAt: now,
      };
      
      await setDoc(userRef, userData);
      return userData;
    } else {
      // Update existing user document
      const userData: Partial<UserProfile> = {
        ...user,
        updatedAt: now,
      };
      
      await updateDoc(userRef, userData);
      return {
        ...userDoc.data() as UserProfile,
        ...userData,
      };
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

/**
 * Get a user profile from Firestore
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, `users/${userId}`);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}; 