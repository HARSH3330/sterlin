const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function createAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@sterlin.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}. Existing ID and password were not changed.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      id: 'admin-001',
      name: 'Sterlin Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log(`Admin created: ${email}`);
}

createAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
