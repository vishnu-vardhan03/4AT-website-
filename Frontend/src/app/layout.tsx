import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParallaxObserver } from "@/components/ui/ParallaxObserver";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4AT AI — Finance Automation Platform",
  description:
    "Finance-native AI for reconciliation, compliance, and reporting. Purpose-built for your numbers.",
  openGraph: {
    title: "4AT AI — Finance Automation Platform",
    description: "Automate the Intelligence Layer with finance-native AI.",
    siteName: "4AT AI",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
        <ParallaxObserver />
      </body>
    </html>
  );
}
