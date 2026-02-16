import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  email: string;
  dob: Date;
  currentAddress: string;
  mobile: string;
  phone?: string;
  authorUrl: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  isActive: boolean;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  currentAddress: { type: String, required: true },
  mobile: { type: String, required: true },
  phone: { type: String },
  authorUrl: { type: String, required: true, unique: true },
  youtube: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  isActive: { type: Boolean, default: true },
  profileImage: { type: String },
}, { timestamps: true });

export default mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);
