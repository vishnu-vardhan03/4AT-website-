"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  showHudCorners?: boolean;
  neon?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "nav";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "!px-5 !py-2 !text-[10px] !tracking-wider rounded-[10px]",
  md: "!px-8 !py-3.5 !text-xs rounded-[14px]",
  lg: "!px-10 !py-4.5 !text-sm rounded-[18px]",
};

export const Button = React.forwardRef<
  HTMLElement,
  ButtonProps
>(
  (
    {
      className,
      href,
      target,
      rel,
      children,
      showHudCorners: _showHudCorners = true,
      neon: _neon = true,
      variant = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref
  ) => {
    void _showHudCorners;
    void _neon;
    const localRef = useRef<HTMLElement | null>(null);

    // Merge refs so parent can still reference the node if needed
    const combinedRef = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    useEffect(() => {
      const btn = localRef.current;
      if (!btn || typeof window === "undefined" || window.innerWidth < 1024) return;

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;

      let isPressed = false;
      let lastEvent: MouseEvent | null = null;

      const updatePosition = () => {
        if (!lastEvent) return;
        const rect = btn.getBoundingClientRect();
        const x = lastEvent.clientX - (rect.left + rect.width / 2);
        const y = lastEvent.clientY - (rect.top + rect.height / 2);

        // Magnetic displacement factor
        const pullX = x * 0.18;
        const pullY = y * 0.18;
        const scale = isPressed ? 0.96 : 1.02;

        btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(${scale})`;

        const content = btn.querySelector(".btn-content");
        if (content) {
          (content as HTMLElement).style.transform = `translate3d(${pullX * 0.25}px, ${pullY * 0.25}px, 0)`;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        lastEvent = e;
        updatePosition();
      };

      const handleMouseDown = () => {
        isPressed = true;
        updatePosition();
      };

      const handleMouseUp = () => {
        isPressed = false;
        updatePosition();
      };

      const handleMouseLeave = () => {
        isPressed = false;
        lastEvent = null;
        btn.style.transform = "";
        const content = btn.querySelector(".btn-content");
        if (content) {
          (content as HTMLElement).style.transform = "";
        }
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mousedown", handleMouseDown);
      btn.addEventListener("mouseup", handleMouseUp);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mousedown", handleMouseDown);
        btn.removeEventListener("mouseup", handleMouseUp);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    const buttonClass = cn(
      "relative group inline-flex items-center justify-center font-sans font-bold capitalize tracking-[0.08em] transition-[transform,opacity,background-color,border-color,color,box-shadow,backdrop-filter] duration-300 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-95 disabled:pointer-events-none disabled:opacity-50",
      variant === "primary" && "fx-primary-btn text-white",
      variant === "secondary" && "fx-ghost-btn text-white",
      variant === "ghost" && "border border-transparent bg-transparent hover-fine:border-accent/30 hover-fine:bg-accent-subtle/5 text-ink-primary hover-fine:text-accent rounded-full",
      variant === "nav" && "text-xs px-3 py-1 bg-transparent text-ink-secondary hover-fine:text-accent font-medium transition-colors rounded-full",
      sizeClasses[size],
      className
    );

    const innerContent = (
      <span className="btn-content flex items-center justify-center gap-2 relative z-10 duration-200 ease-out will-change-transform">
        {children}
      </span>
    );

    if (href) {
      const isHashOrExternal = href.startsWith("#") || href.startsWith("http");

      if (isHashOrExternal) {
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className={buttonClass}
            ref={combinedRef}
            {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={buttonClass}
          ref={combinedRef}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={buttonClass}
        ref={combinedRef}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";

