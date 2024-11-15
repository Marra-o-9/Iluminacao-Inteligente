// backend/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const lightsRoutes = require('./routes/lights');
const { initDatabase } = require('./config/database');
const lightSimulator = require('./utils/lightSimulator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/lights', lightsRoutes);

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  // Simula a luz natural a cada 5 minutos
  setInterval(() => {
    lightSimulator.simulateNaturalLight();
  }, 5 * 60 * 1000);
});