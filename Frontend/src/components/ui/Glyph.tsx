import React from "react";

export type GlyphName =
  | "reconcile" | "anomaly" | "document" | "forecast" | "audit" | "erp"
  | "architecture" | "compliance" | "human" | "rocket"
  | "connect" | "understand" | "automate" | "govern";

const paths: Record<GlyphName, React.ReactNode> = {
  // ── Capabilities ──────────────────────────────
  reconcile: (
    <>
      <path d="M4 4v3a4 4 0 0 0 4 4h8" />
      <path d="M4 20v-3a4 4 0 0 1 4-4" />
      <path d="M13 8l3.5 3.5L13 15" />
    </>
  ),
  anomaly: (
    <>
      <path d="M2 13h3.5l2-6 3.5 11 2.2-7H17" />
      <circle cx="20.4" cy="9" r="2.1" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  forecast: (
    <>
      <path d="M3 16l4-4 3 2 4-6" />
      <path d="M14 8l3.2 2.2L21 5" strokeDasharray="2.2 2.2" />
      <circle cx="21" cy="5" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  audit: (
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M8.5 14l2.2 2.2L15 12" />
    </>
  ),
  erp: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 6h8M7.4 7.6l3.4 8.4M16.6 7.6l-3.4 8.4" />
    </>
  ),
  // ── Why / Unfair advantage ────────────────────
  architecture: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16.5l9 5 9-5" />
    </>
  ),
  compliance: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 16v1.6" />
    </>
  ),
  human: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.4 1-1.5 5-1.5 5s4-.1 5-1.5" />
      <path d="M12 15l-3-3a11 11 0 0 1 7-8 6 6 0 0 1 4 4 11 11 0 0 1-8 7z" />
      <circle cx="15" cy="9" r="1.5" />
    </>
  ),
  // ── Process ───────────────────────────────────
  connect: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v6c0 1.45 3.1 2.6 7 2.6s7-1.15 7-2.6V6" />
      <path d="M5 12v6c0 1.45 3.1 2.6 7 2.6s7-1.15 7-2.6v-6" />
    </>
  ),
  understand: (
    <>
      <circle cx="6.5" cy="7" r="2" />
      <circle cx="17.5" cy="6.5" r="2" />
      <circle cx="16.5" cy="17" r="2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M8.4 7.2l7.2-.4M7 9v6M16.8 8.4l.4 6.7M8.6 16.6l6.2.3M8.2 8.4l7.6 7.2" />
    </>
  ),
  automate: (
    <>
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
    </>
  ),
  govern: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

interface Props {
  name: GlyphName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Glyph({ name, size = 24, className = "", strokeWidth = 1.6 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
