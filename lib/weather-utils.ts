export const getWeatherIconType = (code: number, isDay = true) => {
  // Weather codes mapping
  if (code === 1000) return isDay ? "sun" : "moon";
  if ([1003, 1006, 1009].includes(code)) return "cloud";
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(code)) return "rain";
  if ([1066, 1210, 1213, 1216, 1219, 1222, 1225].includes(code)) return "snow";
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "thunder";
  return "sun";
};

export const getAirQualityLevel = (index: number) => {
  if (index <= 50)
    return {
      level: "Good",
      color: "bg-green-100 text-green-800",
      description: "Air quality is satisfactory",
    };
  if (index <= 100)
    return {
      level: "Moderate",
      color: "bg-yellow-100 text-yellow-800",
      description: "Air quality is acceptable",
    };
  if (index <= 150)
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "bg-orange-100 text-orange-800",
      description: "Sensitive people may experience symptoms",
    };
  if (index <= 200)
    return {
      level: "Unhealthy",
      color: "bg-red-100 text-red-800",
      description: "Everyone may experience symptoms",
    };
  return {
    level: "Very Unhealthy",
    color: "bg-purple-100 text-purple-800",
    description: "Health alert for everyone",
  };
};

export const getRainChance = (precip: number, humidity: number) => {
  if (precip > 0) return Math.min(90, precip * 10 + humidity * 0.5);
  return Math.max(0, (humidity - 60) * 2);
};

export const getAlertVariant = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "severe":
      return "destructive";
    case "moderate":
      return "warning";
    case "minor":
      return "info";
    default:
      return "default";
  }
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions
) => {
  return new Date(dateString).toLocaleDateString(
    [],
    options || { weekday: "short" }
  );
};
