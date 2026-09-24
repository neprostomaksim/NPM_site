import Header from "./_sections/Header";
import Hero from "./_sections/Hero";
import Pains from "./_sections/Pains";
import Compare from "./_sections/Compare";
import Agents from "./_sections/Agents";
import Steps from "./_sections/Steps";
import Program from "./_sections/Program";
import Audience from "./_sections/Audience";
import Pricing from "./_sections/Pricing";
import Facts from "./_sections/Facts";
import FinalCta from "./_sections/FinalCta";
import MobileBar from "./_sections/MobileBar";
import Speaker from "@/components/landing/Speaker";
import Gallery from "@/components/landing/Gallery";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";
import { faq } from "./_content/content";

// Порядок — логика продажи: обещание → боль → «чем агент лучше чата» →
// что соберёте → живые фото как доказательство → как проходит → программа →
// для кого → цена и запись → спикер → факты (GEO) → вопросы → финальный призыв.
export default function AiAgentsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pains />
        <Compare />
        <Agents />
        <Gallery />
        <Steps />
        <Program />
        <Audience />
        <Pricing />
        <Speaker />
        <Facts />
        <Faq items={faq} />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
