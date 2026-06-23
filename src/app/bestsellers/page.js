import Link from "next/link";
import styles from "../shared.module.css";

export const metadata = {
  title: "Bestsellers | Sterly",
  description: "Our most loved pieces, the Sterly signatures cherished by customers.",
};

const bestsellers = [
  { name: "Rings", href: "/shop?category=Rings", icon: "01" },
  { name: "Earrings", href: "/shop?category=Earrings", icon: "02" },
  { name: "Necklaces", href: "/shop?category=Necklaces", icon: "03" },
  { name: "Bracelets", href: "/shop?category=Bracelets", icon: "04" },
  { name: "Charms & Amulets", href: "/shop?category=Charms%20%26%20Amulets", icon: "05" },
  { name: "Gifting", href: "/shop?category=Gifting", icon: "06" },
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
            The pieces customers return for again and again. Simple, giftable, and easy to style.
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
              <span className={styles.categoryArrow}>Shop Now</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
