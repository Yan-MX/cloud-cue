/* eslint-disable @typescript-eslint/no-explicit-any */
import { SunriseData, TimePeriod, WeatherData, WeatherDetails } from "../types/api";

export function transformSunriseData(
  data: any,
  lat: number,
  lon: number
): SunriseData {
  const currentSunriseData = data.properties.sunrise;
  const currentSunsetData = data.properties.sunset;

  return {
    sunriseTime: new Date(currentSunriseData.time),
    sunsetTim
    e: new Date(currentSunsetData.time),
    lat: lat,
    lon: lon,
  };
}

export function transformWeatherData(
  data: any,
  lat: number,
  lon: number
): WeatherData {
  const currentWeather = data.properties.timeseries[0];
  const details: WeatherDetails = currentWeather.data.instant?.details;
  const next1Hour: TimePeriod = currentWeather.data.next_1_hours?.summary || {};
  const next6Hours: TimePeriod = currentWeather.data.next_6_hours?.details || {};

  return {
    temperature: details.air_temperature,
    humidity: details.relative_humidity,
    windSpeed: details.wind_speed,
    summaryDescription: getWeatherDescription(next1Hour.symbol_code || ""),
    temperatureMax: next6Hours.air_temperature_max ?? 0,
    temperatureMin: next6Hours.air_temperature_min ?? 0,
    lat: lat,
    lon: lon,
    airPressure: details.air_pressure_at_sea_level,
    ultravioletIndex: details.ultraviolet_index_clear_sky,
  };
}

export function getWeatherDescription(symbolCode: string): string {
  const descriptionMap: { [key: string]: string } = {
    clearsky_day: "Clear sky",
    clearsky_night: "Clear night",
    cloudy: "Cloudy",
    fair_day: "Fair",
    fair_night: "Fair night",
    fog: "Foggy",
    heavyrain: "Heavy rain",
    heavyrainandthunder: "Heavy rain and thunder",
    heavysleet: "Heavy sleet",
    heavysleetandthunder: "Heavy sleet and thunder",
    heavysnow: "Heavy snow",
    heavysnowandthunder: "Heavy snow and thunder",
    lightrain: "Light rain",
    lightrainandthunder: "Light rain and thunder",
    lightsleet: "Light sleet",
    lightsnow: "Light snow",
    partlycloudy_day: "Partly cloudy",
    partlycloudy_night: "Partly cloudy night",
    rain: "Rain",
    rainandthunder: "Rain and thunder",
    sleet: "Sleet",
    sleetandthunder: "Sleet and thunder",
    snow: "Snow",
    snowandthunder: "Snow and thunder",
  };

  return descriptionMap[symbolCode] || "Unknown weather";
}
