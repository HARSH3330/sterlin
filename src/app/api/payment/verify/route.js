import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      address,
      items,
      total
    } = await request.json();

    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Save order to database
    const db = getDb();
    
    const orderRecord = await db.order.create({
      data: {
        userId: user.id,
        items: JSON.stringify(items),
        total,
        status: 'paid',
        address: JSON.stringify(address),
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
      }
    });
    
    const orderId = orderRecord.id;

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
