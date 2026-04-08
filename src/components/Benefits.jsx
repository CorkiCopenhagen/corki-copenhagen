const items = [
  {
    title: "Bæredygtigt valg",
    body: "Kork bliver høstet uden at fælde træer, så træerne kan blive ved med at binde Co2 i luften.",
    icon: "leaf",
  },
  {
    title: "Let & slidstærk",
    body: "Perfekt til hverdagsbrug – vejer mindre end læder, men holder ligeså godt.",
    icon: "shield",
  },
  {
    title: "Unikt look",
    body: "Hvert produkt har sit eget helt naturlige mønster – ikke to produkter er helt ens.",
    icon: "spark",
  },
];

function UspIcon({ type }) {
  const base =
    "h-5 w-5 text-cork-dark/85 transition group-hover:text-cork-dark";

  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden>
        <path
          d="M19 5c-6.5.5-10.2 3.3-11.7 8.2-.5 1.7-.5 3.7-.2 5.8 2.2.2 4.1 0 5.8-.6C17.4 16.4 20 12.7 19 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 15c2.7-1.1 4.8-2.7 6.3-4.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden>
        <path
          d="M12 3.5 5.5 6v5.8c0 4.1 2.4 7 6.5 8.7 4.1-1.7 6.5-4.6 6.5-8.7V6L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m9.3 12.2 1.8 1.8 3.6-3.7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden>
      <path
        d="m12 4 1.9 3.8L18 9.2l-3 2.9.7 4.1L12 14.4 8.3 16.2 9 12.1 6 9.2l4.1-.6L12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Benefits() {
  return (
    <section
      id="why-cork"
      className="relative z-20 -mt-8 pb-14 sm:-mt-14 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative z-10 group rounded-2xl border border-cork-dark/8 bg-[#f5f0e9] p-8 shadow-soft transition hover:border-tile-muted/40 hover:shadow-card"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cork-dark/10 bg-sand-100/80">
                  <UspIcon type={item.icon} />
                </div>
              </div>
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-cork-dark/50 to-transparent transition group-hover:w-16" />
              <p className="mt-4 leading-relaxed text-ink-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
