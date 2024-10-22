import { Avatar, Card } from "@nextui-org/react";


export default function ProfileCard() {
    return (
        <Card>
            <div className="h-[150px] bg-blue-800" />
            <Avatar className="h-20 w-20 -mt-10 mx-auto" />
            <div className="flex flex-col justify-center items-center gap-1 my-4">
                <h2 className="font-semibold text-xl">Tony Reichert</h2>
                <h4>@tony.reichert</h4>
                <div className="flex justify-center gap-4">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400">123</p>
                        <p className="text-default-400">Followers</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400">54</p>
                        <p className="text-default-400">Following</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
