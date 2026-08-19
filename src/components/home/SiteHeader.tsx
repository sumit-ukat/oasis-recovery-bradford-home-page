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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────── types */

type Icon = React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type MegaItem = { icon: Icon; label: string; desc: string; href: string };
type MegaGroup = { title?: string; items: MegaItem[] };

type MegaIntro = {
  desc: string;
  allLabel: string;
  allHref: string;
};

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
  secondaryHref: "#admissions",
};

const NAV: NavEntry[] = [
  { kind: "link", label: "Admissions", href: "#admissions" },

  {
    kind: "mega",
    label: "Addiction",
    href: "#treatment",
    panel: {
      intro: {
        desc: "We treat all forms of substance and behavioural addiction in a safe, medically supervised environment.",
        allLabel: "All addiction types",
        allHref: "#treatment",
      },
      groups: [
        {
          title: "Substance addiction",
          items: [
            { icon: Wine, label: "Alcohol addiction", desc: "Most commonly treated addiction", href: "#treatment" },
            { icon: Pill, label: "Drug addiction", desc: "Cocaine, heroin, cannabis & more", href: "#treatment" },
            { icon: Stethoscope, label: "Prescription drugs", desc: "Opioids, benzos & painkillers", href: "#treatment" },
            { icon: Cigarette, label: "Nicotine addiction", desc: "Tobacco & vaping dependency", href: "#treatment" },
          ],
        },
        {
          title: "Behavioural addiction",
          items: [
            { icon: Brain, label: "Dual diagnosis", desc: "Mental health & addiction together", href: "#treatment" },
            { icon: Dices, label: "Gambling addiction", desc: "Online & offline dependency", href: "#treatment" },
            { icon: Zap, label: "Other addictions", desc: "Food, gaming, sex & more", href: "#treatment" },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  {
    kind: "mega",
    label: "Detox",
    href: "#treatment",
    panel: {
      groups: [
        {
          title: "Our detox programmes",
          items: [
            { icon: Wine, label: "Alcohol detox", desc: "Safe, medically managed withdrawal", href: "#treatment" },
            { icon: Pill, label: "Drug detox", desc: "Supervised from all substances", href: "#treatment" },
            { icon: Stethoscope, label: "Medical detox", desc: "24/7 clinical care throughout", href: "#treatment" },
            { icon: Home, label: "Residential detox", desc: "Detox within our private facility", href: "#facility" },
            { icon: Droplets, label: "Detox process", desc: "What to expect, step by step", href: "#admissions" },
            { icon: ShieldCheck, label: "Is detox safe?", desc: "CQC-registered, fully supervised", href: "#team" },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  {
    kind: "mega",
    label: "Rehab Treatment",
    href: "#treatment",
    panel: {
      intro: {
        desc: "Comprehensive residential rehabilitation addressing root causes through evidence-based therapy and holistic support.",
        allLabel: "All programmes",
        allHref: "#treatment",
      },
      groups: [
        {
          items: [
            { icon: Wine, label: "Alcohol rehab", desc: "Inpatient alcohol rehabilitation", href: "#treatment" },
            { icon: Pill, label: "Drug rehab", desc: "Cannabis, cocaine, heroin & more", href: "#treatment" },
            { icon: Sparkles, label: "Therapy programmes", desc: "CBT, DBT, holistic & more", href: "#treatment" },
            { icon: HeartHandshake, label: "Aftercare", desc: "Support that continues after you leave", href: "#family" },
            { icon: DollarSign, label: "Cost of rehab", desc: "Transparent, no-surprise pricing", href: "#contact" },
            { icon: CalendarCheck, label: "Secondary care", desc: "Bridging rehab & independent living", href: "#admissions" },
          ],
        },
      ],
      featured: ADMISSION_CTA,
    },
  },

  { kind: "link", label: "Dual Diagnosis", href: "#treatment" },

  {
    kind: "mega",
    label: "About Us",
    href: "#team",
    panel: {
      groups: [
        {
          items: [
            { icon: Building2, label: "Our facility", desc: "Private grounds, en-suite rooms", href: "#facility" },
            { icon: Users, label: "Our team", desc: "Experienced doctors & therapists", href: "#team" },
            { icon: ShieldCheck, label: "CQC registered", desc: "Regulated, inspected, trusted", href: "#team" },
            { icon: MapPin, label: "Location", desc: "Bradford, West Yorkshire", href: "#contact" },
            { icon: Star, label: "Testimonials", desc: "What our clients say about us", href: "#contact" },
            { icon: MessageCircle, label: "Contact us", desc: "Get in touch, any time", href: "#contact" },
          ],
        },
      ],
    },
  },

  { kind: "link", label: "Blog", href: "#resources" },
  { kind: "link", label: "Help Guides", href: "#resources" },
];

/* ────────────────────────────────── sub-components */

function MegaItemRow({
  item,
  onClose,
}: {
  item: MegaItem;
  onClose: () => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onClose}
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
    >
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
  );
}

function FeaturedCard({
  featured,
  onClose,
}: {
  featured: MegaFeatured;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-deep p-5 text-deep-foreground lg:p-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-deep-foreground/20 bg-deep-foreground/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-deep-foreground/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {featured.badge}
        </span>
        <h3 className="mt-4 text-[1.1rem] leading-snug">{featured.heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-deep-foreground/65">
          {featured.body}
        </p>
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

  /* ── helpers for panel layout ── */
  const hasIntro = Boolean(panel?.intro);
  const hasFeatured = Boolean(panel?.featured);
  const outerCols = hasIntro && hasFeatured
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

        {/* Logo */}
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
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
                  {/* Active underline */}
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

          {/* Mobile toggle */}
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
          className="animate-in fade-in slide-in-from-top-2 absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-[var(--shadow-lift)] duration-150"
        >
          <div className="section-x mx-auto max-w-7xl py-7">
            <div className={cn("grid gap-8", outerCols)}>

              {/* ── Intro column ── */}
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

              {/* ── Item groups ── */}
              <div
                className={cn(
                  "grid gap-6",
                  panel.groups.length > 1 && "lg:grid-cols-2",
                )}
              >
                {panel.groups.map((group, gi) => (
                  <div key={gi}>
                    {group.title && (
                      <p className="eyebrow mb-2 text-primary">{group.title}</p>
                    )}
                    <ul
                      className={cn(
                        "grid gap-0.5",
                        group.items.length >= 4 && "sm:grid-cols-2",
                      )}
                    >
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <MegaItemRow item={item} onClose={closeMega} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── Featured CTA card ── */}
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
                                  <sub.icon
                                    className="size-4 shrink-0 text-primary"
                                    aria-hidden
                                  />
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
                <a href="#contact">Request a callback</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
