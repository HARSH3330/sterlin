"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { toggleCart, getCartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          Sterlin<span className="text-gold">+</span>
        </Link>
      </div>
      
      <div className={styles.links}>
        <Link href="/brands">BRANDS</Link>
        <Link href="/inspiration">INSPIRATION</Link>
        <Link href="/products">SHOP</Link>
        <Link href="/about">ABOUT US</Link>
      </div>
      
      <div className={styles.menu}>
        <button className={styles.cartIcon} onClick={toggleCart}>
          CART {mounted && getCartCount() > 0 && `(${getCartCount()})`}
        </button>
        <button className={styles.hamburger}>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
