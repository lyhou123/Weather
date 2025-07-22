import React from "react";
import { Shield } from "lucide-react";
import {
  WeatherAlert,
  WeatherAlertTitle,
  WeatherAlertDescription,
} from "@/components/ui/weather-alert";
import { WeatherAlertType } from "@/lib/types";
import { getAlertVariant } from "@/lib/weather-utils";

interface WeatherAlertsProps {
  alerts: WeatherAlertType[];
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      {alerts.map((alert, index) => (
        <WeatherAlert key={index} variant={getAlertVariant(alert.severity)}>
          <Shield className="h-4 w-4" />
          <WeatherAlertTitle>{alert.headline}</WeatherAlertTitle>
          <WeatherAlertDescription>
            <div className="space-y-2">
              <p>{alert.desc}</p>
              <div className="text-xs">
                <strong>Areas:</strong> {alert.areas} |{" "}
                <strong>Expires:</strong>{" "}
                {new Date(alert.expires).toLocaleString()}
              </div>
            </div>
          </WeatherAlertDescription>
        </WeatherAlert>
      ))}
    </div>
  );
};
