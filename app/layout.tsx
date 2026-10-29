import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { APP_ACCENT } from "@/lib/constants/brand";
import localFont from "next/font/local";
import "./globals.css";
import "./product.css";
import "./walkthrough.css";
import "./brand.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Experience } from "@/components/motion/Experience";
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), title: "ARC — Built around change.", description: "Your body changes. Your life changes. Your goals change. An adaptive wellness app connecting training, nutrition, recovery and progress. Built around you.", robots: { index: true, follow: true }, openGraph: { title: "ARC — Built around change.", description: "One adaptive system. Built around you.", images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "ARC — Built around change" }] }, twitter: { card: "summary_large_image", images: ["/brand/og.png"] } };
const geist = localFont({ src: "../public/fonts/Geist-Variable.ttf", variable: "--font-geist", display: "swap", weight: "100 900" });
const space = localFont({ src: [{path: "../public/fonts/SpaceGrotesk-Regular.ttf", weight: "400"}, {path: "../public/fonts/SpaceGrotesk-Medium.ttf", weight: "500"}, {path: "../public/fonts/SpaceGrotesk-SemiBold.ttf", weight: "600"}, {path: "../public/fonts/SpaceGrotesk-Bold.ttf", weight: "700"}], variable: "--font-space", display: "swap" });
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en" className={`${geist.variable} ${space.variable}`} style={{ "--accent": APP_ACCENT } as CSSProperties}><body><a className="skip-link" href="#main">Skip to content</a><Navigation /><Experience>{children}</Experience><Footer /></body></html>;
}
