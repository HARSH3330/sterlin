# Sterlin+

> A cinematic high jewellery e-commerce experience built with **Next.js 16**, **React Three Fiber**, **GSAP**, and **SQLite**.

![Hero](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Three.js](https://img.shields.io/badge/Three.js-R3F-orange) ![SQLite](https://img.shields.io/badge/Database-SQLite-blue)

---

## ✨ Features

- **3D Product Viewer** — Interactive gold jewellery models rendered with React Three Fiber
- **Cinematic homepage** — GSAP ScrollTrigger parallax across 4 scroll scenes
- **Product catalogue** — Filterable grid backed by SQLite via `better-sqlite3`
- **Persistent cart** — Zustand store with localStorage persistence
- **5 pages** — Home, Shop, Product Detail, About, Brands, Inspiration
- **Fully responsive** — Mobile-first CSS breakpoints across all pages
- **Lazy-loaded 3D** — Three.js (~2MB) loads after hydration, never blocks render

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/sterlin.git
cd sterlin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

```bash
node prisma/seed.js
```

This creates `prisma/dev.db` and seeds it with 8 jewellery products.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂 Project Structure

```
/src
  /app
    page.js              ← Homepage (3D hero + scenes)
    /products            ← Product listing + detail pages
    /about               ← Brand story
    /brands              ← Curated jewellery houses
    /inspiration         ← Editorial journal
    /api/products        ← REST API (SQLite-backed)
  /components/ui
    HeroCanvas.jsx       ← Lazy-loaded hero 3D ring
    ModelViewer.jsx      ← Lazy-loaded product 3D viewer
    Scene2–4.jsx         ← Homepage scroll sections
    Navbar.jsx           ← Navigation + cart icon
    CartDrawer.jsx       ← Sliding cart panel
  /hooks
    useCart.js           ← Zustand cart store
  /lib
    prisma.js            ← better-sqlite3 connection
/prisma
  schema.prisma          ← Product model
  seed.js                ← Database seeder
```

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| 3D | React Three Fiber + Drei |
| Animation | GSAP + ScrollTrigger |
| State | Zustand (persist middleware) |
| Database | SQLite via better-sqlite3 |
| Styling | CSS Modules |

---

## 📦 Build

```bash
npm run build   # production build (Exit code 0 ✅)
npm start       # run production server
```

---

## 🔮 Roadmap

- [ ] Authentication (next-auth — installed, not yet configured)
- [ ] Checkout + Payment (Stripe)
- [ ] Production database (Turso / Supabase)
- [ ] Real product photography
