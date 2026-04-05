import { getDb, db as _db } from './db';

// Re-export from the single source of truth (db.js)
// This ensures all parts of the app use the same read-write connection pool
export const db = _db;
export { getDb };
