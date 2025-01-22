"use client"

import { Tab, Tabs } from "@nextui-org/react"
import CreatePostSection from "../post/CreatePostSection"
import PostCard from "../post/PostCard"
import AboutTab from "./AboutTab"

export default function ProfileTabs() {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="lg" className="flex justify-center">
                <Tab key="posts" title="Posts">
                    <div className="mt-3">
                        <CreatePostSection />
                        <div className="flex flex-col gap-6 mt-8">
                            <PostCard />
                            <PostCard />
                            <PostCard />
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
