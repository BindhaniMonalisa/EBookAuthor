export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Author from "@/models/Author";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user || user.role !== "author") {
            return errorResponse("Unauthorized", 401);
        }

        const author = await Author.findById(user.userId);
        if (!author) return errorResponse("Author not found", 404);

        return successResponse(author);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user || user.role !== "author") {
            return errorResponse("Unauthorized", 401);
        }

        const body = await req.json();
        const { name, mobile, profileImage } = body;

        const updatedAuthor = await Author.findByIdAndUpdate(
            user.userId,
            { name, mobile, profileImage },
            { new: true }
        );

        if (!updatedAuthor) return errorResponse("Author not found", 404);

        return successResponse(updatedAuthor, "Profile updated successfully");
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
