import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Modes } from "@/components/Modes";
import { HowItWorks } from "@/components/HowItWorks";
import { FeedingIntelligence } from "@/components/FeedingIntelligence";
import { Status } from "@/components/Status";
import { Technology } from "@/components/Technology";
import { Contact } from "@/components/Contact";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Modes />
        <HowItWorks />
        <FeedingIntelligence />
        <Status />
        <Technology />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
