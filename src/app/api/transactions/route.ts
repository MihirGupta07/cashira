import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// GET all transactions for the authenticated user
export async function GET() {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const transactionsSnapshot = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .orderBy('date', 'desc')
      .get();
    
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      userId: user.uid,
      // Convert Firestore timestamps to ISO strings for JSON serialization
      date: doc.data().date.toDate().toISOString(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
    }));
    
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST a new transaction
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await req.json();
    
    // Validate request body
    if (!body.amount || !body.category || !body.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const transaction = {
      ...body,
      createdAt: Timestamp.now(),
      // Convert date string to Firestore timestamp
      date: body.date ? Timestamp.fromDate(new Date(body.date)) : Timestamp.now(),
      // Ensure amount is a number
      amount: Number(body.amount),
    };
    
    const docRef = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .add(transaction);
    
    return NextResponse.json({ 
      id: docRef.id,
      ...transaction,
      userId: user.uid,
      // Convert timestamps to ISO strings for JSON serialization
      date: transaction.date.toDate().toISOString(),
      createdAt: transaction.createdAt.toDate().toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
} 