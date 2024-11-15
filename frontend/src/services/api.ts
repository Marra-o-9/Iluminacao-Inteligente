// frontend/src/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

interface LightStatus {
  isOn: boolean;
  intensity: number;
  naturalLight: number;
}

interface HistoricalData {
  timestamp: string;
  naturalLight: number;
  intensity: number;
}

export const register = async (username: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha no registro');
  }
};

export const login = async (username: string, password: string): Promise<string> => {
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

export const getLightStatus = async (): Promise<LightStatus> => {
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

export const updateLightStatus = async (isOn: boolean, intensity: number): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/lights/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ isOn, intensity }),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar status da luz');
  }
};

export const getHistoricalData = async (): Promise<HistoricalData[]> => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/lights/historical`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao obter dados históricos');
  }

  return response.json();
};