import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import jwt, { JwtPayload } from "jsonwebtoken"
import { AdapterUser } from "next-auth/adapters";
import { UserResponse } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                try {
                    const res1 = await fetch(`${process.env.API_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    });
                    const data = await res1.json();

                    if (!data?.success) {
                        throw new Error("Credentials do not match");
                    }

                    const decodedToken = jwt.verify(data?.data?.token, process.env.JWT_SECRET as string);

                    const res2 = await fetch(`${process.env.API_URL}/users/${(decodedToken as JwtPayload).id}`)
                    const userData = await res2.json();

                    const user = {
                        ...userData,
                        token: data.data.token
                    }

                    return user;
                } catch (err) {
                    console.log("Token verification failed:", err);
                    throw new Error("Verification error");
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user as AdapterUser & UserResponse;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
})