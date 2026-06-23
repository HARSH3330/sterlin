const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();
const PRODUCTS_IMAGE_ROOT = path.resolve(__dirname, '../public/images/products');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function listProductImages(folderName) {
  const folderPath = path.join(PRODUCTS_IMAGE_ROOT, folderName);
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function priceForIndex(index) {
  return 500 + ((index * 37) % 501);
}

function stockForIndex(index) {
  return 12 + (index % 24);
}

function titleCaseProductName(type, index) {
  const padded = String(index + 1).padStart(3, '0');
  return type === 'ring' ? `Sterly Ring ${padded}` : `Sterly Necklace ${padded}`;
}

function buildProductsForFolder(type) {
  const files = listProductImages(type);
  const category = type === 'ring' ? 'Rings' : 'Necklaces';
  const subcategory = type === 'ring' ? 'rings' : 'necklaces';
  const displayType = type === 'ring' ? 'ring' : 'necklace';

  return files.map((fileName, index) => ({
    id: `catalog-${type}-${path.parse(fileName).name.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`,
    name: titleCaseProductName(type, index),
    description:
      type === 'ring'
        ? 'A lightweight fashion ring selected for everyday styling and gifting.'
        : 'A graceful fashion necklace selected for everyday styling and gifting.',
    price: priceForIndex(index),
    category,
    subcategory,
    gender: 'women',
    material: 'Fashion Jewellery',
    stock: stockForIndex(index),
    image: `/images/products/${type}/${fileName}`,
    featured: index < 8,
    isNew: index < 16,
    displayType,
  }));
}

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
  const products = [...buildProductsForFolder('ring'), ...buildProductsForFolder('necklace')];

  for (const product of products) {
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

  console.log(`Seeded ${products.length} image-backed products.`);
  console.log(`Rings: ${products.filter((product) => product.displayType === 'ring').length}`);
  console.log(`Necklaces: ${products.filter((product) => product.displayType === 'necklace').length}`);
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
