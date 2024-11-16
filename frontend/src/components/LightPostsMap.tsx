import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

interface LightPost {
  id: string;
  latitude: number;
  longitude: number;
  local: string;
}

interface Region {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  count: number;
}

interface LightPostsMapProps {
  lightPosts: LightPost[];
  regions: Region[];
}

const LightPostsMap: React.FC<LightPostsMapProps> = ({ lightPosts, regions }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
    >
      {regions.map((region: Region) => (
        <Polygon
          key={region.name}
          coordinates={region.coordinates}
          fillColor="rgba(0, 0, 255, 0.1)"
          strokeColor="rgba(0, 0, 255, 0.5)"
          strokeWidth={2}
        />
      ))}
      {lightPosts.map((post: LightPost) => (
        <Marker
          key={post.id}
          coordinate={{ latitude: post.latitude, longitude: post.longitude }}
          title={`Poste ${post.id}`}
          description={`Bairro: ${post.local}`}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LightPostsMap;