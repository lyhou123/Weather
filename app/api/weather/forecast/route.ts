import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: { info: "Query parameter is required" } }, { status: 400 })
  }

  const API_KEY = process.env.WEATHERSTACK_API_KEY

  if (!API_KEY) {
    return NextResponse.json({ error: { info: "API key not configured" } }, { status: 500 })
  }

  try {
    // Note: Weatherstack free plan doesn't include forecast data
    // This is a mock response for demonstration
    const mockForecast = {
      forecast: {
        forecastday: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          day: {
            maxtemp_c: Math.round(20 + Math.random() * 15),
            mintemp_c: Math.round(10 + Math.random() * 10),
            avgtemp_c: Math.round(15 + Math.random() * 10),
            maxwind_kph: Math.round(10 + Math.random() * 20),
            totalprecip_mm: Math.round(Math.random() * 5),
            avghumidity: Math.round(50 + Math.random() * 30),
            condition: {
              text: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1000 + Math.floor(Math.random() * 100),
            },
            uv: Math.round(Math.random() * 10),
          },
          hour: Array.from({ length: 24 }, (_, h) => ({
            time: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + h * 60 * 60 * 1000).toISOString(),
            temp_c: Math.round(15 + Math.random() * 10),
            condition: {
              text: ["Sunny", "Partly Cloudy", "Cloudy"][Math.floor(Math.random() * 3)],
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1000 + Math.floor(Math.random() * 100),
            },
            wind_kph: Math.round(5 + Math.random() * 15),
            precip_mm: Math.round(Math.random() * 2),
            humidity: Math.round(40 + Math.random() * 40),
            chance_of_rain: Math.round(Math.random() * 100),
          })),
        })),
      },
    }

    return NextResponse.json(mockForecast)
  } catch (error) {
    console.error("Forecast API error:", error)
    return NextResponse.json({ error: { info: "Failed to fetch forecast data" } }, { status: 500 })
  }
}
