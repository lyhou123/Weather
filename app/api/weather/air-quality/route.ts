import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: { info: "Query parameter is required" } }, { status: 400 })
  }

  try {
    // Mock air quality data for demonstration
    const mockAirQuality = {
      current: {
        co: Math.round(200 + Math.random() * 300),
        no2: Math.round(10 + Math.random() * 40),
        o3: Math.round(50 + Math.random() * 100),
        so2: Math.round(5 + Math.random() * 15),
        pm2_5: Math.round(5 + Math.random() * 25),
        pm10: Math.round(10 + Math.random() * 40),
        us_epa_index: Math.round(1 + Math.random() * 4),
        gb_defra_index: Math.round(1 + Math.random() * 4),
      },
    }

    return NextResponse.json(mockAirQuality)
  } catch (error) {
    console.error("Air Quality API error:", error)
    return NextResponse.json({ error: { info: "Failed to fetch air quality data" } }, { status: 500 })
  }
}
