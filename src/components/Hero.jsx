export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-9rem)] overflow-hidden sm:min-h-[calc(100svh-10rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-[0.16]"
        style={{ backgroundImage: "url('/hero-background-soft.png')" }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-sand-50/45" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] max-w-6xl items-center px-5 py-8 sm:min-h-[calc(100svh-10rem)] sm:px-8 sm:py-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl animate-fade-up space-y-8 [animation-delay:60ms]">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cork-muted">
            CORKI COPENHAGEN
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Portugisisk håndværk i ægte kork
          </h1>
          <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">
            Bæredygtige tasker og accessories lavet af Kork materialer –
            et naturligt alternativ til læder.
          </p>
          <ul className="space-y-3 text-ink-muted">
            {[
              "Håndlavet i Portugal",
              "Let, slidstærk og vandafvisende",
              "100% vegansk alternativ til læder",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tile-muted/80"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
          <div className="space-y-3 pt-2">
            <a
              href="#waitlist"
              className="inline-flex rounded-full bg-cork-dark px-8 py-3.5 text-base font-medium text-sand-50 shadow-soft transition hover:bg-cork-dark/92 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tile-muted"
            >
              Få early access + 25% rabat
            </a>
            <p className="text-sm text-ink-muted">
              Modtag besked når collectionen er klar og modtag 25% på første order!
            </p>
          </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-tile-soft/50 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-sand-300/40 blur-3xl" />
            <div className="relative rounded-[1.35rem] bg-gradient-to-br from-sand-100 to-sand-200/80 p-3 shadow-card ring-1 ring-cork-dark/8">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[5/6] w-full">
                  <video
                    className="h-full w-full object-cover"
                    src="/hero-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="CORKI Copenhagen hero video"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cork-dark/30 via-cork-dark/5 to-sand-50/10" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
                <a
                  href="/products/sintra-tote-bag"
                  className="absolute bottom-5 left-5 z-20 w-[14.5rem] rounded-xl border border-white/35 bg-cork-dark/45 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(61,52,41,0.28)] backdrop-blur-md transition hover:bg-cork-dark/52 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-50/70 sm:bottom-6 sm:left-6 sm:w-[15.5rem]"
                  aria-label="Se Sintra Tote Bag produktside"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-sand-100/90">
                    Produkt
                  </p>
                  <p className="mt-1 font-display text-[1.25rem] leading-none text-sand-50">
                    Sintra Tote Bag
                  </p>
                  <div className="mt-1.5 flex items-end gap-2">
                    <p className="font-sans tabular-nums text-[1.05rem] font-medium text-sand-50">
                      487 DKK
                    </p>
                    <p className="font-sans tabular-nums text-xs text-sand-200/75 line-through">
                      649 DKK
                    </p>
                    <span className="rounded-full bg-sand-50/18 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sand-50">
                      -25%
                    </span>
                  </div>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
