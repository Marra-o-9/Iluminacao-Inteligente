import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Switch, Slider, useColorModeValue, Spinner, Icon, Center, ScrollView } from 'native-base';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import { getLightStatus, getHistoricalData, updateLightStatus } from '../services/api';

export default function ModernHomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lightStatus, setLightStatus] = useState(false);
  const [naturalLight, setNaturalLight] = useState(0);
  const [artificialLight, setArtificialLight] = useState(0);
  const [lightHistory, setLightHistory] = useState<number[]>([]);
  const [secondlyHistory, setSecondlyHistory] = useState<number[]>([]);
  const [minutelyHistory, setMinutelyHistory] = useState<number[]>([]);

  const bgColor = useColorModeValue('coolGray.50', 'coolGray.900');
  const cardBgColor = useColorModeValue('white', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'coolGray.100');
  const chartLabelColor = useColorModeValue('coolGray.800', 'coolGray.100');
  const chartLineColor = useColorModeValue('teal.500', 'cyan.500');
  const screenWidth = Dimensions.get('window').width - 40;

  useEffect(() => {
    fetchLightStatus();
    fetchHistoricalData();
    const minuteInterval = setInterval(fetchLightStatus, 60000);
    const secondInterval = setInterval(updateSecondlyHistory, 1000);
    return () => {
      clearInterval(minuteInterval);
      clearInterval(secondInterval);
    };
  }, []);

  const fetchLightStatus = async () => {
    try {
      const data = await getLightStatus();
      setLightStatus(data.isOn);
      setNaturalLight(data.naturalLight);
      setArtificialLight(data.artificialLight);
      updateMinutelyHistory(data.naturalLight);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const data = await getHistoricalData();
      setLightHistory(data.map(d => d.naturalLight));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLightToggle = (value: boolean) => {
    const newArtificialLight = value ? artificialLight : 0;
    const newNaturalLight = 100 - newArtificialLight;
    setLightStatus(value);
    setArtificialLight(newArtificialLight);
    setNaturalLight(newNaturalLight);
    updateLightStatus(value, newArtificialLight);
  };

  const handleArtificialLightChange = (value: number) => {
    const newNaturalLight = 100 - value;
    setArtificialLight(value);
    setNaturalLight(newNaturalLight);
    updateLightStatus(lightStatus, value);
  };

  const updateSecondlyHistory = () => {
    setSecondlyHistory(prev => [...prev.slice(-9), naturalLight]);
  };

  const updateMinutelyHistory = (value: number) => {
    setMinutelyHistory(prev => [...prev.slice(-9), value]);
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
      <ScrollView
        flex={1}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
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
                labels: Array.from({ length: lightHistory.length }, (_, i) => `${i + 1}h`),
                datasets: [{ data: lightHistory }],
              }}
              width={screenWidth}
              height={200}
              chartConfig={{
                backgroundGradientFrom: cardBgColor,
                backgroundGradientTo: cardBgColor,
                decimalPlaces: 0,
                color: (opacity = 1) => chartLineColor,
                labelColor: () => chartLabelColor,
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          </Box>

          <Box bg={cardBgColor} rounded="lg" p={4} shadow={2}>
            <Text fontSize="md" color={textColor} mb={2}>Atualização por Segundo</Text>
            <LineChart
              data={{
                labels: Array.from({ length: secondlyHistory.length }, (_, i) => `${i + 1}s`),
                datasets: [{ data: secondlyHistory }],
              }}
              width={screenWidth}
              height={200}
              chartConfig={{
                backgroundGradientFrom: cardBgColor,
                backgroundGradientTo: cardBgColor,
                decimalPlaces: 0,
                color: (opacity = 1) => chartLineColor,
                labelColor: () => chartLabelColor,
              }}
              style={{ borderRadius: 16 }}
            />
          </Box>

          <Box bg={cardBgColor} rounded="lg" p={4} shadow={2}>
            <Text fontSize="md" color={textColor} mb={2}>Atualização por Minuto</Text>
            <LineChart
              data={{
                labels: Array.from({ length: minutelyHistory.length }, (_, i) => `${i + 1}min`),
                datasets: [{ data: minutelyHistory }],
              }}
              width={screenWidth}
              height={200}
              chartConfig={{
                backgroundGradientFrom: cardBgColor,
                backgroundGradientTo: cardBgColor,
                decimalPlaces: 0,
                color: (opacity = 1) => chartLineColor,
                labelColor: () => chartLabelColor,
              }}
              style={{ borderRadius: 16 }}
            />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}
