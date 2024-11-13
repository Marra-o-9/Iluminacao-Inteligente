// frontend/src/services/api.ts
import AsyncStorage from '@react-native-community/async-storage';

const API_URL = 'http://seu-ip-ou-dominio:3000/api';

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Falha no registro');
  }

  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Falha na autenticação');
  }

  const data = await response.json();
  await AsyncStorage.setItem('token', data.token);
  return data.token;
};

export const getLightStatus = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/lights/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao obter status da luz');
  }

  return response.json();
};

export const updateLightStatus = async (isOn: boolean) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/lights/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ isOn }),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar status da luz');
  }

  return response.json();
};