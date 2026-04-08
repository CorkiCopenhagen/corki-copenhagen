import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0e8dd] text-ink">
      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cork-muted">
            CORKI Copenhagen
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Om os
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">
            Hos os handler det ikke bare om tasker. Det handler om at vælge bedre.
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Kontakt:{" "}
            <a
              href="mailto:kontakt@corki.dk"
              className="underline decoration-cork-dark/25 underline-offset-4 transition hover:text-cork-dark"
            >
              kontakt@corki.dk
            </a>
          </p>
        </section>

        <section className="mx-auto max-w-6xl space-y-8 px-5 pb-20 sm:space-y-10 sm:px-8 sm:pb-28">
          <article className="grid items-center gap-6 rounded-2xl border border-cork-dark/10 bg-sand-50 p-6 shadow-soft sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Et bedre valg
              </h2>
              <p className="text-lg leading-relaxed text-ink-muted">
                Vi skaber accessories i kork - et naturligt, bæredygtigt materiale,
                der udfordrer ideen om, hvad luksus er.
              </p>
              <p className="text-lg leading-relaxed text-ink-muted">
                For os er luksus ikke læder. Det er lethed, holdbarhed og respekt
                for naturen.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cork-dark/10">
              <img
                src="/cork-harvest-story.png"
                alt="Korkhøst fra korkeg med naturlig barktekstur"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </article>

          <article className="grid items-center gap-6 rounded-2xl border border-cork-dark/10 bg-sand-50 p-6 shadow-soft sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="order-2 overflow-hidden rounded-2xl border border-cork-dark/10 lg:order-1">
              <img
                src="/sintra-tote-craftsmanship.png"
                alt="Håndværk i produktionen"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Hvorfor kork?
              </h2>
              <p className="text-lg leading-relaxed text-ink-muted">
                Kork bliver høstet fra korkege uden at fælde træet. Faktisk optager
                træet mere CO2 efter høst.
              </p>
              <ul className="space-y-2 text-lg leading-relaxed text-ink-muted">
                <li>Let og behageligt i hverdagen</li>
                <li>Slidstærkt og vandafvisende</li>
                <li>Naturligt og unikt i udtryk</li>
                <li>100% vegansk</li>
              </ul>
            </div>
          </article>

          <article className="grid gap-5 rounded-2xl border border-cork-dark/10 bg-sand-50 p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Vores mission
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              Modeindustrien er en af de mest belastende industrier i verden. Det
              vil vi gerne være med til at ændre.
            </p>
            <p className="text-lg leading-relaxed text-ink-muted">
              Vi tror på færre, bedre produkter. Produkter du bruger hver dag - og
              i mange år.
            </p>
            <p className="text-lg leading-relaxed text-ink-muted">
              Derfor designer vi tidløse styles, der ikke følger trends, men følger
              dig.
            </p>
          </article>

          <article className="grid gap-5 rounded-2xl border border-cork-dark/10 bg-sand-50 p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Skabt med omtanke
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              Vores produkter bliver håndlavet i Portugal af dygtige håndværkere,
              der forstår materialet og respekterer processen.
            </p>
            <p className="text-lg leading-relaxed text-ink-muted">
              Vi arbejder i små batches for at undgå overproduktion og spild. Det
              betyder også, at vi kun laver det, der rent faktisk bliver brugt.
            </p>
          </article>

          <article className="grid gap-5 rounded-2xl border border-cork-dark/10 bg-cork-dark px-6 py-8 shadow-card sm:px-8 sm:py-10">
            <h2 className="font-display text-3xl font-medium tracking-tight text-sand-50 sm:text-4xl">
              En ny måde at tænke accessories på
            </h2>
            <p className="text-lg leading-relaxed text-sand-100/90">
              Vi er stadig i starten. Men ambitionen er klar: At gøre
              bæredygtige valg til det naturlige valg.
            </p>
            <p className="text-lg leading-relaxed text-sand-100/90">
              Ikke gennem kompromiser - men gennem bedre design.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
