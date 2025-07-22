import React from "react";
import { CloudRain, Wind } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ForecastData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  forecast: ForecastData[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  if (!forecast.length) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            7-day forecast data not available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
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
                <WeatherIcon code={day.day.condition.code} />
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
                  <span className="font-semibold">{day.day.maxtemp_c}°</span>
                  <span className="text-slate-500">{day.day.mintemp_c}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
