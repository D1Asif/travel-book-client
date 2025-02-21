"use client";

import { Avatar, Card, CardBody, Input, useDisclosure } from "@heroui/react";
import CreatePostModal from "./CreatePostModal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/actions";
import { TUser } from "@/actions/action.type";
import toast from "react-hot-toast";

export default function CreatePostSection() {
    const createPostModalDisclosure = useDisclosure();
    const { data: session } = useSession();
    const [user, setUser] = useState<TUser | null>(null);

    const sessionUser = session?.user.data;

    useEffect(() => {
        const getUser = async () => {
            if (sessionUser?._id) {
                const res = await fetchUserData(sessionUser?._id);
                setUser(res);
            }
        };
        getUser();
    }, [sessionUser?._id]);

    return (
        <Card className="p-1">
            <CardBody className="p-3 text-small text-default-400 cursor-pointer">
                <div className="flex gap-4 cursor-pointer"
                    onClick={sessionUser ? createPostModalDisclosure.onOpen : () => {
                        toast.error("You need to login to post!", {
                            icon: "🤔",
                        })
                    }}
                >
                    <Avatar
                        radius="full"
                        size="md"
                        src={user?.profilePicture}
                        name={user?.name}
                        classNames={{
                            base: "w-12 h-11",
                        }}
                        className="[&>*]:opacity-100"
                    />
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
