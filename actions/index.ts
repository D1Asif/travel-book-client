"use server"

import { TUserData } from "./action.type";

export const userSignup = async(userData: TUserData) => {
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
