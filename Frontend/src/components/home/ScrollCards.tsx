"use client";

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
};

function ScrollCard({
  item,
  index,
  total,
}: {
  item: ScrollCardItem;
  index: number;
  total: number;
}) {
  return (
    /*
     * KEY: `position: sticky` only works when the parent (and all ancestors)
     * have `overflow: visible` (the default). We set `top-0` so the card pins
     * to the very top of the viewport as the user scrolls.
     * Each card gets a higher z-index so the next card slides over the previous.
     */
    <div
      data-scroll-card
      className="sticky top-24 flex h-[430px] items-start px-4 pt-4 md:top-[17rem] md:px-8"
      style={{ zIndex: index + 1 }}
    >
      <article
        className="relative mx-auto w-full max-w-[1150px] overflow-hidden rounded-3xl border border-white/15 bg-[#091120] p-5 shadow-[0_35px_100px_rgba(0,0,0,.55)] md:p-7"
      >
        {/* Accent glow */}
        <div
          className="absolute -right-24 -top-24 size-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${item.color}26` }}
        />

        {/* items-start: aligns left title top-edge with the top of the right boxes */}
        <div className="relative grid gap-8 lg:grid-cols-[.9fr_1.5fr] lg:items-start">
          {/* Left: counter + title — top-aligned, no extra height */}
          <div>
            <span className="text-sm font-bold" style={{ color: item.color }}>
              0{index + 1}{" "}
              <span className="ml-2 text-white/35">/ 0{total}</span>
            </span>
            <h3 className="mt-5 text-3xl font-black leading-[1.04] md:text-5xl">
              {item.title}
            </h3>
          </div>

          {/* Right: three info boxes — items-stretch keeps the 3 boxes equal height */}
          <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
            <div className="flex flex-col rounded-2xl border border-white/10 bg-black/20 p-5">
              <span className="text-xs font-bold text-white/35">01</span>
              <h4 className="mt-2 text-base font-black text-white">
                {item.painLabel ?? "The pain"}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {item.pain}
              </p>
            </div>
            <div
              className="flex flex-col rounded-2xl border p-5"
              style={{
                borderColor: `${item.color}55`,
                backgroundColor: `${item.color}0d`,
              }}
            >
              <span className="text-xs font-bold" style={{ color: item.color }}>
                02
              </span>
              <h4 className="mt-2 text-base font-black" style={{ color: item.color }}>
                {item.actionLabel ?? "What 4AT does"}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {item.action}
              </p>
            </div>
            <div
              className="flex flex-col rounded-2xl border p-5"
              style={{
                borderColor: `${item.color}80`,
                backgroundColor: `${item.color}14`,
              }}
            >
              <span className="text-xs font-bold" style={{ color: item.color }}>
                03
              </span>
              <h4 className="mt-2 text-base font-black" style={{ color: item.color }}>
                {item.outcomeLabel ?? "The outcome"}
              </h4>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white">
                {item.outcome}
              </p>
            </div>
          </div>
        </div>
      </article>
      {index === total - 1 && (
        <span
          data-scroll-cards-end
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 size-px"
        />
      )}
    </div>
  );
}

/**
 * CardsParallax — sticky-scroll stacking cards.
 *
 * How it works:
 *  - Each ScrollCard has `position: sticky; top: 0` and `height: 100vh`.
 *  - As the user scrolls, each card pins at the top and the next card
 *    slides up behind it (higher z-index makes it appear on top).
 *  - The parent MUST NOT have `overflow: hidden` or `overflow: auto` —
 *    those properties create new scroll containers which break sticky.
 *    Use `overflow: clip` on any ancestor that needs visual clipping.
 */
export function CardsParallax({ items }: CardsParallaxProps) {
  return (
    /* No overflow property here — must stay as default `overflow: visible` */
    <div className="relative">
      {items.map((item, index) => (
        <ScrollCard
          key={item.title}
          item={item}
          index={index}
          total={items.length}
        />
      ))}
    </div>
  );
}
