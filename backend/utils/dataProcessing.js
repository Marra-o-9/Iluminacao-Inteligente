import * as FileSystem from 'expo-file-system';
import { parse } from 'csv-parse/sync';
import { Asset } from 'expo-asset';

export const readCsvFile = async (filename) => {
  try {
    const asset = Asset.fromModule(require('../assets/ilume-limpa.csv'));
    await asset.downloadAsync();
    const fileContent = await FileSystem.readAsStringAsync(asset.localUri);
    return parse(fileContent, { columns: true, skip_empty_lines: true });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return [];
  }
};

export const processLightPosts = (data) => {
  const posts = data.map((row) => ({
    id: row.ID,
    latitude: parseFloat(row.LAT),
    longitude: parseFloat(row.LONG),
    local: row.LOCAL,
  }));

  const regions = [
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
    // ... (other regions remain the same)
  ];

  posts.forEach((post) => {
    const region = regions.find((r) => isPointInPolygon(post, r.coordinates));
    if (region) {
      region.count++;
    }
  });

  return { posts, regions };
};

const isPointInPolygon = (point, polygon) => {
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