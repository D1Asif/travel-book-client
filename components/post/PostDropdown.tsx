"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { DotsThreeOutline } from "@phosphor-icons/react";
import CreatePostModal from "./CreatePostModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { deletePost } from "@/actions";
import toast from "react-hot-toast";

export default function PostDropdown({ editingPostId }: { editingPostId: string }) {
    const editModalDisclosure = useDisclosure();
    const postDeleteConfirmationDisclosure = useDisclosure();

    const handleDeletePost = async () => {
        const res = await deletePost(editingPostId);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

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
                        if (key === "delete") {
                            postDeleteConfirmationDisclosure.onOpen();
                        }
                    }}
                >
                    <DropdownItem key="edit">
                        Edit Post
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                    >
                        Delete Post
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <DeleteConfirmationModal
                disclosure={postDeleteConfirmationDisclosure}
                message="Do you want to delete the post?"
                action={handleDeletePost}
            />
            <CreatePostModal editingPostId={editingPostId} disclosure={editModalDisclosure} />
        </>
    )
}
