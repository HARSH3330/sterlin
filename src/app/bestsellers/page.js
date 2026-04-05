import Link from "next/link";
import styles from "../shared.module.css";

export const metadata = {
  title: "Bestsellers | Sterly",
  description: "Our most loved pieces — the Sterly signatures cherished by thousands.",
};

const bestsellers = [
  { name: "Rings", href: "/womens/rings", icon: "💍" },
  { name: "Earrings", href: "/womens/earrings", icon: "✨" },
  { name: "Necklaces", href: "/womens/necklaces", icon: "📿" },
  { name: "Bracelets", href: "/womens/bracelets", icon: "⭕" },
  { name: "Charms & Amulets", href: "/womens/charms-amulets", icon: "🌙" },
  { name: "Men's Bracelets", href: "/mens/bracelets", icon: "🔗" },
];

export default function BestsellersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerContent}>
          <p className={styles.eyebrow}>Most Loved</p>
          <h1 className={styles.bannerTitle}>Bestsellers</h1>
          <p className={styles.bannerDesc}>
            The pieces our customers return for again and again. Timeless designs, exceptional craft.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.sectionHeading}>Top Categories</p>
        <div className={styles.categoryGrid}>
          {bestsellers.map((item) => (
            <Link key={item.name} href={item.href} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{item.icon}</span>
              <span className={styles.categoryName}>{item.name}</span>
              <span className={styles.categoryArrow}>Shop Now →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
