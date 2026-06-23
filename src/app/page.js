"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import CategorySection from "@/components/ui/CategorySection";
import ProductGrid from "@/components/ui/ProductGrid";

const heroTiles = [
  { label: "New In", href: "/new-in", image: "/images/new_in.jpeg" },
  { label: "For Her", href: "/womens", image: "/images/for_her.jpeg" },
  { label: "For Him", href: "/mens", image: "/images/for_him.jpeg" },
];

const quickLinks = [
  { label: "Rings", href: "/shop?category=Rings" },
  { label: "Earrings", href: "/shop?category=Earrings" },
  { label: "Necklaces", href: "/shop?category=Necklaces" },
  { label: "Bracelets", href: "/shop?category=Bracelets" },
  { label: "Gifting", href: "/gifts" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero} aria-label="Sterly featured collections">
        <div className={styles.heroGrid}>
          {heroTiles.map((tile, index) => (
            <Link
              key={tile.label}
              href={tile.href}
              className={`${styles.heroTile} ${index === 0 ? styles.heroTileLarge : ""}`}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                priority={index === 0}
                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className={styles.heroImage}
              />
              <span>{tile.label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.heroIntro}>
          <p className={styles.kicker}>Sterling silver jewellery</p>
          <h1>STERLY</h1>
          <p>Clean everyday pieces, statement gifts, and occasion-ready silver.</p>
          <div className={styles.heroActions}>
            <Link href="/shop">Shop all</Link>
            <Link href="/new-in">New arrivals</Link>
          </div>
        </div>
      </section>

      <nav className={styles.quickLinks} aria-label="Popular categories">
        {quickLinks.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <CategorySection />

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Most loved</p>
          <h2>Shop The Edit</h2>
          <Link href="/shop">View all</Link>
        </div>
        <FeaturedProducts />
      </section>

      <section className={styles.lookbook}>
        <Image
          src="/images/gifting.jpeg"
          alt="Sterly gifting collection"
          fill
          sizes="100vw"
          className={styles.lookbookImage}
        />
        <div className={styles.lookbookContent}>
          <p className={styles.kicker}>Ready to gift</p>
          <h2>Small boxes, lasting moments.</h2>
          <Link href="/gifts">Explore gifts</Link>
        </div>
      </section>
    </div>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return <ProductGrid products={products} loading={loading} />;
}
