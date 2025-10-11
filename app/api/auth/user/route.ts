import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/actions/user.action";

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    const user = await getUserById(session?.userId);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        userId: session.userId,
        restaurantId: session.restaurantId,
        firstName: session.userDetails.firstName,
        lastName: session.userDetails.lastName,
        email: session.userDetails.email,
        profilePic: session.profilePic?.photo,
        userType: session.userType,
        subscription: session.userDetails.subscription,
      },
    });
  } catch (error) {
    console.error("Error fetching user session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
