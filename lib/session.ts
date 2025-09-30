import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode("123");

// Global session store type (in production, use Redis or similar)
declare global {
  var sessionStore: Map<string, {
    accessToken: string;
    refreshToken: string;
    userDetails: any;
    subscription: any;
    tokenExp: number;
    tokenIat: number;
  }> | undefined;
}

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

  // Store minimal user data in session to keep cookie size under 4KB
  // const sessionData = {
  //   // Essential user details only
  //   userId: decodedAccessToken.userDetails._id,
  //   restaurantId: decodedAccessToken.restaurantId,
  //   email: decodedAccessToken.userDetails.email,
  //   firstName: decodedAccessToken.userDetails.firstName,
  //   lastName: decodedAccessToken.userDetails.lastName,
  //   userType: decodedAccessToken.userType,

  //   // Token metadata
  //   tokenExp: decodedAccessToken.exp,
  //   tokenIat: decodedAccessToken.iat,
  // };

  const cookieStore = cookies();

  // Determine if we're in production with HTTPS
  const isProduction = process.env.NODE_ENV === 'production';
  const isSecure = isProduction && (process.env.NEXT_PUBLIC_USE_HTTPS === 'true' || process.env.VERCEL_URL?.includes('https://'));

  // Create a unique session ID
  const sessionId = crypto.randomUUID();
  
  // Store minimal data in cookie - just session ID and essential user info
  const minimalSessionData: SessionPayload = {
    sessionId,
    sub: decodedAccessToken.sub,
    userId: decodedAccessToken.userId,
    restaurantId: decodedAccessToken.restaurantId,
    subscriptionId: decodedAccessToken.subscriptionId,
    userType: decodedAccessToken.userType,
    iat: decodedAccessToken.iat,
    exp: decodedAccessToken.exp,
  };
  
  const session = await encrypt(minimalSessionData, expiresAt);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: isSecure,
    expires: expiresAt,
    sameSite: "lax",
  });

  // Store tokens in server-side session (you might want to use Redis in production)
  // For now, we'll store them in a Map (not recommended for production)
  global.sessionStore = global.sessionStore || new Map();
  global.sessionStore.set(sessionId, {
    accessToken,
    refreshToken,
    userDetails: decodedAccessToken.userDetails,
    subscription: decodedAccessToken.subscription,
    tokenExp: decodedAccessToken.exp,
    tokenIat: decodedAccessToken.iat,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  
  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    if (session?.sessionId && global.sessionStore) {
      global.sessionStore.delete(session.sessionId);
    }
  }
  
  cookieStore.delete("session");
}

type SessionPayload = {
  // Session identification
  sessionId?: string;
  sub: string;
  // User identification
  userId: string;
  restaurantId: string;
  // email: string;
  subscriptionId: string;
  userType: string;
  iat: number;
  exp: number;

  // Personal information
  // firstName: string;
  // lastName: string;

  // Token metadata
  tokenExp?: number;
  tokenIat?: number;
};

type Session = SessionPayload & {
  accessToken?: string;
  refreshToken?: string | undefined;
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

  if (!sessionCookie) return null;

  const session = await decrypt(sessionCookie);
  if (!session?.sessionId) return null;

  // Get full session data from server-side store
  const fullSessionData = global.sessionStore?.get(session.sessionId);
  if (!fullSessionData) return null;

  return {
    ...session,
    accessToken: fullSessionData.accessToken,
    refreshToken: fullSessionData.refreshToken,
    // Add back user details from server store
    // firstName: fullSessionData.userDetails.firstName,
    // lastName: fullSessionData.userDetails.lastName,
    tokenExp: fullSessionData.tokenExp,
    tokenIat: fullSessionData.tokenIat,
  };
}

// Note: Subscription data is now fetched from the API when needed
// These helper functions have been removed to keep session cookie size minimal
