import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Phone,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Wine,
  Pill,
  Brain,
  Dices,
  Cigarette,
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
  CalendarCheck,
  DollarSign,
  Droplets,
  Home,
  Stethoscope,
  Building2,
  Star,
  MapPin,
  MessageCircle,
  BookOpen,
  FileText,
  Leaf,
  Activity,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────── types */

type Icon = React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type SubLink = { label: string; href: string };
type MegaItem = { icon: Icon; label: string; desc: string; href: string; subLinks?: SubLink[] };
type MegaGroup = { title?: string; items: MegaItem[] };

type MegaIntro = { desc: string; allLabel: string; allHref: string };

type MegaFeatured = {
  badge: string;
  heading: string;
  body: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

type MegaPanel = {
  intro?: MegaIntro;
  groups: MegaGroup[];
  featured?: MegaFeatured;
};

type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string; href: string; panel: MegaPanel };

/* ─────────────────────────────────────────── data */

const ADMISSION_CTA: MegaFeatured = {
  badge: "24/7 Admissions",
  heading: "Ready to take the first step?",
  body: "Our admissions team is available around the clock. All enquiries are completely confidential — no obligation, no pressure.",
  primaryCta: "Speak to us now",
  primaryHref: "#contact",
  secondaryCta: "How admissions works",
  secondaryHref: "/admissions/",
};

