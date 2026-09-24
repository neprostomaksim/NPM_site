import Header from "./_sections/Header";
import Hero from "./_sections/Hero";
import Facts from "./_sections/Facts";
import Outcomes from "./_sections/Outcomes";
import Program from "./_sections/Program";
import Audience from "./_sections/Audience";
import Pricing from "./_sections/Pricing";
import Speaker from "@/components/landing/Speaker";
import Gallery from "@/components/landing/Gallery";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";
import { faq } from "./_content/content";

export default function AiAgentsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Facts />
        <Outcomes />
        <Program />
        <Audience />
        <Pricing />
        <Speaker />
        <Gallery />
        <Faq items={faq} />
      </main>
      <Footer />
    </>
  );
}
