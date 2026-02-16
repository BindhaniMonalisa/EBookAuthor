import mongoose, { Schema, Document } from "mongoose";

export interface IBookImage extends Document {
    bookId: mongoose.Types.ObjectId;
    imageUrl: string;
}

const BookImageSchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    imageUrl: { type: String, required: true },
});

export default mongoose.models.BookImage || mongoose.model<IBookImage>("BookImage", BookImageSchema);
