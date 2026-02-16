import { connectDB } from "@/lib/mongodb";
import ChangeRequest from "@/models/ChangeRequest";
import Author from "@/models/Author";
import AuthorLogin from "@/models/AuthorLogin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const { requestId } = await req.json();

  const request = await ChangeRequest.findById(requestId);

  if (request?.type === "EMAIL") {
    await Author.findByIdAndUpdate(request.authorId, {
      email: request.newValue,
    });
  }

  if (request?.type === "PASSWORD") {
    const hashed = await bcrypt.hash(request.newValue, 10);
    await AuthorLogin.findOneAndUpdate(
      { authorId: request.authorId },
      { password: hashed }
    );
  }

  request!.status = "APPROVED";
  await request!.save();

  return Response.json({ message: "Approved" });
}
