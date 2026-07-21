"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  CircleDot,
  Globe2,
  ImagePlus,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  Wifi,
  X,
} from "lucide-react";

type QRType = "website" | "review" | "whatsapp" | "email" | "phone" | "wifi";
type DotStyle = "square" | "dot" | "rounded";
type FinderStyle = "square" | "rounded" | "circle";
type FrameStyle = "none" | "ticket" | "poster" | "badge";

const types: { id: QRType; label: string; icon: typeof Globe2; placeholder: string }[] = [
  { id: "website", label: "Website", icon: Globe2, placeholder: "https://yourwebsite.com" },
  { id: "review", label: "Reviews", icon: Star, placeholder: "Paste your Google review link" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, placeholder: "+44 7700 900000" },
  { id: "email", label: "Email", icon: Mail, placeholder: "hello@business.com" },
  { id: "phone", label: "Phone", icon: Phone, placeholder: "+44 1254 000000" },
  { id: "wifi", label: "Wi-Fi", icon: Wifi, placeholder: "Network name" },
];

const presets = [
  { name: "Sitora", dark: "07111f", light: "ffffff", accent: "22d3ee" },
  { name: "Electric", dark: "30105f", light: "fff7ff", accent: "d946ef" },
  { name: "Botanical", dark: "12372a", light: "f4fbf6", accent: "22c55e" },
  { name: "Sunset", dark: "431407", light: "fff7ed", accent: "f97316" },
  { name: "Editorial", dark: "111111", light: "fafafa", accent: "e11d48" },
];

function normaliseDestination(type: QRType, value: string) {
  const clean = value.trim();
  if (type === "email") return `mailto:${clean}`;
  if (type === "phone") return `tel:${clean.replace(/\s/g, "")}`;
  if (type === "whatsapp") return `https://wa.me/${clean.replace(/[^0-9]/g, "")}`;
  if (type === "wifi") return `WIFI:T:WPA;S:${clean};P:;H:false;;`;
  return clean || "https://sitora.co.uk";
}

function hex(value: string) {
  return value.replace("#", "");
}

