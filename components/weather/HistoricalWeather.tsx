import React from "react";
import {
  History,
  Thermometer,
  Sun,
  Eye,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HistoricalWeatherData } from "@/lib/types";

interface HistoricalWeatherProps {
  historicalData: HistoricalWeatherData | null;
  selectedHistoricalDate: string;
  setSelectedHistoricalDate: (date: string) => void;
  onFetchHistorical: (date: string) => void;
  query: string;
  loading: boolean;
}

export const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({
  historicalData,
  selectedHistoricalDate,
  setSelectedHistoricalDate,
  onFetchHistorical,
  query,
  loading,
}) => {
  return (
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
              onChange={(e) => setSelectedHistoricalDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="mt-1"
            />
          </div>
          <Button
            onClick={() => onFetchHistorical(selectedHistoricalDate)}
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
                          historicalData.historical[selectedHistoricalDate]
                            .maxtemp
                        }
                        °
                      </div>
                      <div>
                        Min:{" "}
                        {
                          historicalData.historical[selectedHistoricalDate]
                            .mintemp
                        }
                        °
                      </div>
                      <div>
                        Avg:{" "}
                        {
                          historicalData.historical[selectedHistoricalDate]
                            .avgtemp
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
                        historicalData.historical[selectedHistoricalDate]
                          .sunhour
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
                        historicalData.historical[selectedHistoricalDate]
                          .uv_index
                      }
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Astronomical Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Sunrise className="w-4 h-4 text-orange-400" />
                    <span>
                      Sunrise:{" "}
                      {
                        historicalData.historical[selectedHistoricalDate].astro
                          .sunrise
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sunset className="w-4 h-4 text-orange-600" />
                    <span>
                      Sunset:{" "}
                      {
                        historicalData.historical[selectedHistoricalDate].astro
                          .sunset
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-slate-400" />
                    <span>
                      Moonrise:{" "}
                      {
                        historicalData.historical[selectedHistoricalDate].astro
                          .moonrise
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>
                      Moonset:{" "}
                      {
                        historicalData.historical[selectedHistoricalDate].astro
                          .moonset
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
};
