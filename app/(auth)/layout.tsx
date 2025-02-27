import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import "../globals.css";
import { Providers } from "@/components/nextUi/Providers";
import NavbarComponent from "@/components/layout/NavbarComponent";
import { Toaster } from "react-hot-toast";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Travel Book",
    description: "Social media for travel stories",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen`}>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
                <Providers>
                    <NavbarComponent fromAuth={true} />
                    <div className="max-w-3xl px-5 mx-auto my-5 flex-1">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
