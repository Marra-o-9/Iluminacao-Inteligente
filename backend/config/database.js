// backend/config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath);

function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS lights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        isOn INTEGER,
        luminosity INTEGER
      )`);

      resolve();
    });
  });
}

module.exports = { db, initDatabase };