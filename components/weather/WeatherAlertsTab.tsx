import React from "react";
import { Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  WeatherAlert,
  WeatherAlertTitle,
  WeatherAlertDescription,
} from "@/components/ui/weather-alert";
import { WeatherAlertType } from "@/lib/types";
import { getAlertVariant } from "@/lib/weather-utils";

interface WeatherAlertsTabProps {
  alerts: WeatherAlertType[];
}

export const WeatherAlertsTab: React.FC<WeatherAlertsTabProps> = ({
  alerts,
}) => {
  return (
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
                        <strong>Instruction:</strong> {alert.instruction}
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Areas: {alert.areas}</span>
                        <span>
                          Expires: {new Date(alert.expires).toLocaleString()}
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
  );
};
