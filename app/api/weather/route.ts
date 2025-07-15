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
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch from Weatherstack API")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: { info: "Failed to fetch weather data" } }, { status: 500 })
  }
}
