"use client"

import { useDebounce } from "@/hooks/useDebounce";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FeedActions() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const params = new URLSearchParams(searchParams);

    const [searchTerm, setSearchTerm] = useState(params.get("searchTerm") || "");
    
    const updateSearchParams = (key: string, value: string | null) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const debouncedUpdateSearchParams = useDebounce((term: string) => {
        updateSearchParams("searchTerm", term || null);
    }, 500);

    useEffect(() => {
        debouncedUpdateSearchParams(searchTerm);
    }, [searchTerm, debouncedUpdateSearchParams]);

    // Handle filter selection
    const handleFilterSelection = (key: string) => {
        if (key === "all") {
            router.push("?", { scroll: false }); // Clear all filters
            setSearchTerm("");
        } else if (key === "following") {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("filter", "following");
            newParams.delete("sort");
            router.push(`?${newParams.toString()}`, { scroll: false });
        } else if (key === "most-upvoted") {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sort", "-upVotes");
            newParams.delete("filter"); // if needed
            router.push(`?${newParams.toString()}`, { scroll: false });
        }
    };

    return (
        <div className="flex gap-4">
            {/* Search */}
            <Input
                isClearable
                radius="lg"
                placeholder="Type to search..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
                startContent={
                    <MagnifyingGlass className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />

            {/* Filter  */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="flat"
                    >
                        Filter
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Static Actions"
                    onAction={(key) => handleFilterSelection(key as string)}
                >
                    <DropdownItem key="all">All posts</DropdownItem>
                    <DropdownItem key="following">Following</DropdownItem>
                    <DropdownItem key="most-upvoted">Most upvoted</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
