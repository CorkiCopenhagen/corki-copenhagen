export default function Footer() {
  return (
    <footer className="border-t border-cork-dark/8 bg-[#f0e8dd] py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 text-center sm:px-8">
        <img
          src="/corki-logo.png"
          alt="CORKI Copenhagen"
          className="h-12 w-auto opacity-90"
        />
        <p className="max-w-md text-sm text-ink-muted">
          Designet i København · Fremstillet i Portugal
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-ink-muted"
          aria-label="Footer"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-cork-dark"
          >
            Instagram
          </a>
          <a href="mailto:kontakt@corki.dk" className="transition hover:text-cork-dark">
            Kontakt
          </a>
          <a href="#privacy" className="transition hover:text-cork-dark">
            Privacy
          </a>
        </nav>
        <p id="privacy" className="max-w-lg text-xs text-ink-muted/80">
          Ved tilmelding accepterer du, at vi må kontakte dig om lanceringen.
          Du kan til enhver tid afmelde dig.
        </p>
      </div>
    </footer>
  );
}
