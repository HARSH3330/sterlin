"use client";

import { useCart } from "@/hooks/useCart";
import styles from "./CartDrawer.module.css";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, getTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className={`${styles.overlay} ${isCartOpen ? styles.open : ""}`} 
        onClick={toggleCart}
      />
      <div className={`${styles.drawer} ${isCartOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button onClick={toggleCart} className={styles.closeBtn}>✕</button>
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
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}></div>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p className={styles.material}>{item.material}</p>
                  
                  <div className={styles.quantityControls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <p className={styles.shippingNotice}>Shipping & taxes calculated at checkout.</p>
            <button className={styles.checkoutBtn}>PROCEED TO CHECKOUT</button>
          </div>
        )}
      </div>
    </>
  );
}
