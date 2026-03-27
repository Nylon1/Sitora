import { GlassCard } from "@/components/ui/glass-card";
import { whyFreePoints } from "@/lib/landing-data";

export function WhyFreeSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <GlassCard className="p-8">
        <h2 className="text-4xl font-black">Why is this free?</h2>

        <p className="mt-4 text-white/70">
          We are building our portfolio and selecting businesses to work with.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {whyFreePoints.map((item: any) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 bg-white/5 rounded-xl">
                <Icon className="h-4 w-4 text-cyan-300 mb-2" />
                {item.label}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}