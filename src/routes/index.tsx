import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  Hero,
  Treatment,
  Facility,
  Admissions,
  Team,
  FamilyAftercare,
  Testimonials,
  Faq,
  Resources,
  NinetyDayPromise,
  Contact,
  SiteFooter,
  MobileCallBar,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oasis Recovery | Private Addiction Treatment & Rehab" },
      {
        name: "description",
        content:
          "Oasis Recovery offers confidential private addiction treatment: medical detox, residential rehab, therapy, family support and structured aftercare.",
      },
      { property: "og:title", content: "Oasis Recovery | Private Addiction Treatment & Rehab" },
      {
        property: "og:description",
        content:
          "Confidential detox, residential rehab, therapy and aftercare in a calm private setting. Speak to our admissions team 24/7.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Treatment />
        <Facility />
        <Admissions />
        <Team />
        <FamilyAftercare />
        <Testimonials />
        <Resources />
        <NinetyDayPromise />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}
