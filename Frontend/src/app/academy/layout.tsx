import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { AnimationProvider } from "@/components/academy/AnimationProvider";
import { CustomCursor } from "@/components/academy/CustomCursor";
import { GlobalParticles } from "@/components/academy/GlobalParticles";
import { SmoothScroll } from "@/components/academy/SmoothScroll";
import "@/styles/academy.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});


export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`academy-page ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-violet-500 via-fuchsia-500 via-sky-400 to-teal-400 z-[999] origin-left"
        style={{ width: "0%" }}
      />
      <CustomCursor />
      <GlobalParticles />
      <SmoothScroll>
        <AnimationProvider>{children}</AnimationProvider>
      </SmoothScroll>
    </div>
  );
}
