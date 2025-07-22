export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    weather_code: number;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

export interface ForecastData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    precip_mm: number;
    humidity: number;
    chance_of_rain: number;
  }>;
}

export interface AirQualityData {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  us_epa_index: number;
  gb_defra_index: number;
}

export interface WeatherAlertType {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

export interface HistoricalWeatherData {
  location: WeatherData["location"];
  historical: {
    [date: string]: {
      date: string;
      date_epoch: number;
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
      };
      mintemp: number;
      maxtemp: number;
      avgtemp: number;
      totalsnow: number;
      sunhour: number;
      uv_index: number;
      hourly: Array<{
        time: string;
        temperature: number;
        wind_speed: number;
        wind_degree: number;
        wind_dir: string;
        weather_code: number;
        weather_icons: string[];
        weather_descriptions: string[];
        precip: number;
        humidity: number;
        visibility: number;
        pressure: number;
        cloudcover: number;
        heatindex: number;
        dewpoint: number;
        windchill: number;
        windgust: number;
        feelslike: number;
      }>;
    };
  };
}

export interface ComparisonData {
  locations: WeatherData[];
  comparison: {
    temperature: { highest: number; lowest: number; average: number };
    humidity: { highest: number; lowest: number; average: number };
    wind: { highest: number; lowest: number; average: number };
  };
}

export interface SavedLocation {
  id: string;
  name: string;
  query: string;
  country: string;
  addedAt: string;
}
