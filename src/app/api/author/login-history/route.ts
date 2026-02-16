import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import LoginHistory from "@/models/LoginHistory";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "author") {
            return errorResponse("Unauthorized", 401);
        }

        const history = await LoginHistory.find({ authorId: user.userId })
            .sort({ loginDate: -1 })
            .limit(20);

        return successResponse(history);
    } catch (error: any) {
        console.error("Login history error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
