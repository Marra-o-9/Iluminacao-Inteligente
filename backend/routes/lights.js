// backend/routes/lights.js
const express = require('express');
const { db } = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/status', (req, res) => {
  db.get('SELECT * FROM lights ORDER BY id DESC LIMIT 1', (err, light) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar status da luz' });
    }
    res.json(light || { isOn: false, luminosity: 0 });
  });
});

router.post('/update', (req, res) => {
  const { isOn, luminosity } = req.body;
  db.run('INSERT INTO lights (isOn, luminosity) VALUES (?, ?)', [isOn ? 1 : 0, luminosity], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar status da luz' });
    }
    res.json({ message: 'Status da luz atualizado com sucesso' });
  });
});

module.exports = router;