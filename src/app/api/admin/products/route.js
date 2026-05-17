import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = getDb();
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        subcategory: data.subcategory || '',
        gender: data.gender || 'unisex',
        material: data.material,
        images: data.images || '[]',
        featured: Boolean(data.featured),
        isNew: Boolean(data.isNew),
        stock: data.stock || 50
      }
    });

    return NextResponse.json({ success: true, id: product.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
