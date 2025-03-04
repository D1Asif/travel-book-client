"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { DotsThree } from "@phosphor-icons/react";

export default function CommentDropdown() {
    const items = [
        {
            key: "edit",
            label: "Edit",
        },
        {
            key: "delete",
            label: "Delete",
        },
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <div className="self-center cursor-pointer">
                    <DotsThree size="24" weight="bold" />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}
                onAction={(key) => {
                    if (key === "edit") {
                        // edit comment
                    }
                    if (key === "delete") {
                        // delete comment
                    }
                }}
            >
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === "delete" ? "text-danger" : ""}
                        color={item.key === "delete" ? "danger" : "default"}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}
