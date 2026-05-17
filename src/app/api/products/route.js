import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const converted = products.map(p => ({
      ...p,
      images: JSON.parse(p.images || "[]")
    }));

    return NextResponse.json(converted);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

