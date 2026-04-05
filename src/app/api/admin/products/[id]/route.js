import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const db = getDb();

    db.prepare("DELETE FROM Product WHERE id = ?").run(id);

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

    db.prepare(`
      UPDATE Product 
      SET name = ?, description = ?, price = ?, category = ?, genre = ?, material = ?, featured = ?
      WHERE id = ?
    `).run(
      data.name,
      data.description,
      data.price,
      data.category,
      data.gender,
      data.material,
      data.featured,
      id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
