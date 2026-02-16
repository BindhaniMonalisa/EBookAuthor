import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
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

        // Find Admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return errorResponse("Invalid credentials", 401);
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return errorResponse("Invalid credentials", 401);
        }

        // Generate JWT
        const token = await signToken({
            userId: admin._id.toString(),
            role: "admin",
        });

        // Set HTTP-only cookie
        await setAuthCookie(token);

        return successResponse({ role: "admin" }, "Admin login successful");
    } catch (error: any) {
        console.error("Admin login error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
