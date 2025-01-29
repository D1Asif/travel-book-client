"use client";

import { Avatar, Card, CardBody, Input, useDisclosure } from "@heroui/react";
import CreatePostModal from "./CreatePostModal";
import { useSession } from "next-auth/react";

export default function CreatePostSection() {
    const createPostModalDisclosure = useDisclosure();
    const { data: session } = useSession();

    const user = session?.user.data;

    return (
        <Card className="p-1">
            <CardBody className="p-3 text-small text-default-400 cursor-pointer">
                <div className="flex gap-6 cursor-pointer"
                    onClick={createPostModalDisclosure.onOpen}
                >
                    <Avatar isBordered radius="full" size="md" src={user?.profilePicture} name={user?.name} />
                    <Input
                        readOnly
                        size="lg"
                        type="text"
                        placeholder="Share your story..."
                    />
                </div>
            </CardBody>
            <CreatePostModal disclosure={createPostModalDisclosure} />
        </Card>
    )
}
