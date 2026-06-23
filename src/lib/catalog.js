import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const IMAGE_ROOT = path.join(process.cwd(), 'public', 'images', 'products');
const FALLBACK_CATEGORIES = [
  { category: 'Earrings', slug: 'earrings', description: 'A polished fashion earring style for everyday looks and gifting.', gender: 'women', source: 'ring' },
  { category: 'Bracelets', slug: 'bracelets', description: 'A clean bracelet style selected for daily wear and easy stacking.', gender: 'women', source: 'ring' },
  { category: 'Charms & Amulets', slug: 'charms-amulets', description: 'A charm-inspired jewellery piece selected for personal styling.', gender: 'women', source: 'necklace' },
  { category: 'Pendants', slug: 'pendants', description: 'A simple pendant style selected for understated everyday wear.', gender: 'men', source: 'necklace' },
  { category: 'Accessories', slug: 'accessories', description: 'A compact jewellery accessory selected for gifting and styling.', gender: 'men', source: 'ring' },
  { category: 'Gifting', slug: 'gifting', description: 'A gift-ready jewellery pick with a lightweight fashion finish.', gender: 'women', source: 'necklace' },
];

function listImages(folderName) {
  const folderPath = path.join(IMAGE_ROOT, folderName);
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

function productName(type, index) {
  const number = String(index + 1).padStart(3, '0');
  return type === 'ring' ? `Sterly Ring ${number}` : `Sterly Necklace ${number}`;
}

function productsForType(type) {
  const category = type === 'ring' ? 'Rings' : 'Necklaces';
  const subcategory = type === 'ring' ? 'rings' : 'necklaces';

  return listImages(type).map((fileName, index) => {
    const image = `/images/products/${type}/${fileName}`;

    return {
    id: `catalog-${type}-${path.parse(fileName).name.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`,
    name: productName(type, index),
    description:
      type === 'ring'
        ? 'A lightweight fashion ring selected for everyday styling and gifting.'
        : 'A graceful fashion necklace selected for everyday styling and gifting.',
    price: priceForIndex(index),
    category,
    subcategory,
    gender: 'women',
    material: 'Fashion Jewellery',
    image,
    images: [image],
    featured: index < 8,
    isNew: index < 16,
    stock: stockForIndex(index),
    createdAt: new Date(0).toISOString(),
    };
  });
}

function fallbackCategoryProducts() {
  return FALLBACK_CATEGORIES.flatMap((item, categoryIndex) => {
    const files = listImages(item.source).slice(0, 12);

    return files.slice(0, 6).map((fileName, index) => {
      const image = `/images/products/${item.source}/${fileName}`;
      const number = String(index + 1).padStart(2, '0');
      const productIndex = categoryIndex * 6 + index;

      return {
        id: `catalog-${item.slug}-${number}`,
        name: `Sterly ${item.category} ${number}`,
        description: item.description,
        price: priceForIndex(productIndex),
        category: item.category,
        subcategory: item.slug,
        gender: item.gender,
        material: 'Fashion Jewellery',
        image,
        images: [image],
        featured: index < 2,
        isNew: index < 3,
        stock: stockForIndex(productIndex),
        createdAt: new Date(0).toISOString(),
      };
    });
  });
}

export function getCatalogProducts() {
  return [...productsForType('ring'), ...productsForType('necklace'), ...fallbackCategoryProducts()];
}

export function getCatalogProductById(id) {
  return getCatalogProducts().find((product) => product.id === id) || null;
}

export function filterCatalogProducts(products, filters) {
  const { category, material, featured, gender, q } = filters;
  const query = q?.trim().toLowerCase();

  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (material && product.material !== material) return false;
    if (featured === 'true' && !product.featured) return false;
    if (gender && product.gender !== gender) return false;
    if (query) {
      const haystack = `${product.name} ${product.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}
