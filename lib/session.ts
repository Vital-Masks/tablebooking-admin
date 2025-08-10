import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const encodedKey = new TextEncoder().encode('123');

export async function createSession(user: any) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store minimal user data in session
    const sessionData = {
        userId: user.user._id,
        email: user.user.email,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        contactNo: user.user.contactNo,
        birthDate: user.user.birthDate,
        addressLine1: user.user.addressLine1,
        addressLine2: user.user.addressLine2,
        city: user.user.city,
        state: user.user.state,
        anniversaryDate: user.user.anniversaryDate,
    };

    const session = await encrypt(sessionData);
    const cookieStore = await cookies();

    // Set session cookie with minimal data
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax'
    });

    // Set tokens in separate cookies
    cookieStore.set('accessToken', user.accessToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax'
    });

    cookieStore.set('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax'
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}

type SessionPayload = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    contactNo?: string;
    birthDate?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    anniversaryDate?: string;
};

type Session = SessionPayload & {
    accessToken?: string;
    refreshToken?: string;
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as SessionPayload;
    } catch (error) {
        console.log('Failed to verify session');
        return null;
    }
}

export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!sessionCookie) return null;

    const session = await decrypt(sessionCookie);
    if (!session) return null;

    return {
        ...session,
        accessToken,
        refreshToken
    };
}