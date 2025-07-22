"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";

// Import custom components
import { SearchBar } from "@/components/weather/SearchBar";
import { WeatherAlerts } from "@/components/weather/WeatherAlerts";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { PrecipitationCard } from "@/components/weather/PrecipitationCard";
import { WeatherMetrics } from "@/components/weather/WeatherMetrics";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { DailyForecast } from "@/components/weather/DailyForecast";
import { WeatherDetails } from "@/components/weather/WeatherDetails";
import { WeatherAlertsTab } from "@/components/weather/WeatherAlertsTab";
import { LocationComparison } from "@/components/weather/LocationComparison";
import { HistoricalWeather } from "@/components/weather/HistoricalWeather";
import { LoadingGrid } from "@/components/ui/loading";

import {
  useWeatherData,
  useSavedLocations,
  useComparison,
  useHistoricalWeather,
} from "@/hooks/useWeather";
import { SavedLocation } from "@/lib/types";

export default function WeatherApp() {
  const [activeTab, setActiveTab] = useState("current");
  const [showFavorites, setShowFavorites] = useState(false);

  // Custom hooks for state management
  const weatherData = useWeatherData();
  const savedLocations = useSavedLocations();
  const comparison = useComparison();
  const historical = useHistoricalWeather();

  const loadSavedLocation = (location: SavedLocation) => {
    weatherData.setQuery(location.query);
    setShowFavorites(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    weatherData.searchWeather();
  };

  // Auto-detect location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          weatherData.setQuery(`${latitude},${longitude}`);
        },
        () => {
          // Fallback to a default location
          weatherData.setQuery("Phnom Penh, Cambodia");
        }
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-slate-900 mb-2">
            Weather Pro
          </h1>
          <p className="text-slate-500">
            Professional weather insights and forecasts
          </p>
        </div>

        {/* Enhanced Search with Favorites */}
        <SearchBar
          query={weatherData.query}
          setQuery={weatherData.setQuery}
          onSubmit={handleSubmit}
          loading={weatherData.loading}
          savedLocations={savedLocations.savedLocations}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          onLoadSavedLocation={loadSavedLocation}
          onRemoveSavedLocation={savedLocations.removeSavedLocation}
        />

        {/* Weather Alerts */}
        <WeatherAlerts alerts={weatherData.alerts} />

        {/* Error */}
        {weatherData.error && (
          <Alert className="mb-8 border-red-200 bg-red-50 max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {weatherData.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {weatherData.loading && <LoadingGrid />}

        {/* Weather Data */}
        {weatherData.weather && !weatherData.loading && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">7-Day</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CurrentWeather weather={weatherData.weather} />
                <PrecipitationCard weather={weatherData.weather} />
              </div>
              <WeatherMetrics weather={weatherData.weather} />
            </TabsContent>

            <TabsContent value="hourly" className="space-y-6">
              <HourlyForecast forecast={weatherData.forecast} />
            </TabsContent>

            <TabsContent value="daily" className="space-y-6">
              <DailyForecast forecast={weatherData.forecast} />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <WeatherDetails airQuality={weatherData.airQuality} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <WeatherAlertsTab alerts={weatherData.alerts} />
            </TabsContent>

            <TabsContent value="compare" className="space-y-6">
              <LocationComparison
                comparisonData={comparison.comparisonData}
                comparisonQueries={comparison.comparisonQueries}
                setComparisonQueries={comparison.setComparisonQueries}
                onCompare={comparison.compareLocations}
                loading={comparison.loading}
              />
            </TabsContent>

            <TabsContent value="historical" className="space-y-6">
              <HistoricalWeather
                historicalData={historical.historicalData}
                selectedHistoricalDate={historical.selectedHistoricalDate}
                setSelectedHistoricalDate={historical.setSelectedHistoricalDate}
                onFetchHistorical={(date) =>
                  historical.fetchHistoricalWeather(weatherData.query, date)
                }
                query={weatherData.query}
                loading={historical.loading}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
