"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/admin/orders'),
        ]);
        const products = productsRes.ok ? await productsRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];
        const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        setStats({ products: products.length, orders: orders.length, revenue });
      } catch {
        setStats({ products: 0, orders: 0, revenue: 0 });
      }
    }

    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Control</h1>
        <nav className={styles.nav}>
          <Link href="/admin/products">Manage Products</Link>
          <Link href="/admin/orders">Manage Orders</Link>
        </nav>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Revenue</h3>
          <p>Rs. {stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <section className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionBtns}>
          <Link href="/admin/products/new" className={styles.primaryBtn}>Add New Product</Link>
        </div>
      </section>
    </div>
  );
}
