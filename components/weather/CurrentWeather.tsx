import React from "react";
import { MapPin, Wind, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
import { getRainChance } from "@/lib/weather-utils";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  return (
    <Card className="lg:col-span-2 border-0 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{weather.location.name}</span>
            <span className="text-slate-400">•</span>
            <span>{weather.location.country}</span>
          </div>
          <div className="text-sm text-slate-500">
            {new Date(weather.location.localtime).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <WeatherIcon
              code={weather.current.weather_code}
              isDay={weather.current.is_day === "yes"}
              size="lg"
            />
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
                {weather.current.wind_speed} km/h {weather.current.wind_dir}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm text-slate-500">Humidity</div>
              <div className="font-medium">{weather.current.humidity}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
