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
  const containerRef = useRef();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.slice(0, 4));
        }
      } catch (e) {
        console.error("Failed to load products for homepage", e);
      }
    }
    fetchProducts();
  }, []);

  // Simple fade-in on scroll — no pin, no scrub, no horizontal scroll jank
  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.productCard}`,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={containerRef} className={styles.scene}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          New <span className="font-accent text-gold">jewellery</span> collections
        </h2>
        <a href="/products" className={styles.link}>
          VIEW COLLECTION <span className={styles.circleArrow}>↗</span>
        </a>
      </div>

      {/* Native CSS scroll-snap — GPU-accelerated, zero JS scroll cost */}
      <div className={styles.scrollContainer}>
        <div className={styles.cardsWrapper}>
          {products.map((p) => (
            <Link
              href={`/products/${p.id}`}
              key={p.id}
              className={styles.productCard}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.cardTag}>{p.category}</div>
              <div className={styles.imagePlaceholder}>
                <div className={styles.jewel}></div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardName}>{p.name}</h3>
                  <p className={styles.cardPrice}>${p.price.toFixed(2)}</p>
                </div>
                <button className={styles.addButton}>+</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
