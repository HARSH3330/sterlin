"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./CategorySection.module.css";

const categories = [
  {
    label: "New In",
    href: "/new-in",
    image: "/images/new_in.jpeg",
  },
  {
    label: "For Her",
    href: "/womens",
    image: "/images/for_her.jpeg",
  },
  {
    label: "For Him",
    href: "/mens",
    image: "/images/for_him.jpeg",
  },
  {
    label: "Gifting",
    href: "/gifts",
    image: "/images/gifting.jpeg",
  },
];

export default function CategorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat.label} href={cat.href} className={styles.card}>
            <div className={styles.cardBg}>
              <Image 
                src={cat.image} 
                alt={cat.label} 
                fill 
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Shimmer overlay */}
            <div className={styles.shimmer} />
            <div className={styles.overlay} />
            <span className={styles.label}>{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
