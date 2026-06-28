import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";
import { getCatalogProductById } from "@/lib/catalog";
import { isDatabaseUnavailable } from "@/lib/fallbackAuthStore";
import { hashPassword } from "@/lib/auth";
import { addFallbackOrder } from "@/lib/fallbackOrders";

export function normalizeOrderItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      ...item,
      id: String(item.id || ""),
      name: String(item.name || "Jewellery item"),
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 0),
      stock: Number(item.stock ?? 999),
      images: Array.isArray(item.images) ? item.images : [],
    }))
    .filter((item) => item.id && Number.isFinite(item.price) && item.price > 0 && Number.isInteger(item.quantity) && item.quantity > 0);
}

export function calculateOrderTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function validateAddress(address) {
  const required = ["name", "email", "phone", "address", "city", "state", "pincode"];
  const cleaned = {};

  for (const field of required) {
    cleaned[field] = String(address?.[field] || "").trim();
    if (!cleaned[field]) {
      return { error: "Please fill all shipping details." };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!/^[0-9+\-\s()]{8,15}$/.test(cleaned.phone)) {
    return { error: "Please enter a valid phone number." };
  }

  if (!/^[0-9]{5,6}$/.test(cleaned.pincode)) {
    return { error: "Please enter a valid pincode." };
  }

  return { address: cleaned };
}

function productDataFromCartItem(item) {
  const catalogProduct = getCatalogProductById(item.id);
  const source = catalogProduct || item;

  return {
    id: source.id,
    name: source.name || item.name,
    description: source.description || item.description || "Jewellery product",
    price: Number(source.price || item.price),
    category: source.category || item.category || "Jewellery",
    subcategory: source.subcategory || item.subcategory || "",
    gender: source.gender || item.gender || "unisex",
    material: source.material || item.material || "Fashion Jewellery",
    images: JSON.stringify(Array.isArray(source.images) ? source.images : []),
    featured: Boolean(source.featured),
    isNew: Boolean(source.isNew),
    stock: Number(source.stock ?? item.stock ?? 50),
  };
}

async function ensureProductsAndStock(db, items) {
  for (const item of items) {
    const existing = await db.product.findUnique({ where: { id: item.id } });

    if (!existing) {
      await db.product.create({ data: productDataFromCartItem(item) });
    }

    const updated = await db.product.updateMany({
      where: {
        id: item.id,
        stock: { gte: item.quantity },
      },
      data: {
        stock: { decrement: item.quantity },
      },
    });

    if (updated.count === 0) {
      throw new Error(`${item.name} is out of stock or does not have enough quantity.`);
    }
  }
}

async function ensureOrderUser(db, user) {
  const existing = await db.user.findUnique({ where: { id: user.id } });
  if (existing) return;

  await db.user.create({
    data: {
      id: user.id,
      name: user.name || "Customer",
      email: user.email,
      password: await hashPassword(randomUUID()),
      role: user.role || "customer",
    },
  });
}

export async function createOrderRecord({ user, items, total, address, status = "placed", paymentId = null, razorpayOrderId = null }) {
  const normalizedItems = normalizeOrderItems(items);
  if (normalizedItems.length === 0) {
    return { error: "Your cart is empty.", status: 400 };
  }

  const computedTotal = calculateOrderTotal(normalizedItems);
  if (!Number.isFinite(computedTotal) || Math.abs(computedTotal - Number(total)) > 0.01) {
    return { error: "Order total mismatch.", status: 400 };
  }

  const addressResult = validateAddress(address);
  if (addressResult.error) {
    return { error: addressResult.error, status: 400 };
  }

  try {
    const db = getDb();
    await ensureOrderUser(db, user);
    await ensureProductsAndStock(db, normalizedItems);

    const orderRecord = await db.order.create({
      data: {
        userId: user.id,
        items: JSON.stringify(normalizedItems),
        total: computedTotal,
        status,
        address: JSON.stringify(addressResult.address),
        paymentId,
        razorpayOrderId,
      },
    });

    return { orderId: orderRecord.id, persisted: true };
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      console.error("Order database unavailable, returning temporary order:", error.message);
      const fallbackOrder = addFallbackOrder({
        id: `temp-${randomUUID()}`,
        userId: user.id,
        items: JSON.stringify(normalizedItems),
        total: computedTotal,
        status,
        address: JSON.stringify(addressResult.address),
        paymentId,
        razorpayOrderId,
        createdAt: new Date().toISOString(),
      });

      return { orderId: fallbackOrder.id, persisted: false };
    }

    return { error: error.message || "Failed to save order.", status: 500 };
  }
}
