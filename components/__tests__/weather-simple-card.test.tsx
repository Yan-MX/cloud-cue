import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import WeatherSimpleCard from "@components/WeatherSimpleCard";
import { useRouter } from "expo-router";
import { WeatherData } from "@constant/api";

// Mock the useRouter hook
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("WeatherSimpleCard Component", () => {
  test("renders weather data correctly", () => {
    const weatherData: WeatherData = {
      temperature: 20,
      temperatureMax: 25,
      temperatureMin: 15,
      humidity: 50,
      windSpeed: 5,
      summaryDescription: "Partly cloudy",
      lat: 52.52,
      lon: 13.405,
      airPressure: 1012,
      ultravioletIndex: 3,
    };

    const mockNavigate = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    render(<WeatherSimpleCard city="London" weather={weatherData} />);

    // Check if the city name is displayed
    expect(screen.getByText(/London/i)).toBeTruthy();

    // Check if the temperature is displayed
    expect(screen.getByText(/20°C/i)).toBeTruthy();

    // Check if the humidity is displayed
    expect(screen.getByText(/50%/i)).toBeTruthy();

    // Check if the wind speed is displayed
    expect(screen.getByText(/5 m\/s/i)).toBeTruthy();

    // Simulate a press event
    fireEvent.press(screen.getByText(/London/i));
    expect(mockNavigate).toHaveBeenCalledWith("/London");
  });

  test("navigates to WeatherDetails view on press", () => {
    const weatherData: WeatherData = {
      temperature: 20,
      temperatureMax: 25,
      temperatureMin: 15,
      humidity: 50,
      windSpeed: 5,
      summaryDescription: "Partly cloudy",
      lat: 52.52,
      lon: 13.405,
      airPressure: 1012,
      ultravioletIndex: 3,
    };

    const mockNavigate = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    render(<WeatherSimpleCard city="London" weather={weatherData} />);

    // Simulate a press event
    fireEvent.press(screen.getByText(/London/i));
    expect(mockNavigate).toHaveBeenCalledWith("/London");
  });
});
