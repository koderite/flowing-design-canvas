import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Header, TopBar } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Emergency, Intro, Mains, Process, Reviews, Services } from "@/components/site/sections";
import { useRevealOnScroll } from "@/components/site/use-reveal";

const TITLE = "Sandy’s Plumbing & Drainage | Bicester drain specialists, 24/7";
const DESCRIPTION =
  "Blocked drains, CCTV surveys, drain excavation and lead pipe replacement across Bicester, Aylesbury and north Oxfordshire. Fixed written prices and a 24/7 callout.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealOnScroll();
  return (
    <div className="min-h-screen bg-ground">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Mains />
        <Emergency />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
