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
  ClipboardList,
  LogIn,
  Activity,
  Clock,
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
                <Phone aria-hidden /> Speak to our admissions team
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#contact-form">Request a confidential callback</a>
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

      {/* Compact trust row — genuine, verifiable signals only */}
      <div className="border-t border-border/70 bg-background/60">
        <ul className="section-x mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 py-5 sm:justify-between sm:gap-y-0">
          {TRUST_ROW.map(({ icon: Icon, label }) => (
            <li key={label} className="flex min-w-0 items-center gap-2">
              <Icon className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-[0.8125rem] font-medium leading-snug text-foreground/85 sm:text-sm">
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
    title: "Personalised care",
    desc: "Treatment informed by each individual's circumstances, substance history and recovery needs — not a fixed programme applied to everyone.",
  },
  {
    title: "Supportive residential environment",
    desc: "A structured, private setting in Bradford, away from the everyday pressures and triggers that can make recovery harder.",
  },
  {
    title: "Experienced professionals",
    desc: "Clinical, therapeutic and recovery-support staff working together throughout your stay, from admission to discharge.",
  },
  {
    title: "Long-term recovery focus",
    desc: "Care intended to prepare residents for life after treatment, not just to manage the days spent with us.",
  },
];

export function TreatmentCentre() {
  return (
    <section id="centre" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">

          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-primary/70">Oasis Recovery Bradford</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              A supportive residential<br />treatment centre in Bradford
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Oasis Recovery is a private residential addiction treatment centre in
              Bradford, West Yorkshire, and part of the UKAT group — one of the UK's
              established addiction treatment providers. We offer a calm, dignified
              setting where people can step away from daily life and focus fully on
              recovery, supported by a personalised programme of clinical and
              therapeutic care.
            </p>
            <div className="mt-8 hidden lg:block">
              <img
                src={IMGS.therapy}
                alt="Therapy room at Oasis Recovery Bradford"
                className="aspect-[4/3] rounded-2xl w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <ul>
              {DIFFERENTIATORS.map(({ title, desc }, i) => (
                <li key={title} className="border-t border-border/50 first:border-t-0">
                  <div className="flex items-start gap-5 py-6">
                    <span className="w-7 shrink-0 pt-0.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.0625rem] font-medium leading-snug sm:text-[1.125rem]">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border/50 pt-8">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="/about/">
                  Discover Oasis Recovery <ArrowRight className="size-4" aria-hidden />
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
   3 — ADDICTIONS WE TREAT (topic hub #1)
   "Can Oasis help with the addiction affecting me or my loved one?"
═══════════════════════════════════════════════════════════ */

const ADDICTIONS = [
  { icon: Wine,        label: "Alcohol Addiction Treatment",   href: "/addiction/alcohol/",          desc: "Our most-treated condition — medically supervised withdrawal and residential rehabilitation." },
  { icon: Pill,        label: "Cocaine Addiction Treatment",   href: "/addiction/drug/cocaine/",     desc: "Structured residential treatment for cocaine and crack cocaine dependency." },
  { icon: Leaf,        label: "Cannabis Addiction Treatment",  href: "/addiction/drug/cannabis/",    desc: "Support for cannabis dependency and the mental health needs that often go with it." },
  { icon: Pill,        label: "Heroin Addiction Treatment",    href: "/addiction/drug/heroin/",      desc: "Medically managed care for opioid and heroin dependency." },
  { icon: Stethoscope, label: "Prescription Drug Addiction",   href: "/addiction/prescription-drug/",desc: "Treatment for dependency on opioids, benzodiazepines and other prescribed medication." },
  { icon: Brain,       label: "Behavioural Addictions",        href: "/addiction/behavioural/",      desc: "Support for gambling, gaming, sex and shopping addiction." },
  { icon: ShieldCheck, label: "Dual Diagnosis",                href: "/dual-diagnosis/",             desc: "Treatment for addiction alongside a co-occurring mental health condition." },
];

export function AddictionsHub() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="addictions" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">What we treat</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Addictions we treat at Oasis
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We treat alcohol and drug addiction, behavioural addictions and dual
            diagnosis at our Bradford facility, with a residential programme built
            around each individual's circumstances.
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
              className="group flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:w-[340px] lg:w-auto"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-medium leading-snug">{label}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Explore {label.replace(" Treatment", "").toLowerCase()}{" "}
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

const DETOX_LINKS = [
  { label: "Alcohol Detox",   href: "/detox/alcohol/" },
  { label: "Drug Detox",      href: "/detox/drug/" },
  { label: "Heroin Detox",    href: "/detox/drug/heroin/" },
  { label: "Cocaine Detox",   href: "/detox/drug/cocaine/" },
  { label: "Cannabis Detox",  href: "/detox/drug/cannabis/" },
  { label: "Ketamine Detox",  href: "/detox/drug/ketamine/" },
];

export function DetoxHub() {
  return (
    <section id="detox" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Withdrawal management</p>
            <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              Medically supported detox
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Detox is the process of safely managing withdrawal from alcohol or drugs
              under clinical supervision. What a person needs from detox varies —
              which is why every resident receives a clinical assessment before any
              withdrawal plan begins. Appropriate medical support can make withdrawal
              considerably safer and more manageable than attempting it alone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For some substances, unsupervised withdrawal carries real medical risk.
              Our clinical team assesses each resident individually and puts the right
              level of support in place before detox begins.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
              {DETOX_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 py-1.5 text-[0.9375rem] font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span className="size-1 shrink-0 rounded-full bg-primary/50" aria-hidden />
                  {link.label}
                </a>
              ))}
            </div>

            <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
              <a href="/detox/">
                Explore medical detox <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>

          <img
            src={IMGS.reception}
            alt="Clinical reception area at Oasis Recovery Bradford"
            className="aspect-[4/3] rounded-2xl w-full object-cover lg:aspect-[3/4]"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5 — REHAB TREATMENT (topic hub #3)
   "How does rehabilitation help someone build long-term recovery?"
═══════════════════════════════════════════════════════════ */

const REHAB_LINKS = [
  { label: "Alcohol Rehab",               href: "/rehab-treatment/alcohol/" },
  { label: "Drug Rehab",                  href: "/rehab-treatment/drug/" },
  { label: "Cocaine Rehab",               href: "/rehab-treatment/drug/cocaine/" },
  { label: "Cannabis Rehab",              href: "/rehab-treatment/drug/cannabis/" },
  { label: "Heroin Rehab",                href: "/rehab-treatment/drug/heroin/" },
  { label: "Residential Rehab Programmes",href: "/rehab-programme/" },
];

const THERAPIES = [
  "One-to-one therapy",
  "Group therapy",
  "CBT",
  "Relapse prevention",
  "Family therapy",
  "Holistic wellbeing activities",
];

export function RehabHub() {
  return (
    <section id="rehab" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow">Structured recovery treatment</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
            Residential rehab for lasting recovery
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Where detox stabilises the body, rehabilitation is the structured,
            longer-term treatment that helps residents understand their addiction and
            build the tools for lasting recovery. Our residential programme combines
            one-to-one and group therapy with practical relapse-prevention work and
            wellbeing support, tailored to each resident.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-primary/70">Rehab programmes</p>
            <ul className="grid grid-cols-1 gap-y-1 sm:grid-cols-2">
              {REHAB_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 py-1.5 text-[0.9375rem] font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-primary/50" aria-hidden />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3 text-primary/70">Therapeutic elements</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {THERAPIES.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-3.5 shrink-0 text-primary/60" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="/rehab-programme/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All therapy programmes <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        <Button asChild variant="outline" size="lg" className="mt-10 w-full sm:w-auto">
          <a href="/rehab-treatment/">
            Explore residential rehab <ArrowRight className="size-4" aria-hidden />
          </a>
        </Button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6 — YOUR RECOVERY JOURNEY
   "What happens after I contact Oasis?" — chronological, not another
   treatment explanation.
═══════════════════════════════════════════════════════════ */

const JOURNEY = [
  {
    icon: Phone,
    title: "Confidential conversation",
    desc: "Speak privately with our admissions team — no obligation, and everything shared is treated in complete confidence.",
  },
  {
    icon: ClipboardList,
    title: "Assessment",
    desc: "A clinical assessment to understand the individual's circumstances and treatment requirements.",
  },
  {
    icon: LogIn,
    title: "Admission",
    desc: "Arrival is arranged, initial checks are completed, and treatment begins.",
  },
  {
    icon: Activity,
    title: "Treatment",
    desc: "The agreed residential programme is followed. Detox may form part of treatment where clinically appropriate.",
    link: { label: "Medical detox", href: "#detox" },
  },
  {
    icon: HeartHandshake,
    title: "Continuing recovery",
    desc: "Preparation for recovery beyond residential treatment, with a plan in place before leaving.",
  },
];

export function RecoveryJourney() {
  return (
    <section id="journey" className="bg-background py-20 sm:py-28 lg:py-36">
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

        <ol className="relative mt-14 space-y-0 sm:mx-auto sm:max-w-2xl">
          <div aria-hidden className="absolute left-[1.4375rem] top-6 bottom-6 w-px bg-border/60" />
          {JOURNEY.map(({ icon: Icon, title, desc, link }, i) => (
            <li key={title} className="relative flex gap-6 pb-9 last:pb-0">
              <div className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                <Icon className="size-[1.0625rem] text-primary/70" aria-hidden />
              </div>
              <div className="min-w-0 pt-2.5">
                <p className="text-[0.625rem] font-bold tracking-[0.12em] text-muted-foreground/40">
                  STEP {i + 1}
                </p>
                <h3 className="mt-1 text-[1.0625rem] font-medium">{title}</h3>
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

        <div className="mt-4 sm:mx-auto sm:max-w-2xl">
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
                className="aspect-[4/3] w-full object-cover"
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
    <section id="facility" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
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
    <section id="team" className="bg-background py-20 sm:py-28 lg:py-36">
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
    <section id="family" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
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
    <section id="outcomes" className="bg-background py-20 sm:py-28 lg:py-36">
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
    <section id="costs" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
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
    <section id="location" className="bg-background py-20 sm:py-28 lg:py-36">
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
              src="https://www.google.com/maps?q=Bradford,+West+Yorkshire&output=embed"
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
    <section id="resources" className="bg-secondary/50 py-20 sm:py-28 lg:py-36">
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
              className="group flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:w-[300px] lg:w-auto"
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

export function Faq() {
  return (
    <section id="faq" className="bg-background py-20 sm:py-28 lg:py-36">
      <div className="section-x mx-auto max-w-3xl">
        <div className="max-w-lg">
          <p className="eyebrow">FAQs</p>
          <h2 className="mt-4 text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
            Questions you<br />may have
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map(({ q, a }) => (
            <AccordionItem
              key={q}
              value={q}
              className="border-b border-border/50 first:border-t first:border-border/50"
            >
              <AccordionTrigger className="py-5 text-left text-[1.0625rem] font-medium leading-snug hover:no-underline sm:text-lg">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {a}
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
   16 — FINAL CONVERSION CTA + confidential callback form
═══════════════════════════════════════════════════════════ */

export function Contact() {
  return (
    <section id="contact" className="bg-sand py-20 sm:py-28 lg:py-36">
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
              <a href="tel:+441234567890">
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

        <div className="mb-10 flex flex-wrap items-start justify-between gap-6 border-b border-deep-foreground/15 pb-10">
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
          <a
            href="/cqc-report/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-deep-foreground/55 transition-colors hover:text-deep-foreground hover:underline"
          >
            <ShieldCheck className="size-3.5" aria-hidden />
            CQC registered provider
          </a>
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
          <a href="tel:+441234567890">
            <Phone aria-hidden /> Call now
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#contact-form">Request callback</a>
        </Button>
      </div>
    </div>
  );
}
