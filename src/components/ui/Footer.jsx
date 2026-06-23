"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Shipping", href: "/about#shipping" },
  { label: "Returns", href: "/about#returns" },
  { label: "FAQs", href: "/about#faqs" },
  { label: "Contact", href: "/about#contact" },
];

const shopLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Shop All", href: "/shop" },
  { label: "Women", href: "/womens" },
  { label: "Men", href: "/mens" },
  { label: "Gifting", href: "/gifts" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>Sterly+</Link>
          <p>Everyday sterling silver pieces for gifting, styling, and daily wear.</p>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Shop</p>
          <ul>
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Help</p>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Sterly Jewellery. All rights reserved.</span>
        <div className={styles.socials}>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Pinterest">PT</a>
          <a href="#" aria-label="Twitter">TW</a>
        </div>
      </div>
    </footer>
  );
}
