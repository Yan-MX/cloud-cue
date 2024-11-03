import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSunriseData } from '../effect/get-sunrise-based-on-location';

const CACHE_KEY_PREFIX = 'sunriseDataCache';

const getCacheKey = (location) => `${CACHE_KEY_PREFIX}_${location}`;

const getTodayDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const getCachedSunriseData = async (location) => {
  const cacheKey = getCacheKey(location);
  const cachedData = await AsyncStorage.getItem(cacheKey);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (parsedData.date === getTodayDate()) {
      return parsedData.sunriseData;
    }
  }
  return null;
};

export const fetchAndCacheSunriseData = async (lat, lon) => {
  const location = `${lat},${lon}`;
  const cacheKey = getCacheKey(location);

  const data = await fetchSunriseData(lat, lon);
  const cacheValue = {
    date: getTodayDate(),
    sunriseData: data,
  };
  await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheValue));

  return data;
};