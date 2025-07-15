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
   git clone <your-repo-url>
   cd nextjs-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   WEATHERSTACK_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 API Endpoints

### Current Weather
```
GET /api/weather?query={location}
```

### Forecast Data  
```
GET /api/weather/forecast?query={location}
```

### Air Quality
```
GET /api/weather/air-quality?query={location}
```

### Weather Alerts
```
GET /api/weather/alerts?query={location}
```

### Historical Weather
```
GET /api/weather/historical?query={location}&date={YYYY-MM-DD}
```

### Location Comparison
```
GET /api/weather/compare?queries={location1,location2,location3}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Weather API**: WeatherStack
- **Deployment**: Vercel (recommended)

## 📱 Features Breakdown

### Current Weather Tab
- Real-time temperature and conditions
- Wind speed and direction with compass
- Precipitation and cloud cover
- UV index, pressure, and visibility
- Animated weather icons

### Hourly Forecast Tab
- 24-hour detailed forecast
- Temperature trends
- Rain probability
- Wind conditions
- Weather condition icons

### Daily Forecast Tab
- 7-day weather outlook
- High/low temperatures
- Precipitation amounts
- Wind speeds
- Weather conditions

### Details Tab
- Comprehensive air quality data
- Sun and moon information
- Astronomical data
- Detailed weather metrics

### Alerts Tab
- Active weather warnings
- Severity levels and descriptions
- Affected areas and expiration times
- Safety instructions

### Compare Tab
- Multi-city weather comparison
- Temperature, humidity, wind analysis
- Side-by-side location data
- Statistical comparisons

### Historical Tab
- Past weather data lookup
- Temperature historical records
- Sun hours and UV data
- Astronomical historical information

## 🎨 UI Components

### Custom Components
- `WeatherAlert` - Alert notifications with severity levels
- `WeatherWidget` - Reusable weather display component
- `Dialog` - Modal dialogs for saved locations
- Enhanced `Card`, `Button`, `Input` components

### Weather Icons
Dynamic weather icons based on conditions:
- Sunny/Clear skies
- Cloudy/Partly cloudy
- Rainy conditions
- Snow and winter weather
- Thunderstorms
- Day/night variations

## 💾 Data Persistence

- **Local Storage**: Saved locations persist across sessions
- **Session Management**: Search history and preferences
- **Error Handling**: Graceful fallbacks for API failures

## 🔧 Configuration

### Environment Variables
```env
# Required
WEATHERSTACK_API_KEY=your_weatherstack_api_key

# Optional
NEXT_PUBLIC_APP_NAME="Weather Pro"
NEXT_PUBLIC_DEFAULT_LOCATION="London"
```

### API Rate Limits
- WeatherStack Free Plan: 1,000 calls/month
- Consider upgrading for production use
- Built-in error handling for rate limit exceeded

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherStack API](https://weatherstack.com) for weather data
- [Shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Lucide Icons](https://lucide.dev) for weather icons
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling

## 📞 Support

For support, email your-email@domain.com or create an issue on GitHub.

---

Built with ❤️ using modern web technologies
