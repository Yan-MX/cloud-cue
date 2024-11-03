import * as Location from "expo-location";
import {MyLocation} from "../types/api";

export const berlin: MyLocation = {name: "Berlin", lat: 52.52, lon: 13.405};
export const london: MyLocation = {name: "London", lat: 51.5074, lon: -0.1278};

export async function getCurrentLocation() {
  const {status} = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  const location = await Location.getCurrentPositionAsync({});
  // Reduce the number of decimal places to 4 to avoid potential 400 response,
  // based on API documentation https://docs.api.met.no/doc/GettingStarted
  return {
    latitude: parseFloat(location.coords.latitude.toFixed(4)),
    longitude: parseFloat(location.coords.longitude.toFixed(4)),
  };
}
