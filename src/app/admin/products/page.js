"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load products');
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(products.filter((product) => product.id !== id));
      return;
    }

    const data = await res.json().catch(() => ({}));
    alert(data.error || 'Failed to delete product');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Admin</p>
          <h1>Manage Products</h1>
        </div>
        <div className={styles.nav}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products/new" className={styles.primaryBtn}>Add Product</Link>
        </div>
      </header>

      <section className={styles.adminPanel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.kicker}>Inventory</p>
            <h2>{products.length} products</h2>
          </div>
          <p className={styles.helperText}>Images, descriptions, stock and pricing in one clean view.</p>
        </div>

        {loading ? (
          <div className={styles.centered}>Loading products...</div>
        ) : error ? (
          <div className={styles.centered}>{error}</div>
        ) : products.length === 0 ? (
          <div className={styles.centered}>No products found.</div>
        ) : (
          <div className={styles.productAdminList}>
            {products.map((product) => {
              const image = Array.isArray(product.images) ? product.images[0] : null;
              const stock = Number(product.stock ?? 0);

              return (
                <article key={product.id} className={styles.productAdminCard}>
                  <div className={styles.productThumb}>
                    {image ? (
                      <Image src={image} alt={product.name} fill sizes="92px" className={styles.productThumbImage} />
                    ) : (
                      <span>{product.name.charAt(0)}</span>
                    )}
                  </div>

                  <div className={styles.productAdminInfo}>
                    <div className={styles.productTitleRow}>
                      <h3>{product.name}</h3>
                      <span className={stock > 0 ? styles.stockBadge : styles.outBadge}>
                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <p className={styles.productDescription}>{product.description || 'No description added.'}</p>
                    <div className={styles.productMeta}>
                      <span>{product.category}</span>
                      <span>{product.material}</span>
                      <strong>Rs. {Number(product.price || 0).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Link href={`/admin/products/${product.id}/edit`} className={styles.editBtn}>Edit</Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={styles.deleteBtn}
                      disabled={product.id.startsWith('catalog-')}
                      title={product.id.startsWith('catalog-') ? 'Catalog image products are managed from the image folders.' : 'Delete product'}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
