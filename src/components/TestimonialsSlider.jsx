import { useEffect, useMemo, useState } from "react";

const testimonials = [
  {
    name: "Mads L.",
    productName: "Porto Duffel Bag",
    productSlug: "porto-duffel-bag",
    rating: 4,
    text: "En klasse weekendtaske der har overrasket mig positivt. Korken føles robust, men tasken er stadig let og super praktisk til ture.",
    tone: "bg-[#d7dfee]",
    image: "/review-mads-ugc-new.png",
  },
  {
    name: "Emilie R.",
    productName: "Sintra Tote Bag",
    productSlug: "sintra-tote-bag",
    rating: 5,
    text: "Jeg havde aldrig haft en taske i kork før, men jeg blev virkelig positivt overrasket. Materialet ser eksklusivt ud og kvaliteten føles premium.",
    tone: "bg-[#eadccf]",
    image: "/review-emilie-ugc.png",
  },
  {
    name: "Freja N.",
    productName: "Evora Laptop Sleeve",
    productSlug: "evora-laptop-sleeve",
    rating: 5,
    text: "Virkeligt et lækkert sleeve, der beskytter min mac. Var lidt skeptisk over for kork, men er blevet positivt overrasket over finish og kvalitet.",
    tone: "bg-[#dce6e9]",
    image: "/review-freja-ugc.png",
  },
  {
    name: "Sofia T.",
    productName: "Salema Wallet",
    productSlug: "salema-wallet",
    rating: 5,
    text: "Pungen har den helt rigtige størrelse, og korkmaterialet giver et unikt, varmt look. Den føles både elegant og slidstærk.",
    tone: "bg-[#f0d9d2]",
    image: "/review-sofia-ugc.png",
  },
  {
    name: "Nanna K.",
    productName: "Sintra Tote Bag",
    productSlug: "sintra-tote-bag",
    rating: 5,
    text: "Jeg er helt vild med tasken. Korkmaterialet føles overraskende lækkert og blødt i hånden, og den er både let og rummelig til hverdagen.",
    tone: "bg-[#d8e8dc]",
    image: "/review-nanna-ugc.png",
  },
];

function stars(count) {
  return `${"★".repeat(count)}${"☆".repeat(5 - count)}`;
}

function getCardsPerView(width) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(1);
  const [cardsPerView, setCardsPerView] = useState(() =>
    getCardsPerView(window.innerWidth)
  );
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIsAnimating(false);
    setIndex(cardsPerView);
  }, [cardsPerView]);

  useEffect(() => {
    if (!isAnimating) {
      const id = window.requestAnimationFrame(() => setIsAnimating(true));
      return () => window.cancelAnimationFrame(id);
    }
    return undefined;
  }, [isAnimating]);

  const extendedItems = useMemo(() => {
    const head = testimonials.slice(0, cardsPerView);
    const tail = testimonials.slice(-cardsPerView);
    return [...tail, ...testimonials, ...head];
  }, [cardsPerView]);

  const prev = () => {
    setIsAnimating(true);
    setIndex((current) => current - 1);
  };
  const next = () => {
    setIsAnimating(true);
    setIndex((current) => current + 1);
  };

  const handleTransitionEnd = () => {
    const maxStart = testimonials.length + cardsPerView - 1;

    if (index > maxStart) {
      setIsAnimating(false);
      setIndex(cardsPerView);
      return;
    }

    if (index < cardsPerView) {
      setIsAnimating(false);
      setIndex(testimonials.length + cardsPerView - 1);
    }
  };

  const slideWidthPercent = 100 / cardsPerView;

  return (
    <section className="bg-[#f0e8dd] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-4xl leading-tight text-ink sm:text-5xl">
          Det siger nuværende Corki Copenhagen ejere
        </h2>
        <p className="mt-3 text-center text-lg leading-relaxed text-ink-muted">
          Hør deres mening om vores produkter.
        </p>

        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * slideWidthPercent}%)`,
              transition: isAnimating
                ? "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedItems.map((item, i) => (
              <div
                key={`${item.productSlug}-${item.name}-${i}`}
                className="shrink-0 px-3"
                style={{ width: `${slideWidthPercent}%` }}
              >
                <article className="h-full rounded-2xl border border-cork-dark/8 bg-[#f5f0e9] p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-11 w-11 rounded-full border border-cork-dark/10 ${item.tone}`}
                      aria-hidden
                    />
                    <div>
                      <p className="font-display text-xl text-ink">{item.name}</p>
                      <a
                        href={`/products/${item.productSlug}`}
                        className="text-sm text-ink-muted underline decoration-cork-dark/25 underline-offset-4 transition hover:text-cork-dark"
                      >
                        {item.productName}
                      </a>
                    </div>
                  </div>

                  <p className="mt-5 text-lg tracking-wide text-cork-dark">
                    {stars(item.rating)}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-muted">"{item.text}"</p>
                  {item.image && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-cork-dark/10">
                      <img
                        src={item.image}
                        alt={`${item.name} review foto`}
                        className="h-44 w-full object-cover"
                      />
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cork-dark/20 bg-sand-50 text-ink transition hover:bg-sand-100"
            aria-label="Forrige anmeldelse"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cork-dark text-sand-50 transition hover:bg-cork-dark/92"
            aria-label="Næste anmeldelse"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
