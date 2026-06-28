import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const db = getDb();
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products.map((product) => ({
      ...product,
      images: JSON.parse(product.images || '[]'),
    })));
  } catch (error) {
    console.error('Failed to fetch admin products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const data = await request.json();
    const price = Number(data.price);
    const stock = Number(data.stock ?? 50);

    if (!data.name || !data.description || !data.category || !data.material) {
      return NextResponse.json({ error: 'Name, description, category, and material are required' }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
    }
    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json({ error: 'Stock must be a non-negative integer' }, { status: 400 });
    }

    const db = getDb();
    const product = await db.product.create({
      data: {
        name: data.name.trim(),
        description: data.description.trim(),
        price,
        category: data.category,
        subcategory: data.subcategory || '',
        gender: data.gender || 'unisex',
        material: data.material,
        images: Array.isArray(data.images) ? JSON.stringify(data.images) : data.images || '[]',
        featured: Boolean(data.featured),
        isNew: Boolean(data.isNew),
        stock,
      }
    });

    return NextResponse.json({ success: true, id: product.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
