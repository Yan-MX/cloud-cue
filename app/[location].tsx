import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "../utils/location";
import { fetchWeatherData } from "../effect/get-weather-based-on-location";
import { SunriseData, WeatherData } from "../types/api";
import { fetchSunriseData } from "../effect/get-sunrise-based-on-location";

export default function WeatherDetailBasedOnLocation() {
  const { location } = useLocalSearchParams();
  //const router = useRouter();

  const [loadingWeatherData, setLoadingWeatherData] = useState(true);
  const [loadingSunriseData, setLoadingSunriseData] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [sunriseData, setSunriseData] = useState<SunriseData | null>(null);

  const loadWeatherData = async () => {
    try {
      const location = await getCurrentLocation();
      const data = await fetchWeatherData(
        location.latitude,
        location.longitude
      );
      setWeatherData(data);
    } catch (error) {
      console.error("Error loading weather in detail page:", error);
    } finally {
      setLoadingWeatherData(false);
    }
  };

  const loadSunriseData = async () => {
    try {
      const location = await getCurrentLocation();
      const data = await fetchSunriseData(
        location.latitude,
        location.longitude
      );
      setSunriseData(data);
    } catch (error) {
      console.error("Error loading sunrise data in detail page:", error);
    } finally {
      setLoadingSunriseData(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
    loadSunriseData();
  }, []);

  return (
    <View style={styles.container}>
      {loadingWeatherData && loadingSunriseData ? (
        <Text>Loading weather and sunrise data...</Text>
      ) : loadingWeatherData ? (
        <View>
          <Text>{JSON.stringify(weatherData)}</Text>
        </View>
      ) : loadingSunriseData ? (
        <View>
          <Text>{JSON.stringify(sunriseData)}</Text>
        </View>
      ) : (
        <View>
          <Text>
            {JSON.stringify(weatherData) + JSON.stringify(sunriseData)}
          </Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>Weather Detail Based on Location</Text>
        <Text>{location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
