import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { DataToAction } from "@/components/DataToAction";
import { Statement } from "@/components/Statement";
import { IntelligenceLayer } from "@/components/IntelligenceLayer";
import { Capabilities } from "@/components/Capabilities";
import { FeedingIntelligence } from "@/components/FeedingIntelligence";
import { HumanInLoop } from "@/components/HumanInLoop";
import { ProductPreview } from "@/components/ProductPreview";
import { FuturePlatform } from "@/components/FuturePlatform";
import { Contact } from "@/components/Contact";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <DataToAction />
        <Statement />
        <IntelligenceLayer />
        <Capabilities />
        <FeedingIntelligence />
        <HumanInLoop />
        <ProductPreview />
        <FuturePlatform />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
