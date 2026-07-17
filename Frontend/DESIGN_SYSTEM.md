# Nova AI Design System & UI Specifications

Welcome to the official Design System documentation for **Nova AI**. This document provides concrete measurements, classes, typography scales, and structural rules to ensure design consistency across the entire application.

---

## 1. Typography & Hierarchy

We use a clean, modern tech aesthetic. Headings are optimized for readability and impact, leveraging standard Tailwind CSS sizing paired with customized weights.

### Desktop Typography
| Element | Class / Equivalent | Font Size | Line Height | Tracking | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `text-7xl` | `4.5rem` (72px) | `leading-none` (1.1) | `tracking-tight` (-0.02em) | `font-extrabold` (800) | Hero sections only |
| **Section H1** | `text-5xl` | `3.0rem` (48px) | `leading-tight` (1.2) | `tracking-tight` (-0.015em) | `font-bold` (700) | Major page sections |
| **Section H2** | `text-4xl` | `2.25rem` (36px) | `leading-snug` (1.3) | `tracking-tight` (-0.01em) | `font-bold` (700) | Secondary headings |
| **Subsection H3**| `text-2xl` | `1.50rem` (24px) | `leading-normal` (1.4)| `tracking-normal` (0) | `font-semibold` (600) | Card/Group titles |
| **Body Large** | `text-lg` | `1.125rem` (18px)| `leading-relaxed` (1.6)| `tracking-normal` (0) | `font-normal` (400) | Hero intros, summary copy |
| **Body Normal** | `text-base` | `1.0rem` (16px) | `leading-normal` (1.5)| `tracking-normal` (0) | `font-normal` (400) | General body paragraphs |
| **Small Copy** | `text-sm` | `0.875rem` (14px)| `leading-tight` (1.4) | `tracking-wide` (0.02em) | `font-medium` (500) | Captions, metadata, tags |

### Mobile Typography
| Element | Class / Equivalent | Font Size | Line Height | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `text-4xl` | `2.25rem` (36px) | `leading-none` (1.1) | `font-extrabold` (800) |
| **Section H1** | `text-3xl` | `1.875rem` (30px)| `leading-tight` (1.2) | `font-bold` (700) |
| **Subsection H3**| `text-xl` | `1.25rem` (20px) | `leading-snug` (1.35) | `font-semibold` (600) |
| **Body Normal** | `text-sm` | `0.875rem` (14px)| `leading-normal` (1.5)| `font-normal` (400) |

---

## 2. Layout & Section Measurements

To maintain symmetry and responsive adaptation, use these fixed section and container guidelines.

### Containers
* **Standard Container**: Max-width of `1280px` (`max-w-7xl px-4 md:px-8 mx-auto`).
* **Focused Container**: Max-width of `1024px` (`max-w-5xl px-4 md:px-6 mx-auto`) for centered reading layouts.

### Vertical Spacing (Margins & Paddings)
* **Section to Section**:
  * Desktop: `py-24` to `py-32` (`96px` to `128px` padding top & bottom).
  * Mobile: `py-12` to `py-16` (`48px` to `64px` padding top & bottom).
* **Section Header to Content Grid**:
  * Desktop: `mb-16` (`64px` margin bottom) or `space-y-6` inside headers.
  * Mobile: `mb-10` (`40px` margin bottom).
* **Grid Spacing**:
  * Columns: `gap-6` (`24px`) or `gap-8` (`32px`) on desktop, collapsing to `gap-4` (`16px`) on mobile.

---

## 3. Card Specifications & UI Components

Cards utilize a glassmorphism style built on top of dark mode base colors to deliver a premium feel.

### Card Types & Layout Specifications

#### 1. Standard Content Card (e.g., Blog Posts, Services)
* **Padding**: `p-6` (`24px`) even padding on all sides.
* **Corner Radius**: `rounded-2xl` (`1rem` / `16px`).
* **Background**: `bg-card` / `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(20px)`.
* **Border**: `border border-white/8%` (`border-border`).
* **Layout Structure**:
  ```tsx
  <div className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-xl transition-all duration-300">
    <div className="space-y-4">
      {/* Media or Icon container */}
      <div className="aspect-video w-full rounded-lg bg-white/5" />
      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Title</h3>
        <p className="text-sm text-muted-foreground">Description...</p>
      </div>
    </div>
  </div>
  ```

#### 2. Interactive / Hover-State Card (e.g., Feature Cards)
* **Padding**: `p-8` (`32px`) desktop, `p-6` (`24px`) mobile.
* **Corner Radius**: `rounded-[20px]` (`1.25rem` / `20px`).
* **Hover Interaction**:
  * Translate Y by `-4px` (`hover:-translate-y-1`).
  * Border shifts from `border-white/8%` to `border-white/20%`.
  * Background glow (using radial background gradients).
  * Add transition configuration: `transition-all duration-300 ease-out`.

#### 3. Hero / Call to Action Card (Full Width)
* **Padding**: `p-12` (`48px`) desktop, `p-6` (`24px`) mobile.
* **Corner Radius**: `rounded-3xl` (`1.5rem` / `24px`).
* **Background**: Linear gradient overlay with transparent borders.

---

## 4. Design Accent Tokens (OKLCH / Hex equivalents)

* **Background**: `#0a0e23` (Deep navy/space background)
* **Cards**: `oklch(0.08 0 0)` (Soft dark gray / elevated background)
* **Borders**: `oklch(1 0 0 / 8%)` (Semi-transparent white borders)
* **Text Primary**: `oklch(1 0 0)` (Pure white)
* **Text Secondary**: `oklch(0.7 0 0)` (Soft muted gray)
