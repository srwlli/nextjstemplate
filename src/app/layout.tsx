import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next.js App Template - A Modern Web Starter",
    template: "%s | Next.js App Template",
  },
  description: "A robust Next.js application template built with TypeScript, Tailwind CSS, Supabase, and Jest. Perfect for modern web app development.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Authentication", "Fullstack", "Template", "Boilerplate"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  creator: "Your Name",
  publisher: "Your Company/Project",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  // Open Graph (for social media sharing)
  openGraph: {
    title: "Next.js App Template",
    description: "A robust Next.js application template for modern web development.",
    url: "/",
    siteName: "Next.js App Template",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js App Template Social Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Next.js App Template",
    description: "A robust Next.js application template for modern web development.",
    creator: "@yourtwitterhandle",
    images: ["/og-image.jpg"],
  },

  // Favicons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Robots meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // PWA manifest
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pb-20 px-4 py-6">
            {children}
          </main>
          <Navigation />
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
