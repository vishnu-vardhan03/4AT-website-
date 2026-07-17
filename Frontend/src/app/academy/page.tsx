import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/academy/Hero";
import { HeroContent } from "@/components/academy/HeroContent";
import { ctaRoute } from "@/components/academy/data";
import { PageShell } from "@/components/academy/PageShell";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero>
          <HeroContent />
        </Hero>
        <PageShell ctaRoute={ctaRoute} />
      </main>
      <Footer />
    </>
  );
}
