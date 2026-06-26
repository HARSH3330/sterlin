"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import styles from "./page.module.css";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const toggleCart = useCart((state) => state.toggleCart);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        setProduct(await res.json());
      } catch {
        setNotFound(true);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (!product || Number(product.stock ?? 0) <= 0) return;
    addItem(product);
    setAdded(true);
    toggleCart();
    setTimeout(() => setAdded(false), 1600);
  };

  if (notFound) {
    return (
      <div className={styles.loading}>
        <p>Product not found.</p>
        <Link href="/shop" className={styles.backLinkInline}>Back to shop</Link>
      </div>
    );
  }

  if (!product) return <div className={styles.loading}>Loading...</div>;

  const image = Array.isArray(product.images) ? product.images[0] : null;
  const inStock = Number(product.stock ?? 0) > 0;

  return (
    <div className={styles.container}>
      <Link href="/shop" className={styles.backLink}>Back to shop</Link>

      <section className={styles.gallery}>
        <div className={styles.mainImage}>
          {image ? (
            <Image src={image} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 52vw" className={styles.productImage} />
          ) : (
            <span>{product.name.charAt(0)}</span>
          )}
        </div>
      </section>

      <section className={styles.infoSection}>
        <p className={styles.category}>{product.category} / {product.material}</p>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>Rs. {product.price.toLocaleString()}</p>
        <p className={inStock ? styles.stock : styles.outOfStock}>
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </p>
        <p className={styles.description}>{product.description}</p>

        <button className={`${styles.addToCart} ${added ? styles.added : ""}`} onClick={handleAdd} disabled={!inStock}>
          {!inStock ? "Out of Stock" : added ? "Added" : "Add to Cart"}
        </button>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <h4>Material</h4>
            <p>{product.material}</p>
          </div>
          <div className={styles.detailItem}>
            <h4>Shipping</h4>
            <p>Complimentary shipping on eligible orders. Packed ready for gifting.</p>
          </div>
          <div className={styles.detailItem}>
            <h4>Care</h4>
            <p>Keep dry, store separately, and polish gently with a soft jewellery cloth.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
