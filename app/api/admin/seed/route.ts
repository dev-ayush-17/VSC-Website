import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import Team from "@/lib/models/Team";
import Gallery from "@/lib/models/Gallery";
import Settings from "@/lib/models/Settings";
import { isAuthenticated } from "@/lib/auth";
import { fallbackTeam, fallbackEvents, fallbackGallery } from "@/lib/data/fallback";

export async function POST() {
  const admin = await isAuthenticated();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const results: Record<string, string> = {};

    // Seed Teams
    const teamCount = await Team.countDocuments();
    if (teamCount === 0) {
      const teamData = fallbackTeam.map(({ _id, ...rest }) => rest);
      await Team.insertMany(teamData);
      results.teams = `Seeded ${teamData.length} team members`;
    } else {
      results.teams = `Skipped — ${teamCount} team members already exist`;
    }

    // Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const eventData = fallbackEvents.map(({ _id, ...rest }) => rest);
      await Event.insertMany(eventData);
      results.events = `Seeded ${eventData.length} events`;
    } else {
      results.events = `Skipped — ${eventCount} events already exist`;
    }

    // Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      const galleryData = fallbackGallery.map(({ _id, ...rest }) => rest);
      await Gallery.insertMany(galleryData);
      results.gallery = `Seeded ${galleryData.length} gallery items`;
    } else {
      results.gallery = `Skipped — ${galleryCount} gallery items already exist`;
    }

    // Seed Settings
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        navLinks: [
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: "Team", href: "/team" },
          { label: "Gallery", href: "/gallery" },
        ],
        footerQuickLinks: [
          { label: "About Us", href: "/#about-section" },
          { label: "Events", href: "/events" },
          { label: "Team", href: "/team" },
          { label: "Gallery", href: "/gallery" },
        ],
        aboutValues: [
          {
            icon: "BookOpen",
            title: "Knowledge",
            description: "Promoting intellectual growth through discussions, seminars, and study circles.",
          },
          {
            icon: "Users",
            title: "Service",
            description: "Dedicated to community service and social welfare activities.",
          },
          {
            icon: "Heart",
            title: "Character",
            description: "Building strong character inspired by Vivekananda's ideals.",
          },
        ],
      });
      results.settings = "Created default settings";
    } else {
      results.settings = "Skipped — settings already exist";
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
