import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  image: string;
  category: string;
  date?: string;
  description?: string;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", GallerySchema);
