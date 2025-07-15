import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queries = searchParams.get("queries")?.split(",") || []

  if (!queries.length || queries.length < 2) {
    return NextResponse.json({ error: { info: "At least 2 locations required for comparison" } }, { status: 400 })
  }

  const API_KEY = process.env.WEATHERSTACK_API_KEY

  if (!API_KEY) {
    return NextResponse.json({ error: { info: "API key not configured" } }, { status: 500 })
  }

  try {
    // Fetch weather data for multiple locations
    const weatherPromises = queries.slice(0, 5).map(async (query) => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(query.trim())}`,
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch weather for ${query}`)
        }
        
        const data = await response.json()
        return data
      } catch (error) {
        console.error(`Error fetching weather for ${query}:`, error)
        return null
      }
    })

    const results = await Promise.all(weatherPromises)
    const validResults = results.filter(result => result && !result.error)

    return NextResponse.json({
      locations: validResults,
      comparison: {
        temperature: {
          highest: Math.max(...validResults.map(r => r.current?.temperature || 0)),
          lowest: Math.min(...validResults.map(r => r.current?.temperature || 0)),
          average: Math.round(validResults.reduce((sum, r) => sum + (r.current?.temperature || 0), 0) / validResults.length)
        },
        humidity: {
          highest: Math.max(...validResults.map(r => r.current?.humidity || 0)),
          lowest: Math.min(...validResults.map(r => r.current?.humidity || 0)),
          average: Math.round(validResults.reduce((sum, r) => sum + (r.current?.humidity || 0), 0) / validResults.length)
        },
        wind: {
          highest: Math.max(...validResults.map(r => r.current?.wind_speed || 0)),
          lowest: Math.min(...validResults.map(r => r.current?.wind_speed || 0)),
          average: Math.round(validResults.reduce((sum, r) => sum + (r.current?.wind_speed || 0), 0) / validResults.length)
        }
      }
    })
  } catch (error) {
    console.error("Weather Comparison API error:", error)
    return NextResponse.json({ error: { info: "Failed to fetch comparison data" } }, { status: 500 })
  }
}
