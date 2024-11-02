import { transformSunriseData } from "../utils/mapping";
import { SunriseData } from "../types/api";
import { SUNRISE_BASE_URL } from "../utils/url";


export async function fetchSunriseData(
  lat: number,
  lon: number
): Promise<SunriseData> {
  try {
    const response = await fetch(`${SUNRISE_BASE_URL}?lat=${lat}&lon=${lon}`, {
      headers: {
        // Format required by API, see https://docs.api.met.no/doc/GettingStarted
        "User-Agent": "WeatherApp/0.1 github.com/Yan-MX/cloud-cue",
      },
    });
    const data = await response.json();
    return transformSunriseData(data, lat, lon);
  } catch (error) {
    console.error("Error fetching sunrise data:", error);
    throw error;
  }
}

