"use client";

import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import styles from '../shop/shop.module.css';

export default function KidsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?category=Kids')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kids Collection</h1>
        <p className={styles.subtitle}>Playful, safe, and sparkling pieces for little ones.</p>
      </header>
      <div className={styles.main}>
        <div className={styles.content} style={{ gridColumn: '1 / -1' }}>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
