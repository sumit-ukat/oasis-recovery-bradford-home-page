import { useState, useEffect } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartHandshake,
  Leaf,
  MapPin,
  Medal,
  Phone,
  ShieldCheck,
  Sparkles,
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

/* ─────────────────────── Shared section heading */

function SectionHead({
  eyebrow,
  title,
  intro,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.625rem] lg:text-[3rem]">{title}</h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────── Hero */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-60 h-[640px] bg-[radial-gradient(50%_70%_at_50%_100%,var(--color-secondary),transparent)]"
      />

      <div className="section-x relative mx-auto max-w-7xl pt-16 pb-10 sm:pt-20 sm:pb-14 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pt-28 lg:pb-24">
        <div className="max-w-xl">
          <p className="eyebrow text-primary/70">
            Private residential rehab · Bradford, West Yorkshire
          </p>

          <h1 className="mt-5 text-[2.875rem] leading-[1.04] sm:text-[4rem] lg:text-[5rem]">
            Private addiction
            <br />
            treatment,{" "}
            <span className="text-primary">
              with you
              <br />
              every step.
            </span>
          </h1>

          <p className="mt-6 max-w-[26rem] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
            {LOREM}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild variant="cta" size="lg" className="w-full px-7 sm:w-auto">
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

          <p className="mt-5 text-xs text-muted-foreground">
            CQC registered · All enquiries are completely confidential
          </p>
        </div>

        <div className="mt-10 lg:mt-0">
          <ImagePlaceholder
            letter="A"
            note="Hero — facility exterior or calm residential space"
            className="aspect-[4/3] rounded-3xl shadow-[var(--shadow-lift)] sm:aspect-[16/9] lg:aspect-[4/5]"
          />
        </div>
      </div>

      <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <ul className="section-x mx-auto grid max-w-7xl grid-cols-2 gap-y-6 py-7 sm:grid-cols-4">
          {[
            { icon: Clock, label: "00+ years", sub: "Clinical experience" },
            { icon: Users, label: "000+ clients", sub: "Guided to recovery" },
            { icon: Leaf, label: "00 acres", sub: "Private grounds" },
            { icon: HeartHandshake, label: "00% aftercare", sub: "Continued support" },
          ].map(({ icon: Icon, label, sub }) => (
            <li key={label} className="flex min-w-0 items-start gap-3">
              <Icon className="mt-0.5 size-[1.0625rem] shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em]">{label}</span>
                <span className="block text-xs text-muted-foreground">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────── Treatment */

const PROGRAMMES = [
  { icon: ShieldCheck, title: "Medically assisted detox", href: "/detox/" },
  { icon: Sparkles, title: "Residential rehabilitation", href: "/rehab-treatment/" },
  { icon: Users, title: "Group & 1:1 therapy", href: "/rehab-programme/" },
  { icon: Leaf, title: "Wellbeing & holistic therapy", href: "/rehab-programme/holistic-therapy/" },
  { icon: HeartHandshake, title: "Family programme", href: "/rehab-programme/family-support/" },
  { icon: CalendarCheck, title: "Structured aftercare", href: "/rehab-treatment/aftercare/" },
];

export function Treatment() {
  return (
    <section id="treatment" className="section-x mx-auto max-w-7xl py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHead
          eyebrow="Treatment"
          title="A programme built around the whole person"
          intro={LOREM}
        />
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
          <a href="/rehab-treatment/">
            All treatment options <ArrowRight className="size-4" aria-hidden />
          </a>
        </Button>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {PROGRAMMES.map(({ icon: Icon, title, href }) => (
          <li key={title}>
            <a
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-medium leading-snug">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2">
                Learn more <ArrowRight className="size-4" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ──────────────────────────────────── Facility */

export function Facility() {
  return (
    <section id="facility" className="bg-secondary/50 py-20 sm:py-28">
      <div className="section-x mx-auto max-w-7xl">
        <SectionHead eyebrow="Our facility" title="A calm, private place to recover" intro={LOREM} />

        <div className="mt-10 grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-4">
          <ImagePlaceholder
            letter="B"
            note="Facility main — entrance, lounge, or garden"
            className="aspect-[4/3] rounded-3xl sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[30rem]"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
            <ImagePlaceholder
              letter="C"
              note="Bedroom — en-suite"
              className="aspect-square rounded-2xl lg:aspect-[4/3]"
            />
            <ImagePlaceholder
              letter="D"
              note="Therapy space or grounds"
              className="aspect-square rounded-2xl lg:aspect-[4/3]"
            />
          </div>
        </div>

        {/* Editorial amenity list */}
        <div className="mt-12 grid gap-0 border-t border-border/60 sm:grid-cols-3">
          {[
            { title: "En-suite rooms", desc: LOREM },
            { title: "Private grounds", desc: LOREM },
            { title: "Chef-prepared meals", desc: LOREM },
          ].map(({ title, desc }, i) => (
            <div
              key={title}
              className={cn(
                "py-8",
                i > 0 && "border-t border-border/60 sm:border-l sm:border-t-0 sm:pl-8"
              )}
            >
              <span className="inline-block h-0.5 w-6 rounded-full bg-primary" aria-hidden />
              <h3 className="mt-4 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="/about/contact/">Arrange a visit</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="/about/virtual-facility-tour/">
              Virtual facility tour <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────── Admissions */

const STEPS = [
  "Confidential first call",
  "Clinical assessment",
  "Arrival & detox planning",
  "Therapy programme",
  "Aftercare & alumni",
];

export function Admissions() {
  return (
    <section id="admissions" className="section-x mx-auto max-w-7xl py-20 sm:py-28">
      <SectionHead
        eyebrow="Admissions"
        title="Getting started takes one phone call"
        intro={LOREM}
        align="center"
      />

      <ol className="relative mt-14 grid gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-4">
        {/* Connecting line — desktop only */}
        <div
          aria-hidden
          className="absolute left-[1.1875rem] top-[1.1875rem] hidden h-px w-[calc(100%-2.375rem)] bg-border lg:block"
        />

        {STEPS.map((step, i) => (
          <li key={step} className="relative flex gap-5 lg:block">
            <div className="flex shrink-0 flex-col items-center lg:flex-row lg:items-start">
              <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-4 ring-background">
                {i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="mt-1 w-px flex-1 bg-border lg:hidden" />
              )}
            </div>
            <div className="min-w-0 pb-2 lg:mt-6 lg:pr-3">
              <h3 className="text-[1.0625rem] font-medium leading-snug">{step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 text-center">
        <Button asChild variant="cta" size="lg">
          <a href="/admissions/">
            <Phone aria-hidden /> Start your admissions today
          </a>
        </Button>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────── Team */

const TEAM = [
  { letter: "E", role: "Placeholder role" },
  { letter: "F", role: "Placeholder role" },
  { letter: "G", role: "Placeholder role" },
];

export function Team() {
  return (
    <section id="team" className="bg-secondary/50 py-20 sm:py-28">
      <div className="section-x mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHead eyebrow="Our team" title="Led by experienced clinicians" intro={LOREM} />
          <a
            href="/about/our-team/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Meet the team <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <li
              key={m.letter}
              className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:ring-border hover:shadow-[var(--shadow-lift)]"
            >
              <div className="overflow-hidden">
                <ImagePlaceholder
                  letter={m.letter}
                  note="Team portrait"
                  className="aspect-[3/2] rounded-none transition-transform duration-500 group-hover:scale-[1.03] sm:aspect-[4/5]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium">Name Placeholder</h3>
                <p className="eyebrow mt-1.5">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────── Family and aftercare */

export function FamilyAftercare() {
  return (
    <section
      id="family"
      className="section-x mx-auto max-w-7xl space-y-20 py-20 sm:space-y-24 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ImagePlaceholder
          letter="H"
          note="Family session or family lounge"
          className="aspect-[3/2] rounded-2xl lg:aspect-[4/3]"
        />
        <div>
          <SectionHead eyebrow="Family support" title="Recovery involves the whole family" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
            {LOREM_LONG}
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
            <a href="/rehab-programme/family-support/">Family support programme</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ImagePlaceholder
          letter="I"
          note="Aftercare — group support or 1:1 session"
          className="aspect-[3/2] rounded-2xl lg:order-2 lg:aspect-[4/3]"
        />
        <div className="lg:order-1">
          <SectionHead eyebrow="Aftercare" title="Support that continues after you leave" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
            {LOREM_LONG}
          </p>
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
      </div>
    </section>
  );
}

/* ─────────────────────────────── Testimonials */

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
      "The care I received at Oasis Bradford genuinely changed my life. The team made me feel safe from day one and supported me every step of the way.",
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
    <section className="bg-deep py-20 text-deep-foreground sm:py-28">
      <div className="section-x mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-deep-foreground/60">Client stories</p>
            <h2 className="mt-4 max-w-xl text-[2rem] leading-[1.1] sm:text-[2.625rem] lg:text-[3rem]">
              What people say about Oasis
            </h2>
          </div>
          <a
            href="/reviews/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-deep-foreground/60 transition-colors hover:text-deep-foreground hover:underline sm:inline-flex"
          >
            All reviews <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">

          {/* Doctify */}
          <div className="overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3.5">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-400">
                Verified by Doctify
              </span>
            </div>
            <div className="p-2">
              <DoctifyWidget />
            </div>
          </div>

          {/* Own reviews */}
          <div className="flex flex-col rounded-2xl border border-deep-foreground/15 bg-deep-foreground/5 p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-deep-foreground/40">
                From our residents
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
            </div>

            <blockquote className="mt-7 flex-1">
              <p className="text-[1.125rem] leading-relaxed text-deep-foreground/85 sm:text-xl">
                &ldquo;{OWN_REVIEWS[active]!.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{OWN_REVIEWS[active]!.author}</p>
                <p className="text-xs text-deep-foreground/45">{OWN_REVIEWS[active]!.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="grid h-9 w-9 place-items-center rounded-full border border-deep-foreground/20 text-deep-foreground/60 transition-colors hover:border-deep-foreground/40 hover:text-deep-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="grid h-9 w-9 place-items-center rounded-full border border-deep-foreground/20 text-deep-foreground/60 transition-colors hover:border-deep-foreground/40 hover:text-deep-foreground"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-1.5">
              {OWN_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={cn(
                    "h-1 rounded-full transition-all duration-200",
                    i === active
                      ? "w-6 bg-primary"
                      : "w-1 bg-deep-foreground/25 hover:bg-deep-foreground/40"
                  )}
                />
              ))}
            </div>

            <a
              href="/reviews/"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Read all reviews <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────── FAQ */

export function Faq() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="section-x mx-auto max-w-3xl">
      <SectionHead eyebrow="FAQs" title="Common questions" align="center" />
      <Accordion type="single" collapsible className="mt-12 divide-y divide-border/60">
        {[
          "How long does treatment last?",
          "Is treatment confidential?",
          "How much does it cost?",
          "Can family visit?",
          "Do you accept private insurance?",
        ].map((q) => (
          <AccordionItem key={q} value={q} className="border-none">
            <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:text-lg">
              {q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {LOREM_LONG}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 border-t border-border/60 pt-8 text-center">
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

/* ─────────────────────────────────── Resources */

export function Resources() {
  return (
    <section id="resources" className="bg-secondary/50 py-20 sm:py-28">
      <div className="section-x mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHead eyebrow="Resources" title="Guides and articles" />
          <a
            href="/blog/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {["J", "K", "L"].map((letter) => (
            <li
              key={letter}
              className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="overflow-hidden">
                <ImagePlaceholder
                  letter={letter}
                  note="Article"
                  className="aspect-[16/9] rounded-none transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <p className="eyebrow">Category · 0 min read</p>
                <h3 className="mt-3 text-xl leading-snug">Article heading placeholder</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read article <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 sm:hidden">
          <a
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All blog posts <ArrowRight className="size-4" aria-hidden />
          </a>
          <span className="text-muted-foreground">·</span>
          <a
            href="/help-guides/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Help guides <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 90-day promise */

const PROMISE_INCLUSIONS = [
  "Medically managed detox included",
  "Evidence-based group and individual therapy",
  "Dedicated key worker assigned to you",
  "Structured aftercare plan on leaving",
];

export function NinetyDayPromise() {
  return (
    <section id="promise" className="bg-deep py-20 text-deep-foreground sm:py-28">
      <div className="section-x mx-auto max-w-7xl grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-14">

        <div className="flex flex-col justify-center">
          <p className="eyebrow text-deep-foreground/60">The UKAT 90-day promise</p>
          <h2 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.625rem] lg:text-[3rem]">
            90 days of treatment.{" "}
            <span className="text-primary">A lifetime of recovery.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-deep-foreground/70 sm:text-[1.0625rem]">
            Lasting change takes time. That's why we recommend our 90-day residential
            programme — a structured combination of medically managed detox,
            evidence-based therapies, and one-to-one support designed to lay the
            foundation for lifelong sobriety.
          </p>
          <p className="mt-4 text-base leading-relaxed text-deep-foreground/70 sm:text-[1.0625rem]">
            And because we believe in what we do, we stand behind it with a written
            guarantee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
              <Phone className="size-4" aria-hidden />
              Start your recovery today
            </button>
            <a
              href="/rehab-treatment/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-deep-foreground/20 px-6 py-3 text-sm font-semibold text-deep-foreground transition-colors hover:bg-deep-foreground/10 sm:w-auto"
            >
              View our programmes
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary px-7 py-9 text-primary-foreground sm:px-9 sm:py-11">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-4 select-none text-[9rem] font-black leading-none tracking-tight opacity-[0.12] sm:text-[11rem]"
          >
            90
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
            <Medal className="size-3.5" aria-hidden />
            Written guarantee
          </span>

          <p className="mt-5 text-lg font-medium leading-snug sm:text-xl">
            Complete 90 days. If you relapse within 30 days of leaving, we'll
            welcome you back for a complimentary 28-day return stay.
          </p>

          <div className="my-6 h-px bg-primary-foreground/20" />

          <ul className="space-y-3.5">
            {PROMISE_INCLUSIONS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-foreground/15">
                  <Check className="size-3" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 text-xs leading-relaxed opacity-90">
            Applicable to clients who complete the full 90-day inpatient programme
            at Oasis Recovery Bradford. Subject to clinical assessment on return.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────── Contact */

export function Contact() {
  return (
    <section id="contact" className="bg-sand py-20 sm:py-28">
      <div className="section-x mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Contact"
            title="Talk to our admissions team today"
            intro={LOREM_LONG}
          />
          <ul className="mt-8 space-y-4">
            {[
              { icon: Phone, label: "Placeholder phone number", sub: "Available now" },
              { icon: Clock, label: "Open 24 hours, 7 days", sub: "Including evenings and weekends" },
              { icon: MapPin, label: "Placeholder address, Bradford", sub: "West Yorkshire" },
              { icon: ShieldCheck, label: "All enquiries are confidential", sub: "No obligation, no pressure" },
            ].map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-medium">{label}</span>
                  <span className="block text-xs text-muted-foreground">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-xl font-medium">Request a callback</h3>
          <p className="mt-1 text-sm text-muted-foreground">Completely confidential. No obligation.</p>

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
          <p className="mt-3 text-xs text-muted-foreground">{LOREM}</p>
        </form>
      </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── Footer */

const FOOTER_COLS = [
  {
    title: "Treatment",
    links: [
      { label: "Detox", href: "/detox/" },
      { label: "Residential rehab", href: "/rehab-treatment/" },
      { label: "Therapy programmes", href: "/rehab-programme/" },
      { label: "Aftercare", href: "/rehab-treatment/aftercare/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our facility", href: "/about/facilities/" },
      { label: "Our team", href: "/about/our-team/" },
      { label: "Admissions", href: "/admissions/" },
      { label: "Fees & funding", href: "/rehab-treatment/cost-alcohol-drug-rehab/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Family support", href: "/rehab-programme/family-support/" },
      { label: "Help guides", href: "/help-guides/" },
      { label: "Contact us", href: "/about/contact/" },
      { label: "Reviews", href: "/reviews/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sand pb-24 lg:pb-0">
      <div className="section-x mx-auto max-w-7xl py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/">
              <img
                src="https://www.oasisrecovery.org.uk/wp-content/uploads/2024/08/ORB-logo.jpg"
                alt="Oasis Recovery Bradford"
                className="h-9 w-auto object-contain mix-blend-multiply"
              />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
            <a
              href="/cqc-report/"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <ShieldCheck className="size-3.5" aria-hidden />
              CQC registered provider
            </a>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © Oasis Recovery Bradford. Lorem ipsum dolor sit amet.
          </p>
          <p className="text-xs text-muted-foreground">
            Part of the{" "}
            <a href="https://www.ukat.co.uk/" className="underline hover:text-foreground">
              UKAT group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────── Mobile sticky action */

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="cta" size="lg">
          <a href="#contact">
            <Phone aria-hidden /> Call now
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#contact">Enquire</a>
        </Button>
      </div>
    </div>
  );
}
