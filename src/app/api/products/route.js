import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const material = searchParams.get("material");
    const featured = searchParams.get("featured");
    const gender = searchParams.get("gender");
    const q = searchParams.get("q");

    let queryStr = "SELECT * FROM Product WHERE 1=1";
    const params = [];

    if (category) {
      queryStr += " AND category = ?";
      params.push(category);
    }
    if (material) {
      queryStr += " AND material = ?";
      params.push(material);
    }
    if (gender) {
      queryStr += " AND gender = ?";
      params.push(gender);
    }
    if (featured === "true") {
      queryStr += " AND featured = 1";
    }
    if (q) {
      queryStr += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    queryStr += " ORDER BY createdAt DESC";

    const stmt = db.prepare(queryStr);
    const products = stmt.all(...params);

    const converted = products.map(p => ({
      ...p,
      featured: p.featured === 1,
      isNew: p.isNew === 1,
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

