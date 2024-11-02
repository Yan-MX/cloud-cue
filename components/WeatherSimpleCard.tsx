import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { WeatherData } from '../types/api';

interface WeatherCardProps {
  city: string;
  weather: WeatherData;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

export default function WeatherSimpleCard({ weather, city }: WeatherCardProps) {
  const router = useRouter();

  if (!weather) return null;

  const handlePress = () => {
    router.navigate(`/${city}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, { width: cardWidth }]}>
        <Text style={styles.location}>{city}</Text>
        <View style={styles.currentWeather}>
          <Text style={styles.temperature}>{Math.round(weather.temperature)}°C</Text>
        </View>
        <Text style={styles.description}>{weather.summaryDescription}</Text>
        <View style={styles.details}>
          <Text>Humidity: {weather.humidity}%</Text>
          <Text>Wind: {weather.windSpeed} m/s</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  details: {
    marginTop: 8,
  },
});