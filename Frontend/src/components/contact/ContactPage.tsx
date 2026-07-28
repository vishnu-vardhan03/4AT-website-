"use client";

import { useState } from "react";
import { getCountries, getCountryCallingCode, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";

const services = ["4AT Consulting", "4AT Academy", "4AT.AI", "Hybrid Services", "Other"];

/** E.164 caps a full number at 15 digits including the country code; this is a generous
 *  input guard only — validity is decided by libphonenumber, not by length. */
const MAX_PHONE_DIGITS = 18;
/** Must leave headroom for the Service / Company size / Budget prefix the API route
 *  prepends, because the backend caps the composed `message` at 5000 characters. */
const MAX_MESSAGE_CHARS = 4000;

// Every dialling country, not a seven-entry whitelist: the old list silently truncated
// out-of-list numbers to India's digit count, or hard-blocked the enquiry outright.
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const allPhoneCountries = getCountries()
  .map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((left, right) => left.name.localeCompare(right.name));
// India first — primary market — then the rest alphabetically.
const phoneCountries = [
  ...allPhoneCountries.filter((country) => country.code === "IN"),
  ...allPhoneCountries.filter((country) => country.code !== "IN"),
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedService, setSelectedService] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IN");
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectedPhoneCountry = phoneCountries.find((country) => country.code === phoneCountry) ?? phoneCountries[0];

  const handlePhoneChange = (value: string) => {
    // Digits only, but never truncated to a per-country length — national number lengths
    // vary, and slicing produced valid-looking numbers that belonged to nobody.
    const digits = value.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);
    setForm((prev) => ({ ...prev, phone: digits }));
    setPhoneError("");
  };

  const handlePhoneCountryChange = (countryCode: string) => {
    setPhoneCountry(countryCode as CountryCode);
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = form.phone ? `${selectedPhoneCountry.dialCode}${form.phone}` : "";
    // Validate against the selected country's real numbering plan instead of one hardcoded
    // digit count, so no legitimate international number is rejected.
    if (fullPhone && !isValidPhoneNumber(fullPhone)) {
      setPhoneError(`Enter a valid phone number for ${selectedPhoneCountry.name}`);
      return;
    }
    setFormState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: fullPhone,
          service: selectedService || "Other",
          description: form.message,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message ?? result?.error ?? "Unable to send message");
      }
      setFormState("success");
    } catch (error) {
      console.error("Contact submission failed", error);
      setFormState("error");
    }
  };

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[#060914] text-white">

        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden pt-36 pb-20 px-6 md:px-12">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -left-60 top-0 h-[600px] w-[600px] rounded-full bg-[#38bdf8]/10 blur-[140px]" />
          <div className="pointer-events-none absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-[#a78bfa]/8 blur-[140px]" />

          <div className="relative mx-auto max-w-[1200px]">
            <span className="text-xs font-bold uppercase tracking-[.24em] text-[#7dd3fc]">Contact us</span>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Let&apos;s build something{" "}
              <span className="text-brand-gradient-flow">extraordinary.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                Whether you&apos;re ready to start or just exploring, a senior practitioner will get back to you within one business day. No decks, no sales scripts.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="relative px-6 pb-28 md:px-12">
          <div className="relative mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-start">

            {/* ── LEFT: Contact info ── */}
            <div>
              <h2 className="text-2xl font-black tracking-tight">Get in touch</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Fill in the form and we&apos;ll match you to the right team: consulting, academy, or AI.
              </p>

              {/* Office locations */}
              <div className="mt-10 space-y-8">
                {[
                  {
                    label: "USA",
                    color: "#38bdf8",
                    lines: [
                      "116 Village Blvd, Suite 200",
                      "Princeton, New Jersey – 08540",
                      "+1 609 255 3118",
                      "info@consult-4at.com",
                    ],
                  },
                  {
                    label: "India",
                    color: "#a78bfa",
                    lines: [
                      "3rd Floor, D-Block, I Labs Center",
                      "Madhapur, Hyderabad, TS – 500081",
                      "+91 90110433456",
                      "+91 9133203456",
                      "info@consult-4at.com",
                    ],
                  },
                  {
                    label: "Australia",
                    color: "#2dd4bf",
                    lines: [
                      "KG01-86 Courallie Avenue",
                      "Homebush West, NSW – 2140",
                      "info@consult-4at.com",
                    ],
                  },
                ].map((office) => (
                  <div key={office.label} className="flex gap-5">
                    <span
                      className="mt-1 h-5 w-[3px] shrink-0 rounded-full"
                      style={{ backgroundColor: office.color }}
                    />
                    <div>
                      <p
                        className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
                        style={{ color: office.color }}
                      >
                        {office.label}
                      </p>
                      {office.lines.map((line) => (
                        <p key={line} className="text-sm text-white/55 leading-relaxed">
                          {line.includes("@") ? (
                            <a href={`mailto:${line}`} className="hover:text-white transition-colors">
                              {line}
                            </a>
                          ) : line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response promise */}
              <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7dd3fc]/25 bg-[#7dd3fc]/10">
                    <svg className="h-4 w-4 text-[#7dd3fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">1 business day response</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                    Every submission is reviewed by a senior practitioner, not a bot or SDR.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-sm md:p-10">
              {/* Inner gradient */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#38bdf8]/5 via-transparent to-[#a78bfa]/5" />

              {formState === "success" ? (
                <div className="relative flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#2dd4bf]/30 bg-[#2dd4bf]/10">
                    <svg className="h-10 w-10 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-white">Message sent!</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-xs">
                    A senior practitioner from 4AT will reach out within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({ name: "", email: "", company: "", phone: "", message: "" });
                      setSelectedService("");
                      setPhoneCountry("IN");
                      setPhoneError("");
                    }}
                    className="mt-10 rounded-full border border-white/15 px-7 py-2.5 text-sm font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Send us a message</h3>
                    <p className="mt-1 text-xs text-white/40">Fields marked <span className="text-[#38bdf8]">*</span> are required</p>
                  </div>

                  {/* Name + Company */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                        Full name <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#38bdf8]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                        Company
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#38bdf8]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                        Work email <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#38bdf8]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#38bdf8]/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                        Phone
                      </label>
                      <div className={`flex overflow-hidden rounded-lg border bg-white/[0.04] transition focus-within:bg-white/[0.07] focus-within:ring-1 ${
                        phoneError
                          ? "border-red-400/60 focus-within:ring-red-400/20"
                          : "border-white/10 focus-within:border-[#38bdf8]/50 focus-within:ring-[#38bdf8]/20"
                      }`}>
                        <select
                          aria-label="Phone country code"
                          value={phoneCountry}
                          onChange={(e) => handlePhoneCountryChange(e.target.value)}
                          className="w-[104px] shrink-0 cursor-pointer border-r border-white/10 bg-[#0b0e19] px-2 text-xs font-bold text-[#7dd3fc] outline-none"
                        >
                          {phoneCountries.map((country) => (
                            <option key={country.code} value={country.code} className="bg-[#0b0e19] text-white">
                              {country.code} {country.dialCode}
                            </option>
                          ))}
                        </select>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={MAX_PHONE_DIGITS}
                          value={form.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="Phone number"
                          aria-describedby="contact-phone-hint"
                          aria-invalid={phoneError ? true : undefined}
                          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-white/20 outline-none"
                        />
                      </div>
                      {phoneError ? (
                        <p id="contact-phone-hint" role="alert" className="text-[11px] text-red-400">
                          {phoneError}
                        </p>
                      ) : (
                        <p id="contact-phone-hint" className="text-[11px] text-white/30">
                          {selectedPhoneCountry.name} ({selectedPhoneCountry.dialCode}) — digits only, no dial code
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service interest pills */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                      I&apos;m interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedService(s === selectedService ? "" : s)}
                          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                            selectedService === s
                              ? "border-[#38bdf8]/60 bg-[#38bdf8]/15 text-[#38bdf8]"
                              : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/25 hover:text-white/75"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      maxLength={MAX_MESSAGE_CHARS}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your current finance challenges and what you're looking to achieve…"
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#38bdf8]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#38bdf8]/20"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group relative w-full overflow-hidden rounded-lg bg-white px-6 py-4 text-sm font-black text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-60"
                  >
                    <span className={`flex items-center justify-center gap-2 transition-all duration-200 ${formState === "submitting" ? "opacity-0" : "opacity-100"}`}>
                      Send message
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                    {formState === "submitting" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-5 w-5 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </span>
                    )}
                  </button>

                  {formState === "error" && (
                    <p className="text-center text-sm text-red-400">
                      We could not save your message. Please try again.
                    </p>
                  )}

                  <p className="text-center text-[11px] text-white/25">
                    We respond within 1 business day. No spam, ever.
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
