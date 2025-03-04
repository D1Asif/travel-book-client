import { fetchUserData } from "@/actions";
import { auth } from "@/auth";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Link from "next/link";
import CommentInput from "../comment/CommentInput";
import CommentDropdown from "../comment/CommentDropdown";

type TAuthor = {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
    isVerifiedUser: boolean;
};

type TComment = {
    _id: string;
    author: TAuthor;
    content: string;
    createdAt: string;
    updatedAt: string;
};

type TPostData = {
    _id: string;
    author: TAuthor;
    content: string;
    images: string[];
    tags: string[];
    isPremium: boolean;
    upVotes: string[];
    downVotes: string[];
    comments: TComment[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export default async function PostComments({ postData }: { postData: TPostData }) {
    const session = await auth();
    const loggedInUser = await fetchUserData(session?.user.data._id ?? "");

    return (
        <Card className="p-1 mt-5">
            <CardHeader className="justify-between text-lg pb-4">
                Comments
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <CommentInput loggedInUser={loggedInUser ?? undefined} postId={postData._id} />
                {
                    postData?.comments.length === 0 ? (
                        !loggedInUser && <div className="text-medium">No comments in this post yet.</div>
                    ) : (
                        <div className={`space-y-4 ${loggedInUser ? "mt-4" : ""}`}>
                            {
                                postData.comments.map((comment) => (
                                    <div
                                        key={comment._id}
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
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Card className="px-4 pt-3 pb-2 bg-default-100">
                                                    <Link href={`/profile/${comment?.author?._id}`}>
                                                        <h4 className="text-small font-semibold leading-none text-default-600">
                                                            {comment?.author?.name}
                                                        </h4>
                                                    </Link>
                                                    <div className="text-medium text-default-500">
                                                        {comment.content}
                                                    </div>
                                                </Card>
                                                <CommentDropdown />
                                            </div>

                                            <p className="mt-1">{comment?.createdAt || "5 mins"}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </CardBody>
            <CardFooter />
        </Card >
    )
}
