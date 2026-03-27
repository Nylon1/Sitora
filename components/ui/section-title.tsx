export function SectionTitle({
  eyebrow,
  title,
  text,
  className = "",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
        {title}
      </h2>

      {text ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
          {text}
        </p>
      ) : null}
    </div>
  );
}