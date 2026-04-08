import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import ProductPreview from "../components/ProductPreview";
import Craftsmanship from "../components/Craftsmanship";
import Waitlist from "../components/Waitlist";
import TestimonialsSlider from "../components/TestimonialsSlider";
import Footer from "../components/Footer";

export default function CorkiLandingPage() {
  return (
    <div className="min-h-screen bg-[#f0e8dd]">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ProductPreview />
        <TestimonialsSlider />
        <Craftsmanship />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
