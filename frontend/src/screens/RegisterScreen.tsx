// frontend/src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, Input, Button, VStack, useToast } from 'native-base';
import { register } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definindo o tipo para os parâmetros de navegação
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.show({
        title: "Erro",
        description: "As senhas não coincidem",
        placement: "top",
        duration: 3000,
        variant: "solid",
        backgroundColor: "error.500"
      });
      return;
    }

    try {
      await register(username, password);
      toast.show({
        title: "Sucesso",
        description: "Usuário registrado com sucesso",
        placement: "top",
        duration: 3000,
        variant: "solid",
        backgroundColor: "success.500"
      });
      navigation.navigate('Login');
    } catch (error) {
      toast.show({
        title: "Erro",
        description: "Falha ao registrar usuário",
        placement: "top",
        duration: 3000,
        variant: "solid",
        backgroundColor: "error.500"
      });
    }
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center" bg="coolGray.800">
      <VStack space={4} width="80%">
        <Text fontSize="2xl" color="white">Cadastro</Text>
        <Input
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          color="white"
          placeholderTextColor="gray.400"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          color="white"
          placeholderTextColor="gray.400"
        />
        <Input
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          color="white"
          placeholderTextColor="gray.400"
        />
        <Button onPress={handleRegister} bg="primary.600">Cadastrar</Button>
        <Button variant="ghost" onPress={() => navigation.navigate('Login')} _text={{ color: "primary.500" }}>
          Já tem uma conta? Faça login
        </Button>
      </VStack>
    </View>
  );
};

export default RegisterScreen;