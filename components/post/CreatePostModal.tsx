"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody, Avatar, Input } from "@nextui-org/react";
import TipTapEditor from "./TipTapEditor";
import { useState } from "react";

export default function CreatePostModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [content, setContent] = useState<string>('')

    const handleContentChange = (reason: any) => {
        setContent(reason)
    }

    return (
        <>
            <Card className="p-1">
                <CardBody className="p-3 text-small text-default-400 cursor-pointer">
                    <div className="flex gap-6 cursor-pointer"
                        onClick={onOpen}
                    >
                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                        <Input
                            readOnly
                            size="lg"
                            type="text"
                            placeholder="Share your story..."
                        />
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
                <ModalContent className="m-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create Post
                            </ModalHeader>
                            <ModalBody>
                                <TipTapEditor
                                    content={content}
                                    onChange={handleContentChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Post
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}