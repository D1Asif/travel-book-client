"use client";

import { createNewComment } from "@/actions";
import { TUser } from "@/actions/action.type";
import { Avatar, Input } from "@heroui/react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";

type TCommentInputProps = {
    loggedInUser?: TUser,
    postId: string
}

export default function CommentInput({ loggedInUser, postId }: TCommentInputProps) {
    const [commentText, setCommentText] = useState("");

    const handleSubmitComment = async () => {
        if (!commentText) return;

        setCommentText("");

        const res = await createNewComment(commentText, postId);

        if (!res.success) {
            toast.error("Comment failed!")
        }
    }

    return (
        <>
            {
                loggedInUser && (
                    <div className="flex gap-3 relative">
                        <Avatar
                            radius="full"
                            size="md"
                            src={loggedInUser?.profilePicture}
                            name={loggedInUser?.name}
                            classNames={{
                                base: "w-11 h-10",
                            }}
                            className="[&>*]:opacity-100"
                        />
                        <Input
                            size="lg"
                            type="text"
                            placeholder={"Comment as " + loggedInUser?.name}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div
                            className="absolute right-4 top-3 cursor-pointer"
                            onClick={handleSubmitComment}
                        >
                            <PaperPlaneRight size={24} weight="fill" />
                        </div>
                    </div>
                )
            }
        </>
    )
}
