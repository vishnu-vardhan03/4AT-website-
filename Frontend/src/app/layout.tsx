import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ConsentAnalytics from "@/components/ConsentAnalytics";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://4at.ai"),
  title: "4AT AI — Finance Automation Platform",
  description:
    "Finance-native AI for reconciliation, compliance, and reporting. Purpose-built for your numbers.",
  openGraph: {
    title: "4AT AI — Finance Automation Platform",
    description: "Automate the Intelligence Layer with finance-native AI.",
    siteName: "4AT AI",
    type: "website",
    url: "/",
  },
  alternates: { canonical: "/" },
  twitter: {
    card: "summary_large_image",
    title: "4AT AI — Finance Automation Platform",
    description: "Automate the Intelligence Layer with finance-native AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <ConsentAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
