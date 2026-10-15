import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Experience } from "@/components/motion/Experience";
export const metadata: Metadata = { title: "ARC — Built around change.", description: "Your body changes. Your life changes. Your goals change. A lifelong adaptive wellness system, built around you.", robots: { index: true, follow: true } };
const geist = localFont({ src: "../public/fonts/Geist-Variable.ttf", variable: "--font-geist", display: "swap", weight: "100 900" });
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en" className={geist.variable}><body><a className="skip-link" href="#philosophy">Skip to content</a><Experience>{children}</Experience></body></html>;
}
