import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Maartens Mijmeringen",
    description: "Archief van Maartens Mijmeringen uit de jaren 0.",
    keywords: "maarten,dekker,archief"
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
