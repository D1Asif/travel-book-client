import { toggleVotes } from "@/actions";
import { ArrowFatDown, ArrowFatUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useOptimistic } from "react";

type TVoteButtonsProps = {
    postId: string,
    upVotes: string[],
    downVotes: string[]
}

export default function VoteButtons({ postId, upVotes, downVotes }: TVoteButtonsProps) {
    console.log(postId, upVotes, downVotes);
    const { data: session } = useSession();
    const loggedInUserId = session?.user.data._id;

    const [optimisticVotes, updateOptimisticVotes] = useOptimistic(
        {
            upVotes,
            downVotes
        },
        (prevState, voteType) => {
            const newVotes = { ...prevState }

            if (!loggedInUserId) return newVotes;

            if (voteType === "up") {
                newVotes.downVotes = newVotes.downVotes.filter((id) => id !== loggedInUserId);
                if (newVotes.upVotes.includes(loggedInUserId)) {
                    newVotes.upVotes = newVotes.upVotes.filter((id) => id !== loggedInUserId);
                } else {
                    newVotes.upVotes = [...newVotes.upVotes, loggedInUserId];
                }
            } else {
                newVotes.upVotes = newVotes.upVotes.filter((id) => id !== loggedInUserId);
                if (newVotes.downVotes.includes(loggedInUserId)) {
                    newVotes.downVotes = newVotes.downVotes.filter((id) => id !== loggedInUserId);
                } else {
                    newVotes.downVotes = [...newVotes.downVotes, loggedInUserId];
                }
            }

            return newVotes;
        }
    );

    const handleVote = async (voteType: "up" | "down") => {
        updateOptimisticVotes(voteType);
        await toggleVotes(voteType, postId);
    };

    return (
        <>
            <div className="flex gap-1">
                <p 
                    className="font-semibold text-default-400 text-small cursor-pointer"
                    onClick={() => handleVote("up")}
                >
                    <ArrowFatUp 
                        size={18} 
                        weight="fill"
                        color={optimisticVotes.upVotes.includes(loggedInUserId ?? "") ? "rgb(0 111 238)" : "rgb(113 113 122)"}
                    />
                </p>
                <p className=" text-default-400 text-small">
                    {optimisticVotes?.upVotes?.length}
                </p>
            </div>
            <div className="flex gap-1">
                <p 
                    className="font-semibold text-small cursor-pointer"
                    onClick={() => handleVote("down")}
                >
                    <ArrowFatDown
                        size={18}
                        weight="fill"
                        color={optimisticVotes.downVotes.includes(loggedInUserId ?? "") ? "rgb(0 111 238)" : "rgb(113 113 122)"} 
                    />
                </p>
                <p className=" text-default-400 text-small">
                    {optimisticVotes?.downVotes?.length}
                </p>
            </div>
        </>
    )
}
