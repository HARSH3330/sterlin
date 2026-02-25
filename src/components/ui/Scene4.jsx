"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Scene4.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene4() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text for CTA
      gsap.fromTo(`.${styles.sparkleTitle}`, 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, 
          scale: 1, 
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.${styles.infiniteSparkle}`,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.scene}>
      
      {/* New Arrivals Banner Section */}
      <div className={styles.newArrivals}>
        <div className={styles.naLeft}>
          <div className={styles.modelPlaceholder}></div>
          <div className={styles.decorLine}></div>
        </div>
        
        <div className={styles.naRight}>
          <h2 className={styles.naTitle}>
            Dare to <span className="font-accent">dazzle</span> <br/>
            differently
          </h2>
          <div className={styles.avatars}>
            <div className={styles.avatar1}></div>
            <div className={styles.avatar2}></div>
          </div>
          <p className={styles.naDesc}>Excellent quality gold jewellery that are strongly recommended for you.</p>
        </div>

        <div className={styles.naBottomBar}>
          <div className={styles.newArrivalsText}>New Arrivals <span className={styles.date}>01/2025/FA</span></div>
          <div className={styles.memoriesBox}>
            <h3 className={styles.memoriesTitle}>We're crafting personalised Memories since 1954</h3>
            <a href="/products" className={styles.link}>VIEW COLLECTION →</a>
          </div>
          <div className={styles.earringsCard}>
            <p>Hand-made Earrings</p>
            <p>Creative Design</p>
            <div className={styles.earringImg}></div>
          </div>
        </div>
      </div>

      {/* Infinite Sparkle CTA Section */}
      <div className={styles.infiniteSparkle}>
        <h2 className={styles.sparkleTitle}>Infinite Sparkle <span className="text-gold">+</span></h2>
        
        <div className={styles.sparkleGrid}>
          <div className={styles.sgLeft}>
            <h3 className={styles.brandTitle}>Sterlin<span className="text-gold">+</span></h3>
            <p className={styles.brandSub}>Most Loved Jewellery</p>
            
            <div className={styles.pedestalCard}>
              <div className={styles.pedestal}></div>
              <div className={styles.ring}></div>
            </div>
            
            <p className={styles.footerNote}>
              High quality silver exhibits hence recommended to be cleaned with mild soapy water for shine.
            </p>
          </div>
          
          <div className={styles.sgRight}>
            <div className={styles.largeModelPlaceholder}></div>
            <div className={styles.ctaBox}>
              <h2 className={styles.finalCta}>
                We're best in crafting <br/>
                the best jewellery
              </h2>
              <button className={styles.ctaButton}>
                Find a Store <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
