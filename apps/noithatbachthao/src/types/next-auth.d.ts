import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object to include properties
   * we added in the `session` callback.
   */
  interface Session {
    user?: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  /**
   * Extends the built-in user object to include properties
   * we added in the `authorize` callback.
   */
  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Extends the built-in JWT token. */
  interface JWT {
    role?: string;
  }
}
