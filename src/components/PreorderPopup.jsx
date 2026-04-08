import { useEffect, useState } from "react";
import { submitPreorderForm } from "../lib/netlifyForms";

const emailOk = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function PreorderPopup() {
  const STORAGE_DISMISSED = "corki_preorder_popup_dismissed";
  const STORAGE_AUTO_SHOWN = "corki_preorder_popup_auto_shown";

  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_DISMISSED) === "true";
    const autoShown = window.localStorage.getItem(STORAGE_AUTO_SHOWN) === "true";

    if (dismissed) {
      setMinimized(true);
      return undefined;
    }

    if (autoShown) return undefined;

    const timer = window.setTimeout(() => {
      setMinimized(false);
      window.localStorage.setItem(STORAGE_AUTO_SHOWN, "true");
    }, 7000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="rounded-full bg-cork-dark px-5 py-3 text-sm font-medium text-sand-50 shadow-[0_12px_28px_rgba(61,52,41,0.24)] transition hover:bg-cork-dark/92"
        >
          Skriv dig op
        </button>
      </div>
    );
  }

  const invalid = touched && (!name.trim() || !emailOk(email));

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !emailOk(email)) return;
    await submitPreorderForm({
      name: name.trim(),
      email: email.trim(),
      source: "corner-popup",
      productInterest: "generel interesse",
    });
    setSubmitted(true);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] max-w-sm rounded-2xl border border-cork-dark/15 bg-sand-50 p-5 shadow-[0_18px_40px_rgba(61,52,41,0.24)] sm:bottom-6 sm:left-auto sm:right-6 sm:p-6">
      <button
        type="button"
        onClick={() => {
          setMinimized(true);
          window.localStorage.setItem(STORAGE_DISMISSED, "true");
        }}
        className="absolute right-3 top-3 rounded-full p-1.5 text-ink-muted transition hover:bg-sand-100 hover:text-ink"
        aria-label="Luk popup"
      >
        ✕
      </button>

      <h3 className="pr-7 font-display text-[1.6rem] leading-tight text-ink">
        Modtag besked når collectionen er klar og modtag 25% på første order!
      </h3>

      {submitted ? (
        <p className="mt-4 rounded-xl border border-cork-dark/10 bg-sand-100/70 px-4 py-3 text-sm text-ink">
          Tak! Vi giver dig besked ved næste drop.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
          <label className="block">
            <span className="sr-only">Navn</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Dit navn"
              className={`w-full rounded-xl border bg-sand-50 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                touched && !name.trim()
                  ? "border-red-800/25"
                  : "border-cork-dark/12"
              }`}
            />
          </label>
          <label className="block">
            <span className="sr-only">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="din@email.dk"
              className={`w-full rounded-xl border bg-sand-50 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-tile-muted/60 ${
                touched && !emailOk(email)
                  ? "border-red-800/25"
                  : "border-cork-dark/12"
              }`}
            />
          </label>
          {invalid && (
            <p className="text-xs text-red-900/80">
              Indtast navn og en gyldig e-mailadresse.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-cork-dark px-5 py-3 text-sm font-medium text-sand-50 transition hover:bg-cork-dark/92"
          >
            Skriv dig op
          </button>
        </form>
      )}
    </div>
  );
}
