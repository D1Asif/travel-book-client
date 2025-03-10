"use client";

import { createNewComment } from "@/actions";
import { TUser } from "@/actions/action.type";
import { Avatar, Textarea } from "@heroui/react";
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
                    <div className="flex gap-3">
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
                        <Textarea
                            size="lg"
                            type="text"
                            minRows={1}
                            placeholder={"Comment as " + loggedInUser?.name}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            classNames={{
                                input: "p-1"
                            }}
                            endContent={
                                <button
                                    className={commentText ? "text-primary-500 mt-1" : "mt-1"}
                                    onClick={handleSubmitComment}
                                    disabled={!commentText}
                                >
                                    <PaperPlaneRight size={24} weight="fill" />
                                </button>
                            }
                        />
                    </div>
                )
            }
        </>
    )
}
