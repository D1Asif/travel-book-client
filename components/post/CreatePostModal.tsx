"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Card, CardBody } from "@heroui/react";
import TipTapEditor from "./TipTapEditor";
import { useRef, useState } from "react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import { ImageSquare } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Image from "next/image";

type TCreatePostModalsProps = {
    editingPostId?: string,
    disclosure: UseDisclosureReturn
}

export default function CreatePostModal({ editingPostId, disclosure }: TCreatePostModalsProps) {
    const { isOpen, onOpenChange } = disclosure;
    const [content, setContent] = useState<string>('');
    const [isPremium, setIsPremium] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleContentChange = (contentData: any) => {
        setContent(contentData);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        console.log(file?.type);

        if (!file?.type.startsWith("image/")) {
            toast.error("Please select an image file");
        };

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
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
                            {imagePreview && (
                                <div className="relative w-fit">
                                    <button
                                        className="top-2 right-2 absolute"
                                        onClick={() => setImagePreview(null)}
                                    >
                                        ❌
                                    </button>
                                    <Image
                                        src={imagePreview}
                                        height={200}
                                        width={200}
                                        className="mb-2 rounded-md"
                                        alt="Post image"
                                    />
                                </div>
                            )}
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