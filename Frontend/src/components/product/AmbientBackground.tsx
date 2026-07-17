"use client";

import { useEffect, useRef } from "react";

interface Props {
  variant?: "violet" | "teal" | "mixed";
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

export default function AmbientBackground({
  variant = "violet",
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;

    const colors =
      variant === "teal"
        ? ["45,212,191", "125,211,252"]
        : variant === "mixed"
        ? ["167,139,250", "45,212,191"]
        : ["167,139,250", "192,132,252"];

    const particles: Particle[] = [];
    const pulses: { i: number; j: number; t: number; speed: number }[] = [];
    const COUNT = Math.floor(26 * intensity);
    let pulseTimer = 0;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      W = canvas.offsetWidth || 800;
      H = canvas.offsetHeight || 400;

      canvas.width = W * DPR;
      canvas.height = H * DPR;

      context.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      pulses.length = 0;

      for (let i = 0; i < COUNT; i++) {
        const z = Math.random();
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.16,
          r: 1.1 + z * 2.1,
          alpha: 0.22 + z * 0.4,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, W, H);

      // Drift
      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -30) p.x = W + 30;
          if (p.x > W + 30) p.x = -30;
          if (p.y < -30) p.y = H + 30;
          if (p.y > H + 30) p.y = -30;
        }
      }

      // Synaptic links
      const maxD = 132;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < maxD) {
            const al = (1 - d / maxD) * 0.4;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(${colors[0]},${al})`;
            context.lineWidth = 3.5;
            context.stroke();
          }
        }
      }

      // Nodes: soft halo + bright core
      for (const p of particles) {
        const col = colors[Math.floor(p.z * colors.length) % colors.length];
        const halo = p.r * 4.5;

        const g = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
        g.addColorStop(0, `rgba(${col},${p.alpha * 0.5})`);
        g.addColorStop(1, `rgba(${col},0)`);
        context.beginPath();
        context.fillStyle = g;
        context.arc(p.x, p.y, halo, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = `rgba(${col},${Math.min(p.alpha + 0.25, 0.9)})`;
        context.arc(p.x, p.y, p.r * 0.7, 0, Math.PI * 2);
        context.fill();
      }

      // Occasionally fire a pulse along a nearby link
      if (!reduced) {
        pulseTimer++;
        if (pulseTimer > 28 && pulses.length < 5 && particles.length > 2) {
          pulseTimer = 0;
          const i = Math.floor(Math.random() * particles.length);
          let best = -1;
          let bestD = maxD;
          for (let j = 0; j < particles.length; j++) {
            if (j === i) continue;
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < bestD) {
              bestD = d;
              best = j;
            }
          }
          if (best >= 0) {
            pulses.push({ i, j: best, t: 0, speed: 0.012 + Math.random() * 0.01 });
          }
        }

        for (let k = pulses.length - 1; k >= 0; k--) {
          const pu = pulses[k];
          pu.t += pu.speed;
          if (pu.t >= 1) {
            pulses.splice(k, 1);
            continue;
          }
          const a = particles[pu.i];
          const b = particles[pu.j];
          if (!a || !b) {
            pulses.splice(k, 1);
            continue;
          }
          const px = a.x + (b.x - a.x) * pu.t;
          const py = a.y + (b.y - a.y) * pu.t;
          const fade = Math.sin(pu.t * Math.PI);

          const pg = context.createRadialGradient(px, py, 0, px, py, 7);
          pg.addColorStop(0, `rgba(${colors[0]},${0.4 * fade})`);
          pg.addColorStop(1, `rgba(${colors[0]},0)`);
          context.beginPath();
          context.fillStyle = pg;
          context.arc(px, py, 7, 0, Math.PI * 2);
          context.fill();

          context.beginPath();
          context.fillStyle = `rgba(255,255,255,${0.5 * fade})`;
          context.arc(px, py, 1.6, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (!reduced) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}