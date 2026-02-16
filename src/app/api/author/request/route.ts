import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import AuthorRequests from "@/models/AuthorRequests";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { z } from "zod";

const requestSchema = z.object({
    requestType: z.enum(["EMAIL_CHANGE", "PASSWORD_RESET"]),
    newEmail: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "author") {
            return errorResponse("Unauthorized", 401);
        }

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return errorResponse("Validation failed", 400, validation.error.format());
        }

        const { requestType, newEmail } = validation.data;

        // Prevent multiple pending requests
        const existingPending = await AuthorRequests.findOne({
            authorId: user.userId,
            status: "PENDING",
        });

        if (existingPending) {
            return errorResponse("You already have a pending request. Please wait for admin approval.", 400);
        }

        const newRequest = await AuthorRequests.create({
            authorId: user.userId,
            requestType,
            newEmail,
            status: "PENDING",
        });

        return successResponse(newRequest, "Request submitted successfully", 201);
    } catch (error: any) {
        console.error("Author request error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
