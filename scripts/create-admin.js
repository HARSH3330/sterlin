const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const db = new Database(dbPath);

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@sterlin.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  
  console.log(`Checking for admin: ${email}...`);

  const existing = db.prepare('SELECT id FROM User WHERE email = ?').get(email);
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();

  if (existing) {
    console.log(`Admin user already exists. Updating password...`);
    db.prepare('UPDATE User SET password = ?, role = ? WHERE id = ?').run(hashedPassword, 'admin', existing.id);
    console.log(`✅ Admin updated successfully.`);
  } else {
    console.log(`Creating new admin user...`);
    const id = uuidv4();
    db.prepare(
      'INSERT INTO User (id, name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, "Sterlin Admin", email, hashedPassword, 'admin', now);
    console.log(`✅ Admin created successfully.`);
  }
}

createAdmin().catch(console.error).finally(() => db.close());
