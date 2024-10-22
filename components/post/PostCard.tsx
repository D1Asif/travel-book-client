"use client"

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { ArrowFatDown, ArrowFatUp, DotsThreeOutline } from "@phosphor-icons/react";
import Image from "next/image";

export default function PostCard() {
    return (
        <Card className="p-1">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                    </div>
                </div>
                <Button isIconOnly variant="light">
                    <DotsThreeOutline weight="bold" />
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 cursor-pointer">
                <p className="truncate">
                    Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis officia mollitia ratione fugit numquam, ad sapiente. Exercitationem odio quasi voluptas, mollitia similique ex. Corrupti excepturi rerum voluptatibus unde blanditiis hic?
                </p>
                <span className="pt-2">
                    #FrontendWithZoey
                </span>
                <Image
                    width={600}
                    height={600}
                    alt="NextUI hero Image"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
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
