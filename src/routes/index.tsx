import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  Hero,
  TreatmentCentre,
  AddictionsHub,
  DetoxHub,
  RehabHub,
  TherapiesHub,
  RecoveryJourney,
  FacilitiesDailyLife,
  Team,
  FamilySupport,
  RecoveryBeyondRehab,
  Outcomes,
  Costs,
  Location,
  Resources,
  Faq,
  BrochureCta,
  Contact,
  SiteFooter,
  MobileCallBar,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oasis Recovery | Private Addiction Rehab in Bradford, West Yorkshire" },
      {
        name: "description",
        content:
          "Oasis Recovery is a CQC-regulated private residential addiction treatment centre in Bradford, West Yorkshire. Confidential medical detox, residential rehab, family support and aftercare — part of the UKAT group.",
      },
      { property: "og:title", content: "Oasis Recovery | Private Addiction Rehab in Bradford" },
      {
        property: "og:description",
        content:
          "Confidential medical detox, residential rehab, family support and aftercare at our CQC-regulated Bradford facility. Speak to our admissions team 24/7.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Oasis Recovery Bradford",
  description:
    "CQC-regulated private residential addiction treatment centre in Bradford, West Yorkshire, offering medical detox, residential rehabilitation, family support and aftercare.",
  url: "https://www.oasisrecovery.org.uk/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "21A Bolling Road",
    addressLocality: "Bradford",
    addressRegion: "West Yorkshire",
    postalCode: "BD4 7BG",
    addressCountry: "GB",
  },
  telephone: "+442038161576",
  medicalSpecialty: "Addiction Medicine",
  parentOrganization: {
    "@type": "Organization",
    name: "UKAT (UK Addiction Treatment Group)",
    url: "https://www.ukat.co.uk/",
  },
};

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <TreatmentCentre />
        <AddictionsHub />
        <DetoxHub />
        <RehabHub />
        <TherapiesHub />
        <RecoveryJourney />
        <FacilitiesDailyLife />
        <Team />
        <FamilySupport />
        <RecoveryBeyondRehab />
        <Costs />
        <Outcomes />
        <Location />
        <Resources />
        <Faq />
        <BrochureCta />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}
