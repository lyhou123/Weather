import React from "react";
import { Sun, Gauge, Eye, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/lib/types";

interface WeatherMetricsProps {
  weather: WeatherData;
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ weather }) => {
  const metrics = [
    {
      label: "UV Index",
      value: weather.current.uv_index,
      icon: Sun,
      color: "text-orange-400",
    },
    {
      label: "Pressure",
      value: weather.current.pressure,
      unit: "mb",
      icon: Gauge,
      color: "text-blue-400",
    },
    {
      label: "Visibility",
      value: weather.current.visibility,
      unit: "km",
      icon: Eye,
      color: "text-slate-400",
    },
    {
      label: "Wind Direction",
      value: `${weather.current.wind_degree}°`,
      subtitle: weather.current.wind_dir,
      icon: Navigation,
      color: "text-green-400",
      style: {
        transform: `rotate(${weather.current.wind_degree}deg)`,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  {metric.unit && (
                    <p className="text-xs text-slate-400">{metric.unit}</p>
                  )}
                  {metric.subtitle && (
                    <p className="text-xs text-slate-400">{metric.subtitle}</p>
                  )}
                </div>
                <IconComponent
                  className={`w-8 h-8 ${metric.color}`}
                  style={metric.style}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
