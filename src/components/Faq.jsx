import { useState } from "react";

const faqs = [
  {
    q: "Hvad er kork?",
    a: "Kork er barken fra korkegen – et let, fleksibelt og naturligt materiale med varm tekstur.",
  },
  {
    q: "Er det slidstærkt?",
    a: "Ja. Kork tåler hverdagsbrug godt og er modstandsdygtigt over for væsker og slid i normal brug.",
  },
  {
    q: "Hvornår lancerer I?",
    a: "Vi åbner for early access først på ventelisten — tilmeld dig, så får du besked ved lancering.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section
      id="faq"
      className="border-t border-cork-dark/5 bg-sand-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl font-medium text-ink sm:text-3xl">
          Ofte stillede spørgsmål
        </h2>
        <dl className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-cork-dark/8 bg-sand-100/40 transition hover:border-cork-dark/12"
              >
                <dt>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-ink transition hover:bg-sand-50/80"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span
                      className={`text-cork-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="border-t border-cork-dark/6 bg-sand-50/50 px-6 py-5 text-sm leading-relaxed text-ink-muted"
                  >
                    {item.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
