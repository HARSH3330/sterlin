const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const testProducts = [
  {
    id: 'test-ring-001',
    name: 'Classic Silver Stack Ring',
    description: 'A polished sterling silver ring designed for everyday stacking.',
    price: 1499,
    category: 'Rings',
    subcategory: 'rings',
    gender: 'women',
    material: 'Sterling Silver',
    stock: 25,
    image: '/images/for_her.jpeg',
    featured: true,
    isNew: true,
  },
  {
    id: 'test-ear-001',
    name: 'Pearl Glow Stud Earrings',
    description: 'Minimal pearl studs with a clean silver setting for daily wear.',
    price: 1899,
    category: 'Earrings',
    subcategory: 'earrings',
    gender: 'women',
    material: 'Sterling Silver',
    stock: 30,
    image: '/images/new_in.jpeg',
    featured: true,
    isNew: true,
  },
  {
    id: 'test-neck-001',
    name: 'Everyday Box Chain',
    description: 'A lightweight box chain necklace with a smooth sterling finish.',
    price: 2499,
    category: 'Necklaces',
    subcategory: 'necklaces',
    gender: 'unisex',
    material: 'Sterling Silver',
    stock: 18,
    image: '/images/for_her.jpeg',
    featured: true,
    isNew: false,
  },
  {
    id: 'test-bracelet-001',
    name: 'Slim Charm Bracelet',
    description: 'A refined bracelet with a small charm and adjustable clasp.',
    price: 2199,
    category: 'Bracelets',
    subcategory: 'bracelets',
    gender: 'women',
    material: 'Sterling Silver',
    stock: 22,
    image: '/images/gifting.jpeg',
    featured: true,
    isNew: false,
  },
  {
    id: 'test-men-ring-001',
    name: 'Brushed Men Silver Band',
    description: 'A clean brushed silver band with a bold everyday profile.',
    price: 2999,
    category: 'Rings',
    subcategory: 'rings',
    gender: 'men',
    material: 'Sterling Silver',
    stock: 16,
    image: '/images/for_him.jpeg',
    featured: false,
    isNew: true,
  },
  {
    id: 'test-men-bracelet-001',
    name: 'Cuban Link Bracelet',
    description: 'A substantial link bracelet with a bright polished finish.',
    price: 3999,
    category: 'Bracelets',
    subcategory: 'bracelets',
    gender: 'men',
    material: 'Sterling Silver',
    stock: 12,
    image: '/images/for_him.jpeg',
    featured: true,
    isNew: false,
  },
  {
    id: 'test-gift-001',
    name: 'Gift Ready Pearl Set',
    description: 'A ready-to-gift necklace and earring set packed for occasions.',
    price: 4499,
    category: 'Gifting',
    subcategory: 'for-her',
    gender: 'women',
    material: 'Sterling Silver',
    stock: 10,
    image: '/images/gifting.jpeg',
    featured: true,
    isNew: true,
  },
  {
    id: 'test-kids-001',
    name: 'Tiny Star Kids Studs',
    description: 'Small hypoallergenic silver studs for kids.',
    price: 999,
    category: 'Kids',
    subcategory: 'kids',
    gender: 'kids',
    material: 'Sterling Silver',
    stock: 35,
    image: '/images/new_in.jpeg',
    featured: false,
    isNew: true,
  },
  {
    id: 'test-divine-001',
    name: 'Om Silver Pendant',
    description: 'A simple Om pendant in sterling silver for daily devotion.',
    price: 1799,
    category: 'Divine',
    subcategory: 'divine',
    gender: 'unisex',
    material: 'Sterling Silver',
    stock: 20,
    image: '/images/for_her.jpeg',
    featured: false,
    isNew: false,
  },
  {
    id: 'test-chain-001',
    name: 'Minimal Silver Chain',
    description: 'A versatile chain that can be worn alone or with a pendant.',
    price: 1999,
    category: 'Necklaces',
    subcategory: 'chains',
    gender: 'unisex',
    material: 'Sterling Silver',
    stock: 28,
    image: '/images/for_him.jpeg',
    featured: false,
    isNew: true,
  },
];

async function ensureAdminExists() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@sterlin.com').trim().toLowerCase();
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existingAdmin) {
    console.log(`Admin exists: ${adminEmail}. Existing ID and password preserved.`);
    return;
  }

  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      id: 'admin-001',
      name: 'Sterlin Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log(`Created default admin: ${adminEmail}`);
}

async function seedProducts() {
  for (const product of testProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory,
        gender: product.gender,
        material: product.material,
        stock: product.stock,
        images: JSON.stringify([product.image]),
        featured: product.featured,
        isNew: product.isNew,
      },
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory,
        gender: product.gender,
        material: product.material,
        stock: product.stock,
        images: JSON.stringify([product.image]),
        featured: product.featured,
        isNew: product.isNew,
      },
    });
  }

  console.log(`Seeded ${testProducts.length} test products.`);
}

async function main() {
  await ensureAdminExists();
  await seedProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
