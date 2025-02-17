"use client";

import { updateUser } from "@/actions";
import { uploadImageToCloudinary } from "@/lib/utils";
import { Avatar } from "@heroui/react";
import { Camera } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePic({ profilePic }: { profilePic: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                setPreview(reader.result as string);
                setIsUploading(true);

                const imageUrl = await uploadImageToCloudinary(file);

                if (imageUrl === null) {
                    return toast.error("Image upload failed");
                }

                const res = await updateUser({ profilePicture: imageUrl });

                if (res.success) {
                    toast.success("Profile picture updated!");
                } else {
                    toast.error("Error occurred in profile picture update");
                }

                setIsUploading(false);
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="relative w-20 h-20 mx-auto -mt-10">
            {preview ? (
                <Image
                    src={preview}
                    alt="Profile Preview"
                    width={80}
                    height={80}
                    className={`size-20 object-cover rounded-full ${isUploading ? 'animate-pulse' : ''}`}
                />
            ) : (
                <Avatar
                    src={profilePic}
                    className="w-20 h-20 rounded-full"
                />
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button
                type="button"
                onClick={handleIconClick}
                className="absolute bottom-0 right-0 p-1 rounded-full bg-primary-400"
            >
                <Camera className="size-5" weight="bold" />
            </button>
        </div>
    )
}
