export const dynamic = "force-dynamic";

import { getAuthUser } from "@/lib/auth";
import { successResponse } from "@/lib/responseHandler";

export async function GET() {
    const user = await getAuthUser();
    if (user) {
        return successResponse({ isAuthenticated: true, role: user.role, userId: user.userId });
    }
    return successResponse({ isAuthenticated: false, role: null, userId: null });
}
