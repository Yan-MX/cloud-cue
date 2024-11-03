import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import WeatherSimpleCard from '../components/WeatherSimpleCard';
import { useWeather } from '../context/WeatherContext';
import Error from '../components/Error';
const Home = () => {
  const { weatherDataByLocation ,error} = useWeather();

  if(error){
    return (
      <Error message={error} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={styles.circle} />
        <View style={styles.square} />
        <View style={styles.triangle} />
      </View>

      <Text style={styles.title}>Cloud Cue</Text>

      {!weatherDataByLocation || Object.keys(weatherDataByLocation).length === 0 ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DE0000" />
      </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(weatherDataByLocation).map(([name, weatherData], index) => (
            weatherData && <WeatherSimpleCard key={index} city={name} weather={weatherData} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
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
    top: '15%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFD700',
    opacity: 0.1,
  },
  square: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: 100,
    height: 100,
    backgroundColor: '#DE0000',
    opacity: 0.1,
    transform: [{ rotate: '45deg' }],
  },
  triangle: {
    position: 'absolute',
    top: '50%',
    right: '20%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#0000DE',
    opacity: 0.1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    marginTop: 60,
    marginBottom: 30,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSquare: {
    width: 40,
    height: 40,
    backgroundColor: '#DE0000',
    transform: [{ rotate: '90deg' }],
  },
});

export default Home;