import Link from "next/link";
import styles from "../shared.module.css";

export const metadata = {
  title: "Corporate & Party Favours | Sterly",
  description: "Bespoke jewellery gifting for corporate events, weddings and party favours — crafted to your brand.",
};

const services = [
  { name: "Corporate Gifting", href: "/corporate/gifting", icon: "🏆" },
  { name: "Bulk Orders", href: "/corporate/bulk", icon: "📦" },
  { name: "Event Favours", href: "/corporate/event-favours", icon: "🎊" },
  { name: "Wedding Favours", href: "/corporate/wedding-favours", icon: "💒" },
  { name: "Branded Packaging", href: "/corporate/packaging", icon: "🎁" },
  { name: "Custom Engraving", href: "/corporate/engraving", icon: "✍️" },
];

export default function CorporatePage() {
  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerContent}>
          <p className={styles.eyebrow}>Bespoke Gifting</p>
          <h1 className={styles.bannerTitle}>Corporate &amp; Party Favours</h1>
          <p className={styles.bannerDesc}>
            Make a lasting impression. We offer bespoke jewellery gifting solutions for corporate clients, event planners and wedding hosts worldwide.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.sectionHeading}>Our Services</p>
        <div className={styles.categoryGrid}>
          {services.map((item) => (
            <Link key={item.name} href={item.href} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{item.icon}</span>
              <span className={styles.categoryName}>{item.name}</span>
              <span className={styles.categoryArrow}>Learn More →</span>
            </Link>
          ))}
        </div>

        <div className={styles.emptyState}>
          <h3>Let's create something together</h3>
          <p>
            Contact our gifting team to discuss your requirements and get a bespoke quote within 48 hours.
          </p>
          <Link href="/about" className={styles.ctaBtn}>Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
