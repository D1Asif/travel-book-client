"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { DotsThree } from "@phosphor-icons/react";
import DeleteConfirmationModal from "../post/DeleteConfirmationModal";
import { deleteComment } from "@/actions";
import toast from "react-hot-toast";

const items = [
    {
        key: "edit",
        label: "Edit",
    },
    {
        key: "delete",
        label: "Delete",
    },
];

type TCommentDropdownProps = {
    commentId: string, 
    postId: string,
    setIsEditing: (state: boolean) => void
}

export default function CommentDropdown({commentId, postId, setIsEditing}: TCommentDropdownProps) {
    const commentDeleteConfirmationDisclosure = useDisclosure();

    const handleDeleteComment = async () => {
        const res = await deleteComment(commentId, postId);

        if (!res.success) {
            toast.error(res.message);
        }
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <div className="self-center cursor-pointer">
                        <DotsThree size="24" weight="bold" />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}
                    onAction={(key) => {
                        if (key === "edit") {
                            setIsEditing(true);
                        }
                        if (key === "delete") {
                            commentDeleteConfirmationDisclosure.onOpen();
                        }
                    }}
                >
                    {(item) => (
                        <DropdownItem
                            key={item.key}
                            className={item.key === "delete" ? "text-danger" : ""}
                            color={item.key === "delete" ? "danger" : "default"}
                        >
                            {item.label}
                        </DropdownItem>
                    )}
                </DropdownMenu>
                <DeleteConfirmationModal
                    disclosure={commentDeleteConfirmationDisclosure}
                    message="Are you sure you want to delete this comment?"
                    action={handleDeleteComment}
                />
                <DeleteConfirmationModal
                    disclosure={commentDeleteConfirmationDisclosure}
                    message="Are you sure you want to delete this comment?"
                    action={handleDeleteComment}
                />
            </Dropdown>
            <DeleteConfirmationModal
                disclosure={commentDeleteConfirmationDisclosure}
                message="Are you sure you want to delete this comment?"
                action={handleDeleteComment}
            />
        </>
    )
}
