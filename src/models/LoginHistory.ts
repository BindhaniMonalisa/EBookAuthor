import mongoose, { Schema, Document } from "mongoose";

export interface ILoginHistory extends Document {
    authorId: mongoose.Types.ObjectId;
    loginDate: Date;
    ipAddress: string;
}

const LoginHistorySchema: Schema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    loginDate: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
});

export default mongoose.models.LoginHistory || mongoose.model<ILoginHistory>("LoginHistory", LoginHistorySchema);
