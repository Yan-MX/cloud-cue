import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherSimpleCard from '../components/WeatherSimpleCard';
import { fetchWeatherData } from '../effect/get-weather-based-on-location';
import { WeatherData } from '../types/api';
import { getCurrentLocation } from '../utils/location';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const locations = []
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
      {loading &&  (
        <Text>Loading weather data...</Text>
      ) }
      <Text style={styles.title}>Cloud Cue</Text>
     {weatherData&& <WeatherSimpleCard weather={weatherData} />}
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