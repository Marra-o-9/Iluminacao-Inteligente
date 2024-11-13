// frontend/src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, VStack, useColorModeValue } from 'native-base';
import Header from '../components/Header';
import LightControl from '../components/LightControl';
import { getLightStatus, updateLightStatus } from '../services/api';

const HomeScreen = () => {
  const [lightStatus, setLightStatus] = useState(false);
  const [luminosity, setLuminosity] = useState(0);
  const bgColor = useColorModeValue('coolGray.800', 'coolGray.900');
  const textColor = useColorModeValue('white', 'coolGray.100');

  useEffect(() => {
    fetchLightStatus();
  }, []);

  const fetchLightStatus = async () => {
    try {
      const status = await getLightStatus();
      setLightStatus(status.isOn);
      setLuminosity(status.luminosity);
    } catch (error) {
      console.error('Erro ao buscar status da luz:', error);
    }
  };

  const handleLightToggle = async () => {
    try {
      const newStatus = !lightStatus;
      await updateLightStatus(newStatus);
      setLightStatus(newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status da luz:', error);
    }
  };

  return (
    <View flex={1} bg={bgColor}>
      <Header title="Controle de Iluminação" />
      <VStack space={4} alignItems="center" mt={4}>
        <Text fontSize="xl" color={textColor}>Luminosidade: {luminosity}%</Text>
        <LightControl isOn={lightStatus} onToggle={handleLightToggle} />
      </VStack>
    </View>
  );
};

export default HomeScreen;