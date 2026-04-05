"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Materials", href: "/about#materials" },
  { label: "Sustainability", href: "/about#sustainability" },
  { label: "Shipping & Returns", href: "/about#shipping" },
  { label: "FAQs", href: "/about#faqs" },
  { label: "Contact Us", href: "/about#contact" },
];

const shopLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Rings", href: "/womens/rings" },
  { label: "Earrings", href: "/womens/earrings" },
  { label: "Necklaces", href: "/womens/necklaces" },
  { label: "Bracelets", href: "/womens/bracelets" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Brand name — large faded style */}
      <div className={styles.brandWrap}>
        <span className={styles.brandBig}>STERLY</span>
      </div>

      {/* Footer content row */}
      <div className={styles.content}>
        <div className={styles.col}>
          <p className={styles.colLabel}>Navigate</p>
          <ul>
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.centerCol}>
          <p className={styles.tagline}>
            A celestial touch<br />
            <em>for timeless moments.</em>
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Company</p>
          <ul>
            {footerLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Sterly Jewellery. All rights reserved.</span>
        <div className={styles.socials}>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Pinterest">PT</a>
          <a href="#" aria-label="Twitter">TW</a>
        </div>
      </div>
    </footer>
  );
}
