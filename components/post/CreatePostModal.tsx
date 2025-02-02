"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Card, CardBody } from "@heroui/react";
import TipTapEditor from "./TipTapEditor";
import { useRef, useState } from "react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import { ImageSquare  } from "@phosphor-icons/react";

type TCreatePostModalsProps = {
    editingPostId?: string,
    disclosure: UseDisclosureReturn
}

export default function CreatePostModal({ editingPostId, disclosure }: TCreatePostModalsProps) {
    const { isOpen, onOpenChange } = disclosure;
    const [content, setContent] = useState<string>('');
    const [isPremium, setIsPremium] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleContentChange = (contentData: any) => {
        setContent(contentData);
    }

    const handleImageChange = () => {

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
                            <div className="flex">
                                <Card className="mb-2">
                                    <CardBody className="bg-primary-300">
                                        <div
                                            className="flex gap-3 items-center cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <p>Add image to your post</p>
                                            <ImageSquare size={24} />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
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