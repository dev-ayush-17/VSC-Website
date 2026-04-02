import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/lib/models/Settings";

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({});
  }
}
