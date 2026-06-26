"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchOverlay.module.css';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) return;

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.slice(0, 5));
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            autoFocus
            type="text"
            placeholder="Search celestial pieces..."
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!e.target.value.trim()) setResults([]);
            }}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">x</button>
        </div>

        <div className={styles.results}>
          {loading && <p className={styles.loading}>Searching...</p>}
          
          {results.length > 0 && (
            <div className={styles.grid}>
              {results.map((product) => (
                <div 
                  key={product.id} 
                  className={styles.resultItem}
                  onClick={() => {
                    router.push(`/products/${product.id}`);
                    onClose();
                  }}
                >
                  <div className={styles.miniImg}>{product.name.charAt(0)}</div>
                  <div className={styles.info}>
                    <h4>{product.name}</h4>
                    <p>Rs. {product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <button 
                className={styles.allBtn}
                onClick={() => {
                  router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                  onClose();
                }}
              >
                View all results for &quot;{query}&quot;
              </button>
            </div>
          )}

          {query && !loading && results.length === 0 && (
            <p className={styles.noResults}>No matches found for &quot;{query}&quot;</p>
          )}
        </div>
      </div>
    </div>
  );
}
