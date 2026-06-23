import Link from "next/link";
import styles from "../shared.module.css";

export const metadata = {
  title: "New In | Sterly",
  description: "Discover our latest arrivals and newly added jewellery pieces.",
};

const newItems = [
  { name: "Rings", href: "/shop?category=Rings", icon: "01" },
  { name: "Earrings", href: "/shop?category=Earrings", icon: "02" },
  { name: "Necklaces", href: "/shop?category=Necklaces", icon: "03" },
  { name: "Bracelets", href: "/shop?category=Bracelets", icon: "04" },
  { name: "Charms & Amulets", href: "/shop?category=Charms%20%26%20Amulets", icon: "05" },
  { name: "Pendants", href: "/shop?category=Pendants", icon: "06" },
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
            Fresh additions to the collection. Browse the newest pieces by category.
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
              <span className={styles.categoryArrow}>Explore</span>
            </Link>
          ))}
        </div>

        <div className={styles.emptyState}>
          <h3>More pieces arriving soon</h3>
          <p>We are adding fresh designs regularly. Start with the full shop while new drops are prepared.</p>
          <Link href="/shop" className={styles.ctaBtn}>Browse All</Link>
        </div>
      </div>
    </div>
  );
}
