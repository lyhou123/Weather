"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  WeatherAlert,
  WeatherAlertTitle,
  WeatherAlertDescription,
} from "@/components/ui/weather-alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sun,
  Cloud,
  CloudRain,
  AlertCircle,
  Sunrise,
  Sunset,
  Moon,
  Activity,
  Navigation,
  Zap,
  CloudSnow,
  Star,
  BarChart3,
  Thermometer,
  History,
  X,
  Shield,
} from "lucide-react";

interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    weather_code: number;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

interface ForecastData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    precip_mm: number;
    humidity: number;
    chance_of_rain: number;
  }>;
}

interface AirQualityData {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  us_epa_index: number;
  gb_defra_index: number;
}

interface WeatherAlertType {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

interface HistoricalWeatherData {
  location: WeatherData["location"];
  historical: {
    [date: string]: {
      date: string;
      date_epoch: number;
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
      };
      mintemp: number;
      maxtemp: number;
      avgtemp: number;
      totalsnow: number;
      sunhour: number;
      uv_index: number;
      hourly: Array<{
        time: string;
        temperature: number;
        wind_speed: number;
        wind_degree: number;
        wind_dir: string;
        weather_code: number;
        weather_icons: string[];
        weather_descriptions: string[];
        precip: number;
        humidity: number;
        visibility: number;
        pressure: number;
        cloudcover: number;
        heatindex: number;
        dewpoint: number;
        windchill: number;
        windgust: number;
        feelslike: number;
      }>;
    };
  };
}

interface ComparisonData {
  locations: WeatherData[];
  comparison: {
    temperature: { highest: number; lowest: number; average: number };
    humidity: { highest: number; lowest: number; average: number };
    wind: { highest: number; lowest: number; average: number };
  };
}

