import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
  role: "MASTER";
  name?: string;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "MASTER" },
  name: { type: String },
  phone: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
