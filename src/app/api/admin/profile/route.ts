export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { getAuthUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const admin = await Admin.findById(user.userId);
        if (!admin) return errorResponse("Admin not found", 404);

        return successResponse(admin);
    } catch (error: any) {
        return errorResponse(error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user || user.role !== "admin") {
            return errorResponse("Unauthorized", 401);
        }

        const body = await req.json();
        const { name, phone, profileImage } = body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            user.userId,
            { name, phone, profileImage },
            { new: true }
        );

        if (!updatedAdmin) return errorResponse("Admin not found", 404);

        return successResponse(updatedAdmin, "Profile updated successfully");
    } catch (error: any) {
        return errorResponse(error.message);
    }
}
