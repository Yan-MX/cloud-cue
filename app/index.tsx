import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCurrentLocation } from '../utils/location';
import { fetchWeatherData } from '../effect/get-weather-based-on-location';
import { WeatherData } from '../types/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const loadWeatherData = async () => {
    try {
      const location = await getCurrentLocation();
      const data = await fetchWeatherData(location.latitude, location.longitude);
      setWeatherData(data);
    } catch (error) {
      console.error('Error loading weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading weather data...</Text>
      ) : (
        <View>
          <Text>{ JSON.stringify(weatherData)  }</Text>
        </View>
      )}
      <Text style={styles.title}>Home!</Text>
      <Link
        href={{
          pathname: '/[location]',
          params: { location: 'berlin' }
        }}
      >
        <Text style={styles.link}>See weather detail based on location</Text>
      </Link>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: 'blue',
  },
});