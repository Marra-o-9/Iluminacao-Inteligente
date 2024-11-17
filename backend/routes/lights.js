// backend/routes/lights.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Simulator = require('../utils/simulator');

const router = express.Router();

router.use(authMiddleware);

// Rota para obter o status atual da luz
router.get('/status', (req, res) => {
  try {
    const lightData = Simulator.generateLightData();
    res.json(lightData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao simular status da luz' });
  }
});

// Rota para simular um ajuste manual (não implementado com IA)
router.post('/update', (req, res) => {
  const { isOn, intensity } = req.body;

  // Simula o controle manual retornando os dados ajustados
  try {
    const naturalLight = Simulator.generateLightData().naturalLight; // Mantém luz natural da simulação
    const updatedData = {
      isOn,
      artificialLight: intensity,
      naturalLight,
    };
    res.json({ message: 'Status atualizado com sucesso', updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da luz' });
  }
});

// Rota para obter dados históricos simulados
router.get('/historical', (req, res) => {
  try {
    const historicalData = Array.from({ length: 24 }, (_, i) => {
      const data = Simulator.generateLightData();
      const timestamp = new Date(Date.now() - i * 3600000).toISOString(); // Horas passadas
      return { ...data, timestamp };
    });

    res.json(historicalData.reverse()); // Histórico em ordem cronológica
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter dados históricos simulados' });
  }
});

module.exports = router;
