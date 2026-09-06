"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export type ScrollCardItem = {
  title: string;
  pain: string;
  action: string;
  outcome: string;
  color: string;
  painLabel?: string;
  actionLabel?: string;
  outcomeLabel?: string;
};

type CardsParallaxProps = {
  items: ScrollCardItem[];
  progress: MotionValue<number>;
};

function StoryCard({
  item,
  index,
  total,
  progress,
}: {
  item: ScrollCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Compute transform interpolations tied directly to scroll progress (0 to 1)
  let yTransform: MotionValue<number>;
  let scaleTransform: MotionValue<number>;
  let opacityTransform: MotionValue<number>;

  if (index === 0) {
    // Card 0 starts front & center. As cards 1, 2, 3 layer over, it shifts up slightly & scales down.
    yTransform = useTransform(progress, [0, 0.22, 0.48, 0.74, 0.94], [0, 0, -12, -24, -36]);
    scaleTransform = useTransform(progress, [0, 0.22, 0.48, 0.74, 0.94], [1, 1, 0.96, 0.92, 0.88]);
    opacityTransform = useTransform(progress, [0, 0.22, 0.48, 0.74, 0.94], [1, 1, 0.75, 0.5, 0.35]);
  } else if (index === 1) {
    // Card 1 enters from below (y: 280 -> y: 24px) between progress 0.16 and 0.42
    yTransform = useTransform(progress, [0, 0.16, 0.42, 0.48, 0.74, 0.94], [280, 280, 24, 24, 8, -8]);
    scaleTransform = useTransform(progress, [0, 0.16, 0.42, 0.48, 0.74, 0.94], [0.95, 0.95, 1, 1, 0.96, 0.92]);
    opacityTransform = useTransform(progress, [0, 0.16, 0.32, 0.48, 0.74, 0.94], [0, 0, 1, 1, 0.75, 0.5]);
  } else if (index === 2) {
    // Card 2 enters from below (y: 280 -> y: 48px) between progress 0.42 and 0.68
    yTransform = useTransform(progress, [0, 0.42, 0.68, 0.74, 0.94], [280, 280, 48, 48, 28]);
    scaleTransform = useTransform(progress, [0, 0.42, 0.68, 0.74, 0.94], [0.95, 0.95, 1, 1, 0.96]);
    opacityTransform = useTransform(progress, [0, 0.42, 0.58, 0.74, 0.94], [0, 0, 1, 1, 0.75]);
  } else {
    // Card 3 enters from below (y: 280 -> y: 72px) between progress 0.68 and 0.92
    yTransform = useTransform(progress, [0, 0.68, 0.92, 1], [280, 280, 72, 72]);
    scaleTransform = useTransform(progress, [0, 0.68, 0.92, 1], [0.95, 0.95, 1, 1]);
    opacityTransform = useTransform(progress, [0, 0.68, 0.84, 1], [0, 0, 1, 1]);
  }

  return (
    <motion.div
      style={{
        y: yTransform,
        scale: scaleTransform,
        opacity: opacityTransform,
        zIndex: index + 1,
      }}
      className="absolute inset-x-0 top-0 origin-top px-2 sm:px-4 md:px-8"
    >
      <article
        className="relative mx-auto w-full max-w-[1150px] overflow-hidden rounded-2xl border border-white/15 bg-[#091120] p-4 sm:p-5 md:rounded-3xl md:p-6 lg:p-7 shadow-[0_-12px_45px_rgba(0,0,0,0.65),0_30px_90px_rgba(0,0,0,0.75)]"
      >
        {/* Accent glow */}
        <div
          className="absolute -right-24 -top-24 size-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${item.color}26` }}
        />

        <div className="relative grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[1.15fr_1.85fr] lg:items-center">
          {/* Left: counter + title */}
          <div className="flex flex-col justify-center pr-1 lg:pr-3">
            <span className="text-xs sm:text-sm font-bold" style={{ color: item.color }}>
              0{index + 1}{" "}
              <span className="ml-2 text-white/35">/ 0{total}</span>
            </span>
            <h3
              className={`mt-2 text-balance font-black leading-[1.15] ${item.title.length < 45
                  ? "text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.45rem]"
                  : item.title.length < 90
                    ? "text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.9rem]"
                    : "text-base sm:text-lg md:text-xl lg:text-[1.4rem] xl:text-[1.6rem]"
                }`}
            >
              {item.title}
            </h3>
          </div>

          {/* Right: three info boxes, snug vertical fit with zero empty space */}
          <div className="grid gap-2.5 sm:gap-3.5 md:grid-cols-3">
            <div className="flex flex-col justify-start rounded-xl border border-white/10 bg-black/20 p-3.5 sm:p-4 md:rounded-2xl md:p-4">
              <span className="text-[11px] sm:text-xs font-bold text-white/35">01</span>
              <h4 className="mt-1 text-xs sm:text-sm md:text-base font-black text-white">
                {item.painLabel ?? "The pain"}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/75">
                {item.pain}
              </p>
            </div>
            <div
              className="flex flex-col justify-start rounded-xl border p-3.5 sm:p-4 md:rounded-2xl md:p-4"
              style={{
                borderColor: `${item.color}55`,
                backgroundColor: `${item.color}0d`,
              }}
            >
              <span className="text-[11px] sm:text-xs font-bold" style={{ color: item.color }}>
                02
              </span>
              <h4 className="mt-1 text-xs sm:text-sm md:text-base font-black" style={{ color: item.color }}>
                {item.actionLabel ?? "What 4AT does"}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/80">
                {item.action}
              </p>
            </div>
            <div
              className="flex flex-col justify-start rounded-xl border p-3.5 sm:p-4 md:rounded-2xl md:p-4"
              style={{
                borderColor: `${item.color}80`,
                backgroundColor: `${item.color}14`,
              }}
            >
              <span className="text-[11px] sm:text-xs font-bold" style={{ color: item.color }}>
                03
              </span>
              <h4 className="mt-1 text-xs sm:text-sm md:text-base font-black" style={{ color: item.color }}>
                {item.outcomeLabel ?? "The outcome"}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-white">
                {item.outcome}
              </p>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

/** Renders scroll-driven storytelling cards driven by pinned section progress. */
export function CardsParallax({ items, progress }: CardsParallaxProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <StoryCard
          key={`${index}-${item.title}`}
          item={item}
          index={index}
          total={items.length}
          progress={progress}
        />
      ))}
    </div>
  );
}
