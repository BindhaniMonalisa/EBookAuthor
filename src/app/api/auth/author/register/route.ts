import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Author from "@/models/Author";
import AuthorLogin from "@/models/AuthorLogin";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    dob: z.string(),
    currentAddress: z.string(),
    mobile: z.string(),
    authorUrl: z.string().min(3),
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Validate input
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return errorResponse("Validation failed", 400, validation.error.format());
        }

        const { name, email, username, password, dob, currentAddress, mobile, authorUrl } = validation.data;

        // Check for existing author/username
        const existingAuthor = await Author.findOne({ $or: [{ email }, { authorUrl }] });
        if (existingAuthor) {
            return errorResponse("Author with this email or URL already exists", 400);
        }

        const existingLogin = await AuthorLogin.findOne({ username });
        if (existingLogin) {
            return errorResponse("Username already taken", 400);
        }

        // Create Author
        const newAuthor = await Author.create({
            name,
            email,
            dob: new Date(dob),
            currentAddress,
            mobile,
            authorUrl,
        });

        // Hash password and create AuthorLogin
        const hashedPassword = await bcrypt.hash(password, 10);
        await AuthorLogin.create({
            authorId: newAuthor._id,
            username,
            password: hashedPassword,
        });

        return successResponse({ authorId: newAuthor._id }, "Author registered successfully", 201);
    } catch (error: any) {
        console.error("Registration error:", error);
        return errorResponse(error.message || "Internal Server Error");
    }
}
