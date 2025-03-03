"use client"

import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";
import Image from "next/image";
import PostDropdown from "./PostDropdown";
import { TPost } from "../home/FeedComponent";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react"
import VoteButtons from "./VoteButtons";
import { useParams } from "next/navigation";

export default function PostCard({ postData }: { postData: TPost }) {
    const { data: session } = useSession();
    const isOwnPost = session?.user?.data?._id === postData?.author?._id;
    const { postId } = useParams();

    return (
        <Card className="p-1">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Link href={`/profile/${postData?.author?._id}`}>
                        <Avatar isBordered radius="full" size="md" src={postData?.author?.profilePicture || ""} name={postData?.author?.name} />
                    </Link>
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <Link href={`/profile/${postData?.author?._id}`}>
                            <h4 className="text-small font-semibold leading-none text-default-600">{postData?.author?.name}</h4>
                        </Link>
                        <Link href={`/profile/${postData?.author?._id}`}>
                            <h5 className="text-small tracking-tight text-default-400">
                                @{postData?.author?.username}
                            </h5>
                        </Link>
                    </div>
                </div>
                {
                    isOwnPost && (
                        <PostDropdown editingPostId={postData?._id} />
                    )
                }
            </CardHeader>
            <CardBody className="px-3 py-0 text-medium text-default-500 cursor-pointer">
                <Link href={`/posts/${postData._id}`}>
                    <div className="truncate" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postData?.content) }}>
                    </div>
                    <div className="pt-2 space-x-2">
                        {
                            postData?.tags?.map((tag) => (
                                <span key={tag}>#{tag}</span>
                            ))
                        }
                    </div>
                    {postData?.images?.[0] && (
                        <Image
                            width={600}
                            height={600}
                            alt="Post image"
                            src={postData?.images[0]}
                            className="w-full h-auto object-cover rounded-xl my-3"
                        />
                    )}
                </Link>
            </CardBody>
            <CardFooter className="gap-3">
                <VoteButtons
                    postId={postData._id}
                    upVotes={postData.upVotes}
                    downVotes={postData.downVotes}
                />
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                        {postData?.comments?.length}
                    </p>
                    {postId ? (
                        <div className="text-default-400 text-small">
                            Comments
                        </div>
                    ) : (
                        <Link href={`/posts/${postData?._id}`} className="text-default-400 text-small">Comments</Link>
                    )}
                </div>
            </CardFooter>
        </Card >
    );
}
