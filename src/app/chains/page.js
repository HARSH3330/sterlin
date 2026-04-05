import Link from "next/link";
import styles from "../brands/page.module.css";

export const metadata = {
  title: "Chains | Sterlin Jewellery",
  description: "Explore our collection of sterling silver chains — everyday essentials and statement pieces for every style.",
};

export default function ChainsPage() {
  return (
    <main style={{ paddingTop: "90px", minHeight: "80vh", background: "#fff" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#888", marginBottom: "1.2rem" }}>
          Collection
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 400, color: "#0A0A0A", marginBottom: "1.5rem" }}>
          Chains
        </h1>
        <p style={{ color: "#555", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
          From delicate everyday links to bold statement chains — crafted in sterling silver for lasting wear.
        </p>
        <Link
          href="/shop"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.8rem 2rem",
            border: "1px solid #0A0A0A",
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0A0A0A",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          Browse All Jewellery →
        </Link>
      </div>
    </main>
  );
}
