import * as Location from "expo-location";

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  const location = await Location.getCurrentPositionAsync({});
  // Reduce the number of decimal places to 4 to avoid potential 400 response,
  // based on API documentation https://docs.api.met.no/doc/GettingStarted
  return {
    latitude: parseFloat(location.coords.latitude.toFixed(4)),
    longitude: parseFloat(location.coords.longitude.toFixed(4))
  };
}
