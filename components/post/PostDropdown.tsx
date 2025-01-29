"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { DotsThreeOutline } from "@phosphor-icons/react";
import CreatePostModal from "./CreatePostModal";

export default function PostDropdown() {
    const editModalDisclosure = useDisclosure();

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly variant="light">
                        <DotsThreeOutline weight="bold" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions"
                    onAction={(key) => {
                        if (key === "edit") {
                            editModalDisclosure.onOpen();
                        }
                    }}
                >
                    <DropdownItem key="edit">
                        Edit Post
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete Post
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <CreatePostModal editingPostId="123" disclosure={editModalDisclosure} />
        </>
    )
}
