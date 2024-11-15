// backend/routes/lights.js
const express = require('express');
const { db } = require('../config/database');
const authMiddleware = require('../middleware/auth');
const Light = require('../models/Light');
const lightSimulator = require('../utils/lightSimulator');

const router = express.Router();

router.use(authMiddleware);

router.get('/status', async (req, res) => {
  try {
    const status = await Light.getLatestStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar status da luz' });
  }
});

router.post('/update', async (req, res) => {
  const { isOn, intensity } = req.body;
  try {
    await lightSimulator.manualControl(isOn, intensity);
    res.json({ message: 'Status da luz atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da luz' });
  }
});

router.get('/historical', async (req, res) => {
  try {
    const data = await Light.getHistoricalData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados históricos' });
  }
});

module.exports = router;