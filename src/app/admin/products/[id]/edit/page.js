"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from '../../../admin.module.css';

export default function EditProductPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Rings',
    material: 'Sterling Silver',
    gender: 'women',
    featured: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
          material: data.material,
          gender: data.gender || 'women',
          featured: data.featured
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      featured: formData.featured ? 1 : 0
    };

    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to update product');
    }
    setSaving(false);
  };

  if (loading) return <div className={styles.centered}>Loading product data...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Edit Piece</h1>
        <Link href="/admin/products" className={styles.navBtn}>Cancel</Link>
      </header>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea 
            required 
            rows="5"
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Price (₹)</label>
            <input 
              type="number" 
              required 
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})} 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
             <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
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
        </div>
        <div className={styles.row}>
           <div className={styles.formGroup}>
            <label>Material</label>
             <select 
              value={formData.material} 
              onChange={e => setFormData({...formData, material: e.target.value})}
            >
              <option>Sterling Silver</option>
              <option>Mixed Metals</option>
              <option>Gold Plated</option>
              <option>18K Solid Gold</option>
            </select>
          </div>
           <div className={styles.formGroup}>
            <label>Gender</label>
             <select 
              value={formData.gender} 
              onChange={e => setFormData({...formData, gender: e.target.value})}
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
              <option value="kids">Kids</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={formData.featured} 
              onChange={e => setFormData({...formData, featured: e.target.checked})} 
            />
            Featured Product
          </label>
        </div>

        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Update Piece'}
        </button>
      </form>
    </div>
  );
}
