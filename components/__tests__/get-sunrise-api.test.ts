import { fetchSunriseData } from "@effect/get-sunrise-based-on-location";
import { transformSunriseData } from "@utils/mapping";
import { SUNRISE_BASE_URL } from "@utils/url";
import { SunriseData } from "@constant/api";

jest.mock("@utils/mapping");
jest.mock("@utils/url", () => ({
  SUNRISE_BASE_URL: "https://api.sunrise-sunset.org/json",
}));

describe("fetchSunriseData", () => {
  const lat = 40.7128;
  const lon = -74.006;
  const mockResponse = {
    results: {
      sunrise: "2023-10-01T10:00:00+00:00",
      sunset: "2023-10-01T22:00:00+00:00",
    },
    status: "OK",
  };
  const transformedData: SunriseData = {
    sunriseTime: new Date(mockResponse.results.sunrise),
    sunsetTime: new Date(mockResponse.results.sunset),
    lat,
    lon,
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response),
    ) as jest.Mock;
    (transformSunriseData as jest.Mock).mockReturnValue(transformedData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and transform sunrise data successfully", async () => {
    const result = await fetchSunriseData(lat, lon);

    expect(global.fetch).toHaveBeenCalledWith(
      `${SUNRISE_BASE_URL}?lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "WeatherApp/0.1 github.com/Yan-MX/cloud-cue",
        },
      },
    );
    expect(transformSunriseData).toHaveBeenCalledWith(mockResponse, lat, lon);
    expect(result).toEqual(transformedData);
  });

  it("should throw an error if fetch fails", async () => {
    const errorMessage = "Network error";
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchSunriseData(lat, lon)).rejects.toThrow(errorMessage);
  });
});
