"use client";

import { toggleFollow } from "@/actions";
import { Button, Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type TFollowButtonProps = {
    userId: string,
    isFollowing: boolean
}

export default function FollowButton({ userId, isFollowing }: TFollowButtonProps) {
    const [following, setFollowing] = useState(isFollowing);
    const [loading, startTransition] = useTransition(); // Handles async state
    const { data: session } = useSession();

    const handleFollowToggle = () => {
        if (!session?.user.data._id) {
            return toast.error("You need to login to follow users!", {
                icon: "🤔",
            })
        }

        startTransition(async () => {
            const result = await toggleFollow(userId, following);
            if (result.success) {
                setFollowing(!following);
            }
        });
    };

    return (
        <Button
            color="primary"
            className="mx-auto mb-4"
            disabled={loading}
            onPress={handleFollowToggle}
        >
            {loading && <Spinner color="white" size="sm" />}
            {following ? "Unfollow" : "Follow"}
        </Button>
    )
}
