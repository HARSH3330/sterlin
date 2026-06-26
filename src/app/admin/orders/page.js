"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

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

  const customerName = (order) => {
    try {
      return JSON.parse(order.address || '{}').name || 'Customer';
    } catch {
      return 'Customer';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Orders</h1>
        <Link href="/admin">Dashboard</Link>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className={styles.centered}>Loading orders...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className={styles.centered}>{error}</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="5" className={styles.centered}>No orders yet.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>{customerName(order)}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={styles.paidBadge}>{order.status}</span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
