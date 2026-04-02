import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const admin = await isAuthenticated();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await isAuthenticated();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const item = await Gallery.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
