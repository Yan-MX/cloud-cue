export interface WeatherData {
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  windSpeed: number;
  summaryDescription: string;
  lat: number;
  lon: number;
  airPressure: number;
  ultravioletIndex: number;
}

export interface WeatherDetails {
  air_temperature: number;
  relative_humidity: number;
  wind_speed: number;
  ultraviolet_index_clear_sky: number;
  air_pressure_at_sea_level
}

export interface TimePeriod {
  symbol_code?: string;
  air_temperature_max?: number;
  air_temperature_min?: number;
}

export interface SunriseData {
  sunriseTime: Date;
  sunsetTime: Date;
  lat: number;
  lon: number;
}
export interface MyLocation {
  lat: number;
  lon: number;
  name: string;
}

export interface WeatherDataByLocation {
  [name: string]: WeatherData | null;
}