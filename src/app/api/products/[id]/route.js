import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCatalogProductById } from "@/lib/catalog";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    let product = null;

    try {
      product = await db.product.findUnique({
        where: { id }
      });
    } catch (dbError) {
      console.warn("Database product lookup unavailable, checking file catalog:", dbError.message);
    }

    if (!product) {
      const catalogProduct = getCatalogProductById(id);
      if (catalogProduct) {
        return NextResponse.json(catalogProduct);
      }
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
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

