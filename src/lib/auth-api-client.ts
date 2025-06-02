/**
 * Client-side API service for authentication
 */

export interface User {
  uid: string;
  email: string | null;
  name?: string | null;
  picture?: string | null;
}

export interface AuthResponse {
  user: User | null;
}

// API service for authentication
export const authApi = {
  // Sign in with Google (using Firebase ID token)
  signInWithGoogle: async (idToken: string): Promise<User> => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign in');
    }
    
    const data = await response.json();
    return data.user;
  },
  
  // Sign out
  signOut: async (): Promise<void> => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign out');
    }
  },
  
  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    const response = await fetch('/api/auth/me');
    
    if (!response.ok) {
      console.error('Failed to get current user');
      return null;
    }
    
    const data = await response.json();
    return data.user;
  },
}; 