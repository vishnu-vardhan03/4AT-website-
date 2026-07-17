import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "4AT | AI-Driven Digital Experiences",
  description: "Premium AI consulting studio helping ambitious teams simplify workflows and ship intelligent products.",
  openGraph: {
    title: "4AT | AI-Driven Digital Experiences",
    description: "Premium AI consulting studio helping ambitious teams simplify workflows and ship intelligent products.",
  },
};

export default function Home() {
  return <HomePage />;
}
