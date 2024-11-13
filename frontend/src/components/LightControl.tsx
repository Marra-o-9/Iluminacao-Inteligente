// frontend/src/components/LightControl.tsx
import React from 'react';
import { HStack, Switch, Text } from 'native-base';

interface LightControlProps {
  isOn: boolean;
  onToggle: () => void;
}

const LightControl: React.FC<LightControlProps> = ({ isOn, onToggle }) => {
  return (
    <HStack space={4} alignItems="center">
      <Text fontSize="lg">Iluminação:</Text>
      <Switch size="lg" isChecked={isOn} onToggle={onToggle} />
      <Text fontSize="lg">{isOn ? 'Ligada' : 'Desligada'}</Text>
    </HStack>
  );
};

export default LightControl;