// frontend/src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, VStack, HStack, Slider, Switch, useColorModeValue } from 'native-base';
import Header from '../components/Header';
import { getLightStatus, updateLightStatus, getHistoricalData } from '../services/api';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Definindo a interface para os dados históricos
interface HistoricalData {
  timestamp: string;
  naturalLight: number;
  intensity: number;
}

const HomeScreen = () => {
  const [lightStatus, setLightStatus] = useState(false);
  const [artificialLight, setArtificialLight] = useState(0);
  const [naturalLight, setNaturalLight] = useState(0);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const bgColor = useColorModeValue('coolGray.800', 'coolGray.900');
  const textColor = useColorModeValue('white', 'coolGray.100');

  const fetchLightStatus = async () => {
    try {
      const status = await getLightStatus();
      setLightStatus(status.isOn);
      setArtificialLight(status.intensity);
      setNaturalLight(status.naturalLight);
    } catch (error) {
      console.error('Erro ao buscar status da luz:', error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const data = await getHistoricalData();
      setHistoricalData(data);
    } catch (error) {
      console.error('Erro ao buscar dados históricos:', error);
    }
  };

  useEffect(() => {
    fetchLightStatus();
    fetchHistoricalData();
    const interval = setInterval(() => {
      fetchLightStatus();
      fetchHistoricalData();
    }, 60000); // Atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  const handleLightToggle = async () => {
    try {
      const newStatus = !lightStatus;
      await updateLightStatus(newStatus, artificialLight);
      setLightStatus(newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status da luz:', error);
    }
  };

  const handleIntensityChange = async (value: number) => {
    try {
      await updateLightStatus(lightStatus, value);
      setArtificialLight(value);
    } catch (error) {
      console.error('Erro ao atualizar intensidade da luz:', error);
    }
  };

  return (
    <View flex={1} bg={bgColor}>
      <Header title="Controle de Iluminação" />
      <VStack space={4} alignItems="center" mt={4} px={4}>
        <Text fontSize="xl" color={textColor}>Luz Natural: {naturalLight.toFixed(1)}%</Text>
        <Text fontSize="xl" color={textColor}>Luz Artificial: {artificialLight.toFixed(1)}%</Text>
        <HStack space={4} alignItems="center">
          <Text fontSize="lg" color={textColor}>Iluminação:</Text>
          <Switch size="lg" isChecked={lightStatus} onToggle={handleLightToggle} />
        </HStack>
        <Text fontSize="lg" color={textColor}>Intensidade da Luz Artificial:</Text>
        <Slider
          value={artificialLight}
          onChange={handleIntensityChange}
          minValue={0}
          maxValue={100}
          step={1}
          w="3/4"
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text fontSize="xl" color={textColor} mt={4}>Histórico de Iluminação</Text>
        <LineChart
          data={{
            labels: historicalData.map(d => new Date(d.timestamp).toLocaleTimeString()),
            datasets: [
              {
                data: historicalData.map(d => d.naturalLight),
                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Amarelo para luz natural
                strokeWidth: 2
              },
              {
                data: historicalData.map(d => d.intensity),
                color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // Ciano para luz artificial
                strokeWidth: 2
              }
            ]
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: bgColor,
            backgroundGradientFrom: bgColor,
            backgroundGradientTo: bgColor,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </VStack>
    </View>
  );
};

export default HomeScreen;