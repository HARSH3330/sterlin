"use client";

import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import styles from '../shop/shop.module.css';

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?category=Collections')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Special Collections</h1>
        <p className={styles.subtitle}>Limited edition pieces and exclusive collaborations.</p>
      </header>
      <div className={styles.main}>
        <div className={styles.content} style={{ gridColumn: '1 / -1' }}>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
