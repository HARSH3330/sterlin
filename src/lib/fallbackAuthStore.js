import { comparePassword, hashPassword } from "@/lib/auth";
import { randomUUID } from "crypto";

const globalForFallbackAuth = globalThis;

if (!globalForFallbackAuth.sterlinFallbackUsers) {
  globalForFallbackAuth.sterlinFallbackUsers = new Map();
}

const fallbackUsers = globalForFallbackAuth.sterlinFallbackUsers;

export function isDatabaseUnavailable(error) {
  const message = `${error?.message || ""} ${error?.code || ""}`;

  return [
    "DATABASE_URL",
    "Environment variable not found",
    "Can't reach database",
    "P1001",
    "P2021",
    "P2022",
  ].some((text) => message.includes(text));
}

function adminUser(email) {
  return {
    id: "admin-001",
    name: "Admin",
    email,
    role: "admin",
  };
}

export async function findFallbackUser(email, password) {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@sterlin.com").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Used only when the database is unavailable so the existing admin can still enter the dashboard.
  if (email === adminEmail && password === adminPassword) {
    return adminUser(adminEmail);
  }

  const customer = fallbackUsers.get(email);
  if (!customer) return null;

  const valid = await comparePassword(password, customer.password);
  if (!valid) return null;

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role,
  };
}

export async function createFallbackCustomer({ name, email, password }) {
  if (fallbackUsers.has(email)) {
    return { error: "An account with this email already exists", status: 409 };
  }

  const user = {
    id: `fallback-${randomUUID()}`,
    name,
    email,
    password: await hashPassword(password),
    role: "customer",
  };

  fallbackUsers.set(email, user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
