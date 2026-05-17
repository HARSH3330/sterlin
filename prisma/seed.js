// seed.js — Sterlin full database seed
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

// ── SEED PRODUCTS ──────────────────────────────────────────
const products = [
  // ─── WOMEN'S RINGS ───
  { id: "w-ring-1", name: "Celestial Moonstone Ring", description: "A breathtaking moonstone set in hand-crafted sterling silver filigree. The iridescent stone catches the light beautifully, creating an ethereal glow.", price: 4299, category: "Rings", subcategory: "rings", gender: "women", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "w-ring-2", name: "Twisted Vine Band", description: "Delicate intertwining vines in polished silver, inspired by nature's elegance. Perfect for stacking or wearing solo.", price: 2899, category: "Rings", subcategory: "rings", gender: "women", material: "Sterling Silver", featured: 0, isNew: 0 },
  { id: "w-ring-3", name: "Rose Quartz Solitaire", description: "A soft pink rose quartz stone in a minimalist mixed-metal setting. Symbolizes love and compassion.", price: 3599, category: "Rings", subcategory: "rings", gender: "women", material: "Mixed Metals", featured: 1, isNew: 1 },

  // ─── WOMEN'S EARRINGS ───
  { id: "w-ear-1", name: "Crystal Drop Earrings", description: "Elegant teardrop crystals suspended from delicate silver hooks. Catch the light with every movement for stunning brilliance.", price: 3199, category: "Earrings", subcategory: "earrings", gender: "women", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "w-ear-2", name: "Pearl Cluster Studs", description: "A trio of freshwater pearls clustered in an organic arrangement. Timeless sophistication for any occasion.", price: 2499, category: "Earrings", subcategory: "earrings", gender: "women", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "w-ear-3", name: "Hammered Disc Hoops", description: "Hand-hammered discs dangle from sleek hoops, blending rustic charm with modern design. Lightweight and comfortable.", price: 2799, category: "Earrings", subcategory: "earrings", gender: "women", material: "Mixed Metals", featured: 0, isNew: 0 },

  // ─── WOMEN'S NECKLACES ───
  { id: "w-neck-1", name: "Layered Chain Necklace", description: "Three delicate chains of varying lengths create an effortlessly chic layered look. The perfect everyday luxury.", price: 4999, category: "Necklaces", subcategory: "necklaces", gender: "women", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "w-neck-2", name: "Moonphase Pendant", description: "A crescent moon pendant with a tiny star accent, symbolizing celestial beauty and mystery. Hangs on a fine chain.", price: 3899, category: "Necklaces", subcategory: "necklaces", gender: "women", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "w-neck-3", name: "Baroque Pearl Choker", description: "An organic baroque pearl centrepiece on a mixed-metal choker. Each pearl is unique, making every piece one of a kind.", price: 5499, category: "Necklaces", subcategory: "necklaces", gender: "women", material: "Mixed Metals", featured: 0, isNew: 1 },

  // ─── WOMEN'S BRACELETS ───
  { id: "w-brac-1", name: "Serpentine Cuff", description: "A bold serpentine cuff in sterling silver with intricate scale detailing. A statement piece inspired by ancient mythology.", price: 5999, category: "Bracelets", subcategory: "bracelets", gender: "women", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "w-brac-2", name: "Charm Link Bracelet", description: "A delicate link bracelet designed to hold your favourite charms. Comes with a signature Sterlin star charm.", price: 3299, category: "Bracelets", subcategory: "bracelets", gender: "women", material: "Sterling Silver", featured: 0, isNew: 1 },

  // ─── WOMEN'S CHARMS ───
  { id: "w-charm-1", name: "Lotus Amulet", description: "A sacred lotus charm in sterling silver, representing purity and spiritual awakening. Can be added to any chain or bracelet.", price: 1899, category: "Charms & Amulets", subcategory: "charms-amulets", gender: "women", material: "Sterling Silver", featured: 0, isNew: 1 },

  // ─── MEN'S BRACELETS ───
  { id: "m-brac-1", name: "Heavy Cuban Link", description: "A bold Cuban link bracelet in polished sterling silver. Substantial weight for a luxurious feel on the wrist.", price: 6999, category: "Bracelets", subcategory: "bracelets", gender: "men", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "m-brac-2", name: "Leather & Silver Wrap", description: "Premium black leather woven with sterling silver accents. Rugged yet refined — perfect for the modern gentleman.", price: 3499, category: "Bracelets", subcategory: "bracelets", gender: "men", material: "Mixed Metals", featured: 0, isNew: 1 },

  // ─── MEN'S RINGS ───
  { id: "m-ring-1", name: "Signet Ring — Onyx", description: "A classic signet ring with a black onyx face, hand-set in heavy sterling silver. Engraving available on request.", price: 4599, category: "Rings", subcategory: "rings", gender: "men", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "m-ring-2", name: "Brushed Band", description: "A wide brushed-finish band in mixed metals. Minimal design with maximum impact.", price: 2999, category: "Rings", subcategory: "rings", gender: "men", material: "Mixed Metals", featured: 0, isNew: 0 },

  // ─── MEN'S NECKLACES ───
  { id: "m-neck-1", name: "Box Chain 22\"", description: "A classic box chain in sterling silver, 22 inches. The perfect base for pendants or a standalone statement.", price: 3999, category: "Necklaces", subcategory: "necklaces", gender: "men", material: "Sterling Silver", featured: 1, isNew: 1 },

  // ─── MEN'S EARRINGS ───
  { id: "m-ear-1", name: "Silver Stud — Minimal", description: "A single sterling silver stud earring with a subtle matte finish. Understated luxury.", price: 1499, category: "Earrings", subcategory: "earrings", gender: "men", material: "Sterling Silver", featured: 0, isNew: 0 },

  // ─── MEN'S PENDANTS ───
  { id: "m-pend-1", name: "Shield Pendant", description: "A heraldic shield pendant in mixed metals with oxidised detailing. Comes on a 24-inch chain.", price: 4299, category: "Pendants", subcategory: "pendants", gender: "men", material: "Mixed Metals", featured: 1, isNew: 1 },

  // ─── MEN'S ACCESSORIES ───
  { id: "m-acc-1", name: "Silver Tie Bar", description: "A sleek sterling silver tie bar with a polished finish. Elevate your formal attire effortlessly.", price: 1999, category: "Accessories", subcategory: "accessories", gender: "men", material: "Sterling Silver", featured: 0, isNew: 0 },

  // ─── KIDS ───
  { id: "k-1", name: "Tiny Star Studs", description: "Adorable star-shaped studs in hypoallergenic sterling silver. Perfect for little ears and big imaginations.", price: 1299, category: "Kids", subcategory: "kids", gender: "kids", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "k-2", name: "Rainbow Charm Bracelet", description: "A colourful bracelet with enamel rainbow charms on a silver chain. Adjustable clasp for growing wrists.", price: 1599, category: "Kids", subcategory: "kids", gender: "kids", material: "Sterling Silver", featured: 0, isNew: 1 },

  // ─── DIVINE (SPIRITUAL) ───
  { id: "d-1", name: "Om Pendant", description: "The sacred Om symbol intricately crafted in sterling silver. A piece that connects the wearer to inner peace.", price: 2799, category: "Divine", subcategory: "divine", gender: "unisex", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "d-2", name: "Evil Eye Bracelet", description: "A protective evil eye bracelet with blue enamel detailing on a sterling silver chain. Ward off negativity in style.", price: 2199, category: "Divine", subcategory: "divine", gender: "unisex", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "d-3", name: "Hamsa Hand Necklace", description: "The hand of Fatima rendered in stunning detail. Mixed metals create a warm, antique finish.", price: 3299, category: "Divine", subcategory: "divine", gender: "unisex", material: "Mixed Metals", featured: 0, isNew: 0 },

  // ─── GIFTING ───
  { id: "g-1", name: "Bridal Tiara — Crystal", description: "A delicate crystal-encrusted tiara for the bride-to-be. Sterling silver frame with over 40 hand-set crystals.", price: 8999, category: "Gifting", subcategory: "bride-to-be", gender: "women", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "g-2", name: "Bridesmaid Pearl Set", description: "A matching necklace and earring set in freshwater pearls. The perfect thank-you gift for your bridal party.", price: 4499, category: "Gifting", subcategory: "bridesmaids", gender: "women", material: "Sterling Silver", featured: 0, isNew: 0 },
  { id: "g-3", name: "Groomsman Cufflinks", description: "Classic sterling silver cufflinks with a brushed finish. Comes in a premium gift box.", price: 2999, category: "Gifting", subcategory: "groomsman", gender: "men", material: "Sterling Silver", featured: 0, isNew: 0 },
  { id: "g-4", name: "Baby's First Bangle", description: "A tiny sterling silver bangle engraved with 'Little Star'. The perfect welcome-to-the-world gift.", price: 1799, category: "Gifting", subcategory: "baby", gender: "kids", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "g-5", name: "Silver Photo Frame", description: "A sterling silver photo frame for the home. Holds a 5x7 photo. Timeless elegance for any mantelpiece.", price: 3499, category: "Gifting", subcategory: "for-home", gender: "unisex", material: "Sterling Silver", featured: 0, isNew: 0 },

  // ─── CORPORATE ───
  { id: "c-1", name: "Corporate Gift Set", description: "A curated set of silver accessories including a pen, card holder, and keychain. Premium corporate gifting at its finest.", price: 5999, category: "Corporate", subcategory: "corporate", gender: "unisex", material: "Sterling Silver", featured: 1, isNew: 0 },
  { id: "c-2", name: "Party Favour — Mini Charm", description: "Bulk-order mini silver charms for wedding favours or corporate events. Minimum order: 10 pieces.", price: 599, category: "Corporate", subcategory: "corporate", gender: "unisex", material: "Sterling Silver", featured: 0, isNew: 0 },

  // ─── COLLECTIONS (Special) ───
  { id: "col-1", name: "Aurora Borealis Ring", description: "Part of the Celestial Collection — an opalescent stone shimmering with northern lights colours, set in a silver halo.", price: 6499, category: "Collections", subcategory: "celestial", gender: "women", material: "Sterling Silver", featured: 1, isNew: 1 },
  { id: "col-2", name: "Midnight Star Necklace", description: "Part of the Celestial Collection — a star pendant in dark oxidised silver with a diamond-cut centre.", price: 7299, category: "Collections", subcategory: "celestial", gender: "unisex", material: "Sterling Silver", featured: 1, isNew: 1 },
];

// Password: admin123 (or from .env)
const adminUser = {
  id: "admin-001",
  name: "Sterlin Admin",
  email: process.env.ADMIN_EMAIL || "admin@sterlin.com",
  password: process.env.ADMIN_PASSWORD 
    ? require('bcryptjs').hashSync(process.env.ADMIN_PASSWORD, 10) 
    : "$2b$10$qZng2wp9W/4luM4/nHQY5O1aETapucvsZ4lZXLNyEKTXaDb5", 
  role: "admin",
};

async function main() {
  console.log("🌱 Starting Sterlin database seed...\n");

  // Clear tables (order matters for foreign keys)
  await prisma.wishlist.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // Insert products
  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        subcategory: p.subcategory || '',
        gender: p.gender || 'unisex',
        material: p.material,
        images: "[]",
        featured: p.featured === 1,
        isNew: p.isNew === 1,
        stock: 50,
      }
    });
    console.log(`  ✓ Product: "${p.name}"`);
  }

  // Insert admin user
  await prisma.user.create({
    data: adminUser
  });
  console.log(`\n  ✓ Admin user: ${adminUser.email}`);

  console.log(`\n✅ Seeding complete! ${products.length} products, 1 admin user.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
