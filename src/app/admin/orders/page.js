"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '');
  } catch {
    return fallback;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load orders');
        setOrders(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Admin</p>
          <h1>Manage Orders</h1>
        </div>
        <Link href="/admin" className={styles.navBtn}>Dashboard</Link>
      </header>

      <section className={styles.adminPanel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.kicker}>Orders</p>
            <h2>{orders.length} orders</h2>
          </div>
          <p className={styles.helperText}>Customer, shipping and item summary for quick fulfilment checks.</p>
        </div>

        {loading ? (
          <div className={styles.centered}>Loading orders...</div>
        ) : error ? (
          <div className={styles.centered}>{error}</div>
        ) : orders.length === 0 ? (
          <div className={styles.centered}>No orders yet.</div>
        ) : (
          <div className={styles.orderAdminList}>
            {orders.map((order) => {
              const address = parseJson(order.address, {});
              const items = parseJson(order.items, []);
              const firstItems = Array.isArray(items) ? items.slice(0, 3) : [];

              return (
                <article key={order.id} className={styles.orderAdminCard}>
                  <div className={styles.orderTopRow}>
                    <div>
                      <p className={styles.orderId}>#{order.id.slice(0, 8)}</p>
                      <h3>{address.name || 'Customer'}</h3>
                      <p className={styles.orderContact}>{address.email || 'No email'} | {address.phone || 'No phone'}</p>
                    </div>
                    <span className={styles.paidBadge}>{order.status}</span>
                  </div>

                  <div className={styles.orderDetailsGrid}>
                    <div>
                      <p className={styles.kicker}>Shipping</p>
                      <p className={styles.orderAddress}>
                        {[address.address, address.city, address.state, address.pincode].filter(Boolean).join(', ') || 'No address saved'}
                      </p>
                    </div>
                    <div>
                      <p className={styles.kicker}>Items</p>
                      <ul className={styles.orderItems}>
                        {firstItems.length > 0 ? firstItems.map((item) => (
                          <li key={`${order.id}-${item.id}`}>
                            <span>{item.name}</span>
                            <strong>x{item.quantity}</strong>
                          </li>
                        )) : <li>No item data</li>}
                        {Array.isArray(items) && items.length > 3 && <li>+{items.length - 3} more</li>}
                      </ul>
                    </div>
                    <div className={styles.orderTotalBox}>
                      <p className={styles.kicker}>Total</p>
                      <strong>Rs. {Number(order.total || 0).toLocaleString()}</strong>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
