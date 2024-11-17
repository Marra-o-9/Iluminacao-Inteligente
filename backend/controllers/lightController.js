// backend/controllers/lightController.js
const Simulator = require('../utils/simulator');

exports.getLightStatus = (req, res) => {
  const data = Simulator.generateLightData();
  res.json(data);
};
