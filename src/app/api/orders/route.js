import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { createOrderRecord } from '@/lib/orders';
import { isDatabaseUnavailable } from '@/lib/fallbackAuthStore';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getDb();
    const orders = await db.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
  
    return NextResponse.json(orders);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return NextResponse.json([]);
    }
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { items, total, address } = await request.json();
  const result = await createOrderRecord({
    user,
    items,
    total,
    address,
    status: 'test_order',
    paymentId: 'mock-payment',
    razorpayOrderId: 'mock-order',
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status || 500 });
  }

  return NextResponse.json({ success: true, orderId: result.orderId, persisted: result.persisted });
}
