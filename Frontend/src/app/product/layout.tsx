import { Space_Grotesk } from "next/font/google";

import "./product.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-product",
});

export default function ProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`product-page ${spaceGrotesk.variable}`}>
      {children}
    </div>
  );
}
