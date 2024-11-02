import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchWeatherData } from '../effect/get-weather-based-on-location';
import { MyLocation, WeatherDataByLocation } from '../types/api';
import { berlin, getCurrentLocation, london } from '../utils/location'; // Ensure these functions are correctly implemented and imported

import { Dispatch, SetStateAction } from 'react';

interface WeatherContextProps {
  myLocations: MyLocation[];
  weatherDataByLocation: WeatherDataByLocation;
  setMyLocations: (locations: MyLocation[]) => void;
  setWeatherDataByLocation: Dispatch<SetStateAction<WeatherDataByLocation>>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}


export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [myLocations, setMyLocations] = useState<MyLocation[]>([berlin, london]);
  const [weatherDataByLocation, setWeatherDataByLocation] = useState<WeatherDataByLocation>({});

// add current location to myLocations
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setMyLocations(prevLocations => [
          { name: 'My Location', lat: location.latitude, lon: location.longitude },
          ...prevLocations,
        ]);
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };
    fetchCurrentLocation();
  }, []);

  // fetch weather data for all locations
  useEffect(() => {
    const fetchWeatherDataForLocations = async () => {
      try {
        const data = await Promise.all(
          myLocations.map(location => fetchWeatherData(location.lat, location.lon))
        );

        const weatherDataMap: WeatherDataByLocation = {};
        myLocations.forEach((location, index) => {
          weatherDataMap[location.name] = data[index];
        });

        setWeatherDataByLocation(weatherDataMap);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherDataForLocations();
  }, [myLocations]);

  return (
    <WeatherContext.Provider value={{ myLocations, weatherDataByLocation, setMyLocations, setWeatherDataByLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};