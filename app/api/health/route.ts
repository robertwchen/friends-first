import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "friends-first",
    timestamp: new Date().toISOString()
  });
}

