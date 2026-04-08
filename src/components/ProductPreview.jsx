import { useMemo, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import { products } from "../data/products";

function parsePrice(value) {
  return Number.parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(value) {
  return `${value.toLocaleString("da-DK")} DKK`;
}

export default function ProductPreview({ showIntro = true }) {
  const [selectedGender, setSelectedGender] = useState(() => {
    if (showIntro) return "all";
    const value = new URLSearchParams(window.location.search).get("gender");
    return ["herre", "damer", "unisex"].includes(value) ? value : "all";
  });
  const bestsellerOrder = [
    "sintra-tote-bag",
    "porto-duffel-bag",
    "salema-wallet",
    "viseu-sling-bag",
  ];
  const previewProducts = showIntro
    ? bestsellerOrder
        .map((slug) => products.find((product) => product.slug === slug))
        .filter(Boolean)
    : products;
  const visibleProducts = useMemo(() => {
    if (showIntro || selectedGender === "all") return previewProducts;
    return previewProducts.filter((product) =>
      (product.gender ?? []).includes(selectedGender)
    );
  }, [previewProducts, selectedGender, showIntro]);

  return (
    <section
      id="collection"
      className={showIntro ? "py-20 sm:py-28" : "pb-20 pt-8 sm:pb-28 sm:pt-10"}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {showIntro && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Bestsellers
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Et udvalg af vores mest populære produkter.
            </p>
          </div>
        )}
        {!showIntro && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="mr-1 text-sm font-medium text-ink">Køn</p>
            {[
              { id: "all", label: "Alle" },
              { id: "herre", label: "Herre" },
              { id: "damer", label: "Damer" },
              { id: "unisex", label: "Unisex" },
            ].map((option) => {
              const isActive = selectedGender === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedGender(option.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    isActive
                      ? "border-cork-dark bg-cork-dark text-sand-50"
                      : "border-cork-dark/12 bg-sand-50 text-ink hover:border-cork-dark/30"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
        <div className={`${showIntro ? "mt-14" : "mt-6"} grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
          {visibleProducts.map((p) => (
            <a
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-cork-dark/8 bg-sand-50/60 shadow-soft transition hover:-translate-y-0.5 hover:border-cork-dark/15 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tile-muted"
            >
              <div className="p-3 pb-0">
                {p.image ? (
                  <div className="relative overflow-hidden rounded-2xl border border-cork-dark/8 bg-sand-100/30">
                    <img
                      src={p.image}
                      alt=""
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:opacity-0"
                    />
                    <img
                      src={p.hoverImage}
                      alt=""
                      className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    aspectClass="aspect-square"
                    label={`Produkt: ${p.title}`}
                    showCaption={false}
                    className="transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                {(() => {
                  const original = parsePrice(p.price);
                  const discounted = Math.round(original * 0.75);
                  return (
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="font-sans tabular-nums text-xl font-medium tracking-tight text-ink">
                        {formatPrice(discounted)}
                      </span>
                      <span className="font-sans tabular-nums text-xs text-ink-muted line-through">
                        {formatPrice(original)}
                      </span>
                      <span className="rounded-full bg-cork-dark/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cork-dark">
                        -25%
                      </span>
                    </div>
                  );
                })()}
                <h3 className="font-display text-lg font-medium text-ink">
                  {p.title}
                </h3>
                <span className="mt-5 text-sm font-medium text-cork-dark underline decoration-cork-dark/25 underline-offset-4">
                  Se produkt
                </span>
              </div>
            </a>
          ))}
        </div>
        {showIntro && (
          <div className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="/collection?gender=herre"
                className="group relative overflow-hidden rounded-2xl border border-cork-dark/8 shadow-soft transition hover:-translate-y-0.5 hover:border-cork-dark/15 hover:shadow-card sm:col-span-1 lg:col-span-2"
              >
                <img
                  src="/viseu-sling-bag-lifestyle.png"
                  alt="Viseu Sling Bag miljøbillede"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cork-dark/55 via-cork-dark/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-3xl font-medium text-sand-50 sm:text-[2rem]">
                    Shop Herre
                  </p>
                </div>
              </a>
              <a
                href="/collection?gender=damer"
                className="group relative overflow-hidden rounded-2xl border border-cork-dark/8 shadow-soft transition hover:-translate-y-0.5 hover:border-cork-dark/15 hover:shadow-card sm:col-span-1 lg:col-span-2"
              >
                <img
                  src="/anadia-crossbody-lifestyle.png"
                  alt="Anadia Crossbody Wallet miljøbillede"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cork-dark/55 via-cork-dark/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-3xl font-medium text-sand-50 sm:text-[2rem]">
                    Shop Damer
                  </p>
                </div>
              </a>
            </div>
            <div className="mt-5 text-center">
              <a
                href="/collection"
                className="text-sm font-medium text-cork-dark underline decoration-cork-dark/25 underline-offset-4 transition hover:text-cork-dark/80"
              >
                Se hele collection
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
