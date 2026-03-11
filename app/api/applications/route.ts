import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    status: "received",
    message: "MVP mock endpoint only. Persist this payload to Supabase in the next iteration.",
    payload: body
  });
}

