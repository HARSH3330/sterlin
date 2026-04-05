"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import Scene2 from "@/components/ui/Scene2";
import Scene3 from "@/components/ui/Scene3";
import Scene4 from "@/components/ui/Scene4";
import Link from "next/link";
import CategorySection from "@/components/ui/CategorySection";
import ProductGrid from "@/components/ui/ProductGrid";


const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sideCategories = [
  { label: "Rings", href: "/womens/rings" },
  { label: "Earrings", href: "/womens/earrings" },
  { label: "Necklaces", href: "/womens/necklaces" },
  { label: "Bracelets", href: "/womens/bracelets" },
];

export default function Home() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title reveal
      gsap.fromTo(
        `.${styles.heroTitle}`,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );
      // Subtitle
      gsap.fromTo(
        `.${styles.heroTagline}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.7 }
      );
      // CTA
      gsap.fromTo(
        `.${styles.heroCta}`,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.0 }
      );
      // Side categories stagger
      gsap.fromTo(
        `.${styles.sideItem}`,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 1.1 }
      );
      // Scroll parallax on title
      gsap.to(`.${styles.heroCenter}`, {
        y: -120, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className={styles.container}>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* Faded large decorative "COLLECTION 2025" text top-left */}
        <span className={styles.heroDecorText}>COLLECTION<br />2025</span>

        {/* 3D Canvas behind everything */}
        <div className={styles.canvasContainer}>
          <HeroCanvas />
        </div>

        {/* Center content */}
        <div className={styles.heroCenter}>
          <p className={styles.heroEyebrow}>
            <span />A celestial touch for timeless moments
          </p>
          <h1 className={styles.heroTitle}>STERLY</h1>
          <p className={styles.heroTagline}>
            Discover exquisite jewellery inspired by<br />
            the beauty of the heavens.
          </p>
          <Link href="/shop" className={styles.heroCta}>
            Discover <span>→</span>
          </Link>
        </div>

        {/* Right side category nav */}
        <nav className={styles.sideNav} aria-label="Category navigation">
          {sideCategories.map((cat) => (
            <Link key={cat.label} href={cat.href} className={styles.sideItem}>
              {cat.label} <span className={styles.sideArrow}>+</span>
            </Link>
          ))}
        </nav>

        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <span />
          <p>Scroll</p>
        </div>
      </section>

      <section className={styles.categorySection}>
        <CategorySection />
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.featuredTitle}>Most Loved Products</h2>
          <p className={styles.featuredDesc}>Our signature pieces, hand-picked for their celestial beauty.</p>
        </div>
        <div className={styles.featuredGrid}>
           <FeaturedProducts />
        </div>
        <div className={styles.featuredFooter}>
          <Link href="/shop" className={styles.viewAllBtn}>View All Collection</Link>
        </div>
      </section>

      <Scene2 />
      <Scene3 />
      <Scene4 />
    </div>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => { setProducts(data.slice(0, 4)); setLoading(false); });
  }, []);

  return <ProductGrid products={products} loading={loading} />;
}

