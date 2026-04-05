"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ui/ProductGrid';
import ProductFilters from '@/components/ui/ProductFilters';
import styles from './shop.module.css';

const CATEGORIES = [
  "Rings", "Earrings", "Necklaces", "Bracelets", "Charms & Amulets", 
  "Pendants", "Accessories", "Kids", "Divine", "Gifting", "Corporate"
];

const MATERIALS = ["Sterling Silver", "Mixed Metals", "Gold Plated", "18K Solid Gold", "White Gold"];

export default function ShopAllPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/products?${query}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Shop All</h1>
          <p className={styles.subtitle}>
            Explore our complete collection of celestial-inspired jewellery.
          </p>
        </div>
      </header>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <ProductFilters categories={CATEGORIES} materials={MATERIALS} />
        </div>
        <div className={styles.content}>
          <div className={styles.resultsHeader}>
            <p className={styles.count}>{products.length} Products</p>
          </div>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
