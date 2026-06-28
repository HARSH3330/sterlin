const globalForFallbackOrders = globalThis;

if (!globalForFallbackOrders.sterlinFallbackOrders) {
  globalForFallbackOrders.sterlinFallbackOrders = [];
}

const fallbackOrders = globalForFallbackOrders.sterlinFallbackOrders;

export function addFallbackOrder(order) {
  fallbackOrders.unshift(order);
  return order;
}

export function getFallbackOrders() {
  return fallbackOrders;
}
