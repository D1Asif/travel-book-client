"use client"

import { Spinner, Tab, Tabs } from "@heroui/react"
import CreatePostSection from "../post/CreatePostSection"
import PostCard from "../post/PostCard"
import AboutTab from "./AboutTab"
import { TPost } from "../home/FeedComponent"
import { useEffect, useState } from "react"
import { getPosts } from "@/actions"
import { useParams } from "next/navigation"
import SubscriptionTab from "./SubscriptionTab"

export default function ProfileTabs() {
    const [profilePosts, setProfilePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { profileId } = useParams();

    useEffect(() => {
        const getProfilePosts = async () => {
            try {
                setLoading(true); // ✅ Set loading before fetching
                const posts = await getPosts({ author: profileId });
                setProfilePosts(posts?.data || []);
            } catch (error) {
                console.error("Error fetching profile posts:", error);
            } finally {
                setLoading(false); // ✅ Ensure loading stops after fetch
            }
        };

        getProfilePosts();
    }, [profileId]);

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="lg" className="flex justify-center">
                <Tab key="posts" title="Posts">
                    <div className="mt-3">
                        <CreatePostSection />
                        <div className="flex flex-col gap-6 mt-8">
                            {loading && (
                                <div className="my-5 mx-auto">
                                    <Spinner />
                                </div>
                            )}
                            {
                                profilePosts.length !== 0 ? (
                                    profilePosts.map((postData: TPost) => (
                                        <PostCard key={postData?._id} postData={postData} />
                                    ))
                                )
                                    : (
                                        !loading && <div className="text-center text-2xl py-3">
                                            No posts found!
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </Tab>
                <Tab key="about" title="About">
                    <AboutTab />
                </Tab>
                <Tab key="subscription" title="Subscription">
                    <SubscriptionTab />
                </Tab>
            </Tabs>
        </div>
    )
}
