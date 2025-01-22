import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";

interface ProfilePageProps {
  params: {
    profileId: string; // or number, depending on your profileId type
  };
}

export default function ProfilePage({ params: { profileId } }: ProfilePageProps) {
  return (
    <div className="space-y-7">
      <ProfileCard profileId={profileId} />
      <ProfileTabs />
    </div>
  )
}
