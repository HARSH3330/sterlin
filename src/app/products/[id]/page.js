"use client";

import dynamic from "next/dynamic";
import { useCart } from "@/hooks/useCart";
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";
import Link from "next/link";

// Lazy-load 3D viewer – skips SSR and creates a separate JS chunk for Three.js
const ModelViewer = dynamic(() => import("@/components/ui/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(245,240,232,0.3)",
        fontSize: "0.75rem",
        letterSpacing: "0.2em",
      }}
    >
      LOADING 3D MODEL...
    </div>
  ),
});

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed", err);
        setNotFound(true);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (product) {
      addItem(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (notFound)
    return (
      <div className={styles.loading}>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Product not found.</p>
        <Link
          href="/products"
          className={styles.backLink}
          style={{ position: "static", fontSize: "1rem" }}
        >
          ← Back to Collection
        </Link>
      </div>
    );

  if (!product) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backLink}>
        ← Back to Collection
      </Link>

      <div className={styles.viewerSection}>
        <div className={styles.canvasWrapper}>
          <ModelViewer category={product.category} />
          <div className={styles.viewerHint}>Drag to rotate. Scroll to zoom.</div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <p className={styles.category}>
          {product.category} / {product.material}
        </p>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.actions}>
          <button
            className={`${styles.addToCart} ${added ? styles.added : ""}`}
            onClick={handleAdd}
          >
            {added ? "ADDED TO CART ✓" : "ADD TO CART"}
          </button>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <h4>Premium Quality</h4>
            <p>
              Our pieces are made to last forever. They will not oxidize or discolor, so you
              can wear your jewelry every day, everywhere.
            </p>
          </div>
          <div className={styles.detailItem}>
            <h4>Fair Pricing</h4>
            <p>
              By cutting out traditional retail markups, we bring you the finest materials at
              a fraction of the price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
