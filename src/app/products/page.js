"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilters from "@/components/ui/ProductFilters";
import ProductGrid from "@/components/ui/ProductGrid";
import styles from "../shop/shop.module.css";

const CATEGORIES = ["Rings", "Earrings", "Necklaces", "Bracelets", "Charms & Amulets", "Pendants"];
const MATERIALS = ["Fashion Jewellery", "Sterling Silver", "Mixed Metals", "Gold Plated"];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?${searchParams.toString()}`);
        if (res.ok) {
          setProducts(await res.json());
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Browse rings, necklaces, and everyday jewellery pieces.</p>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
