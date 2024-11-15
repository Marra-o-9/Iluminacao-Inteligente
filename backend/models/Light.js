const { db } = require('../config/database');

class Light {
  static async getLatestStatus() {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM lights ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || { isOn: false, intensity: 0, naturalLight: 0 });
        }
      });
    });
  }

  static async updateStatus(isOn, intensity, naturalLight) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO lights (isOn, intensity, naturalLight) VALUES (?, ?, ?)', [isOn ? 1 : 0, intensity, naturalLight], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  static async getHistoricalData(limit = 24) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM lights ORDER BY id DESC LIMIT ?', [limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Light;