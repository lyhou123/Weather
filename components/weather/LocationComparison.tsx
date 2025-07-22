import React from "react";
import { BarChart3, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComparisonData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";

interface LocationComparisonProps {
  comparisonData: ComparisonData | null;
  comparisonQueries: string[];
  setComparisonQueries: (queries: string[]) => void;
  onCompare: (queries: string[]) => void;
  loading: boolean;
}

export const LocationComparison: React.FC<LocationComparisonProps> = ({
  comparisonData,
  comparisonQueries,
  setComparisonQueries,
  onCompare,
  loading,
}) => {
  return (
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
            onClick={() => onCompare(comparisonQueries)}
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
                      High: {comparisonData.comparison.temperature.highest}°
                    </div>
                    <div>
                      Low: {comparisonData.comparison.temperature.lowest}°
                    </div>
                    <div>
                      Avg: {comparisonData.comparison.temperature.average}°
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
                      High: {comparisonData.comparison.humidity.highest}%
                    </div>
                    <div>Low: {comparisonData.comparison.humidity.lowest}%</div>
                    <div>
                      Avg: {comparisonData.comparison.humidity.average}%
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
                      High: {comparisonData.comparison.wind.highest} km/h
                    </div>
                    <div>Low: {comparisonData.comparison.wind.lowest} km/h</div>
                    <div>
                      Avg: {comparisonData.comparison.wind.average} km/h
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
                    <WeatherIcon
                      code={location.current.weather_code}
                      isDay={location.current.is_day === "yes"}
                    />
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
  );
};
