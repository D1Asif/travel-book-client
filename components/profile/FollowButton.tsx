"use client";

import { toggleFollow } from "@/actions";
import { Button, Spinner } from "@heroui/react";
import { useState, useTransition } from "react";

type TFollowButtonProps = {
    userId: string,
    isFollowing: boolean
}

export default function FollowButton({ userId, isFollowing }: TFollowButtonProps) {
    const [following, setFollowing] = useState(isFollowing);
    const [loading, startTransition] = useTransition(); // Handles async state

    const handleFollowToggle = () => {
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
