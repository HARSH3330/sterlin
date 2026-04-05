import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const orders = db.prepare('SELECT * FROM "Order" WHERE userId = ? ORDER BY createdAt DESC').all(user.id);
  
  return NextResponse.json(orders);
}
