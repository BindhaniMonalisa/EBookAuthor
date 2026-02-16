import { connectDB } from "@/lib/mongodb";
import ChangeRequest from "@/models/ChangeRequest";

export async function POST(req: Request) {
  await connectDB();
  const { authorId, type, newValue } = await req.json();

  await ChangeRequest.create({
    authorId,
    type,
    newValue,
  });

  return Response.json({ message: "Request Sent to Admin" });
}
