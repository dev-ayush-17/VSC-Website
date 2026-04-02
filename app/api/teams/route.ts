import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/lib/models/Team";
import { fallbackTeam } from "@/lib/data/fallback";

export async function GET() {
  try {
    await connectDB();
    const teams = await Team.find().sort({ order: 1 });
    if (teams.length > 0) {
      return NextResponse.json(teams);
    }
    return NextResponse.json(fallbackTeam);
  } catch {
    return NextResponse.json(fallbackTeam);
  }
}
