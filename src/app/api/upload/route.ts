export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { successResponse, errorResponse } from "@/lib/responseHandler";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return errorResponse("No file provided", 400);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to base64 for Cloudinary uploadImage util
        const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const imageUrl = await uploadImage(fileBase64);

        return successResponse({ url: imageUrl }, "File uploaded successfully");
    } catch (error: any) {
        console.error("Upload error:", error);
        return errorResponse(error.message);
    }
}
