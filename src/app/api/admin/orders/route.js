import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';
import { getFallbackOrders } from '@/lib/fallbackOrders';
import { isDatabaseUnavailable } from '@/lib/fallbackAuthStore';

export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const db = getDb();
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json([...getFallbackOrders(), ...orders]);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return NextResponse.json(getFallbackOrders());
    }

    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
