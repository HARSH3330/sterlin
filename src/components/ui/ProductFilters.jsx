"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductFilters.module.css';

export default function ProductFilters({ categories, materials }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentCategory = searchParams.get('category') || '';
  const currentMaterial = searchParams.get('material') || '';

  return (
    <aside className={styles.filters}>
      <div className={styles.section}>
        <h4 className={styles.heading}>Category</h4>
        <ul className={styles.list}>
          <li>
            <button 
              className={currentCategory === '' ? styles.active : ''} 
              onClick={() => handleFilterChange('category', '')}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button 
                className={currentCategory === cat ? styles.active : ''} 
                onClick={() => handleFilterChange('category', cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4 className={styles.heading}>Material</h4>
        <ul className={styles.list}>
          <li>
            <button 
              className={currentMaterial === '' ? styles.active : ''} 
              onClick={() => handleFilterChange('material', '')}
            >
              All Materials
            </button>
          </li>
          {materials.map((mat) => (
            <li key={mat}>
              <button 
                className={currentMaterial === mat ? styles.active : ''} 
                onClick={() => handleFilterChange('material', mat)}
              >
                {mat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4 className={styles.heading}>Clear All</h4>
        <button className={styles.clearBtn} onClick={() => router.replace(pathname)}>
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
