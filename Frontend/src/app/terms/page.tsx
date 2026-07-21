import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms - 4AT",
  description: "Terms governing use of the 4AT website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <article className="max-w-3xl space-y-8 text-neutral-300">
        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Terms of Use</h1>
          <p className="text-base leading-relaxed text-neutral-400">Last updated: July 20, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Using this website</h2>
          <p className="leading-relaxed">You may use this website for lawful purposes and to learn about 4AT products and services. You must not interfere with the site, attempt unauthorized access, or misuse its content.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Website content</h2>
          <p className="leading-relaxed">Content is provided for general information and may change without notice. Unless otherwise stated, 4AT owns or licenses the site content and associated intellectual property.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Availability and liability</h2>
          <p className="leading-relaxed">We work to keep the website accurate and available, but do not guarantee uninterrupted access or that all information is error-free. Use of the site is at your own risk to the extent permitted by law.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="leading-relaxed">Contact 4AT through the website contact form with questions about these terms.</p>
        </section>
      </article>
    </main>
  );
}
