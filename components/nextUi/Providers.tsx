
import { HeroUIProvider } from "@heroui/react"
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider className='h-screen flex flex-col'>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextThemesProvider>
        </HeroUIProvider>
    )
}