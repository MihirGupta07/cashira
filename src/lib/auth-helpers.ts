import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin';

export interface AuthenticatedUser {
  uid: string;
  email: string | null;
  name?: string | null;
  picture?: string | null;
}

/**
 * Get the authenticated user from the session cookie
 * Used in API routes to verify authentication
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    // Verify the session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email || null,
      name: decodedClaims.name || null,
      picture: decodedClaims.picture || null,
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
} 