export function QRStudio() {
  const [qrType, setQrType] = useState<QRType>("website");
  const [destination, setDestination] = useState("https://sitora.co.uk");
  const [dark, setDark] = useState("#07111f");
  const [light, setLight] = useState("#ffffff");
  const [accent, setAccent] = useState("#22d3ee");
  const [dotStyle, setDotStyle] = useState<DotStyle>("rounded");
  const [finderStyle, setFinderStyle] = useState<FinderStyle>("rounded");
  const [frameStyle, setFrameStyle] = useState<FrameStyle>("poster");
  const [frameText, setFrameText] = useState("SCAN TO EXPLORE");
  const [logo, setLogo] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(22);
  const [shadow, setShadow] = useState(true);
  const [tilt, setTilt] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const qrText = useMemo(() => normaliseDestination(qrType, destination), [qrType, destination]);
  const qrUrl = useMemo(() => {
    const params = new URLSearchParams({
      text: qrText,
      dark: hex(dark),
      light: hex(light),
      finderColor: hex(accent),
      dotStyle,
      finderStyle,
      format: "png",
    });
    return `/api/qr-image?${params.toString()}`;
  }, [qrText, dark, light, accent, dotStyle, finderStyle]);

  const activeType = types.find((item) => item.id === qrType)!;

  function selectType(type: QRType) {
    setQrType(type);
    setDestination("");
  }

  function handleLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2_000_000) {
      setError("Choose a PNG, JPG or WebP logo under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  function reset() {
    setDark("#07111f");
    setLight("#ffffff");
    setAccent("#22d3ee");
    setDotStyle("rounded");
    setFinderStyle("rounded");
    setFrameStyle("poster");
    setFrameText("SCAN TO EXPLORE");
    setLogo(null);
    setLogoScale(22);
    setShadow(true);
    setTilt(false);
  }

  async function downloadPng() {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    const qrImage = new Image();
    qrImage.src = imageUrl;
    await qrImage.decode();

    const canvas = document.createElement("canvas");
    canvas.width = 1400;
    canvas.height = frameStyle === "none" ? 1400 : 1680;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = light;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (frameStyle !== "none") {
      ctx.fillStyle = accent;
      if (frameStyle === "ticket") {
        ctx.roundRect(70, 70, 1260, 1540, 70);
      } else if (frameStyle === "badge") {
        ctx.roundRect(110, 70, 1180, 1540, 220);
      } else {
        ctx.roundRect(70, 70, 1260, 1540, 38);
      }
      ctx.fill();
      ctx.fillStyle = light;
      ctx.roundRect(110, 110, 1180, 1260, 30);
      ctx.fill();
    }

    const qrSize = frameStyle === "none" ? 1240 : 1080;
    const x = (canvas.width - qrSize) / 2;
    const y = frameStyle === "none" ? 80 : 180;
    ctx.drawImage(qrImage, x, y, qrSize, qrSize);

    if (logo) {
      const logoImage = new Image();
      logoImage.src = logo;
      await logoImage.decode();
      const size = qrSize * (logoScale / 100);
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.roundRect((canvas.width - size) / 2 - 20, y + (qrSize - size) / 2 - 20, size + 40, size + 40, 30);
      ctx.fill();
      ctx.drawImage(logoImage, (canvas.width - size) / 2, y + (qrSize - size) / 2, size, size);
    }

    if (frameStyle !== "none") {
      ctx.fillStyle = dark;
      ctx.font = "700 64px Arial";
      ctx.textAlign = "center";
      ctx.fillText(frameText || "SCAN ME", canvas.width / 2, 1485);
      ctx.font = "32px Arial";
      ctx.fillText("Created with Sitora QR Studio", canvas.width / 2, 1550);
    }

    canvas.toBlob((output) => {
      if (!output) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(output);
      link.download = "sitora-custom-qr.png";
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
    URL.revokeObjectURL(imageUrl);
  }

  async function submitDownload(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/qr-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          qrType,
          destination,
          marketingConsent,
          design: { dark, light, accent, dotStyle, finderStyle, frameStyle, frameText },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to continue");
      await downloadPng();
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050713] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[18rem] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/15 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <header className="relative z-20 px-4 py-5 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-2xl">
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-black"><Sparkles className="h-5 w-5" /></span>
            <span><strong className="block text-xl">Sitora</strong><small className="text-white/45">Free digital tools</small></span>
          </a>
          <div className="hidden items-center gap-2 text-sm text-white/55 sm:flex"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Free. High resolution. Commercial use.</div>
        </div>
      </header>

      <section className="relative z-10 px-4 pb-8 pt-10 text-center lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-cyan-200"><QrCode className="h-4 w-4" /> QR Studio</div>
          <h1 className="text-balance text-5xl font-black tracking-[-.05em] sm:text-6xl lg:text-8xl">Turn a square into a <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">brand moment.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">Design a QR code like a graphic: shape the pattern, recolour the corners, upload your logo, build a frame and export it ready for print.</p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 pb-24 lg:grid-cols-[430px_minmax(0,1fr)] lg:px-8">
        <div className="space-y-4 rounded-[30px] border border-white/10 bg-white/[0.055] p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">01 · Destination</p><h2 className="mt-1 text-2xl font-bold">What should it do?</h2></div><button onClick={reset} className="rounded-xl border border-white/10 p-3 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Reset design"><RefreshCw className="h-4 w-4" /></button></div>

          <div className="grid grid-cols-3 gap-2">
            {types.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => selectType(item.id)} className={`rounded-2xl border p-3 text-left transition ${qrType === item.id ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100" : "border-white/8 bg-black/15 text-white/48 hover:bg-white/7"}`}><Icon className="mb-3 h-5 w-5" /><span className="block text-xs font-semibold">{item.label}</span></button>; })}
          </div>

          <label className="block"><span className="mb-2 block text-sm font-semibold text-white/70">{activeType.label} details</span><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder={activeType.placeholder} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-4 outline-none transition placeholder:text-white/25 focus:border-cyan-300/50" /></label>

          <div className="border-t border-white/8 pt-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300">02 · Style</p><h3 className="mt-1 text-xl font-bold">Build your visual language</h3></div>

          <div className="grid grid-cols-5 gap-2">{presets.map((preset) => <button key={preset.name} onClick={() => { setDark(`#${preset.dark}`); setLight(`#${preset.light}`); setAccent(`#${preset.accent}`); }} className="group" title={preset.name}><span className="mx-auto flex h-11 w-11 overflow-hidden rounded-full border-2 border-white/15 transition group-hover:scale-110"><i className="h-full w-1/2" style={{ backgroundColor: `#${preset.dark}` }} /><i className="h-full w-1/2" style={{ backgroundColor: `#${preset.accent}` }} /></span><small className="mt-1 block truncate text-[10px] text-white/40">{preset.name}</small></button>)}</div>

          <div className="grid grid-cols-3 gap-3">{[["Pattern", dark, setDark], ["Background", light, setLight], ["Corners", accent, setAccent]].map(([label, value, setter]) => <label key={String(label)} className="rounded-2xl border border-white/8 bg-black/15 p-3"><span className="mb-2 block text-[11px] text-white/45">{String(label)}</span><input type="color" value={String(value)} onChange={(e) => (setter as (v: string) => void)(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border-0 bg-transparent" /></label>)}</div>

          <div><span className="mb-2 block text-sm font-semibold text-white/65">Pattern shape</span><div className="grid grid-cols-3 gap-2">{(["square", "rounded", "dot"] as DotStyle[]).map((style) => <button key={style} onClick={() => setDotStyle(style)} className={`rounded-xl border px-3 py-3 text-xs font-semibold capitalize ${dotStyle === style ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/8 bg-black/15 text-white/45"}`}>{style}</button>)}</div></div>
          <div><span className="mb-2 block text-sm font-semibold text-white/65">Corner shape</span><div className="grid grid-cols-3 gap-2">{(["square", "rounded", "circle"] as FinderStyle[]).map((style) => <button key={style} onClick={() => setFinderStyle(style)} className={`rounded-xl border px-3 py-3 text-xs font-semibold capitalize ${finderStyle === style ? "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100" : "border-white/8 bg-black/15 text-white/45"}`}>{style}</button>)}</div></div>

          <div className="border-t border-white/8 pt-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">03 · Graphic frame</p></div>
          <div className="grid grid-cols-4 gap-2">{(["none", "poster", "ticket", "badge"] as FrameStyle[]).map((style) => <button key={style} onClick={() => setFrameStyle(style)} className={`rounded-xl border px-2 py-3 text-[11px] font-semibold capitalize ${frameStyle === style ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-white/8 text-white/42"}`}>{style}</button>)}</div>
          <input value={frameText} onChange={(e) => setFrameText(e.target.value.toUpperCase().slice(0, 28))} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-amber-300/50" placeholder="SCAN TO EXPLORE" />

          <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 p-4"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/8"><ImagePlus className="h-5 w-5" /></span><div><p className="text-sm font-semibold">Centre logo</p><p className="text-xs text-white/35">PNG, JPG or WebP</p></div></div>{logo ? <button onClick={() => setLogo(null)} className="p-2 text-white/40"><X className="h-4 w-4" /></button> : <button onClick={() => fileRef.current?.click()} className="rounded-xl bg-white/9 px-3 py-2 text-xs font-semibold">Upload</button>}</div><input ref={fileRef} hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} />{logo && <label className="mt-4 block"><span className="mb-2 flex justify-between text-xs text-white/45"><span>Logo size</span><span>{logoScale}%</span></span><input type="range" min="14" max="30" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full" /></label>}</div>

          <div className="grid grid-cols-2 gap-2"><button onClick={() => setShadow(!shadow)} className={`rounded-xl border px-3 py-3 text-xs font-semibold ${shadow ? "border-cyan-300/35 bg-cyan-300/10" : "border-white/8"}`}>Soft shadow</button><button onClick={() => setTilt(!tilt)} className={`rounded-xl border px-3 py-3 text-xs font-semibold ${tilt ? "border-cyan-300/35 bg-cyan-300/10" : "border-white/8"}`}>Editorial tilt</button></div>
        </div>

        <div className="relative min-h-[760px] overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_15%,rgba(34,211,238,.13),transparent_35%),linear-gradient(145deg,#0b1020,#070914)] p-5 sm:p-10 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]">
          <div className="absolute left-7 top-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-white/38"><CircleDot className="h-4 w-4 text-emerald-300" /> Live artwork</div>
          <div className="flex h-full min-h-[680px] items-center justify-center pt-12">
            <motion.div animate={{ rotate: tilt ? -3 : 0, y: [0, -6, 0] }} transition={{ rotate: { duration: .4 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} className={`relative w-full max-w-[590px] ${shadow ? "drop-shadow-[0_45px_90px_rgba(0,0,0,.55)]" : ""}`}>
              <div className={`${frameStyle === "ticket" ? "rounded-[50px]" : frameStyle === "badge" ? "rounded-[110px]" : frameStyle === "none" ? "rounded-[28px]" : "rounded-[36px]"} p-5 sm:p-8`} style={{ background: frameStyle === "none" ? "transparent" : `linear-gradient(145deg, ${accent}, ${dark})` }}>
                <div className="relative overflow-hidden rounded-[24px] p-5 sm:p-8" style={{ backgroundColor: light }}>
                  <img src={qrUrl} alt="Live custom QR code preview" className="aspect-square w-full" />
                  {logo && <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-2xl border-8 shadow-xl" style={{ width: `${logoScale}%`, aspectRatio: "1", backgroundColor: light, borderColor: light }}><img src={logo} alt="Uploaded logo" className="h-full w-full object-contain" /></div>}
                </div>
                {frameStyle !== "none" && <div className="px-4 pb-2 pt-7 text-center"><p className="text-xl font-black tracking-[.12em] sm:text-3xl" style={{ color: light }}>{frameText || "SCAN ME"}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[.2em]" style={{ color: `${light}99` }}>Point · Scan · Connect</p></div>}
              </div>
              <div className="absolute -right-3 -top-3 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/60 backdrop-blur-xl">High contrast</div>
            </motion.div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold">Ready for print and digital</p><p className="text-xs text-white/38">Always scan-test highly stylised designs before production.</p></div><button onClick={() => { setSent(false); setModalOpen(true); }} className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-4 text-sm font-black text-[#04111d] shadow-[0_0_35px_rgba(34,211,238,.25)] transition hover:scale-[1.02]"><ArrowDownToLine className="h-5 w-5" /> Download design</button></div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/8 px-4 py-20 text-center"><div className="mx-auto max-w-4xl"><Palette className="mx-auto h-10 w-10 text-cyan-300" /><h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">A QR code can open a link. Sitora builds what happens next.</h2><p className="mx-auto mt-5 max-w-2xl text-white/50">Websites, booking journeys, review systems, customer portals and AI-powered experiences designed to turn scans into action.</p><a href="/apply" className="mt-8 inline-flex rounded-full border border-white/15 bg-white/8 px-7 py-4 font-bold transition hover:bg-white/12">Discuss a digital project</a></div></section>

      <AnimatePresence>{modalOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-xl"><motion.div initial={{ opacity: 0, y: 25, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .96 }} className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/12 bg-[#0b1020] p-7 shadow-2xl"><button onClick={() => setModalOpen(false)} className="absolute right-5 top-5 rounded-full p-2 text-white/40 hover:bg-white/8 hover:text-white"><X className="h-5 w-5" /></button>{sent ? <div className="py-6 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><Check className="h-8 w-8" /></span><h3 className="mt-5 text-3xl font-black">Your artwork is downloading</h3><p className="mt-3 text-white/48">We also sent confirmation to {email}.</p><button onClick={() => { setModalOpen(false); setSent(false); }} className="mt-7 w-full rounded-2xl bg-white px-5 py-4 font-bold text-black">Create another</button></div> : <form onSubmit={submitDownload}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-300"><DownloadIcon /></span><h3 className="mt-5 text-3xl font-black">Your QR artwork is ready.</h3><p className="mt-3 text-white/48">Add your email to receive the download. No account is needed.</p><label className="mt-6 block"><span className="mb-2 block text-sm font-semibold">Email address</span><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-4 outline-none focus:border-cyan-300/50" /></label><label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-5 text-white/45"><input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} className="mt-1" /><span>Send me occasional digital growth ideas from Sitora. This is optional and does not affect the download.</span></label>{error && <p className="mt-4 rounded-xl bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}<button disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-4 font-black text-black disabled:opacity-50">{submitting ? "Preparing artwork…" : <><Upload className="h-5 w-5" /> Email & download PNG</>}</button><p className="mt-4 text-center text-[11px] text-white/30">By continuing, you agree to Sitora's privacy policy.</p></form>}</motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

function DownloadIcon() {
  return <ArrowDownToLine className="h-5 w-5" />;
}
