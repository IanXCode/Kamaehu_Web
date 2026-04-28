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
  title: "Kamaehu Gym | AI Food Logging That Actually Understands Asian Cuisine",
  description:
    "Finally, an AI that understands soto ayam, nasi padang, and pho. Component-level macro breakdowns, adaptive metabolism tracking, and research-backed nutrition — built by a lifter, for lifters.",
  keywords: [
    // Primary value props
    "AI food logging",
    "Asian food macro tracker",
    "Indonesian food nutrition app",
    "soto ayam calories",
    "nasi padang macros",
    // Features
    "adaptive metabolism tracking",
    "TDEE calculator app",
    "macro tracking app",
    "workout and nutrition app",
    "fitness app for lifters",
    // Indonesian market
    "aplikasi nutrisi Indonesia",
    "aplikasi kalori makanan Indonesia",
    "aplikasi fitness Indonesia",
    "hitung kalori makanan Indonesia",
    // General fitness
    "workout tracker",
    "gym app",
    "nutrition logging",
    "meal tracking app",
    "protein tracking",
    "bodybuilding app",
  ],
  authors: [{ name: "Kamaehu Gym" }],
  creator: "Kamaehu Gym",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kamaehugym.com",
    siteName: "Kamaehu Gym",
    title: "Kamaehu Gym | AI That Finally Understands Your Food",
    description:
      "Log soto ayam, nasi padang, or pho — and get accurate macros with component-level breakdowns. Plus adaptive metabolism tracking and honest coaching.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kamaehu Gym - AI Food Logging for Asian Cuisine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamaehu Gym | AI That Finally Understands Your Food",
    description:
      "Log soto ayam, nasi padang, or pho — and get accurate macros. Built by a lifter, for lifters.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    languages: {
      "en": "https://kamaehugym.com",
      "id": "https://kamaehugym.com/id",
    },
  },
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
      <head>
        {/* Structured data for app */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "name": "Kamaehu Gym",
              "operatingSystem": "iOS",
              "applicationCategory": "HealthApplication",
              "description": "AI-powered food logging that understands Asian and Indonesian cuisine. Adaptive metabolism tracking and workout logging for serious lifters.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1",
                "bestRating": "5",
                "worstRating": "1"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
