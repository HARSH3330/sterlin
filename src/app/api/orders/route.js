import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const orders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json(orders);
}
