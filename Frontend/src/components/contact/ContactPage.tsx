"use client";

import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Check, Clock3, LoaderCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { TextareaField, TextField } from "@/components/lead-collection/FormFields";
import { trackFormSubmit } from "@/lib/analytics";

const services = ["4AT Consulting", "4AT Academy", "4AT.AI", "Hybrid Services", "Other"];
const MAX_MESSAGE_CHARS = 4000;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedService, setSelectedService] = useState("");
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

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({ ...prev, phone: value }));
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone && !isValidPhoneNumber(form.phone)) {
      setPhoneError("Enter a valid phone number for the selected country");
      return;
    }
    setFormState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service: selectedService || "Other",
          description: form.message,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message ?? result?.error ?? "Unable to send message");
      }
      // Track only accepted submissions so validation or API failures do not inflate conversions.
      trackFormSubmit("contact_form", { service: selectedService || "Other" });
      setFormState("success");
    } catch (error) {
      console.error("Contact submission failed", error);
      setFormState("error");
    }
  };

  return (
    <div className="contact-page constant-site-background min-h-screen text-white">
      <Nav />

      <main>

        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden pt-36 pb-20 px-6 md:px-12">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -left-60 top-0 h-[600px] w-[600px] rounded-full bg-[#38bdf8]/10 blur-[140px]" />
          <div className="pointer-events-none absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-[#a78bfa]/8 blur-[140px]" />

          <div className="relative mx-auto max-w-[1200px]">
            <span className="section-badge">Contact us</span>
            <h1 className="site-hero-heading mt-5">
              Let&apos;s build something{" "}
              <span className="text-brand-gradient-flow">extraordinary.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Whether you&apos;re ready to start or just exploring, an experienced finance professional will get back to you within one business day. No decks, no sales scripts.
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
                      "Princeton, New Jersey - 08540",
                      "+1 609 255 3118",
                      "info@consult-4at.com",
                    ],
                  },
                  {
                    label: "India",
                    color: "#a78bfa",
                    lines: [
                      "3rd Floor, D-Block, I Labs Center",
                      "Madhapur, Hyderabad, TS - 500081",
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
                      "Homebush West, NSW - 2140",
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
                            <a href={`mailto:${line}`} className="transition-colors hover-fine:text-white">
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
                    <Clock3 className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">1 business day response</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                      Every submission is reviewed by an experienced finance professional, not a bot or SDR.
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
                    <Check className="h-10 w-10 text-[#2dd4bf]" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Message sent!</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-xs">
                    An experienced finance professional from 4AT will reach out within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({ name: "", email: "", company: "", phone: "", message: "" });
                      setSelectedService("");
                      setPhoneError("");
                    }}
                    className="mt-10 rounded-full border border-white/15 px-7 py-2.5 text-sm font-semibold text-white/60 transition hover-fine:-translate-y-0.5 hover-fine:border-white/30 hover-fine:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Send us a message</h3>
                    <p className="mt-1 text-xs text-white/40">Fields marked <span className="text-[#7dd3fc]">*</span> are required</p>
                  </div>

                  {/* Name + Company */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField id="contact-name" name="name" type="text" label="Full name" required value={form.name} onChange={handleChange} placeholder="John Smith" />
                    <TextField id="contact-company" name="company" type="text" label="Company" value={form.company} onChange={handleChange} placeholder="Acme Corp" />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField id="contact-email" name="email" type="email" label="Work email" required value={form.email} onChange={handleChange} placeholder="john@company.com" />
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-widest text-white/45">
                        Phone
                      </label>
                      <PhoneInput
                        defaultCountry="in"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        inputProps={{ id: "contact-phone", name: "phone", autoComplete: "tel" }}
                        className={`lead-phone-input ${phoneError ? "lead-phone-input--error" : ""}`}
                      />
                      {phoneError && <p className="text-[11px] text-red-400">{phoneError}</p>}
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
                          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${selectedService === s
                              ? "border-[#7dd3fc]/60 bg-[#7dd3fc]/15 text-[#7dd3fc]"
                              : "border-white/10 bg-white/[0.03] text-white/45 hover-fine:-translate-y-0.5 hover-fine:border-white/25 hover-fine:text-white/75"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <TextareaField
                    id="contact-message"
                    name="message"
                    label="Message"
                    rows={5}
                    maxLength={MAX_MESSAGE_CHARS}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current finance challenges and what you're looking to achieve…"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group relative w-full overflow-hidden rounded-lg bg-white px-6 py-4 text-sm font-black text-black transition-all duration-300 hover-fine:-translate-y-0.5 hover-fine:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-60"
                  >
                    <span className={`flex items-center justify-center gap-2 transition-all duration-200 ${formState === "submitting" ? "opacity-0" : "opacity-100"}`}>
                      Send message
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover-fine:translate-x-1">→</span>
                    </span>
                    {formState === "submitting" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <LoaderCircle className="h-5 w-5 animate-spin text-black" aria-hidden="true" />
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
    </div>
  );
}
