import { transformSunriseData } from "@utils/mapping";
import { SunriseData } from "@constant/api";

describe("transformSunriseData", () => {
  it("should transform sunrise data correctly", () => {
    const mockData = {
      properties: {
        sunrise: { time: "2023-10-01T06:00:00Z" },
        sunset: { time: "2023-10-01T18:00:00Z" },
      },
    };
    const lat = 40.7128;
    const lon = -74.006;

    const expected: SunriseData = {
      sunriseTime: new Date("2023-10-01T06:00:00Z"),
      sunsetTime: new Date("2023-10-01T18:00:00Z"),
      lat: lat,
      lon: lon,
    };

    const result = transformSunriseData(mockData, lat, lon);

    expect(result).toEqual(expected);
  });

  it("should handle missing sunrise or sunset data gracefully", () => {
    const mockData = {
      properties: {
        sunrise: { time: "2023-10-01T06:00:00Z" },
        sunset: {},
      },
    };
    const lat = 40.7128;
    const lon = -74.006;

    const expected: SunriseData = {
      sunriseTime: new Date("2023-10-01T06:00:00Z"),
      sunsetTime: new Date(NaN), // Invalid date
      lat: lat,
      lon: lon,
    };

    const result = transformSunriseData(mockData, lat, lon);

    expect(result.sunsetTime.toString()).toBe("Invalid Date");
    expect(result.sunriseTime).toEqual(expected.sunriseTime);
    expect(result.lat).toBe(expected.lat);
    expect(result.lon).toBe(expected.lon);
  });
});
