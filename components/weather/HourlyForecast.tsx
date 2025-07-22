import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ForecastData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  forecast: ForecastData[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  if (!forecast.length || !forecast[0].hour) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>24-Hour Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            Hourly forecast data not available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>24-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <WeatherIcon code={hour.condition.code} />
                </div>
                <div className="font-semibold text-lg mb-1">{hour.temp_c}°</div>
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
      </CardContent>
    </Card>
  );
};
