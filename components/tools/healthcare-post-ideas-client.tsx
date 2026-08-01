"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Dice5,
  Image as ImageIcon,
  Layers3,
  Linkedin,
  Search,
  Sparkles,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  dentalCategories,
  dentalIdeaCount,
  dentalPostIdeas,
  type ContentAngle,
  type HealthcarePostIdea,
  type PostFormat,
} from "@/lib/healthcare-post-ideas";

const formatOptions: Array<"All formats" | PostFormat> = [
  "All formats",
  "Short video",
  "Carousel",
  "Single image",
  "Story",
  "LinkedIn post",
];

const angleOptions: Array<"All angles" | ContentAngle> = [
  "All angles",
  "Explained simply",
  "Common mistakes",
  "Warning signs",
  "Questions answered",
  "Practical advice",
];

const formatIcons: Record<PostFormat, typeof Video> = {
  "Short video": Video,
  Carousel: Layers3,
  "Single image": ImageIcon,
  Story: Sparkles,
  "LinkedIn post": Linkedin,
};

function buildIdeaBrief(idea: HealthcarePostIdea) {
  return [
    `POST IDEA: ${idea.title}`,
    "",
    `HOOK: ${idea.hook}`,
    "",
    `FORMAT: ${idea.format}`,
    `ANGLE: ${idea.angle}`,
    "",
    `CALL TO ACTION: ${idea.callToAction}`,
    "",
    "Reminder: Adapt the wording to your practice and avoid diagnosing individual viewers.",
  ].join("\n");
}

