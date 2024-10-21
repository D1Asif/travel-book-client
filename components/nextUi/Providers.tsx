
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider className='h-screen flex flex-col'>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}