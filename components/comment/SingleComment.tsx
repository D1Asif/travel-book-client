"use client";

import { Avatar, Card, Textarea } from "@heroui/react";
import Link from "next/link";
import CommentDropdown from "./CommentDropdown";
import { TComment } from "../post/PostComments";
import { useState } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { updateComment } from "@/actions";
import toast from "react-hot-toast";
import { formatCommentTime } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function SingleComment({ comment, postId }: { comment: TComment, postId: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.content);
    const { data: session } = useSession();

    const handleEditComment = async () => {
        setIsEditing(false);

        const res = await updateComment(commentContent, comment._id);

        if (!res.success) {
            toast.error(res.message);
            setCommentContent(comment.content);
        }
    }

    return (
        <div
            className="flex gap-3 items-start"
        >
            <Link
                href={`/profile/${comment?.author?._id}`}
                className="mt-1"
            >
                <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={comment?.author?.profilePicture || ""} name={comment?.author?.name}
                />
            </Link>
            {
                isEditing ? (
                    <div className="w-full">
                        <Textarea
                            size="lg"
                            type="text"
                            minRows={1}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            endContent={
                                <button
                                    onClick={handleEditComment}
                                    disabled={!commentContent}
                                    className={commentContent ? "text-primary-500" : ""}
                                >
                                    <PaperPlaneRight size={24} weight="fill" />
                                </button>
                            }
                        />
                        <button
                            className="mt-1 font-semibold"
                            onClick={() => {
                                setCommentContent(comment.content)
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center gap-2">
                            <Card className="px-4 pt-3 pb-2 bg-default-100">
                                <Link href={`/profile/${comment?.author?._id}`}>
                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                        {comment?.author?.name}
                                    </h4>
                                </Link>
                                <div className="text-medium text-default-500 break-all whitespace-pre-wrap">
                                    {commentContent}
                                </div>
                            </Card>
                            {session?.user.data._id === comment.author._id && (
                                <CommentDropdown
                                    setIsEditing={setIsEditing}
                                    commentId={comment._id}
                                    postId={postId}
                                />
                            )}
                        </div>

                        <div className="flex gap-3 mt-1">
                            <p>
                                {formatCommentTime(comment?.createdAt) || "5 mins"}
                            </p>
                            {comment.createdAt !== comment.updatedAt && (
                                <p>Edited</p>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
