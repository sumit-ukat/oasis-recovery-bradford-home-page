import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartHandshake,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cn } from "@/lib/utils";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const LOREM_LONG = `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,var(--color-secondary),transparent)]"
      />
      <div className="section-x relative mx-auto max-w-7xl py-10 sm:py-14 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden />
            CQC registered · Confidential
          </p>
          <h1 className="mt-4 text-[2.125rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Private addiction treatment, with you every step
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-lg">
            {LOREM}
          </p>

          <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap sm:items-center">
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <a href="#contact">
                <Phone aria-hidden /> Speak to us confidentially
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#admissions">
                How admission works <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Lorem ipsum · 24/7 · Lorem ipsum dolor sit amet
          </p>
        </div>

        <div className="mt-8 lg:mt-0">
          <ImagePlaceholder
            letter="A"
            note="Hero"
            className="aspect-[4/3] rounded-2xl shadow-[var(--shadow-lift)] sm:aspect-[16/9] lg:aspect-[5/4] lg:rounded-3xl"
          />
        </div>
      </div>

      <div className="border-t border-border/70 bg-background/60">
        <ul className="section-x mx-auto grid max-w-7xl grid-cols-2 gap-y-5 py-6 sm:grid-cols-4">
          {[
            { icon: Clock, label: "00+ years" },
            { icon: Users, label: "000+ clients" },
            { icon: Leaf, label: "00 acres" },
            { icon: HeartHandshake, label: "00% aftercare" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex min-w-0 items-center gap-2.5">
              <Icon className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">Lorem ipsum</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TREATMENT — numbered editorial list, no cards
═══════════════════════════════════════════════════════════ */

const PROGRAMMES = [
  { num: "01", title: "Medically Assisted Detox", href: "/detox/" },
  { num: "02", title: "Residential Rehabilitation", href: "/rehab-treatment/" },
  { num: "03", title: "One-to-One Therapy", href: "/rehab-programme/individual-therapy/" },
  { num: "04", title: "Group Therapy", href: "/rehab-programme/group-therapy/" },
  { num: "05", title: "Holistic & Wellbeing Therapies", href: "/rehab-programme/holistic-therapy/" },
  { num: "06", title: "Dual Diagnosis Treatment", href: "/dual-diagnosis/" },
  { num: "07", title: "Family Support", href: "/rehab-programme/family-support/" },
  { num: "08", title: "Structured Aftercare", href: "/rehab-treatment/aftercare/" },
];

export function Treatment() {
  return (
    <section id="treatment" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">

          {/* Left: heading + intro (sticky on desktop) */}
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-primary/70">Our programmes</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Treatment built<br />around you.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              {LOREM}
            </p>
            <div className="mt-8 hidden lg:block">
              <ImagePlaceholder
                letter="B"
                note="Therapy room or clinical consultation space"
                className="aspect-[4/3] rounded-2xl"
              />
            </div>
          </div>

          {/* Right: numbered list */}
          <div className="mt-12 lg:mt-0">
            <ul>
              {PROGRAMMES.map(({ num, title, href }) => (
                <li key={num} className="border-t border-border/50 first:border-t-0">
                  <a
                    href={href}
                    className="group flex items-baseline gap-5 py-5 transition-colors hover:text-primary sm:py-6"
                  >
                    <span className="w-7 shrink-0 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground/40 transition-colors group-hover:text-primary/40">
                      {num}
                    </span>
                    <span className="flex-1 text-[1.0625rem] font-medium leading-snug sm:text-[1.125rem]">
                      {title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground/25 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border/50 pt-8">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="/rehab-treatment/">
                  All treatment options <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FACILITY — photography-led cinematic composition
═══════════════════════════════════════════════════════════ */

export function Facility() {
  return (
    <section id="facility" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">Our facility</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            A calm, private place<br className="hidden sm:block" /> to recover.
          </h2>
        </div>
      </div>

      {/* Dominant full-width image */}
      <div className="section-x mx-auto mt-10 max-w-7xl">
        <ImagePlaceholder
          letter="C"
          note="Facility — entrance, garden, or main lounge. Cinematic crop."
          className="aspect-[3/2] w-full rounded-3xl sm:aspect-[16/8] lg:aspect-[21/9]"
        />
      </div>

      {/* Two supporting images + amenity details */}
      <div className="section-x mx-auto mt-4 max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
        <ImagePlaceholder
          letter="D"
          note="Private en-suite bedroom"
          className="aspect-[4/3] rounded-2xl"
        />
        <ImagePlaceholder
          letter="E"
          note="Therapy room or lounge"
          className="aspect-[4/3] rounded-2xl"
        />

        {/* Amenity text panel */}
        <div className="flex flex-col justify-between rounded-2xl bg-background/80 border border-border/60 p-7 sm:p-8">
          <ul className="space-y-5">
            {[
              { title: "Private en-suite rooms", desc: "Your own quiet space to rest and restore." },
              { title: "Landscaped private grounds", desc: "Peaceful outdoor space for reflection." },
              { title: "Chef-prepared meals", desc: "Nutritious, recovery-focused dining." },
            ].map(({ title, desc }) => (
              <li key={title}>
                <span className="block text-[0.9375rem] font-medium">{title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{desc}</span>
              </li>
            ))}
          </ul>
          <a
            href="/about/virtual-facility-tour/"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Explore the facility <ArrowRight className="size-4 transition-transform duration-200 hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADMISSIONS — elegant vertical timeline
═══════════════════════════════════════════════════════════ */

const JOURNEY = [
  {
    num: "01",
    title: "Confidential call",
    desc: "Speak privately with our admissions team — no obligation. Everything you share is treated with complete confidentiality.",
  },
  {
    num: "02",
    title: "Clinical assessment",
    desc: "A compassionate assessment to understand your situation and determine the right treatment approach for you.",
  },
  {
    num: "03",
    title: "Arrival & care planning",
    desc: "A warm welcome, initial medical checks, and a personalised care plan created specifically around your needs.",
  },
  {
    num: "04",
    title: "Treatment begins",
    desc: "Your bespoke programme of therapy, clinical care, and holistic support starts on your terms.",
  },
  {
    num: "05",
    title: "Aftercare & continued support",
    desc: "Structured aftercare and ongoing alumni support to protect and extend your recovery long after leaving.",
  },
];

export function Admissions() {
  return (
    <section id="admissions" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Getting started takes<br />one phone call.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{LOREM}</p>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">

          {/* Timeline */}
          <ol className="relative space-y-0">
            <div aria-hidden className="absolute left-[1.4375rem] top-6 bottom-6 w-px bg-border/60" />
            {JOURNEY.map(({ num, title, desc }) => (
              <li key={num} className="relative flex gap-6 pb-9 last:pb-0">
                <div className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                  <span className="text-[0.625rem] font-bold tracking-[0.12em] text-primary/60">{num}</span>
                </div>
                <div className="min-w-0 pt-2.5">
                  <h3 className="text-[1.0625rem] font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Image + CTA (desktop only) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-8">
            <ImagePlaceholder
              letter="F"
              note="Welcoming reception or comfortable arrival space"
              className="flex-1 rounded-2xl"
            />
            <Button asChild variant="cta" size="lg" className="w-full">
              <a href="#contact">
                <Phone className="size-4" aria-hidden /> Start your admissions today
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 lg:hidden">
          <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
            <a href="#contact">
              <Phone className="size-4" aria-hidden /> Start your admissions today
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TEAM — portrait-led editorial layout
═══════════════════════════════════════════════════════════ */

export function Team() {
  return (
    <section id="team" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">Our team</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Experienced people.<br />Compassionate care.
          </h2>
        </div>

        {/* Clinicians */}
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2">
            {[
              { letter: "H", name: "Name Placeholder", role: "Lead Therapist" },
              { letter: "I", name: "Name Placeholder", role: "Clinical Nurse Specialist" },
            ].map((m) => (
              <li key={m.letter} className="flex items-start gap-5">
                <ImagePlaceholder
                  letter={m.letter}
                  note="Team portrait"
                  className="aspect-square w-20 shrink-0 rounded-xl sm:w-24"
                />
                <div className="min-w-0 pt-1">
                  <h3 className="text-[1.0625rem] font-medium">{m.name}</h3>
                  <p className="eyebrow mt-1">{m.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{LOREM}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <a
            href="/about/our-team/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Meet our clinical team <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAMILY & AFTERCARE — emotional, image-led split layouts
═══════════════════════════════════════════════════════════ */

export function FamilyAftercare() {
  return (
    <section id="family" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl space-y-16 sm:space-y-20 lg:space-y-28">

        {/* Family — image left, text right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <ImagePlaceholder
            letter="J"
            note="Family session — warm, human moment. Not staged."
            className="aspect-[4/3] rounded-2xl lg:aspect-[3/2]"
          />
          <div>
            <p className="eyebrow">Family support</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Recovery involves<br />the whole family.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{LOREM_LONG}</p>
            <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
              <a href="/rehab-programme/family-support/">Family support programme</a>
            </Button>
          </div>
        </div>

        {/* Aftercare — text left, image right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="lg:order-1">
            <p className="eyebrow">Aftercare</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Support that continues<br />after you leave.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{LOREM_LONG}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="/rehab-treatment/aftercare/">Explore aftercare</a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                <a href="/about/alumni/">
                  Alumni programme <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
          <ImagePlaceholder
            letter="K"
            note="Aftercare — one-to-one support or quiet reflection space"
            className="aspect-[4/3] rounded-2xl lg:order-2 lg:aspect-[3/2]"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS — typography-first, large quote, dark navy
═══════════════════════════════════════════════════════════ */

function DoctifyWidget() {
  useEffect(() => {
    if (document.querySelector('script[data-doctify]')) return;
    const script = document.createElement("script");
    script.src =
      "https://www.doctify.com/get-script?widget_container_id=0x2c0ypj&type=carousel-widget&tenant=athena-uk&language=en&profileType=practice&layoutType=layoutA&slugs=oasis-bradford&background=white&itemBackground=ffffff";
    script.async = true;
    script.setAttribute("data-doctify", "1");
    document.body.appendChild(script);
  }, []);
  return <div id="0x2c0ypj" className="min-h-[260px]" />;
}

const OWN_REVIEWS = [
  {
    quote:
      "For the first time in years, I felt like someone truly understood me. The team at Oasis Bradford gave me my life back.",
    author: "Former resident",
    date: "2026",
  },
  {
    quote:
      "I was nervous about coming in but the staff were warm and professional. I left with real tools for lasting sobriety.",
    author: "Former resident",
    date: "2025",
  },
  {
    quote:
      "Watching my son transform during his time at Oasis Bradford was incredible. The family support they offered us was just as important.",
    author: "Family member",
    date: "2025",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((a) => (a === 0 ? OWN_REVIEWS.length - 1 : a - 1));
  }
  function next() {
    setActive((a) => (a === OWN_REVIEWS.length - 1 ? 0 : a + 1));
  }

  return (
    <section className="bg-deep py-24 text-deep-foreground sm:py-32 lg:py-40">
      <div className="section-x mx-auto max-w-7xl">

        {/* Eyebrow */}
        <p className="eyebrow text-deep-foreground/50">What our clients say</p>

        {/* Large quote — the headline of this section */}
        <div className="mt-8 max-w-3xl">
          <blockquote>
            <p className="font-display text-[1.625rem] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[2.125rem] lg:text-[2.625rem]">
              &ldquo;{OWN_REVIEWS[active]!.quote}&rdquo;
            </p>
            <footer className="mt-7 flex items-center gap-4">
              <span className="h-px w-8 shrink-0 bg-primary/60" aria-hidden />
              <div>
                <cite className="not-italic text-sm font-semibold">{OWN_REVIEWS[active]!.author}</cite>
                <span className="ml-2 text-xs text-deep-foreground/40">{OWN_REVIEWS[active]!.date}</span>
              </div>
            </footer>
          </blockquote>

          {/* Dots + prev/next */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-1.5">
              {OWN_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Review ${i + 1}`}
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-200",
                    i === active
                      ? "w-6 bg-primary"
                      : "w-[3px] bg-deep-foreground/20 hover:bg-deep-foreground/40"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="grid h-8 w-8 place-items-center rounded-full border border-deep-foreground/15 text-deep-foreground/50 transition-colors hover:border-deep-foreground/30 hover:text-deep-foreground"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="grid h-8 w-8 place-items-center rounded-full border border-deep-foreground/15 text-deep-foreground/50 transition-colors hover:border-deep-foreground/30 hover:text-deep-foreground"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-deep-foreground/12 lg:my-16" />

        {/* Doctify + review platform credibility */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow mb-4 text-deep-foreground/40">Verified by Doctify</p>
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3">
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-400">
                  Doctify verified reviews
                </span>
              </div>
              <div className="p-2">
                <DoctifyWidget />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-6 text-deep-foreground/40">Review platforms</p>
            <div className="space-y-5">
              {[
                { platform: "Google Reviews", score: "4.9 / 5" },
                { platform: "Doctify", score: "Excellent" },
                { platform: "Trustpilot", score: "4.8 / 5" },
              ].map(({ platform, score }) => (
                <div
                  key={platform}
                  className="flex items-center justify-between border-b border-deep-foreground/10 pb-5 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-medium text-deep-foreground/65">{platform}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-amber-400 text-amber-400" aria-hidden />
                      ))}
                    </div>
                    <span className="text-xs text-deep-foreground/40">{score}</span>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/reviews/"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Read all reviews <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESOURCES — magazine editorial layout
═══════════════════════════════════════════════════════════ */

export function Resources() {
  return (
    <section id="resources" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Resources</p>
            <h2 className="mt-3 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Guides & articles
            </h2>
          </div>
          <a
            href="/blog/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        {/* Magazine layout: 1 large featured + 2 smaller */}
        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">

          {/* Featured */}
          <a
            href="/blog/"
            className="group block overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="overflow-hidden">
              <ImagePlaceholder
                letter="L"
                note="Featured article — strong, editorial image"
                className="aspect-[4/3] rounded-none transition-transform duration-500 group-hover:scale-[1.02] sm:aspect-[16/9] lg:aspect-[4/3]"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Addiction · 8 min read</p>
              <h3 className="mt-3 text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
                Featured article heading placeholder
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{LOREM}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read article{" "}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </a>

          {/* Two smaller */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {[
              { letter: "M", cat: "Recovery", time: "5 min read", title: "Article heading one" },
              { letter: "N", cat: "Treatment", time: "7 min read", title: "Article heading two" },
            ].map(({ letter, cat, time, title }) => (
              <a
                key={letter}
                href="/blog/"
                className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="overflow-hidden">
                  <ImagePlaceholder
                    letter={letter}
                    note="Article image"
                    className="aspect-[16/9] rounded-none transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow">{cat} · {time}</p>
                  <h3 className="mt-2.5 flex-1 text-lg leading-snug tracking-[-0.015em]">{title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read article{" "}
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 sm:hidden">
          <a href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            All articles <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   90-DAY PROMISE — editorial with day breakdown, NO inner card
═══════════════════════════════════════════════════════════ */

const PROMISE_INCLUSIONS = [
  "Medically managed detox included",
  "Evidence-based individual and group therapy",
  "Dedicated key worker throughout",
  "Structured aftercare plan on leaving",
];

export function NinetyDayPromise() {
  return (
    <section id="promise" className="relative overflow-hidden bg-deep py-24 text-deep-foreground sm:py-32 lg:py-40">

      {/* Decorative watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 select-none font-display text-[18rem] font-black leading-none tracking-tight text-deep-foreground/[0.035] sm:text-[26rem] lg:-right-16 lg:text-[34rem]"
      >
        90
      </span>

      <div className="section-x relative mx-auto max-w-7xl">
        <p className="eyebrow text-deep-foreground/50">The UKAT 90-day promise</p>

        <h2 className="mt-4 max-w-2xl text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem] lg:text-[3.5rem]">
          90 days of treatment.<br />
          <span className="text-primary">A lifetime of recovery.</span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-foreground/65 sm:text-[1.0625rem]">
          Lasting change takes time. Our 90-day residential programme combines medically managed detox,
          evidence-based therapies, and one-to-one support — laying the foundation for lifelong sobriety.
          And because we believe in what we do, we stand behind it with a written guarantee.
        </p>

        {/* Day breakdown */}
        <div className="mt-14 grid gap-8 sm:grid-cols-3 lg:mt-16 lg:gap-0 lg:divide-x lg:divide-deep-foreground/15">
          {[
            {
              range: "Days 1–30",
              label: "Stabilise & Heal",
              desc: "Safe, medically managed detox. Physical stabilisation. Beginning to feel safe in your environment.",
            },
            {
              range: "Days 31–60",
              label: "Grow & Recover",
              desc: "Intensive therapy. Understanding the roots of addiction. Building new patterns of thought and behaviour.",
            },
            {
              range: "Days 61–90",
              label: "Prepare & Thrive",
              desc: "Consolidating progress. Personalised aftercare planning. Building confidence and skills for life ahead.",
            },
          ].map(({ range, label, desc }) => (
            <div key={range} className="lg:px-10 lg:first:pl-0 lg:last:pr-0">
              <p className="eyebrow text-primary/70">{range}</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] sm:text-2xl">{label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-foreground/55 sm:text-[0.9375rem]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Inclusions */}
        <div className="mt-12 border-t border-deep-foreground/15 pt-10 lg:mt-14 lg:pt-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-10 lg:gap-y-3">
            {PROMISE_INCLUSIONS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="size-3.5 shrink-0 text-primary/70" aria-hidden />
                <span className="text-sm text-deep-foreground/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
            <a href="#contact">
              <Phone className="size-4" aria-hidden /> Start your recovery
            </a>
          </Button>
          <a
            href="/rehab-treatment/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-deep-foreground/20 px-6 py-3 text-sm font-semibold text-deep-foreground transition-colors hover:bg-deep-foreground/8 sm:w-auto"
          >
            View our programmes <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <p className="mt-7 text-xs text-deep-foreground/30">
          Applicable to clients who complete the full 90-day inpatient programme at Oasis Recovery Bradford.
          Subject to clinical assessment on return.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ — ultra-minimal, typography-led
═══════════════════════════════════════════════════════════ */

const FAQS = [
  "How long does treatment last?",
  "Is treatment completely confidential?",
  "How much does private rehab cost?",
  "Can family members visit during treatment?",
  "Do you accept private health insurance?",
  "What happens after I leave?",
];

export function Faq() {
  return (
    <section className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-3xl">
        <div className="max-w-lg">
          <p className="eyebrow">FAQs</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
            Questions you<br />may have.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((q) => (
            <AccordionItem
              key={q}
              value={q}
              className="border-b border-border/50 first:border-t first:border-border/50"
            >
              <AccordionTrigger className="py-5 text-left text-[1.0625rem] font-medium leading-snug hover:no-underline sm:text-lg">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {LOREM_LONG}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 pt-2">
          <a
            href="/about/questions-and-answers/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all FAQs <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT — calm, reassuring, not aggressive
═══════════════════════════════════════════════════════════ */

export function Contact() {
  return (
    <section id="contact" className="bg-sand py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">

          {/* Left: reassurance */}
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              We're here when<br />you're ready.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Speak confidentially with our admissions team. There is no obligation and everything
              you share is treated with complete privacy.
            </p>

            <ul className="mt-9 space-y-5">
              {[
                { icon: Phone, label: "Placeholder phone number", sub: "Available 24 hours, 7 days" },
                { icon: ShieldCheck, label: "Completely confidential", sub: "No obligation, no pressure" },
                { icon: MapPin, label: "Bradford, West Yorkshire", sub: "Private residential facility" },
              ].map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-center gap-4">
                  <Icon className="size-[1.0625rem] shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block text-[0.9375rem] font-medium">{label}</span>
                    <span className="block text-xs text-muted-foreground">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <form
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-xl font-medium tracking-[-0.02em]">Request a confidential callback</h3>
            <p className="mt-1 text-sm text-muted-foreground">No obligation · Complete privacy</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" autoComplete="name" className="h-11" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-11" />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" className="h-11" />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="enquiry">Who is seeking help?</Label>
                <Select>
                  <SelectTrigger id="enquiry" className="h-11">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">For myself</SelectItem>
                    <SelectItem value="family">For a family member</SelectItem>
                    <SelectItem value="professional">Professional referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" rows={4} />
              </div>
            </div>

            <Button type="submit" variant="cta" size="lg" className="mt-5 w-full">
              Request a confidential callback
            </Button>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 shrink-0 text-primary/60" aria-hidden />
              All enquiries are treated with complete confidentiality.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */

const FOOTER_COLS = [
  {
    title: "Addiction",
    links: [
      { label: "Alcohol addiction", href: "/addiction/alcohol/" },
      { label: "Drug addiction", href: "/addiction/drug/" },
      { label: "Behavioural addiction", href: "/addiction/behavioural/" },
      { label: "Prescription drugs", href: "/addiction/prescription-drug/" },
      { label: "Dual diagnosis", href: "/dual-diagnosis/" },
    ],
  },
  {
    title: "Treatment",
    links: [
      { label: "Detox", href: "/detox/" },
      { label: "Residential rehab", href: "/rehab-treatment/" },
      { label: "Therapy programmes", href: "/rehab-programme/" },
      { label: "Aftercare", href: "/rehab-treatment/aftercare/" },
      { label: "Cost of rehab", href: "/rehab-treatment/cost-alcohol-drug-rehab/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our facility", href: "/about/facilities/" },
      { label: "Our team", href: "/about/our-team/" },
      { label: "Admissions", href: "/admissions/" },
      { label: "CQC report", href: "/cqc-report/" },
      { label: "Reviews", href: "/reviews/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Family support", href: "/rehab-programme/family-support/" },
      { label: "Help guides", href: "/help-guides/" },
      { label: "Alumni programme", href: "/about/alumni/" },
      { label: "Contact us", href: "/about/contact/" },
      { label: "FAQ", href: "/about/questions-and-answers/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-deep pb-24 text-deep-foreground lg:pb-0">
      <div className="section-x mx-auto max-w-7xl py-14">

        {/* Brand row */}
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6 border-b border-deep-foreground/15 pb-10">
          <div>
            <a href="/" className="inline-flex items-center rounded-xl bg-white px-3 py-1.5">
              <img
                src="https://www.oasisrecovery.org.uk/wp-content/uploads/2024/08/ORB-logo.jpg"
                alt="Oasis Recovery Bradford"
                className="h-8 w-auto object-contain mix-blend-multiply"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-deep-foreground/55">{LOREM}</p>
          </div>
          <a
            href="/cqc-report/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-deep-foreground/55 transition-colors hover:text-deep-foreground hover:underline"
          >
            <ShieldCheck className="size-3.5" aria-hidden />
            CQC registered provider
          </a>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-deep-foreground/40">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-sm text-deep-foreground/55">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-deep-foreground hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-deep-foreground/15 pt-6">
          <p className="text-xs text-deep-foreground/40">
            © Oasis Recovery Bradford. Lorem ipsum dolor sit amet.
          </p>
          <p className="text-xs text-deep-foreground/40">
            Part of the{" "}
            <a href="https://www.ukat.co.uk/" className="underline hover:text-deep-foreground">
              UKAT group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE STICKY ACTION BAR
═══════════════════════════════════════════════════════════ */

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="cta" size="lg">
          <a href="tel:+441234567890">
            <Phone aria-hidden /> Call now
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#contact">Request callback</a>
        </Button>
      </div>
    </div>
  );
}
