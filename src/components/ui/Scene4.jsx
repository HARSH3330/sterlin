"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Scene4.module.css";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene4() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large "ABOUT US" background text slides in
      gsap.fromTo(
        `.${styles.bgAbout}`,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.aboutBlock}`, start: "top 70%" },
        }
      );
      // Text block fades up
      gsap.fromTo(
        `.${styles.aboutText} > *`,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: `.${styles.aboutBlock}`, start: "top 65%" },
        }
      );
      // Image parallax
      gsap.to(`.${styles.modelImg}`, {
        y: -40, ease: "none",
        scrollTrigger: {
          trigger: `.${styles.aboutBlock}`,
          start: "top bottom", end: "bottom top", scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scene}>

      {/* ── ABOUT US ──────────────────────────────────────────── */}
      <div className={styles.aboutBlock}>
        {/* Large faded background text */}
        <span className={styles.bgAbout}>ABOUT<br />US</span>

        <div className={styles.aboutGrid}>
          {/* Text side */}
          <div className={styles.aboutText}>
            <div className={styles.label}>
              <span />
              <p>Our Story</p>
            </div>
            <p className={styles.aboutParagraph}>
              At Sterly, we believe that jewellery is more than just an accessory. It&apos;s a timeless expression of elegance and a celebration of life&apos;s most precious moments. With a legacy spanning over decades, our brand has become synonymous with exceptional craftsmanship and sophistication.
            </p>
            <p className={styles.aboutParagraph}>
              We carefully select the finest materials — precious metals, sparkling gemstones, and luxurious pearls — to create each piece. Every design is meticulously crafted by skilled artisans, ensuring that each item is not only beautiful but built to last.
            </p>
            <p className={styles.aboutParagraph}>
              Whether you&apos;re celebrating love, marking a special occasion, or simply treating yourself, we invite you to explore Sterly&apos;s collection and experience the celestial elegance that defines us.
            </p>
            <Link href="/about" className={styles.moreBtn}>
              More About Us →
            </Link>
          </div>

          {/* Image side — overlapping card */}
          <div className={styles.aboutImgCol}>
            <div className={styles.modelImg} />
            {/* Overlapping accent card */}
            <div className={styles.accentCard}>
              <p className={styles.accentYear}>Est. 1954</p>
              <p className={styles.accentTag}>Craftsmanship<br />beyond compare</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
