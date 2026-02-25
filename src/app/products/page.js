"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const url = activeCategory === "All" 
          ? '/api/products' 
          : `/api/products?category=${activeCategory}`;
          
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [activeCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          The <span className="font-accent text-gold">Collection</span>
        </h1>
        <p className={styles.subtitle}>Discover our exquisite range of high jewellery.</p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3>Categories</h3>
            <ul>
              <li>
                <button 
                  className={activeCategory === "All" ? styles.activeFilter : ""}
                  onClick={() => setActiveCategory("All")}
                >
                  All Collections
                </button>
              </li>
              {["Rings", "Earrings", "Necklaces", "Bracelets"].map(cat => (
                 <li key={cat}>
                 <button 
                   className={activeCategory === cat ? styles.activeFilter : ""}
                   onClick={() => setActiveCategory(cat)}
                 >
                   {cat}
                 </button>
               </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.grid}>
          {loading ? (
            <p className={styles.loading}>Loading exquisite pieces...</p>
          ) : (
            products.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.imagePlaceholder}>
                  <div className={styles.jewelShape} data-type={product.category}></div>
                  <div className={styles.hoverOverlay}>
                    <span>View Details</span>
                  </div>
                </div>
                
                <div className={styles.productInfo}>
                  <p className={styles.material}>{product.material}</p>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
