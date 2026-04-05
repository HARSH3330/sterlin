import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const stmt = db.prepare("SELECT * FROM Product WHERE id = ?");
    const product = stmt.get(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      featured: product.featured === 1,
      isNew: product.isNew === 1,
      images: JSON.parse(product.images || "[]")
    });
  } catch (error) {
    console.error(`Failed to fetch product:`, error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

