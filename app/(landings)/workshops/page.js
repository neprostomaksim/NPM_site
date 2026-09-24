import StickyBars from "./_sections/StickyBars";
import Hero from "./_sections/Hero";
import Schedule from "./_sections/Schedule";
import Gallery from "@/components/landing/Gallery";
import Speaker from "@/components/landing/Speaker";
import Faq from "@/components/landing/Faq";
import { faqs } from "@/content/workshops/faq";
import Footer from "@/components/landing/Footer";
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
        <Faq items={faqs} />
      </main>
      <Footer />
    </>
  );
}
