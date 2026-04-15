import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Team Management System",
    template: "%s | Team Management", // Child pages can override title
  },
  description:
    "Employee & Department Management System - Manage your team efficiently with our comprehensive HRMS solution",
  keywords: [
    "employee management",
    "department management",
    "HRMS",
    "team management",
    "HR software",
  ],
  authors: [{ name: "Tushar With AI" }],
  creator: "Tushar Simform",
  publisher: "Tushar M",

  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourapp.com",
    siteName: "Team Management System",
    title: "Team Management System",
    description:
      "Employee & Department Management System - Manage your team efficiently",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image to /public
        width: 1200,
        height: 630,
        alt: "Team Management System",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Team Management System",
    description: "Employee & Department Management System",
    images: ["/twitter-image.png"], // You'll need to add this image to /public
    creator: "@yourcompany",
  },

  // Robots configuration
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

  // Viewport and theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
