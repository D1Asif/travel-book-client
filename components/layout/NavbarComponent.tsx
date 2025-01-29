"use client"

import { Avatar, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavbarComponent({ fromAuth }: { fromAuth?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        {
            title: 'Dashboard',
            link: '/dashboard'
        },
        {
            title: 'About Us',
            link: '/about-us'
        },
        {
            title: 'Contact Us',
            link: '/contact-us'
        },
    ];

    const { data: session, status } = useSession();

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl" isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <Image
                            src="/logo-white.png"
                            height={50}
                            width={110}
                            alt="Logo"
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex ga-4 lg:gap-8" justify="center">
                {
                    menuItems.map((item) => (
                        <NavbarItem key={item.title}>
                            <Link color="foreground" href={item.link}>
                                {item.title}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    !fromAuth && (
                        <>
                            {
                                status === 'authenticated' ? (
                                    <>
                                        <Link href={`/profile/${session.user.data._id}`}>
                                            <Avatar
                                                showFallback
                                                src={session?.user?.data?.profilePicture}
                                                name={session?.user?.data.name}
                                            />
                                        </Link>
                                        <NavbarItem>
                                            <Button
                                                color="danger"
                                                variant="flat"
                                                onClick={() => signOut()}
                                            >
                                                Log out
                                            </Button>
                                        </NavbarItem>
                                    </>
                                ) : (
                                    <>
                                        <NavbarItem className="hidden lg:flex">
                                            <Link href="/login">Login</Link>
                                        </NavbarItem>
                                        <NavbarItem>
                                            <Button as={Link} color="primary" href="/registration" variant="flat">
                                                Sign Up
                                            </Button>
                                        </NavbarItem>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </NavbarContent>
            <NavbarMenu className="p-10 gap-4">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href={item.link}
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
