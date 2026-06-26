"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import SidebarMenu from "./SidebarMenu";
import SearchOverlay from "./SearchOverlay";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { toggleCart, getCartCount } = useCart();
  const { user, fetchUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            Sterly<span className="text-gold">+</span>
          </Link>
        </div>

        <div className={styles.links}>
          <Link href="/bestsellers">BESTSELLERS</Link>
          <Link href="/womens">WOMEN&apos;S</Link>
          <Link href="/mens">MEN&apos;S</Link>
          <Link href="/shop">SHOP ALL</Link>
        </div>

        <div className={styles.menu}>
          <button 
            className={styles.searchIcon} 
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          {mounted && user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className={styles.accountLink}>ADMIN</Link>
              )}
              <Link href="/account" className={styles.accountLink}>ACCOUNT</Link>
            </>
          ) : (
            <Link href="/login" className={styles.accountLink}>LOGIN</Link>
          )}

          <button className={styles.cartIcon} onClick={toggleCart}>
            CART {mounted && getCartCount() > 0 && `(${getCartCount()})`}
          </button>
          
          <button className={styles.hamburger} onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <span></span>
            <span></span>
          </button>
        </div>

        <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
