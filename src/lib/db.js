import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');

let _db;

export function getDb() {
  if (!_db) {
    _db = new Database(dbPath, {
      fileMustExist: true,
    });
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
  }
  return _db;
}

// Backward-compatible default export
export const db = new Database(dbPath, { fileMustExist: true });
