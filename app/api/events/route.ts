import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { fallbackEvents } from "@/lib/data/fallback";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: -1 });
    if (events.length > 0) {
      return NextResponse.json(events);
    }
    return NextResponse.json(fallbackEvents);
  } catch {
    return NextResponse.json(fallbackEvents);
  }
}
