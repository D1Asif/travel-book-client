"use server"

import { auth } from "@/auth";
import { TPost, TUser, TUserData } from "./action.type";
import { revalidatePath } from "next/cache";

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
    if (profileId === "") return null;

    const res = await fetch(`${process.env.API_URL}/users/${profileId}`);
    const user = await res.json();

    if (!user) {
        return null; // Handle when the user is not found
    }

    return user.data;
}

export async function updateUser(updatedUserData: Partial<TUser>) {
    const session = await auth();

    try {
        const url = `${process.env.API_URL}/users/${session?.user?.data?._id}`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            },
            body: JSON.stringify(updatedUserData)
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/users");
            return {
                success: true,
                message: "User updated successfully"
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "User update failed!"
        }
    }
}

export async function getPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${process.env.API_URL}/posts${queryString ? `?${queryString}` : ""}`, { cache: "no-store" });
    const posts = await res.json();
    return posts;
};

export async function getPostById(postId: string) {
    const res = await fetch(`${process.env.API_URL}/posts/${postId}`, {cache: "no-store"});
    const post = await res.json();
    return post.data;
}

export async function createNewPost(postData: TPost) {
    try {
        const session = await auth();
        const url = `${process.env.API_URL}/posts`;

        if (!session?.user.token) {
            return { success: false }
        }

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            },
            body: JSON.stringify(postData)
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/posts");
            return {
                success: true,
                message: "Post successfully created"
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Post creation failed"
        }
    }
}

export async function UpdatePost(editingPostId: string, postData: Partial<TPost>) {
    const session = await auth();

    try {
        const url = `${process.env.API_URL}/posts/${editingPostId}`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            },
            body: JSON.stringify(postData)
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/posts");
            return {
                success: true,
                message: "Post updated successfully"
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Post update failed!"
        }
    }
}

export async function deletePost(editingPostId: string) {
    const session = await auth();

    try {
        const url = `${process.env.API_URL}/posts/${editingPostId}`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            },
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/posts");
            return {
                success: true,
                message: "Post deleted successfully"
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Post deletion failed!"
        }
    }
}

export async function toggleFollow(userId: string, isFollowing: boolean) {
    const session = await auth();

    try {
        const res = await fetch(`${process.env.API_URL}/users/${userId}/${isFollowing ? "unfollow" : "follow"}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            }
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/users");
            return {
                success: true
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Failed to update follow status" };
    }
}

export async function toggleVotes(voteType: "up" | "down", postId: string) {
    const session = await auth();

    try {
        const res = await fetch(`${process.env.API_URL}/posts/${postId}/${voteType === "up" ? "upvote" : "downvote"}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.token}`
            }
        });

        const result = await res.json();

        if (res.status === 200) {
            revalidatePath("/posts");
            return {
                success: true
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Failed to update vote status" };
    }
}