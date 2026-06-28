"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../admin.module.css';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Rings',
    material: 'Sterling Silver',
    gender: 'women',
    stock: '50',
    imageUrl: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const imageUrl = formData.imageUrl.trim();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      material: formData.material,
      gender: formData.gender,
      stock: parseInt(formData.stock, 10),
      images: imageUrl ? [imageUrl] : [],
      featured: formData.featured,
    };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to save product');
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Inventory</p>
          <h1>New Product</h1>
        </div>
        <Link href="/admin/products" className={styles.navBtn}>Cancel</Link>
      </header>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formIntro}>
          <p className={styles.kicker}>Product Details</p>
          <p>Add a jewellery item with clear pricing, stock and an image path.</p>
        </div>

        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input required value={formData.name} onChange={(event) => updateField('name', event.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea required rows="5" value={formData.description} onChange={(event) => updateField('description', event.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Product Image URL or Path</label>
          <input
            value={formData.imageUrl}
            placeholder="/images/products/ring/ring_001.jpg"
            onChange={(event) => updateField('imageUrl', event.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Price (Rs.)</label>
            <input type="number" min="1" required value={formData.price} onChange={(event) => updateField('price', event.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Stock Quantity</label>
            <input type="number" min="0" required value={formData.stock} onChange={(event) => updateField('stock', event.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={formData.category} onChange={(event) => updateField('category', event.target.value)}>
              <option>Rings</option>
              <option>Earrings</option>
              <option>Necklaces</option>
              <option>Bracelets</option>
              <option>Pendants</option>
              <option>Kids</option>
              <option>Divine</option>
              <option>Gifting</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Material</label>
            <select value={formData.material} onChange={(event) => updateField('material', event.target.value)}>
              <option>Fashion Jewellery</option>
              <option>Sterling Silver</option>
              <option>Mixed Metals</option>
              <option>Gold Plated</option>
              <option>18K Solid Gold</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Gender</label>
            <select value={formData.gender} onChange={(event) => updateField('gender', event.target.value)}>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
              <option value="kids">Kids</option>
            </select>
          </div>
        </div>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={formData.featured} onChange={(event) => updateField('featured', event.target.checked)} />
          Featured Product
        </label>

        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
