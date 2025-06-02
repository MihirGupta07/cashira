import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// Transaction update data interface
interface TransactionUpdateData {
  amount?: number;
  type?: 'income' | 'expense';
  category?: string;
  note?: string;
  date?: Timestamp;
  [key: string]: string | number | boolean | Timestamp | undefined;
}

// GET a single transaction
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id: transactionId } = await params;
  
  try {
    const docRef = adminDb
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .doc(transactionId);
    
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    const data = doc.data();
    
    return NextResponse.json({
      id: doc.id,
      ...data,
      userId: user.uid,
      // Convert Firestore timestamps to ISO strings
      date: data?.date.toDate().toISOString(),
      createdAt: data?.createdAt.toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}

// PUT/UPDATE a transaction
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id: transactionId } = await params;
  
  try {
    const body = await req.json();
    const docRef = adminDb
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .doc(transactionId);
    
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    // Prepare update data
    const updateData: TransactionUpdateData = { ...body };
    
    // Convert date string to Firestore timestamp if provided
    if (body.date) {
      updateData.date = Timestamp.fromDate(new Date(body.date));
    }
    
    // Ensure amount is a number if provided
    if (body.amount !== undefined) {
      updateData.amount = Number(body.amount);
    }
    
    await docRef.update(updateData);
    
    // Get the updated document
    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();
    
    return NextResponse.json({
      id: updatedDoc.id,
      ...updatedData,
      userId: user.uid,
      // Convert timestamps to ISO strings
      date: updatedData?.date.toDate().toISOString(),
      createdAt: updatedData?.createdAt.toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

// DELETE a transaction
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id: transactionId } = await params;
  
  try {
    const docRef = adminDb
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .doc(transactionId);
    
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    await docRef.delete();
    
    return NextResponse.json({ id: transactionId, deleted: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
} 