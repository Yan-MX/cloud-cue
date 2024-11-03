import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import WeatherDetail from "../components/WeatherDetail";
import {useWeather} from "../context/WeatherContext";
import {SunriseData} from "../types/api";
import {fetchAndCacheSunriseData, getCachedSunriseData} from "../utils/cache";
import Error from "../components/Error";
export default function WeatherDetailBasedOnLocation() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingSunriseData, setLoadingSunriseData] = useState(true);
  const {location} = useLocalSearchParams();
  const [errorSunrise, setErrorSunrise] = useState<string | null>(null);
  const {myLocations, weatherDataByLocation} = useWeather();
  const currentLocation = myLocations.find((loc) => loc.name === location);
  const currentWeatherData = weatherDataByLocation[currentLocation.name];
  const [sunriseData, setSunriseData] = useState<SunriseData | null>(null);

  const loadSunriseData = async () => {
    try {
      const location = `${currentLocation.lat},${currentLocation.lon}`;
      const cachedData = await getCachedSunriseData(location);

      if (cachedData) {
        setSunriseData(cachedData);
      } else {
        const data = await fetchAndCacheSunriseData(
          currentLocation.lat,
          currentLocation.lon,
        );
        setSunriseData(data);
      }
    } catch (error) {
      setErrorSunrise(error.message);
    } finally {
      setLoadingSunriseData(false);
    }
  };

  useEffect(() => {
    loadSunriseData();
  }, []);

  if (errorSunrise) {
    return <Error message={errorSunrise} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={styles.circle} />
        <View style={styles.square} />
      </View>

      {!currentWeatherData || !sunriseData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DE0000" />
        </View>
      ) : (
        <WeatherDetail
          city={currentLocation.name}
          weatherData={currentWeatherData}
          sunriseData={sunriseData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: "absolute",
    top: "5%",
    left: "10%",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFD700",
    opacity: 0.1,
  },
  square: {
    position: "absolute",
    bottom: "15%",
    right: "10%",
    width: 100,
    height: 100,
    backgroundColor: "#0000DE",
    opacity: 0.1,
    transform: [{rotate: "45deg"}],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
