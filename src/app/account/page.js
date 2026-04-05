"use client";

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import styles from './account.module.css';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => { setOrders(data); setLoading(false); });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Hello, {user.name}</h1>
          <p className={styles.email}>{user.email}</p>
        </div>
        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
      </header>

      <div className={styles.layout}>
        <section className={styles.section}>
          <h2 className={styles.heading}>Your Orders</h2>
          <div className={styles.ordersList}>
            {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
               <div className={styles.empty}>
                 <p>You haven't placed any orders yet.</p>
                 <Link href="/shop" className={styles.shopBtn}>Explore Collection</Link>
               </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span>Order #{order.id.slice(0, 8)}</span>
                    <span className={styles.status}>{order.status}</span>
                  </div>
                  <div className={styles.orderBody}>
                    <p>{JSON.parse(order.items).length} items</p>
                    <p className={styles.total}>Total: ₹{order.total.toLocaleString()}</p>
                  </div>
                  <div className={styles.orderFooter}>
                    <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={styles.section}>
           <h2 className={styles.heading}>Account Actions</h2>
           <div className={styles.actionLinks}>
             <Link href="/wishlist">My Wishlist</Link>
             {user.role === 'admin' && <Link href="/admin">Admin Dashboard</Link>}
           </div>
        </section>
      </div>
    </div>
  );
}
