export function GlowOrb({ className }: { className: string }) {
  return <div className={`absolute rounded-full blur-3xl ${className}`} />;
}


// ============================================
// FILE: components/ui/glass-card.tsx
// ============================================
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] shadow-[0_25px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_30%,transparent_65%,rgba(34,211,238,0.08))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
