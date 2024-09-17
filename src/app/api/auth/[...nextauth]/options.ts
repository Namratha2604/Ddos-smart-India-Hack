import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { connectDb } from "@/database/db.config";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			async authorize(credentials: Record<"email" | "password", string> | undefined) {
				await connectDb();
				try {
					// Check if credentials are available
					if (!credentials?.email || !credentials.password) {
						return null;
					}

					const { email, password } = credentials;
					
					// Find user by email
					const user = await User.findOne({ email });
					if (!user) {
						return null; // User not found
					}

					// Compare passwords
					const isPasswordCorrect = await bcrypt.compare(
						password,
						user.password,
					);

					if (isPasswordCorrect) {
						return user; // Return user if password matches
					} else {
						return null; // Return null if password is incorrect
					}
				} catch (error: unknown) {
					return null; // Catch any errors and return null
				}
			},
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "johndoe69@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.username = token.username;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
