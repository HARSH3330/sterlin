# Sterly+ | High Jewellery E-Commerce

> A cinematic, full-stack jewellery e-commerce experience built with **Next.js 16**, **React Three Fiber**, **GSAP**, **SQLite**, and **Razorpay**.

![Hero](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Three.js](https://img.shields.io/badge/Three.js-R3F-orange) ![SQLite](https://img.shields.io/badge/Database-SQLite-blue) ![Razorpay](https://img.shields.io/badge/Payments-Razorpay-blue)

---

## ✨ Features

- **3D Product Viewer** — Interactive high-end jewellery models rendered with React Three Fiber.
- **Full-Stack Authentication** — Secure JWT-based login/signup with protected admin and account routes.
- **Cinematic Homepage** — GSAP ScrollTrigger parallax across editorial scenes with a dynamic "Most Loved Products" grid.
- **Admin Dashboard** — Complete control center for inventory (CRUD) and order management.
- **Integrated Payments** — Seamless Razorpay checkout with secure backend signature verification.
- **Advanced Search** — Debounced search overlay for instant discovery of pieces.
- **Wishlist & Accounts** — Personalized customer accounts with order history and curated wishlists.
- **Diverse Catalog** — Dynamic categories for Women's, Men's, Kids, Divine, Gifting, and more.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/HARSH3330/sterlin.git
cd sterlin
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:
```env
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_id
```

### 3. Database Initialization

```bash
node prisma/seed.js
```
This seeds the `prisma/dev.db` with 34 luxury products and a default admin user.

### 4. Launch

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🔒 Access Credentials

To test the admin and customer features, use these pre-seeded accounts:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@sterlin.com` | `admin123` |
| **Customer** | *(Register via Signup page)* | *Min 6 chars* |

---

## 🗂 Project Structure

```
/src
  /app
    /api                 ← REST API (Auth, Products, Payments, Admin)
    /admin               ← Admin Panel (Dashboard, Products, Orders)
    /account             ← User Profile & Order History
    /shop                ← Dynamic Product Catalog
    /cart                ← Full Shopping Bag
    /checkout            ← Secure Checkout with Razorpay
    /products/[id]       ← Detailed View + 3D Model
    /wishlist            ← Favorited Pieces
  /components/ui         ← Core UI Components (3D scenes, Grid, Filters)
  /hooks                 ← Custom React hooks (useCart, useAuth, useWishlist)
  /lib                   ← Database & Auth Utilities
/prisma
  schema.prisma          ← SQLite Schema
  seed.js                ← Product & User Seeder
```

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **3D Engine** | React Three Fiber + Drei |
| **Animation** | GSAP + ScrollTrigger |
| **State** | Zustand (with Persist Middleware) |
| **Database** | SQLite via better-sqlite3 |
| **Auth** | JWT + Jose + Bcryptjs |
| **Payments** | Razorpay SDK |
| **Styling** | Vanilla CSS Modules |

---

## 📦 Production Build

```bash
npm run build   # optimize for production
npm start       # launch production server
```

---

## ⚖️ License
© 2025 Sterly Jewellery. All rights reserved.
