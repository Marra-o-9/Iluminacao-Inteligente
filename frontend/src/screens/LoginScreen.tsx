// frontend/src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, Input, Button, VStack, useToast } from 'native-base';
import { login } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o tipo para os parâmetros de navegação
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      // Armazenar o token
      await AsyncStorage.setItem('userToken', token);
      // Navegar para a tela inicial
      navigation.navigate('Home');
    } catch (error) {
      toast.show({
        title: "Erro de login",
        description: "Usuário ou senha inválidos",
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
        <Text fontSize="2xl" color="white">Login</Text>
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
        <Button onPress={handleLogin} bg="primary.600">Entrar</Button>
        <Button variant="ghost" onPress={() => navigation.navigate('Register')} _text={{ color: "primary.500" }}>
          Não tem uma conta? Cadastre-se
        </Button>
      </VStack>
    </View>
  );
};

export default LoginScreen;