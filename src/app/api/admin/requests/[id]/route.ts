import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AuthorRequests from "@/models/AuthorRequests";
import Author from "@/models/Author";
import AuthorLogin from "@/models/AuthorLogin";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const { id } = await params;
        const { status } = await req.json();

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return errorResponse("Invalid status", 400);
        }

        const request = await AuthorRequests.findById(id);
        if (!request) {
            return errorResponse("Request not found", 404);
        }

        if (request.status !== "PENDING") {
            return errorResponse("Request already processed", 400);
        }

        request.status = status;
        request.reviewedBy = user.userId as any;
        request.reviewedAt = new Date();

        let tempPassword = "";

        if (status === "APPROVED") {
            if (request.requestType === "EMAIL_CHANGE" && request.newEmail) {
                await Author.findByIdAndUpdate(request.authorId, { email: request.newEmail });
            } else if (request.requestType === "PASSWORD_RESET") {
                tempPassword = Math.random().toString(36).slice(-8); // Simple random pass
                const hashedPassword = await bcrypt.hash(tempPassword, 10);
                await AuthorLogin.findOneAndUpdate(
                    { authorId: request.authorId },
                    { password: hashedPassword }
                );
            }
        }

        await request.save();

        return successResponse(
            { tempPassword: tempPassword || undefined },
            `Request ${status.toLowerCase()} successfully`
        );
    } catch (error: any) {
        console.error("Admin request update error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
