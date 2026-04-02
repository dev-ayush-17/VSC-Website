/* eslint-disable @typescript-eslint/no-require-imports */
/* Standalone seed script — run with: node scripts/seed.mjs */
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://anuragmishra3407_db_user:Eyd61iTbQPNhCCNj@vsc.qllxzs9.mongodb.net/vsc?appName=vsc";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    branch: { type: String },
    year: { type: String },
    category: {
      type: String,
      enum: ["professor", "leader", "coordinator", "core", "member"],
      required: true,
    },
    order: { type: Number, default: 0 },
    socials: {
      linkedin: String,
      instagram: String,
      twitter: String,
      whatsapp: String,
      email: String,
      github: String,
    },
  },
  { timestamps: true }
);

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    registrationLink: { type: String },
    status: {
      type: String,
      enum: ["upcoming", "past", "ongoing"],
      default: "upcoming",
    },
    highlights: [String],
  },
  { timestamps: true }
);

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const SettingsSchema = new mongoose.Schema(
  {
    heroTitle: { type: String },
    heroHighlight: { type: String },
    heroSubtitle: { type: String },
    heroQuote: { type: String },
    heroQuoteHindi: { type: String },
    heroDescription: { type: String },
    heroImage: { type: String },
    aboutTitle: { type: String },
    aboutSubtitle: { type: String },
    aboutDescription: { type: String },
    aboutImage: { type: String },
    aboutValues: [{ icon: String, title: String, description: String }],
    profName: { type: String },
    profTitle: { type: String },
    profImage: { type: String },
    profMessage: { type: String },
    navLinks: [{ label: String, href: String }],
    footerDescription: { type: String },
    footerQuickLinks: [{ label: String, href: String }],
    contactEmail: { type: String },
    contactPhone: { type: String },
    contactAddress: { type: String },
    socialLinks: {
      instagram: String,
      linkedin: String,
      twitter: String,
      youtube: String,
      facebook: String,
    },
    joinFormLink: { type: String },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);
const Event = mongoose.model("Event", EventSchema);
const Gallery = mongoose.model("Gallery", GallerySchema);
const Settings = mongoose.model("Settings", SettingsSchema);

const teamData = [
  {
    name: "Dr. Bhawani Shankar Das",
    role: "Professor In-Charge",
    image:
      "https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775075848/db5c0b86-f41d-4b3d-8f14-d6a1f63abfef.png",
    branch: "Department of CSE",
    category: "professor",
    order: 0,
    socials: { linkedin: "#", email: "bhawani@nitp.ac.in" },
  },
  {
    name: "Anurag Mishra",
    role: "Coordinator",
    image: "/images/gallery-4.png",
    branch: "Computer Science",
    year: "3rd Year",
    category: "leader",
    order: 1,
    socials: {
      linkedin: "#",
      instagram: "#",
      twitter: "#",
      email: "anuragm.ug24.cs@nitp.ac.in",
    },
  },
  {
    name: "Priya Sharma",
    role: "Co-Coordinator",
    image: "/images/gallery-2.png",
    branch: "Electronics",
    year: "3rd Year",
    category: "leader",
    order: 2,
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Rahul Kumar",
    role: "Technical Lead",
    image: "/images/gallery-1.png",
    branch: "Mechanical",
    year: "3rd Year",
    category: "leader",
    order: 3,
    socials: { linkedin: "#", instagram: "#", github: "#" },
  },
  {
    name: "Sneha Gupta",
    role: "Event Head",
    image: "/images/gallery-5.png",
    branch: "Civil",
    year: "2nd Year",
    category: "leader",
    order: 4,
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Vikash Singh",
    role: "Content Lead",
    image: "/images/gallery-3.png",
    branch: "ECE",
    year: "2nd Year",
    category: "coordinator",
    order: 5,
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Ananya Patel",
    role: "Design Lead",
    image: "/images/gallery-6.png",
    branch: "CSE",
    year: "2nd Year",
    category: "coordinator",
    order: 6,
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Rohan Verma",
    role: "Social Media Lead",
    image: "/images/gallery-7.png",
    branch: "EE",
    year: "2nd Year",
    category: "coordinator",
    order: 7,
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Kavya Nair",
    role: "Outreach Lead",
    image: "/images/gallery-8.png",
    branch: "Architecture",
    year: "2nd Year",
    category: "coordinator",
    order: 8,
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Amit Sinha",
    role: "Core Member",
    image: "/images/gallery-1.png",
    branch: "CSE",
    year: "1st Year",
    category: "core",
    order: 9,
    socials: { linkedin: "#" },
  },
  {
    name: "Ritu Kumari",
    role: "Core Member",
    image: "/images/gallery-2.png",
    branch: "ECE",
    year: "1st Year",
    category: "core",
    order: 10,
    socials: { linkedin: "#" },
  },
  {
    name: "Deepak Raj",
    role: "Core Member",
    image: "/images/gallery-3.png",
    branch: "ME",
    year: "1st Year",
    category: "core",
    order: 11,
    socials: { linkedin: "#" },
  },
  {
    name: "Nisha Kumari",
    role: "Core Member",
    image: "/images/gallery-4.png",
    branch: "CE",
    year: "1st Year",
    category: "core",
    order: 12,
    socials: { linkedin: "#" },
  },
];

const eventData = [
  {
    title: "Vivekananda Jayanti Celebration",
    description:
      "Join us for a grand celebration of Swami Vivekananda's 163rd birth anniversary. The event features inspirational talks, cultural performances, and a panel discussion on the relevance of Vivekananda's teachings in modern India.",
    date: "2026-01-12",
    venue: "Central Auditorium, NIT Patna",
    image: "/images/event-bg-1.png",
    category: "Cultural",
    status: "upcoming",
    highlights: [
      "Keynote by renowned speaker",
      "Cultural performances",
      "Essay competition",
    ],
  },
  {
    title: "Youth Leadership Summit 2026",
    description:
      "A two-day summit bringing together young leaders from across Bihar. Workshops on public speaking, leadership skills, and community building inspired by Swami Vivekananda's vision for Indian youth.",
    date: "2026-02-15",
    venue: "Seminar Hall, NIT Patna",
    image: "/images/event-bg-2.png",
    category: "Seminar",
    status: "upcoming",
    highlights: [
      "Expert workshops",
      "Networking sessions",
      "Certificate of participation",
    ],
  },
  {
    title: "Meditation & Mindfulness Workshop",
    description:
      "A weekend workshop on meditation techniques and mindfulness practices. Learn ancient Indian meditation methods adapted for the modern student lifestyle.",
    date: "2025-11-20",
    venue: "Yoga Center, NIT Patna",
    image: "/images/event-bg-3.png",
    category: "Workshop",
    status: "past",
    highlights: [
      "Guided meditation",
      "Stress management techniques",
      "Daily practice guide",
    ],
  },
  {
    title: "National Service Day — Campus Clean Drive",
    description:
      "Inspired by Vivekananda's call to serve humanity, we organize a campus-wide cleanliness and tree plantation drive.",
    date: "2025-09-15",
    venue: "NIT Patna Campus",
    image: "/images/event-bg-1.png",
    category: "Social Service",
    status: "past",
    highlights: ["Tree plantation", "Campus beautification", "Community lunch"],
  },
  {
    title: "Inter-College Debate Competition",
    description:
      "VSC proudly presents the annual inter-college debate competition. This year's theme: 'The Role of Spiritual Values in Modern Education.'",
    date: "2026-03-10",
    venue: "Main Auditorium, NIT Patna",
    image: "/images/event-bg-2.png",
    category: "Competition",
    status: "upcoming",
    highlights: [
      "Cash prizes",
      "Trophy for winners",
      "Guest judges from academia",
    ],
  },
  {
    title: "Book Reading: Complete Works of Vivekananda",
    description:
      "A monthly book reading circle where we explore the Complete Works of Swami Vivekananda.",
    date: "2025-12-05",
    venue: "Central Library, NIT Patna",
    image: "/images/event-bg-3.png",
    category: "Book Club",
    status: "past",
    highlights: [
      "Group discussion",
      "Key takeaways",
      "Reading materials provided",
    ],
  },
];

const galleryData = [
  { title: "Cultural Night 2025", image: "/images/gallery-1.png", category: "Cultural", date: "2025-10-15" },
  { title: "Leadership Seminar", image: "/images/gallery-2.png", category: "Seminar", date: "2025-09-20" },
  { title: "Campus Clean Drive", image: "/images/gallery-3.png", category: "Social Service", date: "2025-08-15" },
  { title: "Team VSC 2025", image: "/images/gallery-4.png", category: "Team", date: "2025-07-01" },
  { title: "Morning Yoga Session", image: "/images/gallery-5.png", category: "Wellness", date: "2025-06-21" },
  { title: "Debate Competition", image: "/images/gallery-6.png", category: "Competition", date: "2025-11-10" },
  { title: "Independence Day Celebration", image: "/images/gallery-7.png", category: "Cultural", date: "2025-08-15" },
  { title: "Book Reading Circle", image: "/images/gallery-8.png", category: "Book Club", date: "2025-12-05" },
  { title: "Vivekananda Jayanti 2025", image: "/images/gallery-1.png", category: "Cultural", date: "2025-01-12" },
  { title: "Freshers Orientation", image: "/images/gallery-4.png", category: "Team", date: "2025-08-01" },
  { title: "Workshop on Mindfulness", image: "/images/gallery-5.png", category: "Wellness", date: "2025-11-20" },
  { title: "Annual Day Celebration", image: "/images/gallery-7.png", category: "Cultural", date: "2025-03-15" },
];

const settingsData = {
  heroTitle: "Empowering",
  heroHighlight: "Today's Youth",
  heroSubtitle: "for Tomorrow.",
  heroQuote: '"Arise, awake, and stop not till the goal is reached."',
  heroQuoteHindi: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
  heroDescription:
    "Inspired by the timeless wisdom of Swami Vivekananda, we are a dynamic student community at NIT Patna dedicated to building a brighter future.",
  heroImage:
    "https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775134556/26853900-9fd1-4718-9029-8662a4dfa388.png",
  aboutTitle: "Our Inspiration & Story",
  aboutSubtitle: "Who We Are",
  aboutDescription:
    "The Vivekanand Study Circle (VSC) at NIT Patna draws its inspiration from the timeless teachings of Swami Vivekananda. Founded with the vision of nurturing well-rounded individuals, VSC serves as a platform for students to explore the depths of Indian philosophy while engaging in contemporary discourse.",
  aboutImage:
    "https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775135102/swami-vivekananda-meditation_bdlplp.jpg",
  aboutValues: [
    {
      icon: "BookOpen",
      title: "Knowledge",
      description:
        "Promoting intellectual growth through discussions, seminars, and study circles.",
    },
    {
      icon: "Users",
      title: "Service",
      description:
        "Dedicated to community service and social welfare activities.",
    },
    {
      icon: "Heart",
      title: "Character",
      description:
        "Building strong character inspired by Vivekananda's ideals.",
    },
  ],
  profName: "Dr. Bhawani Shankar Das",
  profTitle: "Professor In-Charge",
  profImage:
    "https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775075848/db5c0b86-f41d-4b3d-8f14-d6a1f63abfef.png",
  profMessage:
    "The Vivekanand Study Circle has been a transformative force at NIT Patna. Our mission is to cultivate the spirit of inquiry, service, and excellence among students, following the path illuminated by Swami Vivekananda.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
  ],
  footerDescription:
    "Inspired by Swami Vivekananda's vision, VSC NIT Patna empowers youth through knowledge, service, and character building.",
  footerQuickLinks: [
    { label: "About Us", href: "/#about-section" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
  ],
  contactEmail: "vsc@nitp.ac.in",
  contactPhone: "+91 612 237 1715",
  contactAddress: "NIT Patna, Ashok Rajpath, Patna, Bihar 800005",
  socialLinks: {
    instagram: "https://instagram.com/vsc_nitp",
    linkedin: "https://linkedin.com/company/vsc-nitp",
    twitter: "https://twitter.com/vsc_nitp",
    youtube: "",
    facebook: "",
  },
  joinFormLink: "#",
};

async function seed() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!\n");

    // Seed Teams
    const teamCount = await Team.countDocuments();
    if (teamCount === 0) {
      await Team.insertMany(teamData);
      console.log(`✅ Seeded ${teamData.length} team members`);
    } else {
      console.log(`⏭️  Skipped teams — ${teamCount} already exist`);
    }

    // Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(eventData);
      console.log(`✅ Seeded ${eventData.length} events`);
    } else {
      console.log(`⏭️  Skipped events — ${eventCount} already exist`);
    }

    // Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany(galleryData);
      console.log(`✅ Seeded ${galleryData.length} gallery items`);
    } else {
      console.log(`⏭️  Skipped gallery — ${galleryCount} already exist`);
    }

    // Seed Settings
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create(settingsData);
      console.log("✅ Created default settings");
    } else {
      console.log("⏭️  Skipped settings — already exist");
    }

    console.log("\n🎉 Database seeding complete!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
