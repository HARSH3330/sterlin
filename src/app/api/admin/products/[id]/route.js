import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const { id } = await params;
    const db = getDb();

    await db.wishlist.deleteMany({ where: { productId: id } });
    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const { id } = await params;
    const data = await request.json();
    const price = Number(data.price);
    const stock = data.stock === undefined ? undefined : Number(data.stock);

    if (!data.name || !data.description || !data.category || !data.material) {
      return NextResponse.json({ error: 'Name, description, category, and material are required' }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
    }
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
      return NextResponse.json({ error: 'Stock must be a non-negative integer' }, { status: 400 });
    }

    const db = getDb();

    await db.product.update({
      where: { id },
      data: {
        name: data.name.trim(),
        description: data.description.trim(),
        price,
        category: data.category,
        subcategory: data.subcategory || '',
        gender: data.gender,
        material: data.material,
        featured: Boolean(data.featured),
        ...(data.images !== undefined && {
          images: Array.isArray(data.images) ? JSON.stringify(data.images) : data.images,
        }),
        ...(stock !== undefined && { stock }),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
