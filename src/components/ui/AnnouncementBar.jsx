"use client";

import { useState, useEffect } from "react";
import styles from "./AnnouncementBar.module.css";

const messages = [
  "10% OFF on your FIRST order — use code WELCOME10",
  "FREE shipping on orders above ₹5000",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bar}>
      <p className={`${styles.text} ${visible ? styles.textIn : styles.textOut}`}>
        {messages[index]}
      </p>
    </div>
  );
}
