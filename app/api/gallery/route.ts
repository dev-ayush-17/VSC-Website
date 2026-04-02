import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";
import { fallbackGallery } from "@/lib/data/fallback";

export async function GET() {
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ date: -1 });
    if (gallery.length > 0) {
      return NextResponse.json(gallery);
    }
    return NextResponse.json(fallbackGallery);
  } catch {
    return NextResponse.json(fallbackGallery);
  }
}
