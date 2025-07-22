import React from "react";
import { CloudRain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WeatherData } from "@/lib/types";
import { getRainChance } from "@/lib/weather-utils";

interface PrecipitationCardProps {
  weather: WeatherData;
}

export const PrecipitationCard: React.FC<PrecipitationCardProps> = ({
  weather,
}) => {
  const rainChance = getRainChance(
    weather.current.precip,
    weather.current.humidity
  );

  return (
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
            <span className="font-medium">{rainChance.toFixed(0)}%</span>
          </div>
          <Progress value={rainChance} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Current Precipitation</span>
            <span className="font-medium">{weather.current.precip} mm</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Cloud Cover</span>
            <span className="font-medium">{weather.current.cloudcover}%</span>
          </div>
          <Progress value={weather.current.cloudcover} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
