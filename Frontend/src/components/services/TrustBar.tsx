import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(`${prefix}${Math.floor(latest)}${suffix}`);
      }
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

export function TrustBar() {
  const items = [
    { value: "200+", label: "engagements delivered" },
    { value: "50+", label: "active subscribers" },
    { value: "4", label: "countries" },
    { value: "90%+", label: "retention" }
  ];

  return (
    <div className="relative w-full bg-[#0b1020]/85 border-t border-b border-white/15 py-6 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center gap-y-6 gap-x-8 lg:gap-x-12">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-1.5 text-center group cursor-default"
            >
              <span className="uppercase tracking-[0.18em] text-[12px] font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                {item.label}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 group-hover:text-white transition-colors duration-300 tracking-tight filter drop-shadow-[0_2px_10px_rgba(56,189,248,0.25)] group-hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]">
                <Counter value={item.value} />
              </span>
            </motion.div>
            {index < items.length - 1 && (
              <span className="hidden md:inline ml-8 lg:ml-12 select-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

