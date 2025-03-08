import PostCard from "../post/PostCard";
import FeedActions from "./FeedActions";
import CreatePostSection from "../post/CreatePostSection";
import { getPosts } from "@/actions";

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

type TFeedComponentProps = {
    searchTerm?: string,
    sort?: string,
    filter?: string
}

export default async function FeedComponent({ searchTerm, sort, filter }: TFeedComponentProps) {
    const query: Record<string, any> = {};
    if (searchTerm) query.searchTerm = searchTerm;
    if (sort) query.sort = sort;
    if (filter) query.filter = filter;

    const posts = await getPosts(query);

    return (
        <>
            <div className="mb-7">
                <CreatePostSection />
            </div>
            <div className="flex justify-between">
                <h3 className="text-2xl">Posts</h3>
                <FeedActions />
            </div>
            {
                posts?.data?.length === 0 ? (
                    <div className="mt-10 text-large flex justify-center">
                        <p>No posts found!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 mt-8">
                        {
                            posts?.data.map((postData: TPost) => (
                                <PostCard key={postData?._id} postData={postData} />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}
