export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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

        // Create a unique filename
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filename = `${timestamp}_${safeName}`;

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        // Write file to public/uploads
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${filename}`;

        return successResponse({ url: fileUrl }, "File uploaded successfully");
    } catch (error: any) {
        console.error("Upload error:", error);
        return errorResponse(error.message);
    }
}
