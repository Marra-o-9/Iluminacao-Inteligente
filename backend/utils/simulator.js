// backend/utils/simulator.js
class Simulator {
  static generateLightData() {
    const hour = new Date().getHours();
    const naturalLight = Math.sin((hour - 6) * Math.PI / 12) * 100;
    const adjustedNaturalLight = Math.max(0, Math.min(100, naturalLight));
    const artificialLight = adjustedNaturalLight < 30
      ? 100 - adjustedNaturalLight
      : adjustedNaturalLight > 70
      ? 0
      : 50;
    const isOn = adjustedNaturalLight < 30 || (adjustedNaturalLight >= 30 && adjustedNaturalLight <= 70);
    return {
      naturalLight: adjustedNaturalLight,
      artificialLight,
      isOn,
    };
  }
}

module.exports = Simulator;
