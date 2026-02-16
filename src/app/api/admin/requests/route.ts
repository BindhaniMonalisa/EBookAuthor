import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import AuthorRequests from "@/models/AuthorRequests";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") || "PENDING";

        const requests = await AuthorRequests.find({ status })
            .populate("authorId", "name email")
            .sort({ requestedAt: -1 });

        return successResponse(requests);
    } catch (error: any) {
        console.error("Admin requests view error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
