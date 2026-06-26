"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/products')
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load products');
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to delete product');
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Products</h1>
        <div className={styles.nav}>
           <Link href="/admin">Dashboard</Link>
           <Link href="/admin/products/new" className={styles.primaryBtn}>+ Add Product</Link>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Material</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className={styles.centered}>Loading products...</td></tr>
            ) : error ? (
              <tr><td colSpan="6" className={styles.centered}>{error}</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="6" className={styles.centered}>No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className={styles.productNameCell}>
                    <div className={styles.miniImg}>{product.name.charAt(0)}</div>
                    {product.name}
                  </td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>{product.material}</td>
                  <td>{product.stock ?? 0}</td>
                  <td className={styles.tableActions}>
                    <Link href={`/admin/products/${product.id}/edit`} className={styles.editBtn}>Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
