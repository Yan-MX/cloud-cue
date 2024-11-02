import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import WeatherDetail from "../components/WeatherDetail";
import { fetchSunriseData } from "../effect/get-sunrise-based-on-location";
import { fetchWeatherData } from "../effect/get-weather-based-on-location";
import { SunriseData, WeatherData } from "../types/api";
import { getCurrentLocation } from "../utils/location";

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
  { weatherData && sunriseData &&  < WeatherDetail weatherData={weatherData} sunriseData={sunriseData} />}
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
