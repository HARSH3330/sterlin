"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch these from an API
    setLoading(false);
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
          <p>34</p>
        </div>
        <div className={styles.statCard}>
          <h3>Orders</h3>
          <p>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Revenue</h3>
          <p>₹1,45,000</p>
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
