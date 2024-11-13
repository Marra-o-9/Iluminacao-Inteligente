// backend/models/Light.js
const { db } = require('../config/database');

class Light {
  static getLatestStatus() {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM lights ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static updateStatus(isOn, luminosity) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO lights (isOn, luminosity) VALUES (?, ?)', [isOn ? 1 : 0, luminosity], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
}

module.exports = Light;