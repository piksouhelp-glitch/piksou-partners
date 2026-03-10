import { NextResponse } from "next/server"

const getBackendBaseUrl = () => {
  const rawBaseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || ""
  return rawBaseUrl.replace(/\/+$/, "").replace(/\/api$/i, "")
}

export async function POST(request: Request) {
  const baseUrl = getBackendBaseUrl()

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server is not configured with BASE_URL for partner contact forwarding." },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const upstreamUrl = `${baseUrl}/api/partners/contact/`

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const responseText = await upstreamResponse.text()
    let parsedBody: unknown = responseText

    if (responseText) {
      try {
        parsedBody = JSON.parse(responseText)
      } catch {
        parsedBody = { detail: responseText }
      }
    } else {
      parsedBody = {}
    }

    return NextResponse.json(parsedBody, { status: upstreamResponse.status })
  } catch {
    return NextResponse.json(
      { error: "Failed to reach upstream partner contact service." },
      { status: 502 },
    )
  }
}
