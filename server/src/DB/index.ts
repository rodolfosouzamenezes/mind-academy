import sqlite3 from 'sqlite3'
import { logError } from '../utils/logError';

const DBSOURCE = './src/DB/db.sqlite'

const SQL_USER_CREATE = `
  CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`;

const SQL_COURSE_CREATE = `
  CREATE TABLE IF NOT EXISTS Course (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    teacher TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image BLOB NOT NULL,
    isVisible BOOLEAN NOT NULL
  );
`;

const SQL_SAVED_COURSE_CREATE = `
  CREATE TABLE IF NOT EXISTS SavedCourse (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    courseId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES Course (id) ON DELETE CASCADE
  );
`

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  } else {
    console.log('DB Conectado')

    database.run(SQL_USER_CREATE, (error) => logError(error, 'Table User in Database'));
    database.run(SQL_COURSE_CREATE, (error) => logError(error, 'Table Course in Database'));
    database.run(SQL_SAVED_COURSE_CREATE, (error) => logError(error, 'Table Saved Course in Database'));
  }
})

export default database