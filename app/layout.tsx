import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { APP_ACCENT } from "@/lib/constants/brand";
import localFont from "next/font/local";
import "./globals.css";
import "./product.css";
import "./walkthrough.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Experience } from "@/components/motion/Experience";
export const metadata: Metadata = { title: "ARC — Built around change.", description: "Your body changes. Your life changes. Your goals change. An adaptive wellness app connecting training, nutrition, recovery and progress. Built around you.", robots: { index: true, follow: true } };
const geist = localFont({ src: "../public/fonts/Geist-Variable.ttf", variable: "--font-geist", display: "swap", weight: "100 900" });
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en" className={geist.variable} style={{ "--accent": APP_ACCENT } as CSSProperties}><body><a className="skip-link" href="#main">Skip to content</a><Navigation /><Experience>{children}</Experience><Footer /></body></html>;
}
