import { fetchUserData } from "@/actions";
import { auth } from "@/auth";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import CommentInput from "../comment/CommentInput";
import SingleComment from "../comment/SingleComment";

type TAuthor = {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
    isVerifiedUser: boolean;
};

export type TComment = {
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
                                    <SingleComment
                                        key={comment._id}
                                        comment={comment}
                                        postId={postData._id}
                                    />
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
