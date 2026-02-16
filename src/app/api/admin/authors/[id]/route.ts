import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Author from "@/models/Author";
import AuthorLogin from "@/models/AuthorLogin";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const user = await getAuthUser();

        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const { isActive } = await req.json();

        if (typeof isActive !== "boolean") {
            return errorResponse("isActive must be a boolean", 400);
        }

        // Update Author status
        const updatedAuthor = await Author.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!updatedAuthor) return errorResponse("Author not found", 404);

        // Sync with AuthorLogin
        await AuthorLogin.findOneAndUpdate({ authorId: id }, { isActive });

        return successResponse(updatedAuthor, `Author ${isActive ? "activated" : "deactivated"} successfully`);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
