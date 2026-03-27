import { siteConfig } from "@/lib/site-config";

export function PricingSection() {
  const { starter, growth, pro } = siteConfig.pricing;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Pricing
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Simple pricing. Built for real business growth.
        </h2>
        <p className="mt-5 text-base leading-8 text-white/70">
          Start with a free website, then scale when you’re ready. We handle design, hosting, updates, and support.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          { ...starter, highlighted: false },
          { ...growth, highlighted: true },
          { ...pro, highlighted: false },
        ].map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[30px] border p-6 backdrop-blur-xl ${
              plan.highlighted
                ? "border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 text-3xl font-black">{plan.upfront}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/70">
                {plan.note}
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-white/75">
              {plan.features.map((feature) => (
                <li key={feature}>✔ {feature}</li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-semibold text-white/60">{plan.monthly}</p>

            <a
              href="/apply"
              className={`mt-6 inline-flex w-full items-center justify-center rounded-[18px] px-5 py-3 text-sm font-black transition ${
                plan.highlighted
                  ? "bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-slate-950"
                  : "border border-white/15 bg-white/[0.05] text-white"
              }`}
            >
              {plan.highlighted ? "Most Popular" : "Get Started"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
