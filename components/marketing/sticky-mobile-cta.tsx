
"use client";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08101f]/90 p-3 backdrop-blur-xl lg:hidden">
      <a
        href="/apply"
        className="block rounded-[18px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 px-5 py-4 text-center text-sm font-black text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.28)]"
      >
        Apply For Your Free Website
      </a>
    </div>
  );
}