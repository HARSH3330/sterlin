import Link from "next/link";
import styles from "../shared.module.css";

export const metadata = {
  title: "New In | Sterly",
  description: "Discover our latest arrivals — freshly crafted pieces from the world's finest artisans.",
};

const newItems = [
  { name: "Rings", href: "/womens/rings", icon: "💍" },
  { name: "Earrings", href: "/womens/earrings", icon: "✨" },
  { name: "Necklaces", href: "/womens/necklaces", icon: "📿" },
  { name: "Bracelets", href: "/womens/bracelets", icon: "⭕" },
  { name: "Charms & Amulets", href: "/womens/charms-amulets", icon: "🌙" },
  { name: "Pendants", href: "/mens/pendants", icon: "🔶" },
];

export default function NewInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerContent}>
          <p className={styles.eyebrow}>Just Arrived</p>
          <h1 className={styles.bannerTitle}>New In</h1>
          <p className={styles.bannerDesc}>
            The freshest additions to our collection. Explore pieces inspired by celestial beauty and timeless elegance.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.sectionHeading}>Shop By Category</p>
        <div className={styles.categoryGrid}>
          {newItems.map((item) => (
            <Link key={item.name} href={item.href} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{item.icon}</span>
              <span className={styles.categoryName}>{item.name}</span>
              <span className={styles.categoryArrow}>Explore →</span>
            </Link>
          ))}
        </div>

        <div className={styles.emptyState}>
          <h3>More pieces arriving soon</h3>
          <p>
            Our artisans are crafting the next collection. Sign up to be the first to know when new pieces drop.
          </p>
          <Link href="/shop" className={styles.ctaBtn}>Browse All →</Link>
        </div>
      </div>
    </div>
  );
}
