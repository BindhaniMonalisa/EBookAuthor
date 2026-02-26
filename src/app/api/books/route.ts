export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import Author from "@/models/Author";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { z } from "zod";

const bookSchema = z.object({
    sku: z.string(),
    isbn: z.string(),
    title: z.string(),
    imageUrl: z.string().optional(),
    shortUrl: z.string(),
    description: z.string(),
    price: z.number(),
    discountedPrice: z.number().optional(),
    isStock: z.boolean().optional(),
    quantity: z.number().optional(),
    amazonAttributes: z.any().optional(),
});

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        // Ensure Author model is registered before populating
        Author;
        const user = await getAuthUser();

        let query = {};
        if (user?.role === "author") {
            query = { authorId: user.userId };
        } else if (user?.role === "admin") {
            query = {}; // Admin sees all
        } else {
            query = { isStock: true }; // Public sees in-stock books
        }

        const books = await Book.find(query).populate("authorId", "name profileImage").sort({ createdAt: -1 });
        return successResponse(books);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "author") {
            return errorResponse("Unauthorized", 401);
        }

        const body = await req.json();
        const validation = bookSchema.safeParse(body);
        if (!validation.success) {
            return errorResponse("Validation failed", 400, validation.error.format());
        }

        // Check for unique ISBN and shortUrl
        const existing = await Book.findOne({
            $or: [{ isbn: validation.data.isbn }, { shortUrl: validation.data.shortUrl }],
        });
        if (existing) {
            return errorResponse("ISBN or Short URL already exists", 400);
        }

        const newBook = await Book.create({
            ...validation.data,
            authorId: user.userId,
        });

        return successResponse(newBook, "Book created successfully", 201);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
