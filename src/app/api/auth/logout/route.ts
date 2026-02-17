import { NextRequest } from "next/server";
import { successResponse } from "@/lib/responseHandler";
import { removeAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        await removeAuthCookie();
        return successResponse(null, "Logged out successfully");
    } catch (error) {
        console.error("Logout error:", error);
        return successResponse(null, "Logged out");
    }
}
