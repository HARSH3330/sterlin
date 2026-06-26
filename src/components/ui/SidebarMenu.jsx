"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import styles from "./SidebarMenu.module.css";

const menuItems = [
  { label: "New In", href: "/new-in" },
  { label: "Bestsellers", href: "/bestsellers" },
  {
    label: "Women's",
    subcategories: [
      {
        section: "Shop By Category",
        links: [
          { label: "Bracelets", href: "/shop?category=Bracelets" },
          { label: "Earrings", href: "/shop?category=Earrings" },
          { label: "Necklaces", href: "/shop?category=Necklaces" },
          { label: "Charms & Amulets", href: "/shop?category=Charms%20%26%20Amulets" },
          { label: "Rings", href: "/shop?category=Rings" },
        ],
      },
      {
        section: "Material",
        links: [
          { label: "Fashion Jewellery", href: "/shop?material=Fashion%20Jewellery" },
          { label: "Sterling silver", href: "/shop?material=Sterling%20Silver" },
          { label: "Mixed metals", href: "/shop?material=Mixed%20Metals" },
        ],
      },
    ],
  },
  {
    label: "Men's",
    subcategories: [
      {
        section: "Shop By Category",
        links: [
          { label: "Bracelets", href: "/shop?category=Bracelets" },
          { label: "Earrings", href: "/shop?category=Earrings" },
          { label: "Necklaces", href: "/shop?category=Necklaces" },
          { label: "Rings", href: "/shop?category=Rings" },
          { label: "Pendants", href: "/shop?category=Pendants" },
          { label: "Accessories", href: "/shop?category=Accessories" },
        ],
      },
      {
        section: "Material",
        links: [
          { label: "Fashion Jewellery", href: "/shop?material=Fashion%20Jewellery" },
          { label: "Sterling Silver", href: "/shop?material=Sterling%20Silver" },
          { label: "Mixed Metals", href: "/shop?material=Mixed%20Metals" },
        ],
      },
    ],
  },
  { label: "Kids", href: "/kids" },
  { label: "Divine", href: "/divine" },
  {
    label: "Gifts",
    subcategories: [
      {
        section: "Shop By Category",
        links: [
          { label: "For Her", href: "/shop?category=Gifting" },
          { label: "For Him", href: "/shop?category=Gifting" },
          { label: "For Home", href: "/shop?category=Gifting" },
          { label: "Bride-to-be", href: "/shop?category=Gifting" },
          { label: "Bridesmaids", href: "/shop?category=Gifting" },
          { label: "Groomsman", href: "/shop?category=Gifting" },
          { label: "Baby", href: "/shop?category=Gifting" },
        ],
      },
    ],
  },
  { label: "Shop All", href: "/shop" },
  { label: "Corporate / Party Favours", href: "/corporate" },
  { label: "Collections", href: "/collections" },
];

export default function SidebarMenu({ isOpen, onClose }) {
  const [openItems, setOpenItems] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleAccordion = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2>Menu</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.menuContainer}>
          <ul className={styles.menuList}>
            {menuItems.map((item, i) => (
              <li key={i} className={styles.menuItemWrapper}>
                {item.subcategories ? (
                  <div className={styles.accordionGroup}>
                    <button
                      className={`${styles.menuLink} ${styles.accordionBtn} ${openItems[i] ? styles.accordionOpen : ""}`}
                      onClick={() => toggleAccordion(i)}
                    >
                      {item.label}
                      <span className={styles.icon}>
                        {openItems[i] ? "-" : "+"}
                      </span>
                    </button>
                    
                    <div className={`${styles.subCategories} ${openItems[i] ? styles.subCategoriesOpen : ""}`}>
                      {item.subcategories.map((sub, j) => (
                        <div key={j} className={styles.subCategorySection}>
                          {sub.section && <h3>{sub.section}</h3>}
                          <ul className={styles.subCategoryLinks}>
                            {sub.links.map((link, k) => (
                              <li key={k}>
                                <Link href={link.href} onClick={onClose}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} className={styles.menuLink} onClick={onClose}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            
            {user?.role === 'admin' && (
              <li className={styles.menuItemWrapper}>
                <Link 
                  href="/admin" 
                  className={`${styles.menuLink} ${styles.adminLink}`} 
                  onClick={onClose}
                  style={{ color: '#d4af37', fontWeight: 'bold', borderTop: '1px solid #333', marginTop: '10px', paddingTop: '10px' }}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
