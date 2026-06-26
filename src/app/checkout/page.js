"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  if (authLoading) return <div className={styles.loading}>Authenticating...</div>;
  if (items.length === 0) return <div className={styles.empty}>Your bag is empty</div>;

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateCart = () => {
    if (items.length === 0) return "Your bag is empty.";
    const unavailable = items.find((item) => Number(item.stock ?? 1) <= 0);
    if (unavailable) return `${unavailable.name} is out of stock.`;
    const overStock = items.find((item) => item.quantity > Number(item.stock ?? 999));
    if (overStock) return `Only ${overStock.stock} left for ${overStock.name}.`;
    return "";
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");

    const cartError = validateCart();
    if (cartError) {
      setError(cartError);
      setLoading(false);
      return;
    }

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() }),
      });

      if (!orderRes.ok) throw new Error("Failed to create payment order");
      const { orderId, amount, currency, mock } = await orderRes.json();

      if (mock) {
        const mockRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: formData,
            items,
            total: getTotal(),
          }),
        });

        const mockData = await mockRes.json();
        if (!mockRes.ok) throw new Error(mockData.error || "Failed to place test order");

        clearCart();
        setNotice("Test order placed without payment gateway.");
        router.push("/order-success");
        return;
      }

      if (!window.Razorpay) {
        throw new Error("Payment script is still loading. Please try again.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Sterly Jewellery",
        description: "Sterling silver jewellery",
        order_id: orderId,
        handler: async (response) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              address: formData,
              items,
              total: getTotal(),
            }),
          });

          if (verifyRes.ok) {
            clearCart();
            router.push("/order-success");
          } else {
            const data = await verifyRes.json().catch(() => ({}));
            setError(data.error || "Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#0A0A0A" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || "Payment failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className={styles.title}>Secure Checkout</h1>
      {notice && <p className={styles.notice}>{notice}</p>}

      <div className={styles.layout}>
        <div className={styles.shipping}>
          <h2 className={styles.heading}>Shipping Details</h2>
          <form onSubmit={handlePayment} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input name="name" required value={formData.name} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input name="phone" required value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Shipping Address</label>
              <input name="address" required value={formData.address} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>City</label>
                <input name="city" required value={formData.city} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Pincode</label>
                <input name="pincode" required value={formData.pincode} onChange={handleInputChange} />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>State</label>
              <input name="state" required value={formData.state} onChange={handleInputChange} />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.payBtn} disabled={loading}>
              {loading ? "Placing order..." : `Place Order - Rs. ${getTotal().toLocaleString()}`}
            </button>
          </form>
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.heading}>Summary</h2>
          <div className={styles.summaryList}>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <span>{item.name} x {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
