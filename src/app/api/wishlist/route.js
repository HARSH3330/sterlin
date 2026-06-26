import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { getCatalogProductById } from '@/lib/catalog';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
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
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, product } = await request.json();
  const db = getDb();

  try {
    const existingProduct = await db.product.findUnique({ where: { id: productId } });
    const productSource = existingProduct ? null : product || getCatalogProductById(productId);

    if (!existingProduct && productSource) {
      await db.product.create({
        data: {
          id: productSource.id,
          name: productSource.name,
          description: productSource.description || '',
          price: Number(productSource.price || 0),
          category: productSource.category || 'Jewellery',
          subcategory: productSource.subcategory || '',
          gender: productSource.gender || 'unisex',
          material: productSource.material || 'Fashion Jewellery',
          images: JSON.stringify(Array.isArray(productSource.images) ? productSource.images : []),
          featured: Boolean(productSource.featured),
          isNew: Boolean(productSource.isNew),
          stock: Number(productSource.stock || 0),
        },
      });
    }

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
