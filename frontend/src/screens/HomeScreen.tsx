// frontend/src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Box, Text, VStack, useColorModeValue, Spinner } from 'native-base';
import Header from '../components/Header';
import { readCsvFile, processLightPosts } from '../services/api';
import LightPostsMap from '../components/LightPostsMap';

const { height } = Dimensions.get('window');

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

const HomeScreen: React.FC = () => {
  const [lightPosts, setLightPosts] = useState<LightPost[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = useColorModeValue('coolGray.800', 'coolGray.900');
  const textColor = useColorModeValue('white', 'coolGray.100');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await readCsvFile();
        const { posts, regions } = processLightPosts(data);
        setLightPosts(posts);
        setRegions(regions);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Spinner size="lg" color="white" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Header title="Iluminação de São Paulo" />
      <VStack space={4} alignItems="center" width="100%" px={4}>
        <Box width="100%" height={height * 0.6}>
          <LightPostsMap lightPosts={lightPosts} regions={regions} />
        </Box>
        <Text fontSize="lg" color={textColor}>
          Total de Postes: {lightPosts.length}
        </Text>
        {regions.map((region) => (
          <Text key={region.name} fontSize="md" color={textColor}>
            {region.name}: {region.count} postes
          </Text>
        ))}
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;