import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {useRouter} from "expo-router";
import {WeatherData} from "../types/api";
import {Ionicons} from "@expo/vector-icons";

interface WeatherCardProps {
  city: string;
  weather: WeatherData;
}

const {width} = Dimensions.get("window");
const cardWidth = width * 0.85;

export default function WeatherSimpleCard({weather, city}: WeatherCardProps) {
  const router = useRouter();

  if (!weather) return null;

  const handlePress = () => {
    router.navigate(`/${city}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.yellowAccent} />
      <View style={[styles.card, {width: cardWidth}]}>
        <View style={styles.header}>
          <Text style={styles.location}>{city}</Text>
          <Text style={styles.temperature}>
            {Math.round(weather.temperature)}°C
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="water" size={16} color="#0000DE" />
            <Text style={styles.detailText}>{weather.humidity}%</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="speedometer" size={16} color="#DE0000" />
            <Text style={styles.detailText}>{weather.windSpeed} m/s</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    padding: 16,
    height: 110,
  },
  yellowAccent: {
    position: "absolute",
    top: 4,
    right: -4,
    width: 8,
    height: "100%",
    backgroundColor: "#FFD700",
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  temperature: {
    fontSize: 24,
    fontWeight: "700",
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
});
