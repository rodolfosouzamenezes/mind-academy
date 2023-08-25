import sqlite from 'aa-sqlite';

const DATABASE = './DB/db.sqlite3';

export const db = sqlite;

export async function initializeDB() {
  await db.open(DATABASE);

  await db.push(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      isAdmin BOOLEAN NOT NULL
    );
  `);

  await db.push(`
    CREATE TABLE IF NOT EXISTS Course (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      teacher TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      imageUrl text NOT NULL,
      isVisible BOOLEAN NOT NULL
    );
  `);

  await db.push(`
    CREATE TABLE IF NOT EXISTS SavedCourse (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      courseId TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES Course (id) ON DELETE CASCADE
    );
  `);
}
