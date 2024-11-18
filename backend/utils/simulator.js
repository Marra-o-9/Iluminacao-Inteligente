// backend/utils/simulator.js
class Simulator {
  static generateLightData() {
    const hour = new Date().getHours();
    // Simula luz natural de 0 a 100% com base no horário do dia
    const naturalLight = Math.max(0, Math.min(100, Math.sin((hour - 6) * Math.PI / 12) * 100));

    // Luz artificial inversamente proporcional à natural
    const artificialLight = 100 - naturalLight;

    // Define o status com base na luz artificial
    const isOn = artificialLight > 0;

    return {
      naturalLight: Math.round(naturalLight),
      artificialLight: Math.round(artificialLight),
      isOn,
    };
  }

  static generateHistoricalData() {
    // Gera dados históricos para 24 horas passadas
    return Array.from({ length: 24 }, (_, i) => {
      const hour = (new Date().getHours() - i + 24) % 24;
      const naturalLight = Math.max(0, Math.min(100, Math.sin((hour - 6) * Math.PI / 12) * 100));
      const artificialLight = 100 - naturalLight;
      return {
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        naturalLight: Math.round(naturalLight),
        artificialLight: Math.round(artificialLight),
      };
    }).reverse(); // Ordenar cronologicamente
  }
}

module.exports = Simulator;
