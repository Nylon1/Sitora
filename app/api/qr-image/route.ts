import { NextRequest, NextResponse } from "next/server";

const allowedStyles = new Set(["square", "dot", "rounded"]);
const allowedFinderStyles = new Set(["square", "rounded", "circle"]);
const allowedFormats = new Set(["png", "svg"]);

function hex(value: string | null, fallback: string) {
  return value && /^[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const text = params.get("text")?.slice(0, 2000) || "https://sitora.co.uk";
  const format = allowedFormats.has(params.get("format") || "")
    ? params.get("format")!
    : "png";
  const dotStyle = allowedStyles.has(params.get("dotStyle") || "")
    ? params.get("dotStyle")!
    : "rounded";
  const finderStyle = allowedFinderStyles.has(params.get("finderStyle") || "")
    ? params.get("finderStyle")!
    : "rounded";

  const query = new URLSearchParams({
    text,
    format,
    size: "1000",
    margin: "3",
    dark: hex(params.get("dark"), "07111f"),
    light: hex(params.get("light"), "ffffff"),
    finderColor: hex(params.get("finderColor"), "0ea5e9"),
    dotStyle,
    finderStyle,
    finderDotStyle: finderStyle === "circle" ? "dot" : finderStyle,
    ecLevel: "H",
  });

  const response = await fetch(`https://quickchart.io/qr?${query.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to generate QR code" }, { status: 502 });
  }

  const body = await response.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      "Content-Type": format === "svg" ? "image/svg+xml" : "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
