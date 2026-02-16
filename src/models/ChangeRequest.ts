import mongoose from "mongoose";

const ChangeRequestSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    type: String, // EMAIL or PASSWORD
    newValue: String,
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

export default mongoose.models.ChangeRequest ||
  mongoose.model("ChangeRequest", ChangeRequestSchema);
