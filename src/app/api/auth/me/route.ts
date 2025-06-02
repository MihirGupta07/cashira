import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    console.log('Auth debug - sessionCookie exists:', !!sessionCookie);
    console.log('Auth debug - all cookies:', cookieStore.getAll().map(c => ({ name: c.name, hasValue: !!c.value })));

    if (!sessionCookie) {
      console.log('Auth debug - No session cookie found');
      return NextResponse.json({ user: null });
    }

    // Verify the session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    
    console.log('Auth debug - Session verified for user:', decodedClaims.uid);
    
    return NextResponse.json({
      user: {
        uid: decodedClaims.uid,
        email: decodedClaims.email,
        name: decodedClaims.name,
        picture: decodedClaims.picture,
      }
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json({ user: null });
  }
} 