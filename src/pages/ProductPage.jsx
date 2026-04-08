import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { submitPreorderForm } from "../lib/netlifyForms";

/** Produkt- og detaljebilleder først, miljøbillede (hoverImage) altid sidst. */
function orderProductGallery(product) {
  const raw =
    product.gallery?.filter(Boolean) ??
    [product.image, product.hoverImage].filter(Boolean);
  const isLifestyleImage = (src) =>
    src === product.hoverImage ||
    src.toLowerCase().includes("lifestyle") ||
    src.toLowerCase().includes("hover");

  const seen = new Set();
  const productShots = [];
  const lifestyleShots = [];
  for (const src of raw) {
    if (seen.has(src)) continue;
    seen.add(src);
    if (isLifestyleImage(src)) {
      lifestyleShots.push(src);
    } else {
      productShots.push(src);
    }
  }

  const main = product.image;
  const orderedProductShots = main
    ? [main, ...productShots.filter((s) => s !== main)]
    : productShots;

  return [...orderedProductShots, ...lifestyleShots];
}

function parsePrice(value) {
  return Number.parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(value) {
  return `${value.toLocaleString("da-DK")} DKK`;
}

function emailOk(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ProductPage({ product }) {
  const gallery = product ? orderProductGallery(product) : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("");
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const originalPrice = product ? parsePrice(product.price) : 0;
  const discountedPrice = Math.round(originalPrice * 0.75);
  const formInvalid = emailTouched && (!name.trim() || !emailOk(email));
  const relatedProducts = product
    ? products.filter((item) => item.slug !== product.slug).slice(0, 4)
    : [];

  const prevImage = () => {
    setActiveIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  };

  function openPopup() {
    setShowWaitlistPopup(true);
    setPopupSubmitted(false);
  }

  function closePopup() {
    setShowWaitlistPopup(false);
    setEmailTouched(false);
  }

  async function submitPopup(e) {
    e.preventDefault();
    setEmailTouched(true);
    if (!name.trim() || !emailOk(email)) return;
    await submitPreorderForm({
      name: name.trim(),
      email: email.trim(),
      source: "product-popup",
      productInterest: product.title,
    });
    setPopupSubmitted(true);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0e8dd] text-ink">
        <Header />
        <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Produkt ikke fundet</h1>
          <p className="mt-5 text-lg text-ink-muted">Siden findes ikke endnu. Gå tilbage til kollektionen.</p>
          <a
            href="/#collection"
            className="mt-8 inline-flex rounded-full bg-cork-dark px-7 py-3 text-base font-medium text-sand-50 transition hover:bg-cork-dark/90"
          >
            Tilbage til kollektionen
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0e8dd] text-ink">
      <Header />

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-10">
        <section className="mb-5">
          <p className="text-xs text-ink-muted">
            <a href="/" className="transition hover:text-cork-dark">Forside</a>
            {" / "}
            <a href="/collection" className="transition hover:text-cork-dark">Collection</a>
            {" / "}
            <span className="text-ink">{product.title}</span>
          </p>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-[5.2rem_1fr_0.95fr] lg:gap-8">
          <div className="hidden lg:block">
            {gallery.length > 1 && (
              <div className="space-y-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Vis billede ${index + 1}`}
                    className={`block overflow-hidden rounded-md border transition ${
                      activeIndex === index
                        ? "border-cork-dark"
                        : "border-cork-dark/12 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="h-[5.2rem] w-[5.2rem] object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="relative overflow-hidden rounded-xl border border-cork-dark/10 bg-sand-100/25">
              <img
                src={gallery[activeIndex]}
                alt={`${product.title} billede ${activeIndex + 1}`}
                className="aspect-square w-full object-cover"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-cork-dark/15 bg-sand-50/90 px-2.5 py-1.5 text-sm text-ink transition hover:bg-sand-50"
                    aria-label="Forrige billede"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-cork-dark/15 bg-sand-50/90 px-2.5 py-1.5 text-sm text-ink transition hover:bg-sand-50"
                    aria-label="Næste billede"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 overflow-x-auto pb-1 lg:hidden">
                <div className="flex min-w-max items-center gap-2.5">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Vis billede ${index + 1}`}
                      className={`overflow-hidden rounded-md border transition ${
                        activeIndex === index
                          ? "border-cork-dark"
                          : "border-cork-dark/12 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="h-16 w-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-cork-muted">
              CORKI Copenhagen
            </p>
            <h1 className="font-display text-4xl leading-[1.04] tracking-tight text-ink sm:text-[2.6rem]">
              {product.title}
            </h1>
            <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">
              SKU: CORKI-{product.slug.toUpperCase().slice(0, 8)}
            </p>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-end gap-2">
                <p className="font-sans tabular-nums text-3xl font-medium text-ink">
                  {formatPrice(discountedPrice)}
                </p>
                <p className="font-sans tabular-nums text-sm text-ink-muted line-through">
                  {formatPrice(originalPrice)}
                </p>
                <span className="mb-1 rounded-full bg-cork-dark/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cork-dark">
                  -25%
                </span>
              </div>
              <p className="text-sm text-ink-muted">Inkl. moms</p>
            </div>

            <div className="border-t border-cork-dark/10 pt-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-cork-dark/12 bg-sand-50/70">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1.5 text-ink-muted transition hover:text-ink"
                    aria-label="Mindre antal"
                  >
                    −
                  </button>
                  <span className="min-w-8 px-1.5 py-1.5 text-center font-sans tabular-nums text-sm text-ink">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1.5 text-ink-muted transition hover:text-ink"
                    aria-label="Mere antal"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={openPopup}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-cork-dark px-5 py-2.5 text-sm font-medium text-sand-50 transition hover:bg-cork-dark/92"
                >
                  Læg i kurv
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t border-cork-dark/10 pt-4 text-sm text-ink-muted">
              <p>✓ Hurtig levering 1-3 hverdage</p>
              <p>✓ Fri fragt ved køb over 499 kr.</p>
              <p>✓ 30 dages gratis retur</p>
            </div>

            <div className="border-t border-cork-dark/10 pt-4">
              <h2 className="font-display text-2xl text-ink">Beskrivelse</h2>
              <ul className="mt-4 space-y-2.5 text-[0.98rem] text-ink-muted">
                {product.usps.map((usp) => (
                  <li key={usp} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cork-dark/60" aria-hidden />
                    {usp}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-muted">
                {product.description}
              </p>
            </div>

            {[
              {
                key: "info",
                title: "Info",
                body: (
                  <dl className="space-y-3">
                    {product.info.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-6 border-b border-cork-dark/6 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="text-sm text-ink-muted">{item.label}</dt>
                        <dd className="text-sm font-medium text-ink">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              {
                key: "sustainability",
                title: "Bæredygtighed",
                body: "Kork høstes uden at fælde træer og er et naturligt, fornybart materiale med lav miljøpåvirkning.",
              },
              {
                key: "care",
                title: "Produktpleje",
                body: "Aftør med en let fugtig klud. Undgå stærke kemikalier og langvarig direkte sol ved opbevaring.",
              },
            ].map((section) => {
              const isOpen = openSection === section.key;
              return (
                <div key={section.key} className="border-b border-cork-dark/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setOpenSection(isOpen ? "" : section.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-1 text-left"
                  >
                    <span className="font-sans text-lg font-medium text-ink">{section.title}</span>
                    <span
                      aria-hidden
                      className={`text-cork-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-3 text-sm leading-relaxed text-ink-muted">
                      {section.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Andre populære produkter
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {relatedProducts.map((item) => {
              const itemOriginal = parsePrice(item.price);
              const itemDiscounted = Math.round(itemOriginal * 0.75);
              return (
                <a
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-cork-dark/8 bg-sand-50/60 shadow-soft transition hover:-translate-y-0.5 hover:border-cork-dark/15 hover:shadow-card"
                >
                  <div className="p-3 pb-0">
                    <div className="relative overflow-hidden rounded-2xl border border-cork-dark/8 bg-sand-100/30">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:opacity-0"
                      />
                      <img
                        src={item.hoverImage}
                        alt=""
                        className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="font-sans tabular-nums text-xl font-medium tracking-tight text-ink">
                        {formatPrice(itemDiscounted)}
                      </span>
                      <span className="font-sans tabular-nums text-xs text-ink-muted line-through">
                        {formatPrice(itemOriginal)}
                      </span>
                      <span className="rounded-full bg-cork-dark/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cork-dark">
                        -25%
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-medium text-ink">
                      {item.title}
                    </h3>
                    <span className="mt-5 text-sm font-medium text-cork-dark underline decoration-cork-dark/25 underline-offset-4">
                      Se produkt
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      {showWaitlistPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cork-dark/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-popup-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-cork-dark/10 bg-sand-50 p-6 shadow-[0_20px_60px_rgba(61,52,41,0.3)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h2
                id="waitlist-popup-title"
                className="font-display text-3xl leading-tight text-ink"
              >
                Skriv dig op til næste pre-order.
              </h2>
              <button
                type="button"
                onClick={closePopup}
                className="rounded-full p-1.5 text-ink-muted transition hover:bg-sand-100 hover:text-ink"
                aria-label="Luk popup"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Du bliver blandt de første der får besked når næste collection er
              klar til bestilling, og modtager en rabatkode på 25% på din første
              ordre!
            </p>

            {popupSubmitted ? (
              <p className="mt-5 rounded-xl border border-cork-dark/10 bg-sand-100/60 px-4 py-3 text-sm text-ink">
                Tak - du er nu skrevet op til early access.
              </p>
            ) : (
              <form onSubmit={submitPopup} className="mt-5 space-y-3" noValidate>
                <div>
                  <label htmlFor="popup-name" className="sr-only">
                    Navn
                  </label>
                  <input
                    id="popup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Dit navn"
                    className={`mb-3 w-full rounded-xl border bg-sand-50 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                      emailTouched && !name.trim()
                        ? "border-red-800/25"
                        : "border-cork-dark/12"
                    }`}
                  />
                  <label htmlFor="popup-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="din@email.dk"
                    className={`w-full rounded-xl border bg-sand-50 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                      emailTouched && !emailOk(email)
                        ? "border-red-800/25"
                        : "border-cork-dark/12"
                    }`}
                    aria-invalid={formInvalid}
                  />
                  {formInvalid && (
                    <p className="mt-2 text-xs text-red-900/80">
                      Indtast navn og en gyldig e-mailadresse.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-cork-dark px-5 py-3 text-sm font-medium text-sand-50 transition hover:bg-cork-dark/92"
                >
                  Få early access
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
