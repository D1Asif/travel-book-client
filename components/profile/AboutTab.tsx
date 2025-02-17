import { fetchUserData, updateUser } from "@/actions";
import { TUser } from "@/actions/action.type";
import { Button, Card, Input, Skeleton, Spinner } from "@heroui/react";
import { At, Envelope, Phone, User } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AboutTab() {
    const { data: session } = useSession();
    const params = useParams();
    const [userData, setUserData] = useState<null | TUser>(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const res = await fetchUserData(params?.profileId as string);
            setUserData(res);
            setLoading(false);
        };

        getUser();
    }, [params?.profileId]);

    const isLoggedInUser = params?.profileId === session?.user.data._id;

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isEditing) {
            return setIsEditing(true);
        } else {
            setIsSubmitting(true);
            const formData = new FormData(e.currentTarget);
            const updatedUserData = {
                username: formData.get("username") as string,
                phone: formData.get("phone") as string,
            };

            if (updatedUserData?.phone?.length < 10) {
                setIsSubmitting(false);
                return toast.error("Phone must be minimum 10 characters long");
            }

            if (updatedUserData?.username?.length < 1) {
                setIsSubmitting(false);
                return toast.error("Username need to be minimum 1 character");
            }

            const res = await updateUser(updatedUserData);

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }

            setIsSubmitting(false);
            setIsEditing(false);
        }
    }

    return (
        <Card className="flex flex-col items-center mt-3">
            <form
                className={`max-w-[350px] relative items-center ${loading ? "space-y-6" : "space-y-10"} m-7`}
                onSubmit={handleEdit}
            >
                <h1 className="text-lg">Account Information</h1>
                {loading ? (
                    <>
                        <div>
                            <Skeleton className="w-2/5 rounded-lg mb-3">
                                <div className="h-3 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-7 w-full rounded-lg bg-default-200" />
                            </Skeleton>
                        </div>
                        <div>
                            <Skeleton className="w-1/5 rounded-lg mb-3">
                                <div className="h-3 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-7 w-full rounded-lg bg-default-200" />
                            </Skeleton>
                        </div>
                        <div>
                            <Skeleton className="w-2/5 rounded-lg mb-3">
                                <div className="h-3 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-7 w-full rounded-lg bg-default-200" />
                            </Skeleton>
                        </div>
                        <div>
                            <Skeleton className="w-1/5 rounded-lg mb-3">
                                <div className="h-3 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="rounded-lg">
                                <div className="h-7 w-full rounded-lg bg-default-200" />
                            </Skeleton>
                        </div>
                    </>
                ) : (
                    <>
                        <Input
                            labelPlacement="outside"
                            label="Email"
                            readOnly
                            defaultValue={userData?.email}
                            startContent={
                                <Envelope className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                            }
                            type="email"
                        />
                        <Input
                            labelPlacement="outside"
                            label="Username"
                            name="username"
                            readOnly={!isEditing}
                            defaultValue={userData?.username}
                            startContent={
                                <At className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                            }
                            type="text"
                        />
                        <Input
                            labelPlacement="outside"
                            label="Phone"
                            name="phone"
                            readOnly={!isEditing}
                            defaultValue={userData?.phone}
                            startContent={
                                <Phone className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                            }
                            type="text"
                        />
                        <Input
                            labelPlacement="outside"
                            label="Role"
                            readOnly
                            value={userData?.role}
                            startContent={
                                <User className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                            }
                            type="text"
                        />
                        {isLoggedInUser && <div className="p-[10px]" />}
                        {isLoggedInUser && (
                            <Button
                                color={isEditing ? "success" : "primary"}
                                variant="flat"
                                className="absolute bottom-0"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Spinner size="sm" color="current" />}
                                {isEditing ? "Save" : "Edit"}
                            </Button>
                        )}
                    </>
                )}
            </form>
        </Card>
    )
}
