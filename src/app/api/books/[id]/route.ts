export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { z } from "zod";

const bookUpdateSchema = z.object({
    title: z.string().optional(),
    imageUrl: z.string().optional(),
    extraImages: z.array(z.string()).optional(),
    documents: z.array(z.object({
        label: z.string(),
        url: z.string()
    })).optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    discountedPrice: z.number().optional(),
    isStock: z.boolean().optional(),
    quantity: z.number().optional(),
    amazonAttributes: z.any().optional(),
});

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();
        const { id } = await params;
        const book = await Book.findById(id);
        if (!book) return errorResponse("Book not found", 404);
        return successResponse(book);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();
        const { id } = await params;
        const user = await getAuthUser();
        if (!user) return errorResponse("Unauthorized", 401);

        const body = await req.json();
        const validation = bookUpdateSchema.safeParse(body);
        if (!validation.success) {
            return errorResponse("Validation failed", 400, validation.error.format());
        }

        const book = await Book.findById(id);
        if (!book) return errorResponse("Book not found", 404);

        // Only author of the book or admin can update
        if (user.role === "author" && book.authorId.toString() !== user.userId) {
            return errorResponse("Forbidden", 403);
        }

        const updatedBook = await Book.findByIdAndUpdate(id, validation.data, { new: true });
        return successResponse(updatedBook, "Book updated successfully");
    } catch (error: any) {
        return errorResponse(error.message);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();
        const { id } = await params;
        const user = await getAuthUser();
        if (!user) return errorResponse("Unauthorized", 401);

        const book = await Book.findById(id);
        if (!book) return errorResponse("Book not found", 404);

        // Only admin can delete any book, or maybe Author can delete their own?
        // User requirement: "Admin can delete any book"
        // Usually Author should be able to delete their own too.
        if (user.role !== "admin" && (user.role !== "author" || book.authorId.toString() !== user.userId)) {
            return errorResponse("Forbidden", 403);
        }

        await Book.findByIdAndDelete(id);
        return successResponse(null, "Book deleted successfully");
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
