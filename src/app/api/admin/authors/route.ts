import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Author from "@/models/Author";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const authors = await Author.find().sort({ createdAt: -1 });
        return successResponse(authors);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
