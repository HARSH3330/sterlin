import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = getDb();
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO Product (id, name, description, price, category, subcategory, gender, material, images, featured, isNew, stock, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.description,
      data.price,
      data.category,
      data.subcategory || '',
      data.gender || 'unisex',
      data.material,
      data.images || '[]',
      data.featured || 0,
      data.isNew || 0,
      data.stock || 50,
      createdAt
    );

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
