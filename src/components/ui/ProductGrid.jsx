"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, loading }) {
  const { addItem, toggleCart } = useCart();

  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPrice} />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const image = Array.isArray(product.images) ? product.images[0] : null;

        return (
          <div key={product.id} className={styles.productCard}>
            <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
              {product.isNew && <span className={styles.badge}>New</span>}
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.placeholderImg}>{product.name.charAt(0)}</div>
              )}
            </Link>

            <div className={styles.productInfo}>
              <Link href={`/products/${product.id}`}>
                <h3 className={styles.productName}>{product.name}</h3>
              </Link>
              <div className={styles.metaRow}>
                <p className={styles.material}>{product.material}</p>
                <p className={styles.price}>Rs. {product.price.toLocaleString()}</p>
              </div>
              <button
                className={styles.addToCart}
                onClick={() => {
                  addItem(product);
                  toggleCart();
                }}
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
