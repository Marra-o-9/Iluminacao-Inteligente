// frontend/src/services/api.ts
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const API_URL = 'http://localhost:3000/api';

interface LightPost {
  id: string;
  latitude: number;
  longitude: number;
  local: string;
}

interface Region {
  name: string;
  coordinates: { latitude: number; longitude: number }[];
  count: number;
}

export const readCsvFile = async (): Promise<LightPost[]> => {
  try {
    const fileUri = FileSystem.documentDirectory + 'ilume-limpa.csv';
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const rows = fileContent.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1);

    return data.map((row) => ({
      id: row[headers.indexOf('ID')],
      latitude: parseFloat(row[headers.indexOf('LAT')]),
      longitude: parseFloat(row[headers.indexOf('LONG')]),
      local: row[headers.indexOf('LOCAL')],
    }));
  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error);
    return [];
  }
};

export const processLightPosts = (data: LightPost[]): { posts: LightPost[], regions: Region[] } => {
  const posts = data;

  const regions: Region[] = [
    {
      name: 'Centro',
      coordinates: [
        { latitude: -23.550520, longitude: -46.633309 },
        { latitude: -23.548891, longitude: -46.639531 },
        { latitude: -23.551462, longitude: -46.642450 },
        { latitude: -23.557152, longitude: -46.639832 },
        { latitude: -23.557152, longitude: -46.633309 },
      ],
      count: 0,
    },
    // Add other regions here
  ];

  posts.forEach((post) => {
    const region = regions.find((r) => isPointInPolygon(post, r.coordinates));
    if (region) {
      region.count++;
    }
  });

  return { posts, regions };
};

const isPointInPolygon = (point: LightPost, polygon: { latitude: number; longitude: number }[]): boolean => {
  let isInside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude, yi = polygon[i].longitude;
    const xj = polygon[j].latitude, yj = polygon[j].longitude;
    
    const intersect = ((yi > point.longitude) !== (yj > point.longitude))
        && (point.latitude < (xj - xi) * (point.longitude - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
  }
  return isInside;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const getLightStatus = async () => {
  const response = await axios.get(`${API_URL}/lights/status`);
  return response.data;
};

export const updateLightStatus = async (isOn: boolean, intensity: number) => {
  const response = await axios.post(`${API_URL}/lights/update`, { isOn, intensity });
  return response.data;
};