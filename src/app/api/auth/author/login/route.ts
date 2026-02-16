import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AuthorLogin from "@/models/AuthorLogin";
import LoginHistory from "@/models/LoginHistory";
import { signToken, setAuthCookie } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { z } from "zod";

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Validate input
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return errorResponse("Validation failed", 400, validation.error.format());
        }

        const { username, password } = validation.data;

        // Find login credentials
        const loginData = await AuthorLogin.findOne({ username });
        if (!loginData) {
            return errorResponse("Invalid credentials", 401);
        }

        // Check if active
        if (!loginData.isActive) {
            return errorResponse("Account is deactivated", 403);
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, loginData.password);
        if (!isMatch) {
            return errorResponse("Invalid credentials", 401);
        }

        // Generate JWT
        const token = await signToken({
            userId: loginData.authorId.toString(),
            role: "author",
        });

        // Set HTTP-only cookie
        await setAuthCookie(token);

        // Record login history
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        await LoginHistory.create({
            authorId: loginData.authorId,
            ipAddress: ip,
        });

        return successResponse({ role: "author" }, "Login successful");
    } catch (error: any) {
        console.error("Author login error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
