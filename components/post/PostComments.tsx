import { fetchUserData } from "@/actions";
import { auth } from "@/auth";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@heroui/react";
import Link from "next/link";

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
                {
                    session?.user.data._id && (
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
                            <Input
                                size="lg"
                                type="text"
                                placeholder={"Comment as " + loggedInUser?.name}
                            />
                        </div>
                    )
                }

                <div className="mt-5 space-y-4">
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
                                <div className="self-center cursor-pointer rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#616161" viewBox="0 0 256 256"><path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"></path></svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </CardBody>
            <CardFooter />
        </Card >
    )
}
