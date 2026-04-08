import CorkiLandingPage from "./pages/CorkiLandingPage";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";
import AboutPage from "./pages/AboutPage";
import { getProductBySlug } from "./data/products";
import PreorderPopup from "./components/PreorderPopup";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const isProductPage = pathname.startsWith("/products/");

  if (isProductPage) {
    const slug = pathname.split("/products/")[1];
    const product = getProductBySlug(slug);
    return (
      <>
        <ProductPage product={product} />
        <PreorderPopup />
      </>
    );
  }

  if (pathname === "/collection") {
    return (
      <>
        <CollectionPage />
        <PreorderPopup />
      </>
    );
  }

  if (pathname === "/about") {
    return (
      <>
        <AboutPage />
        <PreorderPopup />
      </>
    );
  }

  return (
    <>
      <CorkiLandingPage />
      <PreorderPopup />
    </>
  );
}
