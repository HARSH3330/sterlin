// seed.js  –  uses better-sqlite3 to match the runtime library
const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.resolve(__dirname, 'dev.db');
const db = new Database(dbPath);

// Enable WAL for better performance
db.pragma('journal_mode = WAL');

// Create Product table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS Product (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    price       REAL NOT NULL,
    category    TEXT NOT NULL,
    material    TEXT NOT NULL,
    images      TEXT NOT NULL DEFAULT '[]',
    featured    INTEGER NOT NULL DEFAULT 0,
    createdAt   TEXT NOT NULL
  );
`);

const defaultProducts = [
  {
    id: "1",
    name: "Crystal Pear Ring",
    description: "A stunning pear-cut crystal set in a premium gold-plated band. Perfect for any occasion.",
    price: 96,
    category: "Rings",
    material: "Gold Plated",
    images: "[]",
    featured: 1,
  },
  {
    id: "2",
    name: "Molten Hoops in Gold",
    description: "Hand-crafted molten textures in solid 18K gold. Perfect for everyday elegance.",
    price: 184,
    category: "Earrings",
    material: "18K Solid Gold",
    images: "[]",
    featured: 1,
  },
  {
    id: "3",
    name: "Orbit Crystal Cuff",
    description: "An elegant cuff featuring orbiting crystal accents and a smooth, polished finish.",
    price: 139,
    category: "Bracelets",
    material: "Gold Plated",
    images: "[]",
    featured: 1,
  },
  {
    id: "4",
    name: "Horseshoe Pendant",
    description: "A symbol of luck, encrusted with fine details on a delicate chain. A true conversation piece.",
    price: 245,
    category: "Necklaces",
    material: "18K Solid Gold",
    images: "[]",
    featured: 0,
  },
  {
    id: "5",
    name: "Emerald Cut Signet",
    description: "Bold, heavy solid gold signet ring with an emerald cut face. A statement of prestige.",
    price: 320,
    category: "Rings",
    material: "18K Solid Gold",
    images: "[]",
    featured: 1,
  },
  {
    id: "6",
    name: "Diamond Tennis Bracelet",
    description: "Classic continuous diamond line set in 14K white gold. Timeless luxury for every wrist.",
    price: 890,
    category: "Bracelets",
    material: "White Gold",
    images: "[]",
    featured: 1,
  },
  {
    id: "7",
    name: "Teardrop Pearl Earrings",
    description: "Freshwater pearls dropping elegantly from solid gold hooks. Effortlessly refined.",
    price: 210,
    category: "Earrings",
    material: "18K Solid Gold",
    images: "[]",
    featured: 0,
  },
  {
    id: "8",
    name: "Vintage Filigree Choker",
    description: "Intricate filigree work inspired by vintage regal designs. A true heirloom piece.",
    price: 450,
    category: "Necklaces",
    material: "Sterling Silver",
    images: "[]",
    featured: 0,
  },
];

console.log("Start seeding ...");

// Clear existing products
db.prepare("DELETE FROM Product").run();

const insert = db.prepare(`
  INSERT INTO Product (id, name, description, price, category, material, images, featured, createdAt)
  VALUES (@id, @name, @description, @price, @category, @material, @images, @featured, @createdAt)
`);

const insertMany = db.transaction((products) => {
  for (const p of products) {
    insert.run({ ...p, createdAt: new Date().toISOString() });
    console.log(`  ✓ Created: "${p.name}" (id: ${p.id})`);
  }
});

insertMany(defaultProducts);

db.close();
console.log("\nSeeding finished. Database ready at:", dbPath);
