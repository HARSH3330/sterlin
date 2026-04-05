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
          { label: "Bracelets", href: "/womens/bracelets" },
          { label: "Earrings", href: "/womens/earrings" },
          { label: "Necklaces", href: "/womens/necklaces" },
          { label: "Charms & Amulets", href: "/womens/charms-amulets" },
          { label: "Rings", href: "/womens/rings" },
        ],
      },
      {
        section: "Material",
        links: [
          { label: "Sterling silver", href: "/womens/sterling-silver" },
          { label: "Mixed metals", href: "/womens/mixed-metals" },
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
          { label: "Bracelets", href: "/mens/bracelets" },
          { label: "Earrings", href: "/mens/earrings" },
          { label: "Necklaces", href: "/mens/necklaces" },
          { label: "Rings", href: "/mens/rings" },
          { label: "Pendants", href: "/mens/pendants" },
          { label: "Accessories", href: "/mens/accessories" },
        ],
      },
      {
        section: "Material",
        links: [
          { label: "Sterling Silver", href: "/mens/sterling-silver" },
          { label: "Mixed Metals", href: "/mens/mixed-metals" },
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
          { label: "For Her", href: "/gifts/for-her" },
          { label: "For Him", href: "/gifts/for-him" },
          { label: "For Home", href: "/gifts/for-home" },
          { label: "Bride-to-be", href: "/gifts/bride-to-be" },
          { label: "Bridesmaids", href: "/gifts/bridesmaids" },
          { label: "Groomsman", href: "/gifts/groomsman" },
          { label: "Baby", href: "/gifts/baby" },
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
                        {openItems[i] ? "−" : "+"}
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
