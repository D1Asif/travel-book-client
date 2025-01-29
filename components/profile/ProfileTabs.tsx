"use client"

import { Tab, Tabs } from "@nextui-org/react"
import CreatePostSection from "../post/CreatePostSection"
import PostCard from "../post/PostCard"
import AboutTab from "./AboutTab"
import { TPost } from "../home/FeedComponent"
import { useEffect, useState } from "react"
import { getPosts } from "@/actions"
import { useParams } from "next/navigation"

export default function ProfileTabs() {
    const [profilePosts, setProfilePosts] = useState([]);
    const { profileId } = useParams();

    useEffect(() => {
        const getProfilePosts = async () => {
            const posts = await getPosts({ author: profileId });
            setProfilePosts(posts?.data);
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
                            {
                                profilePosts.length !== 0 ? (
                                    profilePosts.map((postData: TPost) => (
                                        <PostCard key={postData?._id} postData={postData} />
                                    ))
                                ) 
                                : (
                                    <div className="text-center text-2xl py-3">
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

                </Tab>
            </Tabs>
        </div>
    )
}
