"use client"

import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { ArrowFatDown, ArrowFatUp } from "@phosphor-icons/react";
import Image from "next/image";
import PostDropdown from "./PostDropdown";
import { TPost } from "../home/FeedComponent";

export default function PostCard({ postData }: { postData: TPost }) {
    return (
        <Card className="p-1">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={postData?.author?.profilePicture || ""} name={postData?.author?.name} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{postData?.author.name}</h4>
                        <h5 className="text-small tracking-tight text-default-400">
                            @{postData?.author.username}
                        </h5>
                    </div>
                </div>
                <PostDropdown />
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 cursor-pointer">
                <p className="truncate">
                    {postData?.content}
                </p>
                <div className="pt-2 space-x-2">
                    {
                        postData?.tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))
                    }
                </div>
                <Image
                    width={600}
                    height={600}
                    alt="Post image"
                    src={postData?.images[0]}
                    className="w-full h-full object-cover rounded-xl my-3"
                />
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small cursor-pointer">
                        <ArrowFatUp size={18} weight="fill" />
                    </p>
                    <p className=" text-default-400 text-small">
                        13
                    </p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small cursor-pointer">
                        <ArrowFatDown size={18} weight="fill" />
                    </p>
                    <p className=" text-default-400 text-small">
                        3
                    </p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">Comments</p>
                </div>
            </CardFooter>
        </Card>
    );
}
