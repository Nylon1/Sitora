"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { ArrowDownToLine, CalendarDays, ImagePlus, Palette, QrCode, Sparkles } from "lucide-react";

const themes = [
  { name: "Clinical", primary: "#0f766e", accent: "#5eead4", background: "#f8fffe" },
  { name: "Dental", primary: "#075985", accent: "#38bdf8", background: "#f5fbff" },
  { name: "Luxury", primary: "#18181b", accent: "#d4af37", background: "#fffdf7" },
  { name: "Warm", primary: "#7c2d12", accent: "#fb923c", background: "#fffaf5" },
];

export function AppointmentCardStudio() {
  const [business, setBusiness] = useState("Your Clinic");
  const [tagline, setTagline] = useState("Professional care, made personal");
  const [phone, setPhone] = useState("01254 000 000");
  const [address, setAddress] = useState("Your address, town, postcode");
  const [website, setWebsite] = useState("https://yourclinic.co.uk");
  const [cta, setCta] = useState("Scan to book or manage your appointment");
  const [primary, setPrimary] = useState("#075985");
  const [accent, setAccent] = useState("#38bdf8");
  const [background, setBackground] = useState("#f5fbff");
  const [layout, setLayout] = useState<"modern" | "split" | "minimal">("modern");
  const [logo, setLogo] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const qrUrl = useMemo(() => {
    const params = new URLSearchParams({
      text: website || "https://sitora.co.uk",
      dark: primary.replace("#", ""),
      light: background.replace("#", ""),
      finderColor: accent.replace("#", ""),
      dotStyle: "rounded",
      finderStyle: "rounded",
      format: "png",
    });
    return `/api/qr-image?${params.toString()}`;
  }, [website, primary, accent, background]);

  function handleLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 2_000_000) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function downloadCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1050;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, layout === "split" ? 385 : 40, canvas.height);
    if (layout === "modern") {
      ctx.fillStyle = accent;
      ctx.fillRect(40, 0, 16, canvas.height);
    }

    if (logo) {
      const image = new Image();
      image.src = logo;
      await image.decode();
      ctx.drawImage(image, 90, 70, 120, 120);
    } else {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.roundRect(90, 70, 120, 120, 28);
      ctx.fill();
      ctx.fillStyle = primary;
      ctx.font = "bold 58px Arial";
      ctx.textAlign = "center";
      ctx.fillText(business.charAt(0).toUpperCase(), 150, 151);
    }

    const textX = layout === "split" ? 430 : 260;
    ctx.textAlign = "left";
    ctx.fillStyle = primary;
    ctx.font = "bold 46px Arial";
    ctx.fillText(business || "Your Clinic", textX, 105);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#4b5563";
    ctx.fillText(tagline, textX, 145);

    ctx.fillStyle = primary;
    ctx.font = "bold 27px Arial";
    ctx.fillText("YOUR NEXT APPOINTMENT", textX, 225);
    ctx.font = "23px Arial";
    ctx.fillStyle = "#374151";
    ctx.fillText("Date: _______________________", textX, 285);
    ctx.fillText("Time: _______________________", textX, 335);
    ctx.fillText("With: _______________________", textX, 385);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#4b5563";
    ctx.fillText(phone, textX, 475);
    ctx.fillText(address, textX, 510);

    if (showQr) {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      const qr = new Image();
      qr.src = imageUrl;
      await qr.decode();
      ctx.drawImage(qr, 815, 355, 170, 170);
      ctx.font = "bold 15px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = primary;
      ctx.fillText(cta.slice(0, 34), 900, 550);
      URL.revokeObjectURL(imageUrl);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sitora-appointment-card.png";
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  }

  return (
    <main className="min-h-screen bg-[#050713] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,.14),transparent_25%),radial-gradient(circle_at_90%_30%,rgba(168,85,247,.12),transparent_24%)]" />
      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-6 lg:px-8">
        <a href="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-black"><Sparkles className="h-5 w-5" /></span><span><strong className="block text-xl">Sitora</strong><small className="text-white/45">Free digital tools</small></span></a>
        <a href="/tools/qr-code-generator" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10">Open QR Studio</a>
      </header>

      <section className="relative z-10 mx-auto max-w-[1500px] px-4 pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl py-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-200"><CalendarDays className="h-4 w-4" /> Appointment Card Studio</div>
          <h1 className="text-5xl font-black tracking-[-.05em] sm:text-7xl">Turn every appointment card into a <span className="text-cyan-300">marketing asset.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/55">Add your brand, contact details and booking QR code, then download a high-resolution card ready for print.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[430px_minmax(0,1fr)]">
          <aside className="space-y-5 rounded-[30px] border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Business details</p><h2 className="mt-1 text-2xl font-bold">Build your card</h2></div>
            {[['Business name', business, setBusiness], ['Tagline', tagline, setTagline], ['Phone', phone, setPhone], ['Address', address, setAddress], ['Booking website', website, setWebsite], ['QR caption', cta, setCta]].map(([label, value, setter]) => <label key={label as string} className="block"><span className="mb-2 block text-sm text-white/65">{label as string}</span><input value={value as string} onChange={(e) => (setter as (v:string)=>void)(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300/50" /></label>)}

            <div><span className="mb-2 block text-sm text-white/65">Layout</span><div className="grid grid-cols-3 gap-2">{(["modern","split","minimal"] as const).map((item) => <button key={item} onClick={() => setLayout(item)} className={`rounded-xl border px-3 py-3 text-sm capitalize ${layout === item ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/5 text-white/55"}`}>{item}</button>)}</div></div>

            <div><span className="mb-2 flex items-center gap-2 text-sm text-white/65"><Palette className="h-4 w-4" /> Colour themes</span><div className="grid grid-cols-4 gap-2">{themes.map((theme) => <button key={theme.name} title={theme.name} onClick={() => { setPrimary(theme.primary); setAccent(theme.accent); setBackground(theme.background); }} className="h-11 rounded-xl border border-white/10" style={{ background: `linear-gradient(135deg,${theme.primary} 0 50%,${theme.accent} 50%)` }} />)}</div></div>

            <div className="grid grid-cols-3 gap-3">{[["Primary",primary,setPrimary],["Accent",accent,setAccent],["Card",background,setBackground]].map(([label,value,setter]) => <label key={label as string} className="text-xs text-white/55">{label as string}<input type="color" value={value as string} onChange={(e) => (setter as (v:string)=>void)(e.target.value)} className="mt-2 h-10 w-full rounded-lg bg-transparent" /></label>)}</div>

            <input ref={fileRef} type="file" accept="image/*" onChange={handleLogo} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-4 text-sm text-white/65 hover:bg-white/5"><ImagePlus className="h-4 w-4" /> {logo ? "Replace logo" : "Upload logo"}</button>
            <label className="flex items-center gap-3 text-sm text-white/65"><input type="checkbox" checked={showQr} onChange={(e) => setShowQr(e.target.checked)} /> Include booking QR code</label>
            <button onClick={downloadCard} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-4 font-bold text-black"><ArrowDownToLine className="h-5 w-5" /> Download appointment card</button>
          </aside>

          <section className="grid min-h-[720px] place-items-center rounded-[30px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
            <div className="w-full max-w-[840px]">
              <div className="mb-4 flex items-center justify-between text-sm text-white/45"><span>Live print preview · landscape card</span><span className="flex items-center gap-2"><QrCode className="h-4 w-4" /> Scan-test before printing</span></div>
              <div className="relative aspect-[1.75/1] overflow-hidden rounded-[28px] shadow-2xl" style={{ background }}>
                <div className="absolute inset-y-0 left-0" style={{ width: layout === "split" ? "37%" : layout === "minimal" ? "12px" : "4.5%", background: primary }} />
                {layout === "modern" && <div className="absolute inset-y-0 left-[4.5%] w-[1.5%]" style={{ background: accent }} />}
                <div className={`absolute top-[12%] ${layout === "split" ? "left-[7%]" : "left-[9%]"} grid h-[20%] aspect-square place-items-center overflow-hidden rounded-2xl text-4xl font-black`} style={{ background: accent, color: primary }}>
                  {logo ? <img src={logo} alt="Logo preview" className="h-full w-full object-contain p-2" /> : business.charAt(0).toUpperCase()}
                </div>
                <div className={`absolute top-[12%] ${layout === "split" ? "left-[41%]" : "left-[25%]"}`}>
                  <h2 className="text-[clamp(1.5rem,3vw,3rem)] font-black leading-none" style={{ color: primary }}>{business}</h2>
                  <p className="mt-2 text-[clamp(.7rem,1.3vw,1.1rem)] text-slate-600">{tagline}</p>
                </div>
                <div className={`absolute top-[39%] ${layout === "split" ? "left-[41%]" : "left-[25%]"}`}>
                  <p className="text-[clamp(.8rem,1.5vw,1.25rem)] font-black tracking-wide" style={{ color: primary }}>YOUR NEXT APPOINTMENT</p>
                  <div className="mt-4 space-y-3 text-[clamp(.7rem,1.4vw,1.15rem)] text-slate-700"><p>Date: _______________________</p><p>Time: _______________________</p><p>With: _______________________</p></div>
                </div>
                <div className={`absolute bottom-[10%] ${layout === "split" ? "left-[41%]" : "left-[25%]"} max-w-[46%] text-[clamp(.55rem,1.05vw,.9rem)] text-slate-600`}><p>{phone}</p><p>{address}</p></div>
                {showQr && <div className="absolute bottom-[8%] right-[6%] w-[19%] text-center"><img src={qrUrl} alt="Booking QR code" className="w-full rounded-xl" /><p className="mt-2 text-[clamp(.45rem,.8vw,.7rem)] font-bold" style={{ color: primary }}>{cta}</p></div>}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
