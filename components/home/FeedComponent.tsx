import CreatePostModal from "../post/CreatePostModal";
import PostCard from "../post/PostCard";
import FeedActions from "./FeedActions";

export default function FeedComponent() {
    return (
        <>
            <div className="mb-7">
                <CreatePostModal />
            </div>
            <div className="flex justify-between">
                <h3 className="text-2xl">Posts</h3>
                <FeedActions />
            </div>
            <div className="flex flex-col gap-6 mt-8">
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </>
    )
}
