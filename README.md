# Sterly Jewellery E-Commerce

A full-stack jewellery e-commerce site built with Next.js 16, React, Prisma, PostgreSQL, Zustand, and Razorpay.

## Features

- Image-first jewellery catalog for rings, necklaces, earrings, bracelets, gifting, and more.
- JWT login/signup with protected admin, account, and checkout routes.
- Admin dashboard for products and orders.
- Cart, checkout, wishlist, and customer account flows.
- Razorpay payment integration.
- Prisma-backed PostgreSQL database with product, user, order, and wishlist models.

## Getting Started

### 1. Install

```bash
git clone https://github.com/HARSH3330/sterlin.git
cd sterlin
npm install
```

### 2. Environment

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"

ADMIN_EMAIL="admin@sterlin.com"
ADMIN_PASSWORD="admin123"

RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
```

### 3. Database

```bash
npm run db:deploy
npm run db:seed
```

`db:deploy` creates the PostgreSQL tables from the committed Prisma migration. `db:seed` creates the default admin only if it does not already exist, then seeds the ring and necklace product catalog.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Login

| Role | Email | Password |
|---|---|---|
| Admin | `admin@sterlin.com` | `admin123` |
| Customer | Register from `/signup` | Minimum 6 characters |

## Production Database on Vercel

1. Create or connect a Postgres database in the Vercel project dashboard.
2. Add the pooled connection string to Vercel Environment Variables as `DATABASE_URL`.
3. Add `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in Vercel Environment Variables.
4. Redeploy the project.
5. Run the database setup commands from a terminal that has the same `DATABASE_URL`:

```bash
npm install
npm run db:deploy
npm run db:seed
```

After this, admin login and customer registration persist in PostgreSQL. If `DATABASE_URL` is missing, the app has a temporary fallback auth mode so login/signup do not hard-crash, but that fallback is not a replacement for a real production database.

## Useful Scripts

```bash
npm run dev        # local development
npm run build      # production build
npm start          # start production server
npm run db:deploy  # apply committed Prisma migrations
npm run db:push    # sync schema without migrations, useful for quick dev only
npm run db:seed    # create admin and seed products
npm run db:studio  # open Prisma Studio
```

## Project Structure

```text
src/app/api          API routes for auth, products, orders, payments, admin
src/app/admin        Admin dashboard
src/app/shop         Product catalog
src/app/cart         Cart page
src/app/checkout     Checkout flow
src/components/ui    Shared UI components
src/hooks            Zustand stores and client hooks
src/lib              Auth, database, and catalog helpers
prisma               Prisma schema, migrations, and seed script
public/images        Site and product images
```

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19, CSS Modules |
| State | Zustand |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT, Jose, Bcryptjs |
| Payments | Razorpay |

