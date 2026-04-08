import Header from "../components/Header";
import ProductPreview from "../components/ProductPreview";
import Footer from "../components/Footer";

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-[#f0e8dd] text-ink">
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cork-muted">
            CORKI Copenhagen
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Vores collection
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Udforsk alle vores tasker og accessories - designet til hverdagen
            med fokus på kvalitet, naturlige materialer og tidløs stil.
          </p>
        </section>

        <ProductPreview showIntro={false} />
      </main>
      <Footer />
    </div>
  );
}
