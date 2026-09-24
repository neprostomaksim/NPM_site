import StickyBars from "./_sections/StickyBars";
import Hero from "./_sections/Hero";
import Schedule from "./_sections/Schedule";
import Gallery from "./_sections/Gallery";
import Speaker from "./_sections/Speaker";
import Faq from "./_sections/Faq";
import Footer from "./_sections/Footer";
import Pricing from "./_sections/Pricing";

export default function Page() {
  return (
    <>
      <StickyBars />
      <main>
        <Hero />
        <Schedule />
        <Pricing />
        <Speaker />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
