import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Phone,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users,
  Leaf,
  HeartHandshake,
  CalendarCheck,
  MapPin,
  ArrowRight,
  FileText,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ types */

type MegaItem = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  desc: string;
  href: string;
};

type MegaColumn = { title: string; items: MegaItem[] };

type MegaFeatured = {
  badge: string;
  heading: string;
  body: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

type NavEntry =
  | { label: string; href: string; mega: null }
  | {
      label: string;
      href: string;
      mega: { columns: MegaColumn[]; featured: MegaFeatured | null };
    };

/* ------------------------------------------------------------------- data */

const NAV: NavEntry[] = [
  {
    label: "Treatment",
    href: "#treatment",
    mega: {
      columns: [
        {
          title: "Our programmes",
          items: [
            {
              icon: ShieldCheck,
              label: "Medically assisted detox",
              desc: "Safe, supervised withdrawal from alcohol or drugs",
              href: "#treatment",
            },
            {
              icon: Sparkles,
              label: "Residential rehabilitation",
              desc: "Immersive 28–90 day live-in programme",
              href: "#treatment",
            },
            {
              icon: Users,
              label: "Group & 1:1 therapy",
              desc: "Evidence-based therapeutic support",
              href: "#treatment",
            },
            {
              icon: Leaf,
              label: "Wellbeing & holistic therapy",
              desc: "Yoga, mindfulness and complementary therapies",
              href: "#treatment",
            },
            {
              icon: HeartHandshake,
              label: "Family programme",
              desc: "Healing and education for the whole family",
              href: "#family",
            },
            {
              icon: CalendarCheck,
              label: "Structured aftercare",
              desc: "Ongoing support long after you leave",
              href: "#family",
            },
          ],
        },
      ],
      featured: {
        badge: "24/7 Admissions",
        heading: "Ready to take the first step?",
        body: "Our admissions team is available around the clock. All enquiries are completely confidential — no obligation.",
        primaryCta: "Speak to us now",
        primaryHref: "#contact",
        secondaryCta: "How admissions works",
        secondaryHref: "#admissions",
      },
    },
  },
  {
    label: "Our Facility",
    href: "#facility",
    mega: {
      columns: [
        {
          title: "The environment",
          items: [
            {
              icon: Leaf,
              label: "Private grounds",
              desc: "Calm, landscaped outdoor space for reflection",
              href: "#facility",
            },
            {
              icon: MapPin,
              label: "En-suite bedrooms",
              desc: "Comfortable, private accommodation",
              href: "#facility",
            },
            {
              icon: Sparkles,
              label: "Chef-prepared meals",
              desc: "Nutrition and nourishment as part of recovery",
              href: "#facility",
            },
          ],
        },
        {
          title: "Our people",
          items: [
            {
              icon: Users,
              label: "Clinical team",
              desc: "Experienced doctors, nurses and therapists",
              href: "#team",
            },
            {
              icon: ShieldCheck,
              label: "CQC registered",
              desc: "Regulated, inspected and trusted",
              href: "#team",
            },
            {
              icon: CalendarCheck,
              label: "Admissions process",
              desc: "How to get started — five simple steps",
              href: "#admissions",
            },
          ],
        },
      ],
      featured: null,
    },
  },
  { label: "Admissions", href: "#admissions", mega: null },
  { label: "Our Team", href: "#team", mega: null },
  { label: "Family Support", href: "#family", mega: null },
  {
    label: "Resources",
    href: "#resources",
    mega: {
      columns: [
        {
          title: "Guides & articles",
          items: [
            {
              icon: BookOpen,
              label: "Understanding addiction",
              desc: "Signs, causes and what helps",
              href: "#resources",
            },
            {
              icon: FileText,
              label: "How rehab works",
              desc: "What to expect from treatment",
              href: "#resources",
            },
            {
              icon: HeartHandshake,
              label: "Helping a loved one",
              desc: "Advice for family and friends",
              href: "#resources",
            },
          ],
        },
        {
          title: "Quick answers",
          items: [
            {
              icon: HelpCircle,
              label: "Common FAQs",
              desc: "Your questions answered plainly",
              href: "#resources",
            },
            {
              icon: ShieldCheck,
              label: "Fees & insurance",
              desc: "Transparent, no-surprise pricing",
              href: "#contact",
            },
            {
              icon: Phone,
              label: "Contact us",
              desc: "Get in touch any time, day or night",
              href: "#contact",
            },
          ],
        },
      ],
      featured: null,
    },
  },
];

/* --------------------------------------------------------------- component */

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* hover helpers — small delay prevents accidental close on mouse movement */
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

  /* keyboard: Escape closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMega(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeMega = () => setActiveMega(null);

  const currentMega =
    activeMega ? (NAV.find((n) => n.label === activeMega)?.mega ?? null) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
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
              item.mega ? (
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
                  {/* Active indicator bar */}
                  {activeMega === item.label && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-px h-px bg-primary"
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

      {/* ── Desktop mega panel ───────────────────────────────────────── */}
      {activeMega && currentMega && (
        <div
          role="dialog"
          aria-label={`${activeMega} menu`}
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          className="animate-in fade-in slide-in-from-top-2 absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-[var(--shadow-lift)] duration-150"
        >
          <div className="section-x mx-auto max-w-7xl py-7">
            <div
              className={cn(
                "grid gap-10",
                currentMega.featured
                  ? "lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]"
                  : "lg:grid-cols-1",
              )}
            >
              {/* ── Columns ── */}
              <div
                className={cn(
                  "grid gap-8",
                  currentMega.columns.length > 1 && "sm:grid-cols-2",
                )}
              >
                {currentMega.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow mb-3 text-primary">{col.title}</p>
                    <ul
                      className={cn(
                        "grid gap-0.5",
                        col.items.length >= 4 && "sm:grid-cols-2",
                      )}
                    >
                      {col.items.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            onClick={closeMega}
                            className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                          >
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <sub.icon className="size-4" aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold leading-snug">
                                {sub.label}
                              </span>
                              <span className="block truncate text-xs leading-snug text-muted-foreground">
                                {sub.desc}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── Featured CTA card ── */}
              {currentMega.featured && (
                <div className="flex flex-col justify-between rounded-2xl bg-deep p-6 text-deep-foreground">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-deep-foreground/20 bg-deep-foreground/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-deep-foreground/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      {currentMega.featured.badge}
                    </span>
                    <h3 className="mt-4 text-xl leading-snug">
                      {currentMega.featured.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-deep-foreground/70">
                      {currentMega.featured.body}
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Button asChild variant="cta" size="lg" className="w-full">
                      <a href={currentMega.featured.primaryHref} onClick={closeMega}>
                        <Phone aria-hidden />
                        {currentMega.featured.primaryCta}
                      </a>
                    </Button>
                    <Button asChild variant="onDeep" size="lg" className="w-full">
                      <a href={currentMega.featured.secondaryHref} onClick={closeMega}>
                        {currentMega.featured.secondaryCta}
                        <ArrowRight className="size-4" aria-hidden />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile nav ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="section-x mx-auto max-w-7xl py-2" aria-label="Mobile">
            <ul className="divide-y divide-border">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.mega ? (
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
                          {item.mega.columns
                            .flatMap((col) => col.items)
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
                <a href="#contact">Request a callback</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
