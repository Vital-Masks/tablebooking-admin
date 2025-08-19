import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode("123");

// Function to decode JWT token
function decodeJWT(token: string) {
  try {
    // Split the token into parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT token format");
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = Buffer.from(paddedPayload, "base64").toString(
      "utf-8"
    );

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

export async function createSession({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  // Get expiration from JWT token, fallback to 7 days if decoding fails
  const decodedAccessToken = decodeJWT(accessToken);
  const tokenExpiration = new Date(decodedAccessToken.exp * 1000);
  const expiresAt =
    tokenExpiration || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Store user data and subscription info in session
  const sessionData = {
    // User details
    userId: decodedAccessToken.userDetails._id,
    restaurantId: decodedAccessToken.restaurantId,
    email: decodedAccessToken.userDetails.email,
    firstName: decodedAccessToken.userDetails.firstName,
    lastName: decodedAccessToken.userDetails.lastName,
    gender: decodedAccessToken.userDetails.gender,
    phoneNumber: decodedAccessToken.userDetails.phoneNumber,
    profilePic: decodedAccessToken.userDetails.profilePic,
    userType: decodedAccessToken.userType,

    // Subscription information
    subscription: decodedAccessToken.subscription,

    // Token metadata
    tokenExp: decodedAccessToken.exp,
    tokenIat: decodedAccessToken.iat,
  };

  const session = await encrypt(sessionData, expiresAt);
  const cookieStore = cookies();

  // Set session cookie with minimal data
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });

  // Set tokens in separate cookies
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

type SessionPayload = {
  // User identification
  userId: string;
  restaurantId: string;
  email: string;

  // Personal information
  firstName: string;
  lastName: string;
  gender?: string;
  phoneNumber?: string;
  profilePic?: any;

  // Authorization
  userType?: string;

  // Subscription details
  subscription?: {
    _id: string;
    restaurantId: string;
    planId: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    addons: any[];
    totalBill: number;
    created_at: string;
    updated_at: string;
  };

  // Token metadata
  tokenExp?: number;
  tokenIat?: number;
};

type Session = SessionPayload & {
  accessToken?: string;
  refreshToken?: string;
};

export async function encrypt(payload: SessionPayload, expiresAt?: Date) {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (expiresAt) {
    jwt.setExpirationTime(expiresAt);
  } else {
    jwt.setExpirationTime("7d");
  }

  return jwt.sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!sessionCookie) return null;

  const session = await decrypt(sessionCookie);
  if (!session) return null;

  return {
    ...session,
    accessToken,
    refreshToken,
  };
}

// Helper function to check if user has active subscription
export function hasActiveSubscription(session: Session | null): boolean {
  if (!session?.subscription) return false;
  return session.subscription.isActive;
}

// Helper function to get subscription details
export function getSubscriptionDetails(session: Session | null) {
  if (!session?.subscription) return null;
  return session.subscription;
}

// Helper function to check if subscription is expired
export function isSubscriptionExpired(session: Session | null): boolean {
  if (!session?.subscription) return true;
  const endDate = new Date(session.subscription.endDate);
  return endDate < new Date();
}
