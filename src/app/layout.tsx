import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F97316" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1622" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kamaehugym.com"),
  title: "Kamaehu Gym | Your Gym Family",
  description:
    "The fitness + wellness + social platform that helps you achieve sustainable progress. Track workouts, log nutrition, and connect with your gym family. No crash diets, no burnout.",
  keywords: [
    "fitness app",
    "workout tracker",
    "nutrition logging",
    "macro tracking",
    "gym community",
    "workout planner",
    "meal planning",
    "fitness social network",
    "personal records",
    "metabolism tracking",
  ],
  authors: [{ name: "Kamaehu" }],
  creator: "Kamaehu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kamaehugym.com",
    siteName: "Kamaehu Gym",
    title: "Kamaehu Gym | Your Gym Family",
    description:
      "The fitness + wellness + social platform for sustainable progress. Track workouts, log nutrition, and connect with your gym family.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kamaehu Gym - Your Gym Family",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamaehu Gym | Your Gym Family",
    description:
      "The fitness + wellness + social platform for sustainable progress.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
