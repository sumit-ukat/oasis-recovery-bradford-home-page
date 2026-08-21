import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Wine,
  Pill,
  Brain,
  Stethoscope,
  Sparkles,
  Sunrise,
  Utensils,
  Moon,
  MessageCircle,
  Car,
  TrainFront,
  Banknote,
  Clock,
  Building2,
  Compass,
  Zap,
  Syringe,
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
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   SHARED IMAGES, DATA & HELPERS
═══════════════════════════════════════════════════════════ */

const CDN = "https://cdn.rehabfiles.com/sites";
const F = (name: string) => `${CDN}/ukat/wp-content/uploads/2016/10/${name}`;
const IMGS = {
  hero:      `${CDN}/oasisorg/wp-content/uploads/2017/07/bradford_banner.jpg`,
  therapy:   F("oasis_bradfords-143.jpg"),
  wide:      `${CDN}/oasisorg/wp-content/uploads/2017/07/bradford_banner.jpg`,
  bedroom:   F("oasis_bradfords-055.jpg"),
  lounge:    F("oasis_bradfords-096.jpg"),
  reception: F("oasis_bradfords-013.jpg"),
  tom:       `${CDN}/oasisorg/wp-content/uploads/2017/07/Tom-H-Braadford.jpg`,
  durrani:   `${CDN}/oasisrecoverycom/wp-content/uploads/2023/02/dr-durrani.jpg`,
  family:    F("oasis_bradfords-185.jpg"),
  aftercare: F("oasis_bradfords-196.jpg"),
  article1:  F("oasis_bradfords-253.jpg"),
  article2:  F("oasis_bradfords-266.jpg"),
  article3:  F("oasis_bradfords-289.jpg"),
} as const;

/**
 * Business-approved starting price — set to null until UKAT/Oasis admissions
 * confirm the real figure. Never hardcode an invented number here.
 */
const STARTING_PRICE: number | null = null;

/* Small horizontal-scroll helpers, shared by every mobile carousel
   (Addictions, Facility gallery, Resources). Native scroll-snap — no
   carousel library, so it stays light and works with touch out of the box. */

function useSnapIndex(ref: React.RefObject<HTMLDivElement | null>) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      // Track the leading (leftmost) snapped item rather than the item nearest
      // the viewport centre — with 2+ items visible at once (desktop), a
      // centre-based match points at the 2nd item even at scrollLeft 0.
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - el.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref]);
  return index;
}

function scrollToChild(ref: React.RefObject<HTMLDivElement | null>, i: number) {
  const el = ref.current;
  if (!el) return;
  const child = el.children[i] as HTMLElement | undefined;
  if (!child) return;
  el.scrollTo({
    left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
    behavior: "smooth",
  });
}

/* Compact pill link — lets the detox and rehab hubs carry a lot of
   internal links without the section turning into a wall of bullets. */
function LinkChip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-[0.8125rem] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   1 — HERO
   "What is Oasis, where is it, and how can I get help?"
═══════════════════════════════════════════════════════════ */

