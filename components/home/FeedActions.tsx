"use client"

import { useDebounce } from "@/hooks/useDebounce";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FeedActions() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const urlSearchParams = new URLSearchParams(searchParams);
    const [searchTerm, setSearchTerm] = useState(urlSearchParams.get("searchTerm") || "");
    
    const updateSearchParams = (term: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (term) {
            newParams.set("searchTerm", term);
        } else {
            newParams.delete("searchTerm");
        }
        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const debouncedUpdateSearchParams = useDebounce(updateSearchParams, 500);

    useEffect(() => {
        debouncedUpdateSearchParams(searchTerm);
    }, [searchTerm, debouncedUpdateSearchParams]);

    return (
        <div className="flex gap-4">
            {/* Search */}
            <Input
                isClearable
                radius="lg"
                placeholder="Type to search..."
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
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">All posts</DropdownItem>
                    <DropdownItem key="copy">Following</DropdownItem>
                    <DropdownItem key="edit">Most upvoted</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
