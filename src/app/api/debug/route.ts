import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  console.log("ENV KEY:", process.env.OPENAI_API_KEY);

  return NextResponse.json({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "❌ undefined",
    keys: Object.keys(process.env),
  });
}