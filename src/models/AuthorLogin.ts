import mongoose, { Schema, Document } from "mongoose";

export interface IAuthorLogin extends Document {
  authorId: mongoose.Types.ObjectId;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
}

const AuthorLoginSchema: Schema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AuthorLogin || mongoose.model<IAuthorLogin>("AuthorLogin", AuthorLoginSchema);
