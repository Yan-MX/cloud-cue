import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherData, SunriseData } from '../types/api';

interface WeatherDetailProps {
  weatherData: WeatherData;
  sunriseData: SunriseData;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ weatherData, sunriseData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weather Details</Text>
      <Text style={styles.subtitle}>Location: {weatherData.lat}, {weatherData.lon}</Text>
      <Text style={styles.detail}>Temperature: {weatherData.temperature}°C</Text>
      <Text style={styles.detail}>Humidity: {weatherData.humidity}%</Text>
      <Text style={styles.detail}>Wind Speed: {weatherData.windSpeed} m/s</Text>
      <Text style={styles.detail}>Description: {weatherData.summaryDescription}</Text>
      <Text style={styles.title}>Sunrise and Sunset</Text>
      <Text style={styles.detail}>Sunrise: {sunriseData.sunriseTime.toLocaleTimeString()}</Text>
      <Text style={styles.detail}>Sunset: {sunriseData.sunsetTime.toLocaleTimeString()}</Text>
    </View>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
});