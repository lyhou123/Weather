import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  Moon,
  Wind,
  Droplets,
  Thermometer
} from "lucide-react"

interface WeatherWidgetProps {
  weather: {
    location: {
      name: string
      country: string
    }
    current: {
      temperature: number
      weather_descriptions: string[]
      weather_code: number
      wind_speed: number
      humidity: number
      is_day: string
    }
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'compact' | 'detailed'
}

export function WeatherWidget({ weather, size = 'md', variant = 'compact' }: WeatherWidgetProps) {
  const getWeatherIcon = (code: number, isDay = true) => {
    const iconClass = size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'
    
    if (code === 1000)
      return isDay ? <Sun className={`${iconClass} text-amber-400`} /> : <Moon className={`${iconClass} text-slate-300`} />
    if ([1003, 1006, 1009].includes(code)) return <Cloud className={`${iconClass} text-slate-400`} />
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(code))
      return <CloudRain className={`${iconClass} text-blue-400`} />
    if ([1066, 1210, 1213, 1216, 1219, 1222, 1225].includes(code))
      return <CloudSnow className={`${iconClass} text-blue-200`} />
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return <Zap className={`${iconClass} text-yellow-400`} />
    return <Sun className={`${iconClass} text-amber-400`} />
  }

  const cardPadding = size === 'sm' ? 'p-3' : size === 'md' ? 'p-4' : 'p-6'
  const titleSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
  const tempSize = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'

  if (variant === 'compact') {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className={cardPadding}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${titleSize}`}>{weather.location.name}</h3>
              <div className={`font-semibold ${tempSize}`}>{weather.current.temperature}°</div>
              <p className="text-xs text-slate-500">{weather.current.weather_descriptions[0]}</p>
            </div>
            {getWeatherIcon(weather.current.weather_code, weather.current.is_day === "yes")}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className={cardPadding}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${titleSize}`}>{weather.location.name}</h3>
              <p className="text-xs text-slate-500">{weather.location.country}</p>
            </div>
            {getWeatherIcon(weather.current.weather_code, weather.current.is_day === "yes")}
          </div>
          
          <div>
            <div className={`font-semibold ${tempSize} mb-1`}>{weather.current.temperature}°</div>
            <p className="text-sm text-slate-600">{weather.current.weather_descriptions[0]}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <Wind className="w-3 h-3 text-blue-500" />
              <span>{weather.current.wind_speed} km/h</span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="w-3 h-3 text-blue-500" />
              <span>{weather.current.humidity}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