interface SavedLocation {
  id: string;
  name: string;
  query: string;
  country: string;
  addedAt: string;
}

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("current");

  // New state for additional features
  const [alerts, setAlerts] = useState<WeatherAlertType[]>([]);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null
  );
  const [comparisonQueries, setComparisonQueries] = useState<string[]>([]);
  const [historicalData, setHistoricalData] =
    useState<HistoricalWeatherData | null>(null);
  const [selectedHistoricalDate, setSelectedHistoricalDate] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

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

  // New functions for additional features
  const fetchHistoricalWeather = async (date: string) => {
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

  const saveLocation = () => {
    if (!weather) return;

    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: weather.location.name,
      query: query,
      country: weather.location.country,
      addedAt: new Date().toISOString(),
    };

    const saved = [...savedLocations, newLocation];
    setSavedLocations(saved);
    localStorage.setItem("weatherFavorites", JSON.stringify(saved));
  };

  const removeSavedLocation = (id: string) => {
    const updated = savedLocations.filter((loc) => loc.id !== id);
    setSavedLocations(updated);
    localStorage.setItem("weatherFavorites", JSON.stringify(updated));
  };

  const loadSavedLocation = (location: SavedLocation) => {
    setQuery(location.query);
    setShowFavorites(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchWeather();
  };

  const getWeatherIcon = (code: number, isDay = true) => {
    // Weather codes mapping
    if (code === 1000)
      return isDay ? (
        <Sun className="w-8 h-8 text-amber-400" />
      ) : (
        <Moon className="w-8 h-8 text-slate-300" />
      );
    if ([1003, 1006, 1009].includes(code))
      return <Cloud className="w-8 h-8 text-slate-400" />;
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(code))
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    if ([1066, 1210, 1213, 1216, 1219, 1222, 1225].includes(code))
      return <CloudSnow className="w-8 h-8 text-blue-200" />;
    if ([1087, 1273, 1276, 1279, 1282].includes(code))
      return <Zap className="w-8 h-8 text-yellow-400" />;
    return <Sun className="w-8 h-8 text-amber-400" />;
  };

  const getAirQualityLevel = (index: number) => {
    if (index <= 50)
      return {
        level: "Good",
        color: "bg-green-100 text-green-800",
        description: "Air quality is satisfactory",
      };
    if (index <= 100)
      return {
        level: "Moderate",
        color: "bg-yellow-100 text-yellow-800",
        description: "Air quality is acceptable",
      };
    if (index <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "bg-orange-100 text-orange-800",
        description: "Sensitive people may experience symptoms",
      };
    if (index <= 200)
      return {
        level: "Unhealthy",
        color: "bg-red-100 text-red-800",
        description: "Everyone may experience symptoms",
      };
    return {
      level: "Very Unhealthy",
      color: "bg-purple-100 text-purple-800",
      description: "Health alert for everyone",
    };
  };

  const getRainChance = (precip: number, humidity: number) => {
    if (precip > 0) return Math.min(90, precip * 10 + humidity * 0.5);
    return Math.max(0, (humidity - 60) * 2);
  };

  const getAlertVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "severe":
        return "destructive";
      case "moderate":
        return "warning";
      case "minor":
        return "info";
      default:
        return "default";
    }
  };

  useEffect(() => {
    // Load saved locations from localStorage
    const saved = localStorage.getItem("weatherFavorites");
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load saved locations:", err);
      }
    }

    // Auto-detect location on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery(`${latitude},${longitude}`);
        },
        () => {
          // Fallback to a default location
          setQuery("London");
        }
      );
    }
  }, []);

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
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search for a city or coordinates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-32 h-14 text-lg border-0 bg-white shadow-sm focus:shadow-md transition-shadow"
            />
            <div className="absolute right-2 top-2 flex gap-2">
              <Dialog open={showFavorites} onOpenChange={setShowFavorites}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 px-3">
                    <Star className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Saved Locations</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {savedLocations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50"
                      >
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => loadSavedLocation(location)}
                        >
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-slate-500">
                            {location.country}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSavedLocation(location.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {savedLocations.length === 0 && (
                      <div className="text-center py-4 text-slate-500">
                        No saved locations
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button type="submit" disabled={loading} className="h-10 px-6">
                {loading ? "..." : "Search"}
              </Button>
            </div>
          </form>
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert, index) => (
              <WeatherAlert
                key={index}
                variant={getAlertVariant(alert.severity)}
              >
                <Shield className="h-4 w-4" />
                <WeatherAlertTitle>{alert.headline}</WeatherAlertTitle>
                <WeatherAlertDescription>
                  <div className="space-y-2">
                    <p>{alert.desc}</p>
                    <div className="text-xs">
                      <strong>Areas:</strong> {alert.areas} |{" "}
                      <strong>Expires:</strong>{" "}
                      {new Date(alert.expires).toLocaleString()}
                    </div>
                  </div>
                </WeatherAlertDescription>
              </WeatherAlert>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50 max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-12 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Weather Data */}
        {weather && !loading && (
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
                {/* Main Weather */}
                <Card className="lg:col-span-2 border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">
                          {weather.location.name}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{weather.location.country}</span>
                      </div>
                      <div className="text-sm text-slate-500">
                        {new Date(weather.location.localtime).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-6">
                        {getWeatherIcon(
                          weather.current.weather_code,
                          weather.current.is_day === "yes"
                        )}
                        <div>
                          <div className="text-6xl font-light text-slate-900 mb-1">
                            {weather.current.temperature}°
                          </div>
                          <div className="text-slate-500">
                            Feels like {weather.current.feelslike}°
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-medium text-slate-700 mb-2">
                          {weather.current.weather_descriptions[0]}
                        </div>
                        <div className="space-y-1">
                          <Badge className="bg-blue-100 text-blue-800 border-0">
                            {getRainChance(
                              weather.current.precip,
                              weather.current.humidity
                            ).toFixed(0)}
                            % chance of rain
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <Wind className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="text-sm text-slate-500">Wind</div>
                          <div className="font-medium">
                            {weather.current.wind_speed} km/h{" "}
                            {weather.current.wind_dir}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="text-sm text-slate-500">Humidity</div>
                          <div className="font-medium">
                            {weather.current.humidity}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rain & Precipitation */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CloudRain className="w-5 h-5 text-blue-500" />
                      Precipitation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Chance of Rain</span>
                        <span className="font-medium">
                          {getRainChance(
                            weather.current.precip,
                            weather.current.humidity
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={getRainChance(
                          weather.current.precip,
                          weather.current.humidity
                        )}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Precipitation</span>
                        <span className="font-medium">
                          {weather.current.precip} mm
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cloud Cover</span>
                        <span className="font-medium">
                          {weather.current.cloudcover}%
                        </span>
                      </div>
                      <Progress
                        value={weather.current.cloudcover}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">UV Index</p>
                        <p className="text-2xl font-semibold">
                          {weather.current.uv_index}
                        </p>
                      </div>
                      <Sun className="w-8 h-8 text-orange-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Pressure</p>
                        <p className="text-2xl font-semibold">
                          {weather.current.pressure}
                        </p>
                        <p className="text-xs text-slate-400">mb</p>
                      </div>
                      <Gauge className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Visibility</p>
                        <p className="text-2xl font-semibold">
                          {weather.current.visibility}
                        </p>
                        <p className="text-xs text-slate-400">km</p>
                      </div>
                      <Eye className="w-8 h-8 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Wind Direction</p>
                        <p className="text-2xl font-semibold">
                          {weather.current.wind_degree}°
                        </p>
                        <p className="text-xs text-slate-400">
                          {weather.current.wind_dir}
                        </p>
                      </div>
                      <Navigation
                        className="w-8 h-8 text-green-400"
                        style={{
                          transform: `rotate(${weather.current.wind_degree}deg)`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>24-Hour Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  {forecast.length > 0 && forecast[0].hour ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {forecast[0].hour.slice(0, 24).map((hour, index) => {
                        const hourTime = new Date(hour.time).getHours();
                        const currentHour = new Date().getHours();

                        const isCurrentHour = hourTime === currentHour;

                        return (
                          <div
                            key={index}
                            className={`text-center p-4 rounded-lg bg-slate-50 ${
                              isCurrentHour ? "border-2 border-yellow-400" : ""
                            }`}
                          >
                            <div className="text-sm text-slate-500 mb-2">
                              {new Date(hour.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="flex justify-center mb-2">
                              {getWeatherIcon(hour.condition.code)}
                            </div>
                            <div className="font-semibold text-lg mb-1">
                              {hour.temp_c}°
                            </div>
                            <div className="text-xs text-blue-600 mb-1">
                              {hour.chance_of_rain}% rain
                            </div>
                            <div className="text-xs text-slate-500">
                              {hour.wind_kph} km/h
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      Hourly forecast data not available
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>7-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  {forecast.length > 0 ? (
                    <div className="space-y-4">
                      {forecast.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium w-20">
                              {index === 0
                                ? "Today"
                                : new Date(day.date).toLocaleDateString([], {
                                    weekday: "short",
                                  })}
                            </div>
                            {getWeatherIcon(day.day.condition.code)}
                            <div className="text-sm text-slate-600">
                              {day.day.condition.text}
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1">
                              <CloudRain className="w-4 h-4 text-blue-400" />
                              <span>{day.day.totalprecip_mm}mm</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Wind className="w-4 h-4 text-slate-400" />
                              <span>{day.day.maxwind_kph} km/h</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">
                                {day.day.maxtemp_c}°
                              </span>
                              <span className="text-slate-500">
                                {day.day.mintemp_c}°
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      7-day forecast data not available
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Air Quality */}
                {airQuality && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" />
                        Air Quality
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Overall AQI</span>
                          <Badge
                            className={
                              getAirQualityLevel(airQuality.us_epa_index).color
                            }
                          >
                            {getAirQualityLevel(airQuality.us_epa_index).level}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500 mb-3">
                          {
                            getAirQualityLevel(airQuality.us_epa_index)
                              .description
                          }
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>PM2.5</span>
                          <span>{airQuality.pm2_5} μg/m³</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>PM10</span>
                          <span>{airQuality.pm10} μg/m³</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ozone (O₃)</span>
                          <span>{airQuality.o3} μg/m³</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Nitrogen Dioxide (NO₂)</span>
                          <span>{airQuality.no2} μg/m³</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sun & Moon */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-amber-500" />
                      Sun & Moon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sunrise className="w-4 h-4 text-orange-400" />
                        <span className="text-sm">Sunrise</span>
                      </div>
                      <span className="font-medium">6:42 AM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sunset className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">Sunset</span>
                      </div>
                      <span className="font-medium">7:18 PM</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Moon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">Moon Phase</span>
                      </div>
                      <span className="font-medium">Waxing Crescent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daylight</span>
                      <span className="font-medium">12h 36m</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* New Alert Management Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Weather Alerts & Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {alerts.length > 0 ? (
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <WeatherAlert
                          key={index}
                          variant={getAlertVariant(alert.severity)}
                          className="p-6"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <WeatherAlertTitle className="text-lg">
                                {alert.event}
                              </WeatherAlertTitle>
                              <Badge
                                variant={
                                  alert.severity === "Severe"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {alert.severity}
                              </Badge>
                            </div>
                            <WeatherAlertDescription>
                              <div className="space-y-2">
                                <p className="font-medium">{alert.headline}</p>
                                <p>{alert.desc}</p>
                                <div className="text-sm bg-slate-50 p-3 rounded">
                                  <strong>Instruction:</strong>{" "}
                                  {alert.instruction}
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                  <span>Areas: {alert.areas}</span>
                                  <span>
                                    Expires:{" "}
                                    {new Date(alert.expires).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </WeatherAlertDescription>
                          </div>
                        </WeatherAlert>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">
                        No active weather alerts for this location
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Comparison Tab */}
            <TabsContent value="compare" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Compare Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Enter locations to compare (comma-separated)
                      </label>
                      <Input
                        placeholder="e.g., London, Paris, New York, Tokyo"
                        value={comparisonQueries.join(", ")}
                        onChange={(e) =>
                          setComparisonQueries(
                            e.target.value
                              .split(",")
                              .map((q) => q.trim())
                              .filter((q) => q)
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={() => compareLocations(comparisonQueries)}
                      disabled={comparisonQueries.length < 2 || loading}
                      className="w-full"
                    >
                      Compare Weather
                    </Button>
                  </div>

                  {comparisonData && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="text-center">
                            <Thermometer className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <h3 className="font-semibold">Temperature</h3>
                            <div className="text-sm text-slate-500 mt-2">
                              <div>
                                High:{" "}
                                {comparisonData.comparison.temperature.highest}°
                              </div>
                              <div>
                                Low:{" "}
                                {comparisonData.comparison.temperature.lowest}°
                              </div>
                              <div>
                                Avg:{" "}
                                {comparisonData.comparison.temperature.average}°
                              </div>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-center">
                            <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                            <h3 className="font-semibold">Humidity</h3>
                            <div className="text-sm text-slate-500 mt-2">
                              <div>
                                High:{" "}
                                {comparisonData.comparison.humidity.highest}%
                              </div>
                              <div>
                                Low: {comparisonData.comparison.humidity.lowest}
                                %
                              </div>
                              <div>
                                Avg:{" "}
                                {comparisonData.comparison.humidity.average}%
                              </div>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-center">
                            <Wind className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <h3 className="font-semibold">Wind Speed</h3>
                            <div className="text-sm text-slate-500 mt-2">
                              <div>
                                High: {comparisonData.comparison.wind.highest}{" "}
                                km/h
                              </div>
                              <div>
                                Low: {comparisonData.comparison.wind.lowest}{" "}
                                km/h
                              </div>
                              <div>
                                Avg: {comparisonData.comparison.wind.average}{" "}
                                km/h
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold">Location Details</h3>
                        {comparisonData.locations.map((location, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              {getWeatherIcon(
                                location.current.weather_code,
                                location.current.is_day === "yes"
                              )}
                              <div>
                                <div className="font-medium">
                                  {location.location.name}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {location.location.country}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-semibold">
                                {location.current.temperature}°
                              </div>
                              <div className="text-sm text-slate-500">
                                {location.current.weather_descriptions[0]}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Historical Weather Tab */}
            <TabsContent value="historical" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-500" />
                    Historical Weather
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select Date</label>
                      <Input
                        type="date"
                        value={selectedHistoricalDate}
                        onChange={(e) =>
                          setSelectedHistoricalDate(e.target.value)
                        }
                        max={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={() =>
                        fetchHistoricalWeather(selectedHistoricalDate)
                      }
                      disabled={!selectedHistoricalDate || !query || loading}
                      className="w-full"
                    >
                      Get Historical Data
                    </Button>
                  </div>

                  {historicalData &&
                    selectedHistoricalDate &&
                    historicalData.historical[selectedHistoricalDate] && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="p-4">
                            <div className="text-center">
                              <Thermometer className="w-8 h-8 text-red-400 mx-auto mb-2" />
                              <h3 className="font-semibold">Temperature</h3>
                              <div className="text-sm text-slate-500 mt-2">
                                <div>
                                  Max:{" "}
                                  {
                                    historicalData.historical[
                                      selectedHistoricalDate
                                    ].maxtemp
                                  }
                                  °
                                </div>
                                <div>
                                  Min:{" "}
                                  {
                                    historicalData.historical[
                                      selectedHistoricalDate
                                    ].mintemp
                                  }
                                  °
                                </div>
                                <div>
                                  Avg:{" "}
                                  {
                                    historicalData.historical[
                                      selectedHistoricalDate
                                    ].avgtemp
                                  }
                                  °
                                </div>
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="text-center">
                              <Sun className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                              <h3 className="font-semibold">Sun Hours</h3>
                              <div className="text-2xl font-semibold mt-2">
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].sunhour
                                }
                                h
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="text-center">
                              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                              <h3 className="font-semibold">UV Index</h3>
                              <div className="text-2xl font-semibold mt-2">
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].uv_index
                                }
                              </div>
                            </div>
                          </Card>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3">
                            Astronomical Data
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Sunrise className="w-4 h-4 text-orange-400" />
                              <span>
                                Sunrise:{" "}
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].astro.sunrise
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Sunset className="w-4 h-4 text-orange-600" />
                              <span>
                                Sunset:{" "}
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].astro.sunset
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Moon className="w-4 h-4 text-slate-400" />
                              <span>
                                Moonrise:{" "}
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].astro.moonrise
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Moon className="w-4 h-4 text-slate-600" />
                              <span>
                                Moonset:{" "}
                                {
                                  historicalData.historical[
                                    selectedHistoricalDate
                                  ].astro.moonset
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
