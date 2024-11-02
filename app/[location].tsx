import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import WeatherDetail from "../components/WeatherDetail";
import { useWeather } from "../context/WeatherContext";
import { fetchSunriseData } from "../effect/get-sunrise-based-on-location";
import { SunriseData, WeatherData } from "../types/api";

export default function WeatherDetailBasedOnLocation() {
  const [loadingWeatherData, setLoadingWeatherData] = useState(true);
  const [loadingSunriseData, setLoadingSunriseData] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { location } = useLocalSearchParams();
  const { myLocations,weatherDataByLocation } = useWeather();
  const currentLocation = myLocations.find((loc) => loc.name === location);
  const currentWeatherData = weatherDataByLocation[currentLocation.name];
const[sunriseData,setSunriseData]=useState<SunriseData | null>(null);

  const loadSunriseData = async () => {
    try {
      const data = await fetchSunriseData(
        currentLocation.lat,
        currentLocation.lon
      );
      setSunriseData(data);
    } catch (error) {
      console.error("Error loading sunrise data in detail page:", error);
    } finally {
      setLoadingSunriseData(false);
    }
  };

  useEffect(() => {
    loadSunriseData();
  }, []);

  return (
    <View style={styles.container}>
  { currentWeatherData && sunriseData &&  < WeatherDetail weatherData={currentWeatherData} sunriseData={sunriseData} />}
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
