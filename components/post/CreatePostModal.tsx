"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch } from "@nextui-org/react";
import TipTapEditor from "./TipTapEditor";
import { useState } from "react";
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';

type TCreatePostModalsProps = {
    editingPostId?: string,
    disclosure: UseDisclosureReturn
}

export default function CreatePostModal({ editingPostId, disclosure }: TCreatePostModalsProps) {
    const { isOpen, onOpenChange } = disclosure;
    const [content, setContent] = useState<string>('');
    const [isPremium, setIsPremium] = useState(true);

    const handleContentChange = (contentData: any) => {
        setContent(contentData)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
            <ModalContent className="m-6">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {editingPostId ? "Edit Post" : "Create Post"}
                        </ModalHeader>
                        <ModalBody>
                            <TipTapEditor
                                content={content}
                                onChange={handleContentChange}
                            />
                            <Switch isSelected={isPremium} onValueChange={setIsPremium}>
                                Premium Post
                            </Switch>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                {editingPostId ? "Save" : "Post"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}