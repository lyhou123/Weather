import React from "react";
import { Sun, Moon, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";
import { getWeatherIconType } from "@/lib/weather-utils";

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  size = "md",
  className = "",
}) => {
  const iconType = getWeatherIconType(code, isDay);

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  const baseClass = `${getSizeClass()} ${className}`;

  switch (iconType) {
    case "sun":
      return <Sun className={`${baseClass} text-amber-400`} />;
    case "moon":
      return <Moon className={`${baseClass} text-slate-300`} />;
    case "cloud":
      return <Cloud className={`${baseClass} text-slate-400`} />;
    case "rain":
      return <CloudRain className={`${baseClass} text-blue-400`} />;
    case "snow":
      return <CloudSnow className={`${baseClass} text-blue-200`} />;
    case "thunder":
      return <Zap className={`${baseClass} text-yellow-400`} />;
    default:
      return <Sun className={`${baseClass} text-amber-400`} />;
  }
};
