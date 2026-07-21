import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - 4AT",
  description: "How 4AT collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <article className="max-w-3xl space-y-8 text-neutral-300">
        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Privacy Policy</h1>
          <p className="text-base leading-relaxed text-neutral-400">Last updated: July 20, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Information we collect</h2>
          <p className="leading-relaxed">We collect information you provide directly, such as contact or inquiry details, and limited technical information needed to operate and secure this website.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Cookies and analytics</h2>
          <p className="leading-relaxed">Necessary cookies support core site functionality. Analytics and marketing technologies are used only when you consent to their respective categories through our cookie preferences.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">How we use information</h2>
          <p className="leading-relaxed">We use information to respond to requests, provide and improve our services, maintain security, and meet legal obligations.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="leading-relaxed">Contact 4AT through the website contact form with questions about this policy or your personal information.</p>
        </section>
      </article>
    </main>
  );
}
