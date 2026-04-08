/**
 * Premium image placeholder — swap `src` when you have assets.
 * Decorative gradients evoke cork grain + warm light.
 */
export default function ImagePlaceholder({
  className = "",
  label = "Billede kommer snart",
  aspectClass = "aspect-[4/5]",
  showCaption = true,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-200 via-sand-100 to-tile-soft/40 shadow-soft ring-1 ring-cork-dark/5 ${aspectClass} ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(139, 115, 85, 0.25) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 75% 70%, rgba(158, 176, 188, 0.2) 0%, transparent 50%),
            repeating-linear-gradient(
              105deg,
              rgba(92, 74, 56, 0.04) 0px,
              rgba(92, 74, 56, 0.04) 1px,
              transparent 1px,
              transparent 14px
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cork-dark/10 via-transparent to-sand-50/30" />
      {!showCaption && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-cork-dark/10 bg-sand-50/40 px-4 py-1.5 font-display text-xs font-medium tracking-[0.2em] text-ink/35">
            FOTO
          </span>
        </div>
      )}
      {showCaption && (
        <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/40 bg-white/25 px-4 py-3 backdrop-blur-sm">
          <p className="font-display text-sm font-medium tracking-wide text-ink/80">
            {label}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Udskift med dit eget foto — komponenten er klar til rigtige billeder.
          </p>
        </div>
      )}
    </div>
  );
}
