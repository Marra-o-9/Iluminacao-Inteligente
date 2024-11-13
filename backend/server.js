// backend/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const lightsRoutes = require('./routes/lights');
const { initDatabase } = require('./config/database');

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
});