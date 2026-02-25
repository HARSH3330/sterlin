"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import Scene2 from "@/components/ui/Scene2";
import Scene3 from "@/components/ui/Scene3";
import Scene4 from "@/components/ui/Scene4";

// Lazy-load the 3D canvas – Three.js is large; this creates a separate chunk
// and skips SSR entirely (WebGL is not available server-side)
const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => null, // render nothing while 3D loads – text appears instantly
});

// Register ScrollTrigger only on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.heroText}`, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* SCENE 1: THE HERO */}
      <section className={styles.hero}>
        <div className={styles.heroTextWrapper}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>EXQUISITE CRAFTSMANSHIP</p>
            <h1 className={styles.title}>
              <span className="font-accent">Unleash</span> the <br />
              shining <span className={styles.spacer}> </span> beauty
            </h1>
            <div className={styles.ctaWrapper}>
              <button className={styles.ctaButton}>
                Find a Store <span className={styles.arrow}>↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lazy-loaded 3D Canvas */}
        <div className={styles.canvasContainer}>
          <HeroCanvas />
        </div>

        <div className={styles.heroCard}>
          <p className={styles.cardEyebrow}>Premium Grade</p>
          <p className={styles.cardTitle}>Gold Plated Ring</p>
          <div className={styles.cardImagePlaceholder}>
            <div className={styles.ringBox}></div>
          </div>
        </div>
      </section>

      <Scene2 />
      <Scene3 />
      <Scene4 />
    </div>
  );
}
