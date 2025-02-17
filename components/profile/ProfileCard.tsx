import { fetchUserData } from "@/actions";
import { auth } from "@/auth";
import { Button, Card } from "@heroui/react";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import ProfilePic from "./ProfilePic";

type TProfileCardProps = {
    profileId: string
}

export default async function ProfileCard({ profileId }: TProfileCardProps) {
    const session = await auth();
    const isLoggedInUser = session?.user.data._id === profileId;
    
    const userData = await fetchUserData(profileId);

    return (
        <Card>
            <div className="h-[150px] bg-blue-800" />
            <ProfilePic profilePic={userData?.profilePicture || ""} />
            <div className="flex flex-col justify-center items-center gap-1 my-4">
                <h2 className="font-semibold text-xl flex justify-center items-center gap-1">
                    {userData?.username}
                    <SealCheck size={22} color="#338EF7" weight="bold" />
                </h2>
                <h4>@{userData?.username}</h4>
                <div className="flex justify-center gap-4">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400">{userData?.followers?.length}</p>
                        <p className="text-default-400">Followers</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400">{userData?.following?.length}</p>
                        <p className="text-default-400">Following</p>
                    </div>
                </div>
            </div>
            {!isLoggedInUser && <Button color="primary" className="max-w-10 mx-auto mb-4">Follow</Button>}
        </Card>
    )
}
