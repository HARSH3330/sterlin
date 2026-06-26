"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, getTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className={`${styles.overlay} ${isCartOpen ? styles.open : ""}`} onClick={toggleCart} />
      <aside className={`${styles.drawer} ${isCartOpen ? styles.open : ""}`} aria-label="Cart">
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Bag</p>
            <h2>Your Cart</h2>
          </div>
          <button onClick={toggleCart} className={styles.closeBtn} aria-label="Close cart">x</button>
        </div>

        <div className={styles.itemsList}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
              <button onClick={toggleCart} className={styles.continueShopping}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const image = Array.isArray(item.images) ? item.images[0] : null;

              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    {image ? (
                      <Image src={image} alt={item.name} fill sizes="84px" className={styles.productImage} />
                    ) : (
                      <span>{item.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className={styles.itemDetails}>
                    <h4>{item.name}</h4>
                    <p className={styles.material}>{item.material}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>Remove</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
            <p className={styles.shippingNotice}>Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" className={styles.checkoutBtn} onClick={toggleCart}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
