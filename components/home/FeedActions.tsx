"use client"

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function FeedActions() {
    return (
        <div className="flex gap-4">
            {/* Search */}
            <Input
                isClearable
                radius="lg"
                placeholder="Type to search..."
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