const NAV: NavEntry[] = [
  { kind: "link", label: "Admissions", href: "/admissions/" },

  /* ── Addiction ─────────────────────────────────── */
  {
    kind: "mega",
    label: "Addiction",
    href: "/addiction/",
    panel: {
      groups: [
        {
          title: "Substance addiction",
          items: [
            {
              icon: Wine,
              label: "Alcohol addiction",
              desc: "Most common substance dependency",
              href: "/addiction/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug addiction",
              desc: "Cocaine, heroin, cannabis & more",
              href: "/addiction/drug/",
              subLinks: [
                { label: "Cannabis", href: "/addiction/drug/cannabis/" },
                { label: "Cocaine", href: "/addiction/drug/cocaine/" },
                { label: "Heroin", href: "/addiction/drug/heroin/" },
                { label: "Ketamine", href: "/addiction/drug/ketamine/" },
                { label: "Crack cocaine", href: "/addiction/drug/crack-cocaine/" },
                { label: "Ecstasy", href: "/addiction/drug/ecstasy/" },
                { label: "Crystal meth", href: "/addiction/drug/crystal-meth/" },
                { label: "GHB / GBL", href: "/addiction/drug/ghb/" },
              ],
            },
            {
              icon: Stethoscope,
              label: "Prescription drugs",
              desc: "Opioids, benzodiazepines & painkillers",
              href: "/addiction/prescription-drug/",
            },
            {
              icon: Leaf,
              label: "Legal high addiction",
              desc: "Novel psychoactive substances",
              href: "/addiction/legal-high/",
            },
            {
              icon: Zap,
              label: "Stimulant addiction",
              desc: "Speed, amphetamines & stimulants",
              href: "/addiction/stimulant/",
            },
            {
              icon: Moon,
              label: "Sleeping pill addiction",
              desc: "Zopiclone, temazepam & z-drugs",
              href: "/addiction/sleeping-pill/",
            },
          ],
        },
        {
          title: "Behavioural addiction",
          items: [
            {
              icon: Dices,
              label: "Gambling addiction",
              desc: "Online & offline dependency",
              href: "/addiction/behavioural/gambling/",
            },
            {
              icon: Brain,
              label: "Other behavioural",
              desc: "Gaming, sex, food & internet",
              href: "/addiction/behavioural/",
            },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  /* ── Detox ─────────────────────────────────────── */
  {
    kind: "mega",
    label: "Detox",
    href: "/detox/",
    panel: {
      groups: [
        {
          title: "Our detox programmes",
          items: [
            {
              icon: Wine,
              label: "Alcohol detox",
              desc: "Safe, medically managed withdrawal",
              href: "/detox/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug detox",
              desc: "Supervised detox from all substances",
              href: "/detox/drug/",
              subLinks: [
                { label: "Heroin detox", href: "/detox/drug/heroin/" },
                { label: "Cocaine detox", href: "/detox/drug/cocaine/" },
                { label: "Cannabis detox", href: "/detox/drug/cannabis/" },
                { label: "Ketamine detox", href: "/detox/drug/ketamine/" },
                { label: "Crack cocaine detox", href: "/detox/drug/crack-cocaine/" },
              ],
            },
            {
              icon: Stethoscope,
              label: "Medical detox",
              desc: "24/7 clinical care throughout",
              href: "/detox/",
            },
            {
              icon: Home,
              label: "Residential detox",
              desc: "Detox within our private facility",
              href: "/detox/",
            },
            {
              icon: Droplets,
              label: "Detox process",
              desc: "What to expect, step by step",
              href: "/admissions/",
            },
            {
              icon: ShieldCheck,
              label: "Is detox safe?",
              desc: "CQC-registered, fully supervised",
              href: "/cqc-report/",
            },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  /* ── Rehab Treatment ───────────────────────────── */
  {
    kind: "mega",
    label: "Rehab Treatment",
    href: "/rehab-treatment/",
    panel: {
      intro: {
        desc: "Comprehensive residential rehabilitation addressing root causes through evidence-based therapy and holistic support.",
        allLabel: "All programmes",
        allHref: "/rehab-treatment/",
      },
      groups: [
        {
          items: [
            {
              icon: Wine,
              label: "Alcohol rehab",
              desc: "Inpatient alcohol rehabilitation",
              href: "/rehab-treatment/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug rehab",
              desc: "Cannabis, cocaine, heroin & more",
              href: "/rehab-treatment/drug/",
            },
            {
              icon: Sparkles,
              label: "Therapy programmes",
              desc: "CBT, DBT, holistic & more",
              href: "/rehab-programme/",
              subLinks: [
                { label: "Group therapy", href: "/rehab-programme/group-therapy/" },
                { label: "Holistic therapy", href: "/rehab-programme/holistic-therapy/" },
                { label: "Family support", href: "/rehab-programme/family-support/" },
              ],
            },
            {
              icon: HeartHandshake,
              label: "Aftercare",
              desc: "Support that continues after you leave",
              href: "/rehab-treatment/aftercare/",
            },
            {
              icon: DollarSign,
              label: "Cost of rehab",
              desc: "Transparent, no-surprise pricing",
              href: "/rehab-treatment/cost-alcohol-drug-rehab/",
            },
            {
              icon: CalendarCheck,
              label: "Secondary care",
              desc: "Bridging rehab & independent living",
              href: "/rehab-treatment/secondary-care-programme/",
            },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  /* ── Dual Diagnosis ────────────────────────────── */
  {
    kind: "mega",
    label: "Dual Diagnosis",
    href: "/dual-diagnosis/",
    panel: {
      intro: {
        desc: "We treat co-occurring mental health conditions alongside addiction, with specialist dual diagnosis consultants on site.",
        allLabel: "All conditions we treat",
        allHref: "/dual-diagnosis/",
      },
      groups: [
        {
          title: "Mental health conditions",
          items: [
            { icon: Zap,          label: "ADHD",                 desc: "Attention & hyperactivity",         href: "/dual-diagnosis/adhd/" },
            { icon: Activity,     label: "Anxiety",               desc: "Generalised & panic disorders",     href: "/dual-diagnosis/anxiety/" },
            { icon: Moon,         label: "Depression",            desc: "Clinical & treatment-resistant",    href: "/dual-diagnosis/depression/" },
            { icon: ShieldCheck,  label: "PTSD",                  desc: "Trauma & post-traumatic stress",   href: "/dual-diagnosis/ptsd/" },
            { icon: Sparkles,     label: "Bipolar disorder",      desc: "Mood stabilisation & recovery",    href: "/dual-diagnosis/bipolar/" },
            { icon: Brain,        label: "OCD",                   desc: "Obsessive compulsive disorder",    href: "/dual-diagnosis/ocd/" },
            { icon: Users,        label: "Personality disorder",  desc: "BPD & EUPD",                       href: "/dual-diagnosis/personality-disorder/" },
            { icon: BookOpen,     label: "Other conditions",      desc: "Self-harm, schizophrenia & more",  href: "/dual-diagnosis/" },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  /* ── About Us ──────────────────────────────────── */
  {
    kind: "mega",
    label: "About Us",
    href: "/about/",
    panel: {
      groups: [
        {
          items: [
            { icon: Building2,    label: "Our facility",     desc: "Private grounds, en-suite rooms",     href: "/about/facilities/" },
            { icon: FileText,     label: "Virtual tour",     desc: "Explore our facility online",          href: "/about/virtual-facility-tour/" },
            { icon: Users,        label: "Our team",         desc: "Experienced doctors & therapists",    href: "/about/our-team/" },
            { icon: ShieldCheck,  label: "CQC registered",   desc: "Regulated, inspected, trusted",       href: "/cqc-report/" },
            { icon: Star,         label: "Reviews",          desc: "What our clients say about us",       href: "/reviews/" },
            { icon: MessageCircle, label: "Contact us",      desc: "Get in touch, any time",              href: "/about/contact/" },
          ],
        },
      ],
    },
  },
];

/* ────────────────────────────────── sub-components */

function MegaItemRow({ item, onClose }: { item: MegaItem; onClose: () => void }) {
  const hasSubLinks = !!item.subLinks?.length;

  return (
    <div className="group/row rounded-xl p-2.5 transition-colors hover:bg-secondary">
      {/* Main link — icon + label + desc */}
      <a href={item.href} onClick={onClose} className="group/link flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/link:bg-primary group-hover/link:text-primary-foreground">
          <item.icon className="size-[1.1rem]" aria-hidden />
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-[0.8125rem] font-semibold leading-snug text-foreground">
            {item.label}
          </span>
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
            {item.desc}
          </span>
        </span>
      </a>

      {/* Tier-3 sub-links */}
      {hasSubLinks && (
        <div className="mt-1.5 ml-12 flex flex-wrap gap-x-3 gap-y-1">
          {item.subLinks!.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              onClick={onClose}
              className="text-[0.6875rem] font-medium text-muted-foreground/80 transition-colors hover:text-primary hover:underline"
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ featured, onClose }: { featured: MegaFeatured; onClose: () => void }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-deep p-5 text-deep-foreground lg:p-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-deep-foreground/20 bg-deep-foreground/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-deep-foreground/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {featured.badge}
        </span>
        <h3 className="mt-4 text-[1.1rem] leading-snug">{featured.heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-deep-foreground/65">{featured.body}</p>
      </div>
      <div className="mt-6 space-y-2">
        <Button asChild variant="cta" size="lg" className="w-full">
          <a href={featured.primaryHref} onClick={onClose}>
            <Phone aria-hidden />
            {featured.primaryCta}
          </a>
        </Button>
        <Button asChild variant="onDeep" size="lg" className="w-full">
          <a href={featured.secondaryHref} onClick={onClose}>
            {featured.secondaryCta}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────── main component */

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };
  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 180);
  };
  const cancelMegaClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeMega = () => setActiveMega(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMega(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const activeEntry = NAV.find(
    (n): n is Extract<NavEntry, { kind: "mega" }> =>
      n.kind === "mega" && n.label === activeMega,
  );
  const panel = activeEntry?.panel ?? null;

  const hasIntro = Boolean(panel?.intro);
  const hasFeatured = Boolean(panel?.featured);
  const outerCols =
    hasIntro && hasFeatured
      ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.9fr)_minmax(0,0.85fr)]"
      : hasFeatured
        ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,0.85fr)]"
        : hasIntro
          ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]"
          : "";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className="section-x mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">

        <a href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-base leading-none">O</span>
          </span>
          <span className="font-display truncate text-lg tracking-tight">Oasis Recovery</span>
        </a>

        <div className="flex items-center gap-2">

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) =>
              item.kind === "mega" ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMega(item.label)}
                  onMouseLeave={scheduleMegaClose}
                >
                  <button
                    type="button"
                    aria-expanded={activeMega === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setActiveMega(activeMega === item.label ? null : item.label)
                    }
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeMega === item.label
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        activeMega === item.label && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {activeMega === item.label && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                    />
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">
              <Phone aria-hidden /> Speak to us
            </a>
          </Button>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-grid h-10 w-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop mega panel ──────────────────────────────── */}
      {activeMega && panel && (
        <div
          role="dialog"
          aria-label={`${activeMega} menu`}
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          className="animate-in fade-in slide-in-from-top-2 absolute inset-x-0 top-full z-50 max-h-[80vh] overflow-y-auto border-b border-border bg-background shadow-[var(--shadow-lift)] duration-150"
        >
          <div className="section-x mx-auto max-w-7xl py-7">
            <div className={cn("grid gap-8", outerCols)}>

              {/* Intro column */}
              {panel.intro && (
                <div className="flex flex-col justify-between rounded-2xl bg-secondary/50 p-5">
                  <div>
                    <p className="eyebrow text-primary">{activeMega}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {panel.intro.desc}
                    </p>
                  </div>
                  <a
                    href={panel.intro.allHref}
                    onClick={closeMega}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {panel.intro.allLabel}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              )}

              {/* Item groups */}
              <div className={cn("grid gap-6", panel.groups.length > 1 && "lg:grid-cols-2")}>
                {panel.groups.map((group, gi) => (
                  <div key={gi}>
                    {group.title && (
                      <p className="eyebrow mb-2 text-primary">{group.title}</p>
                    )}
                    <ul className="grid gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <MegaItemRow item={item} onClose={closeMega} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured CTA card */}
              {panel.featured && (
                <FeaturedCard featured={panel.featured} onClose={closeMega} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile nav ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="section-x mx-auto max-w-7xl py-2" aria-label="Mobile">
            <ul className="divide-y divide-border">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.kind === "mega" ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileExpanded === item.label}
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.label ? null : item.label,
                          )
                        }
                        className="flex w-full items-center justify-between py-3.5 text-base font-medium"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 text-muted-foreground transition-transform duration-200",
                            mobileExpanded === item.label && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <ul className="mb-3 space-y-0.5 pl-1">
                          {item.panel.groups
                            .flatMap((g) => g.items)
                            .map((sub) => (
                              <li key={sub.label}>
                                <a
                                  href={sub.href}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                >
                                  <sub.icon className="size-4 shrink-0 text-primary" aria-hidden />
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium"
                    >
                      {item.label}
                      <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="grid gap-2 py-4">
              <Button asChild variant="cta" size="lg">
                <a href="#contact">
                  <Phone aria-hidden /> Call our admissions team
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/admissions/">How admissions works</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
