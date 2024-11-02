import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import WeatherSimpleCard from '../components/WeatherSimpleCard';
import { useWeather } from '../context/WeatherContext';

const Home = () => {
  const { weatherDataByLocation } = useWeather();

  if (!weatherDataByLocation || Object.keys(weatherDataByLocation).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading weather data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cloud Cue</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(weatherDataByLocation).map(([name, weatherData], index) => (
          weatherData && <WeatherSimpleCard key={index} city={name} weather={weatherData} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});