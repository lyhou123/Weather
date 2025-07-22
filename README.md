# Weather Pro - Enhanced Weather Application

A comprehensive, professional weather application built with Next.js, TypeScript, and Tailwind CSS. Features real-time weather data, forecasts, alerts, and advanced weather analytics.

## 🌟 Features

### Core Weather Features

- **Real-time Weather Data** - Current conditions with temperature, humidity, wind, and more
- **24-Hour Forecast** - Detailed hourly weather predictions
- **7-Day Forecast** - Extended daily weather outlook
- **Air Quality Monitoring** - AQI levels and pollutant tracking
- **Weather Alerts** - Real-time severe weather warnings and advisories

### Advanced Features

- **Saved Locations** - Bookmark favorite cities for quick access
- **Weather Comparison** - Compare weather conditions across multiple cities
- **Historical Weather** - Access past weather data for any date
- **Enhanced Search** - Search by city name, coordinates, or zip code
- **Auto-location Detection** - Automatic current location weather

### User Interface

- **Modern Design** - Clean, professional interface using Shadcn/ui components
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode Support** - Automatic theme detection
- **Interactive Components** - Smooth animations and transitions
- **Tabbed Navigation** - Organized content across multiple tabs

### Weather Metrics

- Temperature (feels like, min/max)
- Wind speed, direction, and gusts
- Humidity and dew point
- Atmospheric pressure
- Visibility and cloud cover
- UV index and sun hours
- Precipitation and rain chance
- Sunrise/sunset times
- Moon phase information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- WeatherStack API key (sign up at https://weatherstack.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lyhou123/Weather.git
   cd Weather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.development` file in the root directory:

   ```env
   WEATHERSTACK_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   Or go to the deployed version at [https://weather-ten-theta-51.vercel.app/](https://weather-ten-theta-51.vercel.app/)