const TRUST_ROW = [
  { icon: ShieldCheck, label: "CQC regulated" },
  { icon: Check, label: "Confidential admissions" },
  { icon: Clock, label: "Admissions team available 24/7" },
  { icon: Users, label: "Part of the UKAT group" },
  { icon: HeartHandshake, label: "Aftercare included" },
];

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
            Private Addiction Rehab in Bradford, West Yorkshire
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-lg">
            Oasis Recovery is a CQC-regulated residential addiction treatment centre in
            Bradford, part of the UKAT group. We provide confidential medical detox,
            residential rehabilitation and structured aftercare for adults affected by
            alcohol and drug addiction.
          </p>

          <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap sm:items-center">
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <a href="#contact">
                <Phone aria-hidden /> Speak to admissions
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="tel:+442038161576">
                <Phone aria-hidden className="size-4" /> Call us — lines open 24/7
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <img
            src={IMGS.hero}
            alt="Oasis Recovery Bradford residential treatment centre"
            className="aspect-[4/3] rounded-2xl shadow-[var(--shadow-lift)] sm:aspect-[16/9] lg:aspect-[5/4] lg:rounded-3xl w-full object-cover"
          />
        </div>
      </div>

      {/* Authority trust bar — dark navy for premium credibility */}
      <div className="bg-deep">
        <ul className="section-x mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 py-4 sm:justify-between sm:gap-y-0">
          {TRUST_ROW.map(({ icon: Icon, label }) => (
            <li key={label} className="flex min-w-0 items-center gap-2">
              <Icon className="size-4 shrink-0 text-primary/60" aria-hidden />
              <span className="text-[0.8125rem] font-medium leading-snug text-deep-foreground/75 sm:text-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2 — OASIS RECOVERY TREATMENT CENTRE
   "What is Oasis Recovery actually like as a treatment centre?"
   (Merges About Oasis / Why Choose Oasis / Philosophy — one section only)
═══════════════════════════════════════════════════════════ */

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Personalised care",
    desc: "Treatment informed by each individual's circumstances, substance history and recovery needs — not a fixed programme applied to everyone.",
  },
  {
    icon: Building2,
    title: "Supportive residential setting",
    desc: "A structured, private environment in Bradford, away from the everyday pressures and triggers that can make recovery harder.",
  },
  {
    icon: Stethoscope,
    title: "Experienced professionals",
    desc: "Clinical, therapeutic and recovery-support staff working together throughout your stay, from admission onward.",
  },
  {
    icon: Compass,
    title: "Long-term recovery focus",
    desc: "Care intended to prepare residents for life after treatment, not just to manage the days spent with us.",
  },
];

export function TreatmentCentre() {
  return (
    <section id="centre" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        {/* Editorial intro — heading and body copy share the full width, so
            there is real room for the story rather than a narrow column. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-primary/70">Oasis Recovery Bradford</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              A supportive residential treatment centre in Bradford
            </h2>
          </div>

          <div className="mt-6 lg:mt-0">
            <p className="text-[1.0625rem] leading-relaxed text-foreground/80 sm:text-lg">
              Oasis Recovery is a private residential addiction treatment centre in
              Bradford, West Yorkshire, and part of the UKAT group — one of the UK's
              established addiction treatment providers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We offer a calm, dignified setting where people can step away from daily
              life and focus fully on recovery, supported by a personalised programme
              of clinical and therapeutic care. Residents live on site for the duration
              of their treatment, with the clinical team, therapy timetable and everyday
              support all under one roof.
            </p>
          </div>
        </div>

        {/* Wide image band — the centre shown at full width rather than tucked
            into a sidebar. */}
        <img
          src={IMGS.therapy}
          alt="Therapy room at Oasis Recovery Bradford"
          className="mt-12 aspect-[16/10] w-full rounded-3xl object-cover sm:aspect-[2/1] lg:mt-14 lg:aspect-[21/9]"
        />

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-12">
          {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-[1.15rem]" aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-medium leading-snug sm:text-[1.125rem]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            More on our history as part of UKAT, our clinical approach and the standards
            we are regulated against.
          </p>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto sm:shrink-0">
            <a href="/about/">
              Discover Oasis Recovery <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3 — ADDICTIONS WE TREAT (topic hub #1)
   "Can Oasis help with the addiction affecting me or my loved one?"
═══════════════════════════════════════════════════════════ */

/* Information pages about the addiction itself — how it develops, the signs
   and its effects. Treatment options live in the rehab hub further down, so
   these deliberately point at /addiction/, never /rehab-treatment/. */
const ADDICTIONS = [
  { icon: Wine,        label: "Alcohol addiction",             href: "/addiction/alcohol/",           desc: "How problem drinking turns into dependency, the signs to look for and the effects of long-term alcohol use." },
  { icon: Pill,        label: "Drug addiction",                href: "/addiction/drug/",              desc: "Dependency across stimulants, opioids, cannabis and other substances, and how each one takes hold." },
  { icon: Zap,         label: "Cocaine addiction",             href: "/addiction/drug/cocaine/",      desc: "Why cocaine and crack cocaine are so habit-forming, and the physical and psychological toll they take." },
  { icon: Syringe,     label: "Heroin addiction",              href: "/addiction/drug/heroin/",       desc: "Understanding opioid dependency, rising tolerance and the risks that come with continued use." },
  { icon: Leaf,        label: "Cannabis addiction",            href: "/addiction/drug/cannabis/",     desc: "Why cannabis dependency is often underestimated, and how heavy use affects mental health." },
  { icon: Stethoscope, label: "Prescription drug addiction",   href: "/addiction/prescription-drug/", desc: "Dependency on opioids, benzodiazepines, sleeping pills and other medication that began as a prescription." },
  { icon: Brain,       label: "Behavioural addictions",        href: "/addiction/behavioural/",       desc: "Gambling, gaming, sex and love, shopping and other compulsive behaviours that follow the same patterns." },
  { icon: ShieldCheck, label: "Dual diagnosis",                href: "/dual-diagnosis/",              desc: "When addiction sits alongside a mental health condition such as anxiety, depression, PTSD or ADHD." },
];

export function AddictionsHub() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="addictions" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow">What we treat</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Addictions we treat at Oasis
            </h2>
          </div>
          <div className="mt-5 lg:mt-0">
            <p className="text-base leading-relaxed text-muted-foreground">
              We treat alcohol and drug addiction, behavioural addictions and dual
              diagnosis at our Bradford facility. Each page below explains how that
              addiction develops, the signs to look for and the effects it can have.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The treatment itself — detox and residential rehabilitation — is covered
              in the{" "}
              <a href="#detox" className="font-medium text-primary hover:underline">
                detox
              </a>{" "}
              and{" "}
              <a href="#rehab" className="font-medium text-primary hover:underline">
                rehab
              </a>{" "}
              sections below.
            </p>
          </div>
        </div>

        {/* Contextual content block — sits between the intro and the card
            grid, giving room for key statements about treatment scope. */}
        <div className="mt-10 rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
          <p className="text-[1.0625rem] leading-relaxed text-foreground/80">
            Understanding the nature of the addiction — how it started, what
            sustains it, and the effect it has had — forms part of the clinical
            assessment that shapes each resident's treatment plan. The pages below
            are an independent resource: they do not require you to have already
            decided on treatment.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Addiction is a clinical condition, not a lifestyle choice. It changes the
            brain's reward and motivation systems in ways that make stopping
            difficult without appropriate support. That is why residential treatment —
            structured, supported and away from everyday triggers — produces better
            long-term outcomes than attempting recovery alone.
          </p>
        </div>

        {/* Mobile: swipeable rail, ~86% width with next card peeking in */}
        <div
          ref={scrollerRef}
          className="no-scrollbar mt-10 -mx-5 flex gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 snap-x snap-mandatory sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0"
        >
          {ADDICTIONS.map(({ icon: Icon, label, href, desc }) => (
            <a
              key={label}
              href={href}
              className="group flex w-[86vw] shrink-0 snap-start flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:w-[340px] lg:w-auto"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-medium leading-snug">{label}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read about {label.toLowerCase()}{" "}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/addiction/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All addiction information <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4 — MEDICAL DETOX (topic hub #2)
   "How can someone safely stop using alcohol or drugs?"
═══════════════════════════════════════════════════════════ */

/* Two detox pathways, each with its own set of pages — gives the section room
   to carry the full detox link set instead of a six-item sample. */
const DETOX_GROUPS = [
  {
    icon: Wine,
    title: "Alcohol detox",
    href: "/detox/alcohol/",
    cta: "Explore alcohol detox",
    desc: "Alcohol withdrawal can be medically serious, and is the reason unsupervised home detox is discouraged. It is managed here under clinical supervision from day one.",
    linksLabel: "Alcohol detox guides",
    links: [
      { label: "What to expect", href: "/detox/alcohol/what-to-expect/" },
      { label: "Withdrawal timeline", href: "/detox/alcohol/withdrawal-timeline/" },
      { label: "Detox medications", href: "/detox/alcohol/medications/" },
      { label: "Risks of home detox", href: "/blog/home-detox-risks/" },
      { label: "Managing cravings", href: "/blog/managing-cravings/" },
      { label: "Detox vs rehab", href: "/blog/detox-vs-rehab/" },
    ],
  },
  {
    icon: Pill,
    title: "Drug detox",
    href: "/detox/drug/",
    cta: "Explore drug detox",
    desc: "Withdrawal differs substantially between substances — in how long it lasts, how it feels and what medical support it calls for. Every resident is assessed individually first.",
    linksLabel: "Detox by substance",
    links: [
      { label: "Heroin", href: "/detox/drug/heroin/" },
      { label: "Cocaine", href: "/detox/drug/cocaine/" },
      { label: "Crack cocaine", href: "/detox/drug/crack-cocaine/" },
      { label: "Cannabis", href: "/detox/drug/cannabis/" },
      { label: "Ketamine", href: "/detox/drug/ketamine/" },
      { label: "Crystal meth", href: "/detox/drug/crystal-meth/" },
      { label: "Ecstasy", href: "/detox/drug/ecstasy/" },
      { label: "Spice", href: "/detox/drug/spice/" },
      { label: "LSD", href: "/detox/drug/lsd/" },
    ],
  },
];

export function DetoxHub() {
  return (
    <section id="detox" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow">Withdrawal management</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Medically supported detox
            </h2>
          </div>
          <div className="mt-5 lg:mt-0">
            <p className="text-base leading-relaxed text-muted-foreground">
              Detox is the process of safely managing withdrawal from alcohol or drugs
              under clinical supervision. What a person needs from detox varies — which
              is why every resident receives a clinical assessment before any withdrawal
              plan begins.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For some substances, unsupervised withdrawal carries real medical risk.
              Appropriate medical support makes it considerably safer and more
              manageable than attempting it alone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              At Oasis, detox is managed on site by our clinical team. Residents are
              monitored throughout, medication is prescribed where appropriate, and the
              withdrawal plan is adjusted based on how each individual is responding —
              not run as a fixed protocol.
            </p>
          </div>
        </div>

        <img
          src={IMGS.reception}
          alt="Clinical reception area at Oasis Recovery Bradford"
          className="mt-10 aspect-[21/9] w-full rounded-2xl object-cover lg:mt-12"
        />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          {DETOX_GROUPS.map(({ icon: Icon, title, href, cta, desc, linksLabel, links }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-[1.15rem]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.1875rem] font-medium leading-snug">
                    <a href={href} className="transition-colors hover:text-primary">
                      {title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>

              <p className="eyebrow mt-7 text-[0.625rem]">{linksLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {links.map((l) => (
                  <LinkChip key={l.label} href={l.href}>
                    {l.label}
                  </LinkChip>
                ))}
              </div>

              <a
                href={href}
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {cta}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto sm:shrink-0">
            <a href="/detox/">
              Explore medical detox <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Not sure which applies, or whether detox is needed at all? Our admissions
            team can talk it through before any commitment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5 — REHAB TREATMENT (topic hub #3)
   "How does rehabilitation help someone build long-term recovery?"
═══════════════════════════════════════════════════════════ */

const DRUG_REHAB_CHIPS = [
  { label: "Crack cocaine rehab",  href: "/rehab-treatment/drug/crack-cocaine/" },
  { label: "Crystal meth rehab",   href: "/rehab-treatment/drug/crystal-meth/" },
  { label: "Ecstasy rehab",        href: "/rehab-treatment/drug/ecstasy/" },
  { label: "Ketamine rehab",       href: "/rehab-treatment/drug/ketamine/" },
  { label: "LSD rehab",            href: "/rehab-treatment/drug/lsd/" },
  { label: "Spice rehab",          href: "/rehab-treatment/drug/spice/" },
  { label: "Aftercare",            href: "/rehab-treatment/aftercare/" },
  { label: "Cost of rehab",        href: "/rehab-treatment/cost-alcohol-drug-rehab/" },
];

const REHAB_PATHS = [
  {
    label: "Alcohol rehab",
    href: "/rehab-treatment/alcohol/",
    desc: "Residential inpatient treatment for alcohol dependency, following detox where one is needed.",
  },
  {
    label: "Drug rehab",
    href: "/rehab-treatment/drug/",
    desc: "Structured rehabilitation across stimulants, opioids, cannabis and other substances.",
  },
  {
    label: "Cocaine rehab",
    href: "/rehab-treatment/drug/cocaine/",
    desc: "Treatment for cocaine and crack cocaine dependency and the patterns that sustain it.",
  },
  {
    label: "Heroin rehab",
    href: "/rehab-treatment/drug/heroin/",
    desc: "Rehabilitation for opioid dependency, with clinical oversight throughout the stay.",
  },
  {
    label: "Cannabis rehab",
    href: "/rehab-treatment/drug/cannabis/",
    desc: "Treatment for cannabis dependency alongside any co-occurring mental health needs.",
  },
  {
    label: "Secondary care programme",
    href: "/rehab-treatment/secondary-care-programme/",
    desc: "A bridge between residential rehab and independent living, for those who want longer support.",
  },
];

/* Real therapy pages — the programme is assembled from these per resident. */
const THERAPIES = [
  { label: "CBT",                href: "/rehab-programme/cbt/" },
  { label: "DBT",                href: "/rehab-programme/dbt/" },
  { label: "EMDR",               href: "/rehab-programme/emdr/" },
  { label: "Individual therapy", href: "/rehab-programme/individual-therapy/" },
  { label: "Group therapy",      href: "/rehab-programme/group-therapy/" },
  { label: "Family therapy",     href: "/rehab-programme/family-therapy/" },
  { label: "Trauma therapy",     href: "/rehab-programme/trauma-therapy/" },
  { label: "Psychotherapy",      href: "/rehab-programme/psychotherapy/" },
  { label: "Holistic therapy",   href: "/rehab-programme/holistic-therapy/" },
  { label: "Mindfulness",        href: "/rehab-programme/mindfulness-therapy/" },
  { label: "Art therapy",        href: "/rehab-programme/art-therapy/" },
  { label: "Music therapy",      href: "/rehab-programme/music-therapy/" },
  { label: "Yoga therapy",       href: "/rehab-programme/yoga-therapy/" },
  { label: "Meditation",         href: "/rehab-programme/meditation/" },
  { label: "Nutrition",          href: "/rehab-programme/nutrition/" },
  { label: "Rehab fitness",      href: "/rehab-programme/rehab-fitness/" },
];

export function RehabHub() {
  return (
    <section id="rehab" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow">Structured recovery treatment</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Residential rehab for lasting recovery
            </h2>
          </div>
          <div className="mt-5 lg:mt-0">
            <p className="text-base leading-relaxed text-muted-foreground">
              Where detox stabilises the body, rehabilitation is the structured,
              longer-term treatment that helps residents understand their addiction and
              build the tools to stay in recovery.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our residential programme combines one-to-one and group therapy with
              practical relapse-prevention work and wellbeing support, tailored to
              each resident's circumstances and treatment needs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
          {/* Image anchor + primary route into the treatment pages */}
          <div className="flex flex-col gap-5">
            <img
              src={IMGS.lounge}
              alt="Communal lounge used for group therapy at Oasis Recovery Bradford"
              className="aspect-[4/3] w-full rounded-2xl object-cover lg:min-h-0 lg:flex-1"
            />
            <Button asChild variant="outline" size="lg" className="w-full bg-card">
              <a href="/rehab-treatment/">
                Explore residential rehab <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>

          {/* Treatment pages as full-width rows — each one clearly a link */}
          <div>
            <p className="eyebrow text-primary/70">Rehab treatment programmes</p>
            <ul className="mt-3">
              {REHAB_PATHS.map(({ label, href, desc }) => (
                <li key={label} className="border-b border-border/50 last:border-b-0">
                  <a href={href} className="group flex items-center gap-5 py-4 sm:py-[1.15rem]">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.0625rem] font-medium leading-snug transition-colors group-hover:text-primary">
                        {label}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-border/50 pt-5">
              <p className="eyebrow text-[0.625rem]">More rehab & support pages</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DRUG_REHAB_CHIPS.map((c) => (
                  <LinkChip key={c.label} href={c.href}>
                    {c.label}
                  </LinkChip>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6 — THERAPIES
   "What therapies will I actually have access to?"
═══════════════════════════════════════════════════════════ */

const THERAPY_GROUPS = [
  {
    title: "Talking & psychological therapies",
    desc: "Evidence-based approaches that help residents understand their addiction, address underlying causes and develop coping strategies.",
    therapies: [
      { label: "CBT",                href: "/rehab-programme/cbt/" },
      { label: "DBT",                href: "/rehab-programme/dbt/" },
      { label: "EMDR",               href: "/rehab-programme/emdr/" },
      { label: "Individual therapy", href: "/rehab-programme/individual-therapy/" },
      { label: "Group therapy",      href: "/rehab-programme/group-therapy/" },
      { label: "Family therapy",     href: "/rehab-programme/family-therapy/" },
      { label: "Trauma therapy",     href: "/rehab-programme/trauma-therapy/" },
      { label: "Psychotherapy",      href: "/rehab-programme/psychotherapy/" },
    ],
  },
  {
    title: "Holistic & wellbeing therapies",
    desc: "Complementary approaches that support physical recovery, reduce stress and build resilience alongside the core therapeutic programme.",
    therapies: [
      { label: "Holistic therapy",   href: "/rehab-programme/holistic-therapy/" },
      { label: "Mindfulness",        href: "/rehab-programme/mindfulness-therapy/" },
      { label: "Art therapy",        href: "/rehab-programme/art-therapy/" },
      { label: "Music therapy",      href: "/rehab-programme/music-therapy/" },
      { label: "Yoga therapy",       href: "/rehab-programme/yoga-therapy/" },
      { label: "Meditation",         href: "/rehab-programme/meditation/" },
      { label: "Nutrition",          href: "/rehab-programme/nutrition/" },
      { label: "Rehab fitness",      href: "/rehab-programme/rehab-fitness/" },
    ],
  },
];

export function TherapiesHub() {
  return (
    <section id="therapies" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow">Treatment programmes</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Therapies in your treatment plan
            </h2>
          </div>
          <div className="mt-5 lg:mt-0">
            <p className="text-base leading-relaxed text-muted-foreground">
              No resident follows a fixed schedule. Each timetable is built from a
              combination of evidence-based and holistic therapies, chosen around
              their clinical assessment, substance history and personal recovery needs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The core programme runs alongside individual key-worker sessions and
              group work, with holistic activities woven through the week to support
              overall wellbeing.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2">
          {THERAPY_GROUPS.map(({ title, desc, therapies }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <h3 className="text-[1.125rem] font-medium leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {therapies.map((t) => (
                  <LinkChip key={t.label} href={t.href}>
                    {t.label}
                  </LinkChip>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto sm:shrink-0">
            <a href="/rehab-programme/">
              All therapy programmes <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            Which therapies apply to you is decided during your clinical assessment —
            our admissions team can give you a clearer picture before you arrive.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7 — YOUR RECOVERY JOURNEY
   "What happens after I contact Oasis?" — chronological, not another
   treatment explanation.
═══════════════════════════════════════════════════════════ */

const JOURNEY = [
  {
    num: "01",
    title: "Confidential conversation",
    desc: "Speak privately with our admissions team — no obligation, and everything shared is treated in complete confidence.",
  },
  {
    num: "02",
    title: "Assessment",
    desc: "A clinical assessment to understand the individual's circumstances and treatment requirements.",
  },
  {
    num: "03",
    title: "Admission",
    desc: "Arrival is arranged, initial checks are completed, and treatment begins.",
  },
  {
    num: "04",
    title: "Treatment",
    desc: "The agreed residential programme is followed. Detox may form part of treatment where clinically appropriate.",
    link: { label: "Medical detox", href: "#detox" },
  },
  {
    num: "05",
    title: "Continuing recovery",
    desc: "Preparation for recovery beyond residential treatment, with a plan in place before leaving.",
  },
];

export function RecoveryJourney() {
  return (
    <section id="journey" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Your recovery journey
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Getting started begins with one confidential phone call. Here is what
            happens from that first conversation onward.
          </p>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* Timeline */}
          <ol className="relative space-y-0">
            <div aria-hidden className="absolute left-[1.4375rem] top-6 bottom-6 w-px bg-border/60" />
            {JOURNEY.map(({ num, title, desc, link }) => (
              <li key={num} className="relative flex gap-6 pb-9 last:pb-0">
                <div className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-border">
                  <span className="text-[0.625rem] font-bold tracking-[0.12em] text-primary/60">
                    {num}
                  </span>
                </div>
                <div className="min-w-0 pt-2.5">
                  <h3 className="text-[1.0625rem] font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}{" "}
                    {link && (
                      <a href={link.href} className="font-medium text-primary hover:underline">
                        {link.label} →
                      </a>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Image + CTA (desktop only) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-8">
            <div className="min-h-[160px] flex-1 overflow-hidden rounded-2xl">
              <img
                src={IMGS.reception}
                alt="Reception at Oasis Recovery Bradford"
                className="h-full w-full object-cover"
              />
            </div>
            <Button asChild variant="cta" size="lg" className="w-full">
              <a href="#contact">
                <Phone className="size-4" aria-hidden /> Speak to our admissions team
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 lg:hidden">
          <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
            <a href="#contact">
              <Phone className="size-4" aria-hidden /> Speak to our admissions team
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7 — INSIDE OASIS: FACILITIES & DAILY LIFE
   "What will actually staying at Oasis feel like?"
   (Merges facilities / accommodation / daily life — one section)
═══════════════════════════════════════════════════════════ */

const GALLERY = [
  { src: IMGS.wide,      alt: "Oasis Recovery Bradford — grounds and exterior",  caption: "Grounds & exterior" },
  { src: IMGS.bedroom,   alt: "Private en-suite bedroom at Oasis Bradford",      caption: "Private en-suite bedroom" },
  { src: IMGS.lounge,    alt: "Communal lounge at Oasis Bradford",               caption: "Communal lounge" },
  { src: IMGS.therapy,   alt: "Therapy room at Oasis Bradford",                  caption: "Therapy room" },
  { src: IMGS.reception, alt: "Reception at Oasis Bradford",                     caption: "Reception" },
  { src: IMGS.family,    alt: "Family visit space at Oasis Bradford",            caption: "Family visit space" },
];

const TYPICAL_DAY = [
  { icon: Sunrise,        title: "Morning routine",  desc: "Wake, breakfast and quiet time before the day's programme begins." },
  { icon: MessageCircle,  title: "Therapy",          desc: "Individual or group therapy with the clinical team." },
  { icon: Utensils,       title: "Lunch",            desc: "Chef-prepared meals in the communal dining room." },
  { icon: Users,          title: "Group & individual work", desc: "Continued therapeutic work and key-worker sessions." },
  { icon: Sparkles,       title: "Wellbeing activity",desc: "Physical activity, mindfulness or time in the grounds." },
  { icon: Moon,           title: "Evening reflection",desc: "Peer group and personal time before rest." },
];

function FacilityGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const active = useSnapIndex(scrollerRef);

  return (
    <div>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto scroll-px-5 px-5 pb-1 snap-x snap-mandatory sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:px-0"
        >
          {GALLERY.map((img) => (
            <figure
              key={img.caption}
              className="w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[70%] lg:w-[46%]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Desktop controls */}
        <div className="mt-4 hidden items-center justify-between sm:flex">
          <p className="text-sm text-muted-foreground">
            {GALLERY[active]!.caption} · {active + 1} / {GALLERY.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => scrollToChild(scrollerRef, Math.max(0, active - 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => scrollToChild(scrollerRef, Math.min(GALLERY.length - 1, active + 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: counter + dots only (swipe is primary interaction) */}
      <div className="mt-4 flex items-center justify-between sm:hidden">
        <p className="text-xs text-muted-foreground">
          {GALLERY[active]!.caption} · {active + 1} / {GALLERY.length}
        </p>
        <div className="flex gap-1.5">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToChild(scrollerRef, i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-200",
                i === active ? "w-5 bg-primary" : "w-1 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FacilitiesDailyLife() {
  return (
    <section id="facility" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">Inside Oasis</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Facilities & daily life at Oasis
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Residents stay in private en-suite bedrooms, with access to communal
            lounges, dedicated therapy rooms and landscaped grounds. Every space is
            designed to feel calm, clean and private.
          </p>
        </div>

        <div className="mt-10">
          <FacilityGallery />
        </div>

        {/* Typical day — compact, visual, no separate section */}
        <div className="mt-16 lg:mt-20">
          <p className="eyebrow mb-6">A typical day</p>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {TYPICAL_DAY.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {i < TYPICAL_DAY.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden h-px flex-1 bg-border/70 lg:block"
                    />
                  )}
                </div>
                <h3 className="mt-2.5 text-sm font-medium leading-snug">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="/about/facilities/">
              Explore our facilities <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <a href="/about/virtual-facility-tour/">Take a virtual tour</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8 — MEET THE CLINICAL & RECOVERY TEAM
   "Who will support me during treatment?"
   Staff credentials belong here only.
═══════════════════════════════════════════════════════════ */

const TEAM = [
  {
    img: IMGS.tom,
    name: "Tom Hegarty",
    role: "Lead Therapist",
    bio: "Leads the therapeutic programme at Oasis Bradford, overseeing individual and group therapy throughout residents' treatment.",
  },
  {
    img: IMGS.durrani,
    name: "Dr Mateen Durrani",
    role: "Clinical Nurse Specialist",
    bio: "Provides clinical oversight of medical detox and withdrawal management for residents at Oasis Bradford.",
  },
];

export function Team() {
  return (
    <section id="team" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">Our team</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Meet the clinical & recovery team
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Every resident is supported by clinical, therapeutic and recovery
            professionals working together throughout their stay.
          </p>
        </div>

        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2">
            {TEAM.map((m) => (
              <li key={m.name} className="flex items-start gap-5">
                <img
                  src={m.img}
                  alt={m.name}
                  className="aspect-square w-20 shrink-0 rounded-xl sm:w-24 object-cover"
                />
                <div className="min-w-0 pt-1">
                  <h3 className="text-[1.0625rem] font-medium">{m.name}</h3>
                  <p className="eyebrow mt-1">{m.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
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
            Meet the full Oasis team <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9 — FAMILY SUPPORT
   "What support is available for family members and loved ones?"
═══════════════════════════════════════════════════════════ */

export function FamilySupport() {
  return (
    <section id="family" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <img
            src={IMGS.family}
            alt="Family support session at Oasis Recovery Bradford"
            className="aspect-[4/3] rounded-2xl lg:aspect-[3/2] w-full object-cover"
          />
          <div>
            <p className="eyebrow">Family support</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Family support during treatment
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Addiction affects the whole family, not just the person in treatment.
              Where appropriate, we involve family members through education about
              addiction, guidance on communication, and support for rebuilding trust
              and healthy boundaries at home.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Loved ones don't have to navigate this alone — support is available to
              family members throughout a resident's treatment, and beyond it.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
              <a href="/rehab-programme/family-support/">
                Explore family support <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   10 — RECOVERY BEYOND REHAB
   "What happens when residential treatment finishes?"
   (Merges aftercare / alumni / 90-Day Promise — one section)
═══════════════════════════════════════════════════════════ */

const PROMISE_INCLUSIONS = [
  "Medically managed detox included",
  "Evidence-based individual and group therapy",
  "Dedicated key worker throughout",
  "Structured aftercare plan on leaving",
];

export function RecoveryBeyondRehab() {
  return (
    <section id="recovery-beyond" className="relative overflow-hidden bg-deep py-20 text-deep-foreground sm:py-28 lg:py-36">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-black leading-none tracking-tight text-deep-foreground/[0.035] sm:text-[22rem] lg:-right-16 lg:text-[28rem]"
      >
        90
      </span>

      <div className="section-x relative mx-auto max-w-7xl">
        <p className="eyebrow text-deep-foreground/50">After residential treatment</p>
        <h2 className="mt-4 max-w-2xl text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
          Recovery beyond rehab
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-foreground/65 sm:text-[1.0625rem]">
          Recovery support doesn't stop on discharge day. Aftercare, an ongoing
          recovery community, and our 90-day promise are all designed to protect and
          extend the progress made during treatment.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:mt-16 lg:gap-0 lg:divide-x lg:divide-deep-foreground/15">
          <div className="lg:px-10 lg:first:pl-0">
            <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">Continuing aftercare</h3>
            <p className="mt-3 text-sm leading-relaxed text-deep-foreground/55 sm:text-[0.9375rem]">
              Structured aftercare support continues after residents leave, helping to
              maintain the progress made during residential treatment.
            </p>
            <a
              href="/rehab-treatment/aftercare/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Explore aftercare <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
          <div className="lg:px-10">
            <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">Recovery community</h3>
            <p className="mt-3 text-sm leading-relaxed text-deep-foreground/55 sm:text-[0.9375rem]">
              Former residents can stay connected through our alumni network — peer
              support from people who understand the journey firsthand.
            </p>
            <a
              href="/about/alumni/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Alumni programme <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
          <div className="lg:px-10 lg:last:pr-0">
            <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
              The UKAT <span className="text-primary">90-day promise</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-deep-foreground/55 sm:text-[0.9375rem]">
              We stand behind our residential programme: residents who complete the
              full 90-day inpatient programme are covered by UKAT's written aftercare
              guarantee, subject to clinical assessment on return.
            </p>
          </div>
        </div>

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
      </div>
    </section>
  );
}

/* ─────────────────────────────── Outcomes & Resident Stories (11) */

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

/* ═══════════════════════════════════════════════════════════
   11 — OUTCOMES & RESIDENT STORIES
   "What evidence is there that people trust Oasis?"
═══════════════════════════════════════════════════════════ */

export function Outcomes() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((a) => (a === 0 ? OWN_REVIEWS.length - 1 : a - 1));
  }
  function next() {
    setActive((a) => (a === OWN_REVIEWS.length - 1 ? 0 : a + 1));
  }

  return (
    <section id="outcomes" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary/70">Trust & outcomes</p>
            <h2 className="mt-4 max-w-xl text-[2rem] leading-[1.1] sm:text-[2.625rem] lg:text-[3rem]">
              Outcomes & resident stories
            </h2>
          </div>
          <a
            href="/reviews/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline sm:inline-flex"
          >
            All reviews <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">

          {/* Verified Doctify reviews */}
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                Verified by Doctify
              </span>
            </div>
            <div className="p-2">
              <DoctifyWidget />
            </div>
          </div>

          {/* Swipeable resident/family quotes */}
          <div className="flex flex-col rounded-2xl border border-border/60 bg-secondary/40 p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/70">
                From our residents
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
            </div>

            <blockquote className="mt-7 flex-1">
              <p className="text-[1.125rem] leading-relaxed text-foreground/85 sm:text-xl">
                &ldquo;{OWN_REVIEWS[active]!.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{OWN_REVIEWS[active]!.author}</p>
                <p className="text-xs text-muted-foreground/70">{OWN_REVIEWS[active]!.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
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
                    i === active ? "w-6 bg-primary" : "w-1 bg-border hover:bg-muted-foreground/40",
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

/* ═══════════════════════════════════════════════════════════
   12 — TREATMENT COSTS
   "How much does private treatment at Oasis cost?"
   Strict rule: only a "starting from" figure, never a price list.
═══════════════════════════════════════════════════════════ */

export function Costs() {
  return (
    <section id="costs" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">Investing in recovery</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Private rehab costs at Oasis
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The cost of private treatment depends on factors such as length of
              stay, individual clinical requirements, and the specific programme
              recommended following assessment — so we don't publish a fixed price
              list. What we can tell you upfront:
            </p>

            <div className="mt-7 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
              <p className="text-sm font-medium text-muted-foreground">Treatment prices start from</p>
              <p className="mt-1 text-3xl font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
                {STARTING_PRICE != null
                  ? `£${STARTING_PRICE.toLocaleString("en-GB")}`
                  : "£[starting price to be confirmed]"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our admissions team can provide a personalised treatment quote once
                they understand your circumstances — with no obligation to proceed.
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Treatment is available on a private payment basis, and our admissions
              team can advise on accepted medical insurance where applicable.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                <a href="#contact">Get a personalised treatment quote</a>
              </Button>
              <a
                href="/rehab-treatment/cost-alcohol-drug-rehab/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background sm:w-auto"
              >
                View treatment costs <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <span className="grid aspect-square w-full max-w-xs place-items-center justify-self-end rounded-3xl bg-primary/10">
              <Banknote className="size-16 text-primary/40" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   13 — LOCATION & GETTING TO OASIS
   "Where is Oasis and how can I get there?"
═══════════════════════════════════════════════════════════ */

const ACCESS_POINTS = [
  { icon: Car,        label: "By road",  desc: "Easily reached from across West Yorkshire, with links to the M606 and M62." },
  { icon: TrainFront, label: "By rail",  desc: "Bradford's rail stations connect directly to Leeds and the wider region." },
  { icon: Users,      label: "Collection support", desc: "Our admissions team can advise on transport and collection where needed." },
];

export function Location() {
  return (
    <section id="location" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Getting to Oasis</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Location & getting to Oasis
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Oasis Recovery is based in Bradford, West Yorkshire, with good access
              from across the region, including Leeds and the wider Yorkshire area.
            </p>

            <ul className="mt-8 space-y-5">
              {ACCESS_POINTS.map(({ icon: Icon, label, desc }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <Icon className="mt-0.5 size-[1.0625rem] shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block text-[0.9375rem] font-medium">{label}</span>
                    <span className="block text-sm leading-relaxed text-muted-foreground">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Oasis+Recovery+Bradford"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions to Oasis <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60">
            <iframe
              title="Map showing Oasis Recovery Bradford, West Yorkshire"
              src="https://www.google.com/maps?q=21A+Bolling+Road,+Bradford,+BD4+7BG&output=embed"
              className="h-[320px] w-full sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   14 — ADDICTION & RECOVERY RESOURCES
   "What if I'm still researching and not ready to call?"
═══════════════════════════════════════════════════════════ */

const RESOURCES = [
  { img: IMGS.article1, cat: "Addiction", time: "8 min read", title: "How addiction treatment works" },
  { img: IMGS.article2, cat: "Detox",     time: "6 min read", title: "What happens during detox?" },
  { img: IMGS.article3, cat: "Rehab",     time: "5 min read", title: "How long does rehab last?" },
  { img: IMGS.bedroom,  cat: "Family",    time: "7 min read", title: "How to help someone with an addiction" },
];

export function Resources() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="resources" className="bg-secondary/50 py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Still researching?</p>
            <h2 className="mt-3 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Addiction & recovery resources
            </h2>
          </div>
          <a
            href="/blog/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Explore all recovery resources <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar mt-10 -mx-5 flex gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 snap-x snap-mandatory sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0"
        >
          {RESOURCES.map(({ img, cat, time, title }) => (
            <a
              key={title}
              href="/blog/"
              className="group flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:w-[300px] lg:w-auto"
            >
              <div className="overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="aspect-[16/9] transition-transform duration-500 group-hover:scale-[1.02] w-full object-cover"
                  loading="lazy"
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

        <div className="mt-8 sm:hidden">
          <a href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Explore all recovery resources <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   15 — FREQUENTLY ASKED QUESTIONS
   Fills information gaps — no duplication with dedicated sections above.
═══════════════════════════════════════════════════════════ */

const FAQS = [
  {
    q: "How quickly can I be admitted?",
    a: "Admission timelines depend on bed availability and the outcome of your clinical assessment. Speak to our admissions team for the most accurate timeframe for your situation.",
  },
  {
    q: "Is treatment completely confidential?",
    a: "Yes. Every enquiry and admission is handled in complete confidence, in line with our clinical and data-protection obligations.",
  },
  {
    q: "Can I use my phone during treatment?",
    a: "Phone use is managed as part of the residential programme to support focus on recovery. Our admissions team can explain the current arrangements before you arrive.",
  },
  {
    q: "Can family members visit?",
    a: "Family involvement is encouraged where clinically appropriate. Visiting arrangements are agreed as part of your care plan — see our family support section above for more.",
  },
  {
    q: "What should I bring with me?",
    a: "We provide guidance on what to pack ahead of admission, covering clothing, medication and personal items. Our admissions team will send this through before you arrive.",
  },
  {
    q: "How long might I stay?",
    a: "Length of stay is determined by your clinical assessment and individual treatment needs, and is discussed with you before admission.",
  },
  {
    q: "Can transport be arranged?",
    a: "In some circumstances our admissions team can advise on transport or collection — ask when you call.",
  },
  {
    q: "What happens if I relapse after treatment?",
    a: "Our aftercare and alumni support are there to help residents stay connected to recovery after leaving. If you're worried about relapse, speak to our admissions team.",
  },
];

const FAQ_COL_A = FAQS.slice(0, Math.ceil(FAQS.length / 2));
const FAQ_COL_B = FAQS.slice(Math.ceil(FAQS.length / 2));

function FaqColumn({ items }: { items: typeof FAQS }) {
  return (
    <Accordion type="single" collapsible>
      {items.map(({ q, a }) => (
        <AccordionItem
          key={q}
          value={q}
          className="border-b border-border/50 first:border-t first:border-border/50"
        >
          <AccordionTrigger className="py-5 text-left text-[1.0625rem] font-medium leading-snug hover:no-underline">
            {q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-muted-foreground">
            {a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Questions you may have
            </h2>
          </div>
          <a
            href="/about/questions-and-answers/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all FAQs <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-0 lg:grid-cols-2 lg:gap-x-16">
          <FaqColumn items={FAQ_COL_A} />
          <FaqColumn items={FAQ_COL_B} />
        </div>

        <div className="mt-6 sm:hidden">
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
   16 — FINAL CONVERSION CTA + confidential callback form
═══════════════════════════════════════════════════════════ */

export function Contact() {
  return (
    <section id="contact" className="bg-sand py-14 sm:py-20 lg:py-24">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">

          <div>
            <p className="eyebrow">Take the first step</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Take the first step towards recovery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              You can have a confidential conversation with our admissions team
              without needing to make every decision immediately. There is no
              obligation, and everything you share is treated with complete privacy.
            </p>

            <ul className="mt-9 space-y-5">
              {[
                { icon: ShieldCheck, label: "Confidential", sub: "Nothing shared beyond our admissions team" },
                { icon: Check, label: "No obligation", sub: "A conversation, not a commitment" },
                { icon: MessageCircle, label: "Speak with an experienced admissions professional", sub: "Available around the clock" },
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

            <Button asChild variant="cta" size="lg" className="mt-9 w-full sm:w-auto">
              <a href="tel:+442038161576">
                <Phone aria-hidden /> Speak to our admissions team
              </a>
            </Button>
          </div>

          <form
            id="contact-form"
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
                <Label htmlFor="message">Anything you'd like us to know? (optional)</Label>
                <Textarea id="message" name="message" rows={3} />
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
   17 — FOOTER
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
      { label: "Medical detox", href: "/detox/" },
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

        <div className="mb-10 flex flex-wrap items-start justify-between gap-8 border-b border-deep-foreground/15 pb-10">
          <div>
            <a href="/" className="inline-flex items-center rounded-xl bg-white px-3 py-1.5">
              <img
                src="https://www.oasisrecovery.org.uk/wp-content/uploads/2024/08/ORB-logo.jpg"
                alt="Oasis Recovery Bradford"
                className="h-8 w-auto object-contain mix-blend-multiply"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-deep-foreground/55">
              A CQC-regulated private residential addiction treatment centre in
              Bradford, West Yorkshire — part of the UKAT group.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <address className="not-italic">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-deep-foreground/40">
                Find us
              </p>
              <p className="mt-3 text-sm leading-relaxed text-deep-foreground/55">
                21A Bolling Road, Bradford<br />
                West Yorkshire, BD4 7BG
              </p>
              <a
                href="tel:+442038161576"
                className="mt-2 block text-sm text-deep-foreground/55 transition-colors hover:text-deep-foreground"
              >
                0203 816 1576
              </a>
            </address>

            <a
              href="/cqc-report/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-deep-foreground/55 transition-colors hover:text-deep-foreground hover:underline"
            >
              <ShieldCheck className="size-3.5" aria-hidden />
              CQC registered provider
            </a>
          </div>
        </div>

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
            © Oasis Recovery Bradford. All rights reserved.
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
   MOBILE STICKY ACTION BAR — Call | Request callback
═══════════════════════════════════════════════════════════ */

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="cta" size="lg">
          <a href="tel:+442038161576">
            <Phone aria-hidden /> Call us 24/7
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#contact-form">Request a callback</a>
        </Button>
      </div>
    </div>
  );
}
