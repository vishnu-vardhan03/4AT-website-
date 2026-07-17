"use client";

import { useEffect, useRef } from "react";

export function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle colors: emerald, cyan, violet
    const colors = [
      "rgba(16, 201, 129, ", // Emerald
      "rgba(6, 182, 212, ",  // Cyan
      "rgba(139, 92, 246, "  // Violet
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseColor: string;
      baseOpacity: number;
      pulseSpeed: number;
      angle: number;
    }

    const particles: Particle[] = [];
    const count = 40; // low density

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2, // 2px to 5px
        speedX: (Math.random() - 0.5) * 0.12, // slow
        speedY: (Math.random() - 0.5) * 0.12,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        baseOpacity: Math.random() * 0.17 + 0.08, // min 0.08, max 0.25
        pulseSpeed: Math.random() * 0.008 + 0.003,
        angle: Math.random() * Math.PI * 2
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Drift slowly
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse opacity slowly
        p.angle += p.pulseSpeed;
        const currentOpacity = p.baseOpacity + Math.sin(p.angle) * 0.04;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.baseColor}${Math.max(0.02, Math.min(0.3, currentOpacity))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
