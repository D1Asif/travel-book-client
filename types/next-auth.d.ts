/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    profilePicture: string;
    isVerifiedUser: boolean;
    role: string;
    posts: string[]; // You may want to specify a more specific type for posts if you have one
    following: string[]; // Specify type if available
    followers: string[]; // Specify type if available
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: User;
    token: string;
    id: string; // Assuming id is a string, adjust if it's a different type
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserResponse
    }
}