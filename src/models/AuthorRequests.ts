import mongoose, { Schema, Document } from "mongoose";

export interface IAuthorRequests extends Document {
    authorId: mongoose.Types.ObjectId;
    requestType: "EMAIL_CHANGE" | "PASSWORD_RESET";
    newEmail?: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestedAt: Date;
    reviewedBy?: mongoose.Types.ObjectId; // adminId
    reviewedAt?: Date;
}

const AuthorRequestsSchema: Schema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    requestType: { type: String, enum: ["EMAIL_CHANGE", "PASSWORD_RESET"], required: true },
    newEmail: { type: String },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    requestedAt: { type: Date, default: Date.now },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    reviewedAt: { type: Date },
});

export default mongoose.models.AuthorRequests || mongoose.model<IAuthorRequests>("AuthorRequests", AuthorRequestsSchema);
