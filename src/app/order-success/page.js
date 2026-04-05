"use client";

import Link from 'next/link';
import styles from './success.module.css';

export default function OrderSuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Thank You</h1>
        <p className={styles.subtitle}>Your order has been placed successfully.</p>
        <p className={styles.description}>
          A celestial touch is coming your way. We'll send you a confirmation email with details of your order.
        </p>
        <div className={styles.actions}>
          <Link href="/account" className={styles.accountBtn}>View Orders</Link>
          <Link href="/shop" className={styles.shopBtn}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
