import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');

export const db = new Database(dbPath, { 
  readonly: true,
  fileMustExist: true 
});
