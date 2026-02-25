import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "About Us | Sterlin+",
  description: "Sterlin+ has been crafting personalised memories since 1954. Discover our story, values, and commitment to timeless high jewellery.",
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>EST. 1954</p>
        <h1 className={styles.title}>
          Crafting <span className="font-accent text-gold">Memories</span>
          <br />since 1954
        </h1>
        <p className={styles.subtitle}>
          From our first workshop to the world's finest jewellery houses — our
          passion for the art of adornment has never wavered.
        </p>
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.body}>
              Sterlin+ was founded with a single belief: that truly exceptional jewellery
              should be accessible to those who appreciate it. We began as a small atelier
              on the cobblestoned streets of Geneva, where master craftspeople poured
              their lifetimes of skill into every ring, bracelet, and pendant.
            </p>
            <p className={styles.body}>
              Today, our collections travel the globe — but our ethos remains rooted in
              the handcraft traditions of our founding workshop. Every piece carries a
              certificate of authenticity and a lifetime guarantee.
            </p>
          </div>
          <div className={styles.visualBlock}>
            <div className={styles.storyVisual}>
              <div className={styles.ring1}></div>
              <div className={styles.ring2}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitleCenter}>What We Stand For</h2>
        <div className={styles.valuesGrid}>
          {[
            {
              icon: "◈",
              title: "Ethical Sourcing",
              body: "Every gemstone we use is responsibly sourced from certified conflict-free mines. We know where every diamond comes from.",
            },
            {
              icon: "⟡",
              title: "Master Craftsmanship",
              body: "Each piece is handmade by artisans with decades of experience. No mass production, no shortcuts — only precision.",
            },
            {
              icon: "◇",
              title: "Fair Pricing",
              body: "By cutting out retail middlemen, we pass the savings directly to you. World-class jewellery at honest prices.",
            },
            {
              icon: "✦",
              title: "Lifetime Guarantee",
              body: "Every Sterlin+ piece comes with a lifetime guarantee against manufacturing defects. We stand behind our craft forever.",
            },
          ].map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className={styles.statsSection}>
        {[
          { num: "70+", label: "Years of Craftsmanship" },
          { num: "24K+", label: "Pieces Handcrafted" },
          { num: "98%", label: "Customer Satisfaction" },
          { num: "40+", label: "Countries Served" },
        ].map((s) => (
          <div key={s.label} className={styles.statItem}>
            <p className={styles.statNum}>{s.num}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>
          Ready to find your{" "}
          <span className="font-accent text-gold">perfect piece?</span>
        </h2>
        <Link href="/products" className={styles.ctaButton}>
          Explore The Collection <span className={styles.arrow}>↗</span>
        </Link>
      </section>
    </div>
  );
}
