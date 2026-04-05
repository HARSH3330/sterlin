"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Scene3.module.css";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene3() {
  const sectionRef = useRef();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Rings", "Earrings", "Necklaces", "Bracelets"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?featured=true");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.slice(0, 6));
        }
      } catch (e) {
        console.error("Failed to load products", e);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [products]);

  const filtered =
    activeTab === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <section ref={sectionRef} className={styles.scene}>
      {/* Section heading with large faded text */}
      <div className={styles.headingWrap}>
        <span className={styles.bgText}>OUR PRODUCTS</span>
        <div className={styles.headingContent}>
          <div className={styles.label}>
            <span />
            <p>Curated Pieces</p>
          </div>
          <h2 className={styles.heading}>
            Our Most Loved <em>Creations</em>
          </h2>
          <Link href="/products" className={styles.viewAll}>
            View All →
          </Link>
        </div>
      </div>

      {/* Category tabs */}
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className={styles.grid}>
        {(filtered.length ? filtered : products).map((p, i) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className={`${styles.card} ${i === 1 ? styles.cardTall : ""}`}
          >
            <div className={styles.imgWrap}>
              <div className={styles.imgInner} />
              <div className={styles.imgOverlay}>
                <span>Quick View</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardMeta}>{p.category} · 18k Gold</p>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardPrice}>${p.price?.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
