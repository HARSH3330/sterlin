import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAuthUser } from '@/lib/auth';
import { calculateOrderTotal, createOrderRecord, normalizeOrderItems } from '@/lib/orders';

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
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment gateway configuration error' }, { status: 500 });
    }
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment verification details' }, { status: 400 });
    }
    const normalizedItems = normalizeOrderItems(items);
    if (normalizedItems.length === 0) {
      return NextResponse.json({ error: 'Order has no items' }, { status: 400 });
    }

    const computedTotal = calculateOrderTotal(normalizedItems);
    if (!Number.isFinite(computedTotal) || Math.abs(computedTotal - Number(total)) > 0.01) {
      return NextResponse.json({ error: 'Order total mismatch' }, { status: 400 });
    }

    // 1. Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const result = await createOrderRecord({
      user,
      items: normalizedItems,
      total,
      address,
      status: 'paid',
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status || 500 });
    }

    return NextResponse.json({ success: true, orderId: result.orderId });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
