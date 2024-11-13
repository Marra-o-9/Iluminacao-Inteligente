// frontend/src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, VStack, Switch, HStack, useColorModeValue } from 'native-base';
import Header from '../components/Header';

const SettingsScreen = () => {
  const bgColor = useColorModeValue('coolGray.800', 'coolGray.900');
  const textColor = useColorModeValue('white', 'coolGray.100');

  return (
    <View flex={1} bg={bgColor}>
      <Header title="Configurações" />
      <VStack space={4} p={4}>
        <Text fontSize="xl" color={textColor}>Configurações do Sistema</Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={textColor}>Modo Automático</Text>
          <Switch size="md" />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={textColor}>Notificações</Text>
          <Switch size="md" />
        </HStack>
      </VStack>
    </View>
  );
};

export default SettingsScreen;