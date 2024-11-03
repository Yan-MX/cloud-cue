import { WeatherData } from "@constant/api";
import { transformWeatherData } from "@utils/mapping";
import { WEATHER_BASE_URL } from "@utils/url";

export async function fetchWeatherData(
  lat: number,
  lon: number,
): Promise<WeatherData> {
  try {
    const response = await fetch(`${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}`, {
      headers: {
        // Format required by API, see https://docs.api.met.no/doc/GettingStarted
        "User-Agent": "WeatherApp/0.1 github.com/Yan-MX/cloud-cue",
      },
    });
    const data = await response.json();
    return transformWeatherData(data, lat, lon);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
