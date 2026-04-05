import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const wishlist = db.prepare(`
    SELECT p.* FROM Product p
    JOIN Wishlist w ON p.id = w.productId
    WHERE w.userId = ?
  `).all(user.id);

  const converted = wishlist.map(p => ({
    ...p,
    featured: p.featured === 1,
    isNew: p.isNew === 1,
    images: JSON.parse(p.images || "[]")
  }));

  return NextResponse.json(converted);
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await request.json();
  const db = getDb();

  try {
    db.prepare(`
      INSERT INTO Wishlist (id, userId, productId, createdAt)
      VALUES (?, ?, ?, ?)
    `).run(randomUUID(), user.id, productId, new Date().toISOString());
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Already in wishlist' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const db = getDb();

  db.prepare('DELETE FROM Wishlist WHERE userId = ? AND productId = ?').run(user.id, productId);
  return NextResponse.json({ success: true });
}
