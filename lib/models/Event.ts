import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  registrationLink?: string;
  status: "upcoming" | "past" | "ongoing";
  highlights?: string[];
}

const EventSchema = new Schema<IEvent>(
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

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", EventSchema);
