import PostCard from "../post/PostCard";
import FeedActions from "./FeedActions";
import CreatePostSection from "../post/CreatePostSection";

async function getPosts() {
    const res = await fetch(`${process.env.API_URL}/posts`);
    const posts = await res.json();
    return posts;
}

export type TAuthor = {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
    isVerifiedUser: boolean;
};

export type TPost = {
    _id: string;
    author: TAuthor;
    content: string;
    images: string[];
    tags: string[];
    isPremium: boolean;
    upVotes: string[]; // Array of user IDs who upvoted
    downVotes: string[]; // Array of user IDs who downvoted
    comments: string[]; // Array of comment IDs or comment objects
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
};

export default async function FeedComponent() {
    const posts = await getPosts();
    console.log(posts?.data);

    return (
        <>
            <div className="mb-7">
                <CreatePostSection />
            </div>
            <div className="flex justify-between">
                <h3 className="text-2xl">Posts</h3>
                <FeedActions />
            </div>
            <div className="flex flex-col gap-6 mt-8">
                {
                    posts?.data.map((postData: TPost) => (
                        <PostCard key={postData?._id} postData={postData} />
                    ))
                }
            </div>
        </>
    )
}
