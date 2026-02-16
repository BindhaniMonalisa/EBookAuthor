import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    sku: string;
    isbn: string;
    title: string;
    imageUrl?: string;
    extraImages?: string[];
    documents?: { label: string; url: string }[];
    shortUrl: string;
    description: string;
    price: number;
    discountedPrice?: number;
    isStock: boolean;
    quantity: number;
    authorId: mongoose.Types.ObjectId;
    amazonAttributes: any;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema: Schema = new Schema({
    sku: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    extraImages: { type: [String], default: [] },
    documents: {
        type: [{
            label: { type: String, required: true },
            url: { type: String, required: true }
        }],
        default: []
    },
    shortUrl: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    isStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    amazonAttributes: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
