import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
const ENDPOINT = process.env.API_ENDPOINT;

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session.userType !== "Restaurant Admin") {
      return NextResponse.json({ error: "Unauthorized user type" }, { status: 403 });
    }

    if (!session.restaurantId || !session.userId) {
      console.error("Missing restaurantId or userId in session:", { restaurantId: session.restaurantId, userId: session.userId });
      return NextResponse.json({ error: "Invalid session data" }, { status: 400 });
    }

    const response = await fetch(
      `${ENDPOINT}/restaurant/${session.restaurantId}/restaurentAdmin/${session.userId}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: response.status });
    }

    const userData = await response.json();

    return NextResponse.json({
      user: {
        userId: session.userId,
        restaurantId: session.restaurantId,
        firstName: userData.result.firstName,
        lastName: userData.result.lastName,
        email: userData.result.email,
        profilePic: userData.result.profilePic?.photo,
        userType: session.userType,
        subscription: userData.result.subscription,
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
