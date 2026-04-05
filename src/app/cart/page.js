"use client";

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.title}>Your Bag is Empty</h1>
        <p className={styles.subtitle}>Looks like you haven't added any celestial pieces yet.</p>
        <Link href="/shop" className={styles.continueBtn}>Discover Collection</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Bag</h1>
      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.imagePlaceholder}>{item.name.charAt(0)}</div>
              <div className={styles.info}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemMaterial}>{item.material}</p>
                <div className={styles.controls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className={styles.priceSection}>
                <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.row}>
              <span>Subtotal</span>
              <span>₹{getTotal().toLocaleString()}</span>
            </div>
            <div className={styles.row}>
              <span>Shipping</span>
              <span className={styles.free}>Complimentary</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>₹{getTotal().toLocaleString()}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutBtn}>Proceed to Checkout</Link>
            <p className={styles.secureNotice}>🔒 Secure SSL Checkout</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
