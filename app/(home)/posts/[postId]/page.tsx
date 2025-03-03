import { getPostById } from "@/actions"
import PostCard from "@/components/post/PostCard";
import PostComments from "@/components/post/PostComments";

export default async function PostDetailsPage({ params }: { params: { postId: string } }) {
    const postData = await getPostById(params.postId);

    return (
        <div>
            <PostCard postData={postData} />
            <PostComments postData={postData} />
        </div>
    )
}
