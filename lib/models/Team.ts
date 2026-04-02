import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  role: string;
  image: string;
  branch?: string;
  year?: string;
  category: "professor" | "leader" | "coordinator" | "core" | "member";
  order?: number;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    email?: string;
    github?: string;
  };
}

const TeamSchema = new Schema<ITeam>(
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

export default mongoose.models.Team ||
  mongoose.model<ITeam>("Team", TeamSchema);
