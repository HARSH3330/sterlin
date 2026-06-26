"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.title}>Your Bag is Empty</h1>
        <p className={styles.subtitle}>Add a piece you love and it will appear here.</p>
        <Link href="/shop" className={styles.continueBtn}>Shop Collection</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Bag</h1>
      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => {
            const image = Array.isArray(item.images) ? item.images[0] : null;

            return (
              <div key={item.id} className={styles.item}>
                <div className={styles.imagePlaceholder}>
                  {image ? (
                    <Image src={image} alt={item.name} fill sizes="120px" className={styles.itemImage} />
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemMaterial}>{item.material}</p>
                  <div className={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className={styles.priceSection}>
                  <p className={styles.itemPrice}>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.row}>
              <span>Subtotal</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
            <div className={styles.row}>
              <span>Shipping</span>
              <span className={styles.free}>Complimentary</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutBtn}>Proceed to Checkout</Link>
            <p className={styles.secureNotice}>Secure SSL Checkout</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
