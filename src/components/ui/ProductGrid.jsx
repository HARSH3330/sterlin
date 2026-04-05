"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import styles from './ProductGrid.module.css';

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
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
            {product.isNew && <span className={styles.badge}>New In</span>}
            <div className={styles.imageContainer}>
              {/* Using a placeholder if no images exist */}
              <div className={styles.placeholderImg}>
                {product.name.charAt(0)}
              </div>
            </div>
          </Link>
          <div className={styles.productInfo}>
            <Link href={`/products/${product.id}`}>
              <h3 className={styles.productName}>{product.name}</h3>
            </Link>
            <p className={styles.material}>{product.material}</p>
            <p className={styles.price}>₹{product.price.toLocaleString()}</p>
            <button 
              className={styles.addToCart} 
              onClick={() => {
                addItem(product);
                toggleCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
