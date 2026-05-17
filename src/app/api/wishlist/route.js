import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const wishlistItems = await db.wishlist.findMany({
    where: { userId: user.id },
    include: { product: true }
  });

  const converted = wishlistItems.map(item => ({
    ...item.product,
    images: JSON.parse(item.product.images || "[]")
  }));

  return NextResponse.json(converted);
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await request.json();
  const db = getDb();

  try {
    await db.wishlist.create({
      data: {
        userId: user.id,
        productId
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.code === 'P2002') {
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

  await db.wishlist.deleteMany({
    where: {
      userId: user.id,
      productId: productId
    }
  });
  return NextResponse.json({ success: true });
}
