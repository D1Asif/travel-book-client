import { getPostById } from "@/actions"
import PostCard from "@/components/post/PostCard";

export default async function PostDetailsPage({ params }: { params: { postId: string } }) {
    const postData = await getPostById(params.postId);

    return (
        <div>
            <PostCard postData={postData.data} />
        </div>
    )
}
