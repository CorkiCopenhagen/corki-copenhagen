export default function Craftsmanship() {
  return (
    <section
      id="about"
      className="border-t border-cork-dark/5 bg-gradient-to-b from-sand-50 to-sand-100/60 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-cork-dark/10 shadow-card">
              <img
                src="/cork-harvest-story.png"
                alt="Korkhøst fra korkeg med naturlig barktekstur"
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cork-dark/12 via-transparent to-sand-50/10" />
            </div>

            <div className="pointer-events-none absolute -bottom-8 -right-5 w-72 rotate-[8deg] shadow-[0_28px_60px_rgba(61,52,41,0.32)] sm:w-80 lg:-bottom-10 lg:-right-8 lg:w-[26rem]">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/sintra-tote-craftsmanship.png"
                  alt="Dame der syer en taske"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 space-y-8 lg:order-2">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Skabt med omtanke
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted">
            Vores produkter fremstilles i Portugal med fokus på kvalitet,
            detaljer og naturlige materialer. Vi ønsker at skabe et smukkere og
            mere ansvarligt alternativ til traditionelle tasker.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-cork-dark underline decoration-cork-dark/25 underline-offset-4 transition hover:decoration-cork-dark"
          >
            Læs mere
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
