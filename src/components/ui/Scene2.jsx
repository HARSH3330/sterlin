"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Scene2.module.css";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { label: "Earrings", href: "/womens/earrings", desc: "Celestial drops & sculptural hoops", tag: "NEW" },
  { label: "Bracelets", href: "/womens/bracelets", desc: "Stacks for every story", tag: "BESTSELLER" },
];

export default function Scene2() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Side text fade
      gsap.fromTo(
        `.${styles.bgWord}`,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      // Cards stagger in
      gsap.fromTo(
        `.${styles.catCard}`,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scene}>
      {/* Faded background words */}
      <span className={styles.bgWord}>EARRINGS</span>
      <span className={`${styles.bgWord} ${styles.bgWordRight}`}>BRACELETS</span>

      <div className={styles.inner}>
        {/* Section label */}
        <div className={styles.label}>
          <span />
          <p>Category Highlights</p>
        </div>

        {/* Asymmetric category grid */}
        <div className={styles.catGrid}>
          {categories.map((cat, i) => (
            <Link href={cat.href} key={cat.label} className={`${styles.catCard} ${i === 1 ? styles.catCardOffset : ""}`}>
              {/* Image placeholder — elevated cream block */}
              <div className={styles.catImg}>
                <div className={styles.catImgInner} />
                <span className={styles.catTag}>{cat.tag}</span>
              </div>
              <div className={styles.catInfo}>
                <h2 className={styles.catName}>{cat.label} →</h2>
                <p className={styles.catDesc}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
