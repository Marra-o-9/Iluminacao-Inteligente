import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Switch, Slider, useColorModeValue, Spinner, Icon, Center } from 'native-base';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import { getLightStatus, updateLightIntensity } from '../services/api';

export default function ModernHomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lightStatus, setLightStatus] = useState(false);
  const [naturalLight, setNaturalLight] = useState(0);
  const [artificialLight, setArtificialLight] = useState(0);
  const [lightHistory, setLightHistory] = useState([0, 0, 0, 0, 0, 0]);

  const bgColor = useColorModeValue('coolGray.50', 'coolGray.900');
  const cardBgColor = useColorModeValue('white', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'coolGray.100');

  useEffect(() => {
    fetchLightStatus();
    const interval = setInterval(fetchLightStatus, 60000); // Atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  const fetchLightStatus = async () => {
    try {
      const data = await getLightStatus();
      setLightStatus(data.isOn);
      setNaturalLight(data.naturalLight);
      setArtificialLight(data.artificialLight);
      setLightHistory(prev => [...prev.slice(1), data.naturalLight]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLightToggle = (value: boolean) => {
    setLightStatus(value);
    updateLightIntensity(value ? artificialLight : 0);
  };

  const handleArtificialLightChange = (value: number) => {
    setArtificialLight(value);
    updateLightIntensity(value);
  };

  if (loading) {
    return (
      <Center flex={1} bg={bgColor}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box flex={1} bg={bgColor} safeArea>
      <Header title="Controle de Iluminação" />
      <VStack space={4} mt={4} px={4}>
        <Box bg={cardBgColor} rounded="lg" p={4} shadow={2}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text fontSize="md" color={textColor}>Luz Natural</Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>{naturalLight}%</Text>
            </VStack>
            <Icon as={Feather} name="sun" size="6" color="orange.500" />
          </HStack>
        </Box>

        <Box bg={cardBgColor} rounded="lg" p={4} shadow={2}>
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Text fontSize="md" color={textColor}>Iluminação Pública</Text>
            <Switch isChecked={lightStatus} onToggle={handleLightToggle} colorScheme="teal" />
          </HStack>
          <Slider
            value={artificialLight}
            onChange={handleArtificialLightChange}
            minValue={0}
            maxValue={100}
            step={1}
            isDisabled={!lightStatus}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text fontSize="sm" color={textColor} textAlign="center" mt={2}>
            Intensidade: {artificialLight}%
          </Text>
        </Box>

        <Box bg={cardBgColor} rounded="lg" p={4} shadow={2}>
          <Text fontSize="md" color={textColor} mb={2}>Histórico de Luz Natural</Text>
          <LineChart
            data={{
              labels: ['5min', '4min', '3min', '2min', '1min', 'Agora'],
              datasets: [{ data: lightHistory }]
            }}
            width={Dimensions.get('window').width - 50}
            height={220}
            chartConfig={{
              backgroundColor: cardBgColor,
              backgroundGradientFrom: cardBgColor,
              backgroundGradientTo: cardBgColor,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
}