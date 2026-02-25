import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const material = searchParams.get("material");
    const featured = searchParams.get("featured");

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
    if (featured === "true") {
      queryStr += " AND featured = 1";
    }

    queryStr += " ORDER BY createdAt DESC";

    const stmt = db.prepare(queryStr);
    const products = stmt.all(...params);

    // Convert boolean back to standard JSON format if needed (SQLite stores 1/0)
    const converted = products.map(p => ({
      ...p,
      featured: p.featured === 1
    }));

    return NextResponse.json(converted);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from the database" },
      { status: 500 }
    );
  }
}
