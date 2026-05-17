import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const db = getDb();

    await db.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const db = getDb();

    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        gender: data.gender,
        material: data.material,
        featured: data.featured
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
