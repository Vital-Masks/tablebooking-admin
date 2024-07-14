import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import { signInSchema } from './lib/zod';

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = { id: '1', name: 'Ginthu', email: 'test@vitalmask.com' };

          if (!user) {
            throw new Error('User not found.');
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
