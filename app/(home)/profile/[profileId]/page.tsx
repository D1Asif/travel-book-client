import CreatePostModal from "@/components/post/CreatePostModal";
import PostCard from "@/components/post/PostCard";
import ProfileCard from "@/components/profile/ProfileCard";


export default function ProfilePage() {
  return (
    <div className="space-y-7">
      <ProfileCard />
      <CreatePostModal />
      <div className="flex flex-col gap-6 mt-8">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  )
}
