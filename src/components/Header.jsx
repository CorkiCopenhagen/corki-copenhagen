const nav = [
  { href: "/", label: "Forside" },
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "Om os" },
];

export default function Header() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const stripItems = [
    "Dansk virksomhed",
    "100% vegansk alternativ til læder",
    "Håndlavet i Portugal",
    "fokus på kvalitet, detaljer og naturlige materialer",
  ];

  const isActive = (href) => {
    const target = href.replace(/\/+$/, "") || "/";
    return pathname === target;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cork-dark/5 bg-[#f0e8dd] backdrop-blur-md">
      <div className="overflow-hidden border-b border-cork-dark/8 bg-[#f0e8dd] py-2">
        <div className="top-strip-marquee flex min-w-max items-center">
          <div className="flex shrink-0 items-center gap-10 px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-cork-dark/90">
            {stripItems.map((item, i) => (
              <span key={`row-1-${item}`} className="flex items-center gap-10 whitespace-nowrap">
                <span>{item}</span>
                <span aria-hidden>•</span>
              </span>
            ))}
          </div>
          <div
            className="flex shrink-0 items-center gap-10 px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-cork-dark/90"
            aria-hidden
          >
            {stripItems.map((item, i) => (
              <span key={`row-2-${item}`} className="flex items-center gap-10 whitespace-nowrap">
                <span>{item}</span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-85"
            aria-label="CORKI Copenhagen"
          >
            <img
              src="/corki-logo-header.png"
              alt="CORKI Copenhagen"
              className="h-14 w-auto sm:h-16"
            />
          </a>
          <div className="ml-auto flex items-center gap-5 sm:gap-7">
            <nav
              className="hidden items-center gap-5 text-sm font-medium text-ink-muted md:flex"
              aria-label="Primær"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-cork-dark/60 after:transition-transform after:duration-300 after:content-[''] hover:text-cork-dark hover:after:scale-x-100 ${
                    isActive(item.href)
                      ? "text-cork-dark after:scale-x-100"
                      : "after:scale-x-0"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="/#waitlist"
              className="shrink-0 rounded-full bg-cork-dark px-4 py-2.5 text-sm font-medium text-sand-50 shadow-soft transition hover:bg-cork-dark/90 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tile-muted"
            >
              Få early access
            </a>
          </div>
        </div>
        <nav
          className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-cork-dark/5 pt-4 text-xs font-medium text-ink-muted md:hidden"
          aria-label="Sektioner"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative pb-0.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-cork-dark/60 after:transition-transform after:duration-300 after:content-[''] hover:text-cork-dark hover:after:scale-x-100 ${
                isActive(item.href)
                  ? "text-cork-dark after:scale-x-100"
                  : "after:scale-x-0"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
