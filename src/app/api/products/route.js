import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { filterCatalogProducts, getCatalogProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const material = searchParams.get("material");
    const featured = searchParams.get("featured");
    const gender = searchParams.get("gender");
    const q = searchParams.get("q");

    const where = {};

    if (category) {
      where.category = category;
    }
    if (material) {
      where.material = material;
    }
    if (gender) {
      where.gender = gender;
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } }
      ];
    }

    let dbProducts = [];

    try {
      const products = await db.product.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        }
      });

      dbProducts = products.map(p => ({
        ...p,
        images: JSON.parse(p.images || "[]")
      }));
    } catch (dbError) {
      console.warn("Database products unavailable, serving file catalog only:", dbError.message);
    }

    const catalogProducts = filterCatalogProducts(getCatalogProducts(), {
      category,
      material,
      featured,
      gender,
      q,
    });

    const existingIds = new Set(dbProducts.map((product) => product.id));
    const merged = [
      ...dbProducts,
      ...catalogProducts.filter((product) => !existingIds.has(product.id)),
    ];

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

