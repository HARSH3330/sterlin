"use client";

import { useWishlist } from '@/hooks/useWishlist';
import { useEffect } from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import Link from 'next/link';
import styles from '../shop/shop.module.css';

export default function WishlistPage() {
  const { items, fetchWishlist, loading } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className={styles.container}>
       <header className={styles.header}>
        <h1 className={styles.title}>My Wishlist</h1>
        <p className={styles.subtitle}>Keep track of your favorite pieces from our collection.</p>
      </header>

      <div className={styles.main}>
        <div className={styles.content} style={{ gridColumn: '1 / -1' }}>
          {items.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
               <p>Your wishlist is empty.</p>
               <Link href="/shop" style={{ textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>Shop Collection</Link>
            </div>
          ) : (
            <ProductGrid products={items} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}
