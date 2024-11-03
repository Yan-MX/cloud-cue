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
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
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
  const[error, setError] = useState<string | null>(null);
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
       setError(error.message);
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
        setError(error.message);
      }
    };
    fetchWeatherDataForLocations();
  }, [myLocations]);

  return (
    <WeatherContext.Provider value={{ myLocations, weatherDataByLocation, setMyLocations, setWeatherDataByLocation,error,setError }}>
      {children}
    </WeatherContext.Provider>
  );
};