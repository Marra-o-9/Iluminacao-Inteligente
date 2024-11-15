const Light = require('../models/Light');

class LightSimulator {
  constructor() {
    this.naturalLight = 0;
    this.artificialLight = 0;
    this.isOn = false;
  }

  async simulateNaturalLight() {
    const hour = new Date().getHours();
    // Simula a luz natural com base na hora do dia
    this.naturalLight = Math.sin((hour - 6) * Math.PI / 12) * 100;
    this.naturalLight = Math.max(0, Math.min(100, this.naturalLight));
    
    // Ajusta a iluminação artificial com base na luz natural
    this.adjustArtificialLight();

    // Atualiza o banco de dados
    await Light.updateStatus(this.isOn, this.artificialLight, this.naturalLight);
  }

  adjustArtificialLight() {
    if (this.naturalLight < 30) {
      this.isOn = true;
      this.artificialLight = 100 - this.naturalLight;
    } else if (this.naturalLight > 70) {
      this.isOn = false;
      this.artificialLight = 0;
    } else {
      this.isOn = true;
      this.artificialLight = 50;
    }
  }

  async manualControl(isOn, intensity) {
    this.isOn = isOn;
    this.artificialLight = intensity;
    await Light.updateStatus(this.isOn, this.artificialLight, this.naturalLight);
  }
}

module.exports = new LightSimulator();