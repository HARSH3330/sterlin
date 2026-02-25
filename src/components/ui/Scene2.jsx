"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Scene2.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene2() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for the text
      gsap.fromTo(`.${styles.textContent} > *`, 
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Parallax for the images
      gsap.to(`.${styles.imageCard}`, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.scene}>
      <div className={styles.grid}>
        
        {/* LEFT COMPONENT - Text */}
        <div className={styles.textColumn}>
          <div className={styles.textContent}>
            <div className={styles.avatars}>
              <div className={styles.avatar1}></div>
              <div className={styles.avatar2}></div>
            </div>
            <h2 className={styles.title}>
              Best <span className="font-accent text-gold">Jewellery</span> from <br/>
              the World's best <br/>
              designers.
            </h2>
            <p className={styles.description}>
              Admire the craftsmanship behind every piece in our showroom.
            </p>
            <a href="#" className={styles.link}>LEARN MORE →</a>
          </div>
        </div>

        {/* MIDDLE COMPONENT - Image Card */}
        <div className={styles.imageColumn}>
          <div className={`${styles.imageCard} ${styles.primaryCard}`}>
            <div className={styles.playButtonWrapper}>
              <button className={styles.playButton}>▶</button>
            </div>
            
            {/* Visual placeholder for the model photo */}
            <div className={styles.modelPlaceholder}></div>
            
            <div className={styles.cardLabel}>
              18K GOLD<br/>PLATED
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT - 3D / Object Card */}
        <div className={styles.imageColumn}>
          <div className={`${styles.imageCard} ${styles.secondaryCard}`} style={{ marginTop: "4rem" }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.secondaryTitle}>Handpicked<br/>Designer Jewellery</h3>
              <button className={styles.circleArrow}>↗</button>
            </div>
            <div className={styles.objectPlaceholder}>
              {/* This represents the rocky pedestal and earrings */}
              <div className={styles.rock}></div>
              <div className={styles.earring}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
