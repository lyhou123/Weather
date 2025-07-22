import React from "react";
import { Activity, Sun, Sunrise, Sunset, Moon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AirQualityData } from "@/lib/types";
import { getAirQualityLevel } from "@/lib/weather-utils";

interface WeatherDetailsProps {
  airQuality: AirQualityData | null;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  airQuality,
}) => {
  return (
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
                  className={getAirQualityLevel(airQuality.us_epa_index).color}
                >
                  {getAirQualityLevel(airQuality.us_epa_index).level}
                </Badge>
              </div>
              <div className="text-xs text-slate-500 mb-3">
                {getAirQualityLevel(airQuality.us_epa_index).description}
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
  );
};
