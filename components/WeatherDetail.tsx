import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherData, SunriseData } from '../types/api';
import { Ionicons } from '@expo/vector-icons';

interface WeatherDetailProps {
  weatherData: WeatherData;
  sunriseData: SunriseData;
  city: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ weatherData, sunriseData, city }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={styles.circle} />
        <View style={styles.rectangle} />
        <View style={styles.triangle} />
      </View>

      <Text style={styles.title}>{city}</Text>

      <View style={styles.card}>
        <View style={styles.redAccent} />
        <Text style={styles.sectionTitle}>Current Weather</Text>
        <View style={styles.weatherRow}>
          <Ionicons name="thermometer" size={28} color="#000000" />
          <Text style={styles.detail}>Temperature: {weatherData.temperature}°C</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="thermometer-outline" size={28} color="#000000" />
          <Text style={styles.detail}>Feels like: {weatherData.feelsLike}°C</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="water" size={28} color="#000000" />
          <Text style={styles.detail}>Humidity: {weatherData.humidity}%</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="speedometer" size={28} color="#000000" />
          <Text style={styles.detail}>Wind Speed: {weatherData.windSpeed} m/s</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="compass" size={28} color="#000000" />
          <Text style={styles.detail}>Wind Direction: {weatherData.windDeg}°</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="cloud-outline" size={28} color="#000000" />
          <Text style={styles.detail}>Description: {weatherData.summaryDescription}</Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="eye-outline" size={28} color="#000000" />
          <Text style={styles.detail}>Visibility: {weatherData.visibility / 1000} km</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.blueAccent} />
        <Text style={styles.sectionTitle}>Sun Times</Text>
        <View style={styles.weatherRow}>
          <Ionicons name="sunny-outline" size={28} color="#000000" />
          <Text style={styles.detail}>
            Sunrise: {new Date(sunriseData.sunriseTime).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="moon-outline" size={28} color="#000000" />
          <Text style={styles.detail}>
            Sunset: {new Date(sunriseData.sunsetTime).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.weatherRow}>
          <Ionicons name="time-outline" size={28} color="#000000" />
          <Text style={styles.detail}>
            Day Length: {Math.round((sunriseData.sunsetTime - sunriseData.sunriseTime) / (1000 * 60 * 60))}h
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 100,
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    opacity: 0.1,
  },
  rectangle: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: 150,
    height: 80,
    backgroundColor: '#DE0000',
    opacity: 0.1,
  },
  triangle: {
    position: 'absolute',
    top: '40%',
    left: '60%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#0000DE',
    opacity: 0.1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 32,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },
  redAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: '100%',
    backgroundColor: '#DE0000',
  },
  blueAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: '100%',
    backgroundColor: '#0000DE',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    marginLeft: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  detail: {
    fontSize: 16,
    marginLeft: 15,
    color: '#000000',
    fontWeight: '500',
    flex: 1,
  },
});

export default WeatherDetail;