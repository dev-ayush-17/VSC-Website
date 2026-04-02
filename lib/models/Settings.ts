import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  // Hero Section
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroQuote: string;
  heroQuoteHindi: string;
  heroDescription: string;
  heroImage: string;

  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  aboutValues: { icon: string; title: string; description: string }[];

  // Professor Section
  profName: string;
  profTitle: string;
  profImage: string;
  profMessage: string;

  // Navbar Links
  navLinks: { label: string; href: string }[];

  // Footer
  footerDescription: string;
  footerQuickLinks: { label: string; href: string }[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Social Links
  socialLinks: {
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    facebook: string;
  };

  // Join / CTA
  joinFormLink: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    heroTitle: { type: String, default: "Empowering" },
    heroHighlight: { type: String, default: "Today's Youth" },
    heroSubtitle: { type: String, default: "for Tomorrow." },
    heroQuote: {
      type: String,
      default:
        '"Arise, awake, and stop not till the goal is reached."',
    },
    heroQuoteHindi: {
      type: String,
      default: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
    },
    heroDescription: {
      type: String,
      default:
        "Inspired by the timeless wisdom of Swami Vivekananda, we are a dynamic student community at NIT Patna dedicated to building a brighter future.",
    },
    heroImage: {
      type: String,
      default: "",
    },

    aboutTitle: { type: String, default: "Our Inspiration & Story" },
    aboutSubtitle: { type: String, default: "Who We Are" },
    aboutDescription: {
      type: String,
      default: "",
    },
    aboutImage: { type: String, default: "" },
    aboutValues: [
      {
        icon: { type: String, default: "BookOpen" },
        title: { type: String },
        description: { type: String },
      },
    ],

    profName: { type: String, default: "Dr. Bhawani Shankar Das" },
    profTitle: { type: String, default: "Professor In-Charge" },
    profImage: { type: String, default: "" },
    profMessage: { type: String, default: "" },

    navLinks: [
      {
        label: { type: String },
        href: { type: String },
      },
    ],

    footerDescription: {
      type: String,
      default:
        "Inspired by Swami Vivekananda's vision, VSC NIT Patna empowers youth through knowledge, service, and character building.",
    },
    footerQuickLinks: [
      {
        label: { type: String },
        href: { type: String },
      },
    ],
    contactEmail: { type: String, default: "vsc@nitp.ac.in" },
    contactPhone: { type: String, default: "" },
    contactAddress: {
      type: String,
      default: "NIT Patna, Ashok Rajpath, Patna, Bihar 800005",
    },

    socialLinks: {
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },

    joinFormLink: { type: String, default: "#" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
