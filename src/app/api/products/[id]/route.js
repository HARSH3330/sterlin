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

    product.featured = product.featured === 1;

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Failed to fetch product ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch product from the database" },
      { status: 500 }
    );
  }
}
