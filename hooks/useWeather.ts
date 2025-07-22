import { useState, useEffect } from "react";
import {
  WeatherData,
  ForecastData,
  AirQualityData,
  WeatherAlertType,
  SavedLocation,
  ComparisonData,
  HistoricalWeatherData,
} from "@/lib/types";

export const useWeatherData = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlertType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `/api/weather?query=${encodeURIComponent(query)}`
      );
      if (!currentResponse.ok) throw new Error("Failed to fetch weather data");
      const currentData = await currentResponse.json();
      if (currentData.error) throw new Error(currentData.error.info);
      setWeather(currentData);

      // Fetch forecast data
      const forecastResponse = await fetch(
        `/api/weather/forecast?query=${encodeURIComponent(query)}`
      );
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        if (!forecastData.error)
          setForecast(forecastData.forecast?.forecastday || []);
      }

      // Fetch air quality data
      const airResponse = await fetch(
        `/api/weather/air-quality?query=${encodeURIComponent(query)}`
      );
      if (airResponse.ok) {
        const airData = await airResponse.json();
        if (!airData.error) setAirQuality(airData.current);
      }

      // Fetch weather alerts
      const alertsResponse = await fetch(
        `/api/weather/alerts?query=${encodeURIComponent(query)}`
      );
      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json();
        if (!alertsData.error) setAlerts(alertsData.alerts || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    weather,
    forecast,
    airQuality,
    alerts,
    loading,
    error,
    searchWeather,
  };
};

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("weatherFavorites");
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load saved locations:", err);
      }
    }
  }, []);

  const removeSavedLocation = (id: string) => {
    const updated = savedLocations.filter((loc) => loc.id !== id);
    setSavedLocations(updated);
    localStorage.setItem("weatherFavorites", JSON.stringify(updated));
  };

  const addSavedLocation = (location: SavedLocation) => {
    const updated = [...savedLocations, location];
    setSavedLocations(updated);
    localStorage.setItem("weatherFavorites", JSON.stringify(updated));
  };

  return {
    savedLocations,
    addSavedLocation,
    removeSavedLocation,
  };
};

export const useComparison = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null
  );
  const [comparisonQueries, setComparisonQueries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const compareLocations = async (queries: string[]) => {
    if (queries.length < 2) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/weather/compare?queries=${queries
          .map((q) => encodeURIComponent(q))
          .join(",")}`
      );
      if (response.ok) {
        const data = await response.json();
        if (!data.error) setComparisonData(data);
      }
    } catch (err) {
      console.error("Failed to fetch comparison data:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comparisonData,
    comparisonQueries,
    setComparisonQueries,
    compareLocations,
    loading,
  };
};

export const useHistoricalWeather = () => {
  const [historicalData, setHistoricalData] =
    useState<HistoricalWeatherData | null>(null);
  const [selectedHistoricalDate, setSelectedHistoricalDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistoricalWeather = async (query: string, date: string) => {
    if (!query.trim() || !date) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/weather/historical?query=${encodeURIComponent(
          query
        )}&date=${date}`
      );
      if (response.ok) {
        const data = await response.json();
        if (!data.error) setHistoricalData(data);
      }
    } catch (err) {
      console.error("Failed to fetch historical data:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    historicalData,
    selectedHistoricalDate,
    setSelectedHistoricalDate,
    fetchHistoricalWeather,
    loading,
  };
};
