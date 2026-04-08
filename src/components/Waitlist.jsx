import { useState } from "react";
import { submitPreorderForm } from "../lib/netlifyForms";

const emailOk = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const perks = [
  "25% rabat ved lancering",
  "Early access til første drop",
  "Begrænset antal i første kollektion",
];

export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const invalid = touched && (!name.trim() || !emailOk(email));

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !emailOk(email)) return;
    await submitPreorderForm({
      name: name.trim(),
      email: email.trim(),
      source: "waitlist-section",
      productInterest: "generel interesse",
    });
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="relative scroll-mt-24 py-20 sm:py-28"
      style={{
        backgroundImage: "url('/waitlist-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-sand-100/70" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-cork-dark/10 bg-sand-50/85 p-8 shadow-card sm:p-12 lg:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-tile-soft/40 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-cork/15 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.15rem]">
              Skriv dig op til næste pre-order.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Du bliver blandt de første der får besked når næste collection er
              klar til bestilling, og modtager en rabatkode på 25% på din første
              ordre!
            </p>

            {submitted ? (
              <p
                className="mt-10 rounded-2xl border border-cork-dark/10 bg-sand-50/90 px-6 py-5 text-base text-ink"
                role="status"
              >
                Tak – du er nu skrevet op til early access.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-center"
                noValidate
              >
                <div className="w-full flex-1 text-left">
                  <label htmlFor="waitlist-name" className="sr-only">
                    Navn
                  </label>
                  <input
                    id="waitlist-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Dit navn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`mb-3 w-full rounded-xl border bg-sand-50/95 px-5 py-3.5 text-ink placeholder:text-ink-muted/50 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                      touched && !name.trim()
                        ? "border-red-800/25 ring-1 ring-red-800/10"
                        : "border-cork-dark/12"
                    }`}
                  />
                  <label htmlFor="waitlist-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="din@email.dk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`w-full rounded-xl border bg-sand-50/95 px-5 py-3.5 text-ink placeholder:text-ink-muted/50 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                      invalid
                        ? "border-red-800/25 ring-1 ring-red-800/10"
                        : "border-cork-dark/12"
                    }`}
                    aria-invalid={invalid}
                    aria-describedby={
                      invalid ? "waitlist-email-error" : undefined
                    }
                  />
                  {invalid && (
                    <p
                      id="waitlist-email-error"
                      className="mt-2 text-sm text-red-900/80"
                    >
                      Indtast navn og en gyldig e-mailadresse.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-cork-dark px-8 py-3.5 text-base font-medium text-sand-50 shadow-soft transition hover:bg-cork-dark/92 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tile-muted sm:mt-0"
                >
                  Få early access
                </button>
              </form>
            )}

            <p className="mt-6 text-sm text-ink-muted">
              Ingen spam. Kun besked når vi lancerer.
            </p>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 whitespace-nowrap">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-cork-dark/50"
                    aria-hidden
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
