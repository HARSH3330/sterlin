"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ui/ProductGrid';
import ProductFilters from '@/components/ui/ProductFilters';
import styles from '../shop/shop.module.css';

const CATEGORIES = ["Rings", "Earrings", "Necklaces", "Bracelets", "Pendants", "Accessories"];
const MATERIALS = ["Sterling Silver", "Mixed Metals"];

import { Suspense } from 'react';

function MensPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = new URLSearchParams(searchParams.toString());
      query.set('gender', 'men');
      const res = await fetch(`/api/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Men's Collection</h1>
        <p className={styles.subtitle}>Rugged, refined, and distinctly bold.</p>
      </header>
      <div className={styles.main}>
        <ProductFilters categories={CATEGORIES} materials={MATERIALS} />
        <div className={styles.content}>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default function MensPage() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading...</div>}>
      <MensPageContent />
    </Suspense>
  );
}