export function HealthcarePostIdeasClient() {
  const [activeCategory, setActiveCategory] = useState(
    dentalCategories[0].slug,
  );
  const [query, setQuery] = useState("");
  const [format, setFormat] =
    useState<(typeof formatOptions)[number]>("All formats");
  const [angle, setAngle] =
    useState<(typeof angleOptions)[number]>("All angles");
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedIdea, setSelectedIdea] =
    useState<HealthcarePostIdea | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("sitora-dental-post-ideas");
      if (saved) {
        setSavedIds(new Set(JSON.parse(saved) as string[]));
      }
    } catch {
      // The tool remains fully usable when browser storage is unavailable.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    try {
      window.localStorage.setItem(
        "sitora-dental-post-ideas",
        JSON.stringify(Array.from(savedIds)),
      );
    } catch {
      // Saving is an enhancement, not a requirement.
    }
  }, [savedIds, storageReady]);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, query, format, angle, savedOnly]);

  const activeCategoryDetails =
    dentalCategories.find((category) => category.slug === activeCategory) ??
    dentalCategories[0];

  const filteredIdeas = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return dentalPostIdeas.filter((idea) => {
      const categoryMatches =
        savedOnly ||
        idea.categorySlug === activeCategory ||
        Boolean(normalisedQuery);
      const savedMatches = !savedOnly || savedIds.has(idea.id);
      const formatMatches =
        format === "All formats" || idea.format === format;
      const angleMatches = angle === "All angles" || idea.angle === angle;
      const queryMatches =
        !normalisedQuery ||
        `${idea.title} ${idea.hook} ${idea.topic} ${idea.category}`
          .toLowerCase()
          .includes(normalisedQuery);

      return (
        categoryMatches &&
        savedMatches &&
        formatMatches &&
        angleMatches &&
        queryMatches
      );
    });
  }, [activeCategory, angle, format, query, savedIds, savedOnly]);

  const visibleIdeas = filteredIdeas.slice(0, visibleCount);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    setQuery("");
    setSavedOnly(false);
    window.requestAnimationFrame(() => {
      document
        .getElementById("idea-browser")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function copyIdea(idea: HealthcarePostIdea) {
    try {
      await navigator.clipboard.writeText(buildIdeaBrief(idea));
      setCopiedId(idea.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setSelectedIdea(idea);
    }
  }

  function openRandomIdea() {
    const pool = filteredIdeas.length > 0 ? filteredIdeas : dentalPostIdeas;
    const idea = pool[Math.floor(Math.random() * pool.length)];
    setActiveCategory(idea.categorySlug);
    setSelectedIdea(idea);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#040714] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(168,85,247,0.13),transparent_24%),radial-gradient(circle_at_45%_100%,rgba(37,99,235,0.15),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="relative z-40 px-4 pt-4 lg:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">
                Sitora
              </span>
              <span className="block text-[11px] text-white/45">
                Free healthcare tools
              </span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sitora
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-4 pb-14 pt-14 sm:pt-20 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <Stethoscope className="h-4 w-4" />
                Healthcare Post Ideas by Sitora
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Never run out of{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  healthcare content ideas.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
                Choose your profession, explore ten focused categories and find
                useful patient-friendly social media topics. No signup. No
                payment. Start exploring.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#professions"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 font-bold text-black transition hover:scale-[1.02]"
                >
                  Explore ideas
                  <ChevronRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={openRandomIdea}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 font-bold text-white transition hover:bg-white/[0.09]"
                >
                  <Dice5 className="h-4 w-4" />
                  Surprise me
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["1", "profession"],
                  ["10", "categories"],
                  [String(dentalIdeaCount), "dentist ideas"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                  >
                    <div className="text-2xl font-black sm:text-3xl">
                      {value}
                    </div>
                    <div className="mt-1 text-xs text-white/45 sm:text-sm">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="professions" className="scroll-mt-6 px-4 py-10 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Step one
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Choose your profession
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => selectCategory(dentalCategories[0].slug)}
                className="group relative overflow-hidden rounded-[28px] border border-cyan-300/30 bg-cyan-300/[0.08] p-6 text-left transition hover:-translate-y-1 hover:border-cyan-300/50"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-black">
                  <Stethoscope className="h-6 w-6" />
                </span>
                <div className="relative mt-8 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">Dentist</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Oral health education, treatments, patient questions,
                      practice trust and more.
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-300 px-3 py-1 text-sm font-black text-black">
                    500
                  </span>
                </div>
              </button>

              {[
                ["Doctor / GP", "General health content"],
                ["Optician", "Eye health content"],
              ].map(([profession, description]) => (
                <div
                  key={profession}
                  className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 opacity-70"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/50">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-white/75">
                        {profession}
                      </h3>
                      <p className="mt-2 text-sm text-white/40">
                        {description}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/45">
                      Coming next
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Step two
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Choose a dental category
                </h2>
                <p className="mt-2 text-white/50">
                  Every category contains 50 ready-to-explore ideas.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {dentalCategories.map((category, index) => {
                const active = category.slug === activeCategory;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => selectCategory(category.slug)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-cyan-300/40 bg-cyan-300/[0.09]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-black ${
                          active ? "text-cyan-300" : "text-white/35"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-bold text-white/45">
                        50
                      </span>
                    </div>
                    <h3 className="mt-6 font-bold">{category.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/45">
                      {category.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="idea-browser"
          className="scroll-mt-4 px-4 pb-24 pt-12 lg:px-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] border border-white/10 bg-black/25 p-4 backdrop-blur-2xl sm:p-6 lg:p-8">
              <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Step three
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    {query
                      ? `Search results for “${query}”`
                      : activeCategoryDetails.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-white/50">
                    {query
                      ? "Searching across all 500 dentist ideas."
                      : activeCategoryDetails.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSavedOnly(false)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      !savedOnly
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/[0.04] text-white/60"
                    }`}
                  >
                    Browse ideas
                  </button>
                  <button
                    type="button"
                    onClick={() => setSavedOnly(true)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                      savedOnly
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/[0.04] text-white/60"
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    Saved
                    <span className="rounded-full bg-black/10 px-2 py-0.5">
                      {savedIds.size}
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid gap-3 py-6 lg:grid-cols-[1fr_220px_220px_auto]">
                <label className="relative">
                  <span className="sr-only">Search all dentist ideas</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setQuery(event.target.value)
                    }
                    placeholder="Search all 500 ideas..."
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                  />
                </label>

                <label>
                  <span className="sr-only">Filter by format</span>
                  <select
                    value={format}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setFormat(
                        event.target.value as (typeof formatOptions)[number],
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-[#0a0e1b] px-4 text-base text-white outline-none focus:border-cyan-300/50"
                  >
                    {formatOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Filter by angle</span>
                  <select
                    value={angle}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setAngle(
                        event.target.value as (typeof angleOptions)[number],
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-[#0a0e1b] px-4 text-base text-white outline-none focus:border-cyan-300/50"
                  >
                    {angleOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={openRandomIdea}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 font-bold text-cyan-100 transition hover:bg-cyan-300/15"
                >
                  <Dice5 className="h-4 w-4" />
                  Random
                </button>
              </div>

              <div className="mb-5 flex items-center justify-between gap-4 text-sm text-white/45">
                <span>
                  {filteredIdeas.length} idea
                  {filteredIdeas.length === 1 ? "" : "s"} found
                </span>
                {(query ||
                  format !== "All formats" ||
                  angle !== "All angles" ||
                  savedOnly) && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setFormat("All formats");
                      setAngle("All angles");
                      setSavedOnly(false);
                    }}
                    className="font-bold text-cyan-300 hover:text-cyan-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {visibleIdeas.length > 0 ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visibleIdeas.map((idea, index) => {
                      const Icon = formatIcons[idea.format];
                      const saved = savedIds.has(idea.id);
                      const copied = copiedId === idea.id;

                      return (
                        <motion.article
                          key={idea.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: Math.min(index * 0.025, 0.2),
                          }}
                          className="group flex min-h-[310px] flex-col rounded-[24px] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.055]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/60">
                              <Icon className="h-3.5 w-3.5" />
                              {idea.format}
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleSaved(idea.id)}
                              aria-label={
                                saved
                                  ? "Remove idea from saved"
                                  : "Save this idea"
                              }
                              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                                saved
                                  ? "border-cyan-300/30 bg-cyan-300 text-black"
                                  : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white"
                              }`}
                            >
                              <Bookmark
                                className={`h-4 w-4 ${
                                  saved ? "fill-current" : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300/80">
                            {idea.angle}
                          </div>
                          <h3 className="mt-3 text-xl font-black leading-tight">
                            {idea.title}
                          </h3>
                          <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/50">
                            {idea.hook}
                          </p>

                          <div className="mt-auto flex items-center gap-2 pt-6">
                            <button
                              type="button"
                              onClick={() => setSelectedIdea(idea)}
                              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-black transition hover:bg-cyan-100"
                            >
                              Open idea
                            </button>
                            <button
                              type="button"
                              onClick={() => copyIdea(idea)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white"
                              aria-label="Copy idea brief"
                            >
                              {copied ? (
                                <Check className="h-4 w-4 text-cyan-300" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>

                  {visibleCount < filteredIdeas.length && (
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((count) => count + 12)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        Load 12 more ideas
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/15 py-16 text-center">
                  <Search className="mx-auto h-8 w-8 text-white/25" />
                  <h3 className="mt-4 text-xl font-black">No ideas found</h3>
                  <p className="mt-2 text-white/45">
                    Try a broader search or clear one of the filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 lg:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Healthcare Post Ideas by Sitora.</p>
          <p>
            Educational content does not replace individual clinical advice.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
              if (event.currentTarget === event.target) {
                setSelectedIdea(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="idea-dialog-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[30px] border border-white/10 bg-[#0a0e1b] p-5 shadow-2xl sm:rounded-[30px] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
                    {selectedIdea.format}
                  </span>
                  <h2
                    id="idea-dialog-title"
                    className="mt-4 text-2xl font-black leading-tight sm:text-3xl"
                  >
                    {selectedIdea.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIdea(null)}
                  aria-label="Close idea"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    Suggested hook
                  </div>
                  <p className="mt-3 leading-7 text-white/70">
                    {selectedIdea.hook}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                      Content angle
                    </div>
                    <p className="mt-3 font-bold">{selectedIdea.angle}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                      Call to action
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {selectedIdea.callToAction}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4 text-sm leading-6 text-amber-100/70">
                  Adapt this idea to the practice, use accurate clinical
                  information and avoid diagnosing individual viewers or
                  promising outcomes.
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => copyIdea(selectedIdea)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-3.5 font-black text-black"
                >
                  {copiedId === selectedIdea.id ? (
                    <>
                      <Check className="h-5 w-5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy full idea
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSaved(selectedIdea.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-bold text-white/75"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      savedIds.has(selectedIdea.id) ? "fill-current" : ""
                    }`}
                  />
                  {savedIds.has(selectedIdea.id)
                    ? "Saved to this device"
                    : "Save to this device"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
