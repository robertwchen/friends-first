import { NextResponse } from "next/server";
import { stripeMvpNote } from "@/lib/stripe";

export async function POST() {
  return NextResponse.json({
    mode: "placeholder",
    message: "Replace with a SetupIntent or uncaptured PaymentIntent before production.",
    note: stripeMvpNote
  });
}

