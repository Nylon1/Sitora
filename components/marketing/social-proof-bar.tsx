const proofItems = [
  "Designed for real businesses",
  "Premium modern layouts",
  "Fast mobile experience",
  "Built to capture leads",
  "Selection-based campaign",
];

export function SocialProofBar() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/50 sm:gap-5 sm:text-sm">
          {proofItems.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}