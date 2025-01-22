"use server"

import { TUser, TUserData } from "./action.type";

export const userSignup = async (userData: TUserData) => {
    const res = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });
    
    const result = await res.json();
    
    return result;
}

export async function fetchUserData(profileId: string): Promise<TUser | null> {
    const res = await fetch(`${process.env.API_URL}/users/${profileId}`);
    const user = await res.json();

    if (!user) {
        return null; // Handle when the user is not found
    }

    return user.data;
}
