import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Inspiration | Sterlin+",
  description: "Style guides, jewellery care tips, and editorial stories — the Sterlin+ inspiration journal.",
};

const articles = [
  {
    id: 1,
    tag: "STYLE GUIDE",
    title: "How to Layer Necklaces Like a Pro",
    excerpt: "The art of necklace layering is all about contrast — mixing chains of different lengths, textures, and weights to create a curated yet effortless look.",
    readTime: "4 min read",
    accent: "var(--gold-primary)",
  },
  {
    id: 2,
    tag: "CARE GUIDE",
    title: "Keeping Your Gold Jewellery Brilliant",
    excerpt: "Gold is timeless, but it needs care. Learn how to clean, store, and protect your 18K pieces so they shine as brightly as the day you received them.",
    readTime: "3 min read",
    accent: "#c9a84c",
  },
  {
    id: 3,
    tag: "EDITORIAL",
    title: "The Return of the Statement Ring",
    excerpt: "Bold, sculptural, unapologetic — the statement ring is back. We explore the cultural moment behind this renaissance of maximalist fine jewellery.",
    readTime: "6 min read",
    accent: "#d4af37",
  },
  {
    id: 4,
    tag: "TREND REPORT",
    title: "2025's Most Coveted Jewellery Trends",
    excerpt: "From organic forms inspired by nature to architectural geometric cuts — the jewellery trends shaping the year ahead, curated by our creative team.",
    readTime: "5 min read",
    accent: "#f3e5ab",
  },
  {
    id: 5,
    tag: "CARE GUIDE",
    title: "Storing Your Jewellery the Right Way",
    excerpt: "Tangled chains, scratched gems — poor storage is the silent enemy of fine jewellery. Here's how to store each type of piece to maximise its longevity.",
    readTime: "3 min read",
    accent: "#996515",
  },
  {
    id: 6,
    tag: "STYLE GUIDE",
    title: "The Perfect Ring Stack for Every Hand",
    excerpt: "Ring stacking is deeply personal. We break down the principles of balance, proportion, and meaning to help you build a stack that's uniquely yours.",
    readTime: "5 min read",
    accent: "#c9a84c",
  },
];

export default function InspirationPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>THE JOURNAL</p>
        <h1 className={styles.title}>
          <span className="font-accent text-gold">Inspiration</span>
        </h1>
        <p className={styles.subtitle}>
          Style guides, care rituals, and editorial stories for the jewellery lover.
        </p>
      </header>

      {/* Featured Article */}
      <div className={styles.featured}>
        <div className={styles.featuredVisual}>
          <div className={styles.featuredRing}></div>
        </div>
        <div className={styles.featuredContent}>
          <span className={styles.featuredTag}>FEATURED</span>
          <h2 className={styles.featuredTitle}>
            The History of the Engagement Ring: From Ancient Egypt to Modern Minimalism
          </h2>
          <p className={styles.featuredExcerpt}>
            The story of the engagement ring is the story of love, power, and the
            inexhaustible human desire to mark a moment with something beautiful. We
            trace 5,000 years of ring-giving tradition and how it shapes the pieces
            we make today.
          </p>
          <div className={styles.featuredMeta}>
            <span>EDITORIAL</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className={styles.grid}>
        {articles.map((article) => (
          <article key={article.id} className={styles.articleCard}>
            <div
              className={styles.articleVisual}
              style={{ "--accent": article.accent }}
            >
              <div className={styles.articleShape}></div>
            </div>
            <div className={styles.articleContent}>
              <div className={styles.articleMeta}>
                <span className={styles.articleTag}>{article.tag}</span>
                <span className={styles.readTime}>{article.readTime}</span>
              </div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
              <button className={styles.readMore}>Read More →</button>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className={styles.newsletter}>
        <h2 className={styles.newsletterTitle}>
          Never Miss a <span className="font-accent text-gold">Story</span>
        </h2>
        <p className={styles.newsletterSub}>
          Join 24,000+ jewellery lovers who receive our bi-monthly journal.
        </p>
        <div className={styles.emailForm}>
          <input
            type="email"
            placeholder="your@email.com"
            className={styles.emailInput}
          />
          <button className={styles.subscribeBtn}>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
}
