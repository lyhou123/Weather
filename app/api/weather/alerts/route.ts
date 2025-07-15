import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: { info: "Query parameter is required" } }, { status: 400 })
  }

  try {
    // Mock weather alerts data (Weatherstack doesn't provide alerts in free tier)
    const mockAlerts = {
      alerts: [
        {
          headline: "Heat Wave Warning",
          msgtype: "Alert",
          severity: "Moderate",
          urgency: "Expected",
          areas: "Metropolitan Area",
          category: "Met",
          certainty: "Likely",
          event: "Excessive Heat Warning",
          note: "Temperatures expected to reach 35°C+ for the next 3 days",
          effective: new Date().toISOString(),
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          desc: "An Excessive Heat Warning means that a prolonged period of dangerously hot temperatures will occur.",
          instruction: "Drink plenty of fluids, stay in an air-conditioned room, stay out of the sun, and check up on relatives and neighbors."
        },
        {
          headline: "Thunderstorm Watch",
          msgtype: "Alert", 
          severity: "Minor",
          urgency: "Future",
          areas: "Regional Area",
          category: "Met",
          certainty: "Possible",
          event: "Thunderstorm Watch",
          note: "Conditions favorable for severe thunderstorms this evening",
          effective: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          desc: "A Thunderstorm Watch means conditions are favorable for thunderstorm development.",
          instruction: "Stay indoors and avoid outdoor activities during thunderstorms."
        }
      ].filter(() => Math.random() > 0.3) // Randomly show alerts
    }

    return NextResponse.json(mockAlerts)
  } catch (error) {
    console.error("Weather Alerts API error:", error)
    return NextResponse.json({ error: { info: "Failed to fetch weather alerts" } }, { status: 500 })
  }
}
