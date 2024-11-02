import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WeatherData } from '../types/api';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherSimpleCard({ weather }: WeatherCardProps) {
  const router = useRouter();

  if (!weather) return null;

  const handlePress = () => {
    const location = `${weather.lat},${weather.lon}`;
    router.navigate(`/${location}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.location}>{weather.lat + ', ' + weather.lon}</Text>
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