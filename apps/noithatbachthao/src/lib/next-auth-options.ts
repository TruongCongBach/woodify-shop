import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserService } from '@/services/user'
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await UserService.verifyEmailPassword(
					credentials.email,
					credentials.password
				);

				if (user) {
					// The object returned here will be encoded in the JWT.
					return user as User;
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			// When the user signs in, the `user` object from `authorize` is passed here.
			if (user) {
				token.id = user.id;
				token.role = (user as any).role; // Add role to the token
			}
			return token;
		},
		async session({ session, token }) {
			// The token object from `jwt` is passed here.
			// Add properties to the session object, which is accessible on the client.
			if (session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/signin',
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
		// newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
	},
	secret: process.env.NEXTAUTH_SECRET,
};
