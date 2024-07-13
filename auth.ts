import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from "@/auth.config";

declare module 'next-auth' {
  interface Session {
    user: {} & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
    // error: "/auth/error",
  },
  callbacks:{
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        // if (token.role) {
        //   session.user.role = token.role;
        // }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
