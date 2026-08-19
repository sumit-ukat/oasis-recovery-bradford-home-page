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
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
  CalendarCheck,
  DollarSign,
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

/* ─────────────── types */

type Icon = React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
type SubLink = { label: string; href: string };
type MegaItem = { icon: Icon; label: string; desc: string; href: string; subLinks?: SubLink[] };
type MegaGroup = { title?: string; cols?: 1 | 2 | 3 | 4 | 5; items: MegaItem[] };
type MegaIntro = { desc?: string; allLabel: string; allHref: string };
type MegaPanel = { intro?: MegaIntro; groups: MegaGroup[] };
type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string; href: string; panel: MegaPanel };

/* ─────────────── nav data */

const NAV: NavEntry[] = [

  /* ── Admissions */
  {
    kind: "mega",
    label: "Admissions",
    href: "/admissions/",
    panel: {
      intro: {
        desc: "Our UKAT network of residential rehab clinics offers expert treatment across the UK. Call us to discuss which clinic suits you best.",
        allLabel: "View all UKAT clinics",
        allHref: "/our-rehab-clinics/",
      },
      groups: [
        {
          title: "UKAT Rehab Clinics",
          cols: 5,
          items: [
            { icon: Building2, label: "Banbury Lodge",       desc: "Oxfordshire",          href: "https://www.banburylodge.com/" },
            { icon: Building2, label: "Bayberry",            desc: "Kent",                 href: "https://bayberry.org.uk/" },
            { icon: Building2, label: "Liberty House",       desc: "Luton, Bedfordshire",  href: "https://www.libertyhouseclinic.co.uk/" },
            { icon: Building2, label: "Linwood House",       desc: "Durham",               href: "https://www.linwoodhouse.co.uk/" },
            { icon: Building2, label: "Oasis Bradford",      desc: "Bradford — this site", href: "/" },
            { icon: Building2, label: "Oasis Runcorn",       desc: "Cheshire",             href: "https://www.oasisrehab.co.uk/" },
            { icon: Building2, label: "Primrose Lodge",      desc: "Surrey",               href: "https://www.primroselodge.com/" },
            { icon: Building2, label: "Providence Projects", desc: "Bournemouth",          href: "https://providenceproject.org/" },
            { icon: Building2, label: "Recovery Lighthouse", desc: "Essex",                href: "https://www.recoverylighthouse.com/" },
            { icon: Building2, label: "Sanctuary Lodge",     desc: "Essex",                href: "https://www.sanctuarylodge.com/" },
          ],
        },
      ],
    },
  },

  /* ── Addiction */
  {
    kind: "mega",
    label: "Addiction",
    href: "/addiction/",
    panel: {
      intro: {
        allLabel: "All addiction information",
        allHref: "/addiction/",
      },
      groups: [
        {
          title: "Substance addiction",
          cols: 4,
          items: [
            {
              icon: Wine,
              label: "Alcohol addiction",
              desc: "Safe, managed withdrawal and residential rehabilitation",
              href: "/addiction/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug addiction",
              desc: "Cocaine, heroin, cannabis, ketamine and more",
              href: "/addiction/drug/",
              subLinks: [
                { label: "Cannabis",      href: "/addiction/drug/cannabis/" },
                { label: "Cocaine",       href: "/addiction/drug/cocaine/" },
                { label: "Crack cocaine", href: "/addiction/drug/crack-cocaine/" },
                { label: "Crystal meth",  href: "/addiction/drug/crystal-meth/" },
                { label: "Ecstasy",       href: "/addiction/drug/ecstasy/" },
                { label: "GBL",           href: "/addiction/drug/gbl/" },
                { label: "GHB",           href: "/addiction/drug/ghb/" },
                { label: "Hallucinogens", href: "/addiction/drug/hallucinogens/" },
                { label: "Heroin",        href: "/addiction/drug/heroin/" },
                { label: "Inhalants",     href: "/addiction/drug/inhalants/" },
                { label: "Ketamine",      href: "/addiction/drug/ketamine/" },
                { label: "LSD",           href: "/addiction/drug/lsd/" },
                { label: "Monkey dust",   href: "/addiction/drug/monkey-dust/" },
                { label: "Steroid",       href: "/addiction/drug/steroids/" },
              ],
            },
            {
              icon: Leaf,
              label: "Legal high addiction",
              desc: "Novel psychoactive and synthetic substances",
              href: "/addiction/legal-high/",
              subLinks: [
                { label: "Benzo Fury",  href: "/addiction/legal-high/benzo-fury/" },
                { label: "Mephedrone",  href: "/addiction/legal-high/mephedrone/" },
                { label: "Spice",       href: "/addiction/drug/spice/" },
              ],
            },
            {
              icon: Stethoscope,
              label: "Prescription drug addiction",
              desc: "Opioids, benzodiazepines and antidepressants",
              href: "/addiction/prescription-drug/",
              subLinks: [
                { label: "Amphetamine",    href: "/addiction/prescription-drug/amphetamine/" },
                { label: "Antidepressants",href: "/addiction/drug/antidepressants/" },
                { label: "Benzodiazepine", href: "/addiction/prescription-drug/benzodiazepine/" },
                { label: "Opioid",         href: "/addiction/prescription-drug/opioid/" },
              ],
            },
            {
              icon: Zap,
              label: "Stimulant addiction",
              desc: "Adderall, Ritalin and other amphetamines",
              href: "/addiction/drug/stimulants/",
              subLinks: [
                { label: "Adderall", href: "/addiction/stimulants/adderall/" },
                { label: "Focalin",  href: "/addiction/stimulants/focalin/" },
                { label: "Ritalin",  href: "/addiction/stimulants/ritalin/" },
              ],
            },
            {
              icon: Moon,
              label: "Sleeping pill addiction",
              desc: "Zopiclone, zolpidem, z-drugs and sedatives",
              href: "/addiction/prescription-drug/sleeping-pill/",
              subLinks: [
                { label: "Sonata",    href: "/addiction/prescription-drug/sleeping-pill/sonata/" },
                { label: "Zolpidem",  href: "/addiction/prescription-drug/sleeping-pill/zolpidem/" },
                { label: "Zopiclone", href: "/addiction/prescription-drug/sleeping-pill/zopiclone/" },
              ],
            },
          ],
        },
        {
          title: "Behavioural addiction",
          cols: 3,
          items: [
            {
              icon: Brain,
              label: "Behavioural addiction",
              desc: "Gambling, gaming, sex, food, shopping and more",
              href: "/addiction/behavioural/",
              subLinks: [
                { label: "Eating disorders", href: "/addiction/behavioural/eating-disorders/" },
                { label: "Food addiction",   href: "/addiction/behavioural/food/" },
                { label: "Gambling",         href: "/addiction/behavioural/gambling/" },
                { label: "Gaming",           href: "/addiction/behavioural/gaming/" },
                { label: "Internet",         href: "/addiction/behavioural/internet/" },
                { label: "Porn addiction",   href: "/addiction/behavioural/porn/" },
                { label: "Sex & love",       href: "/addiction/behavioural/sex-and-love/" },
                { label: "Shopping",         href: "/addiction/behavioural/shopping/" },
                { label: "Social media",     href: "/addiction/behavioural/social-media/" },
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── Detox */
  {
    kind: "mega",
    label: "Detox",
    href: "/detox/",
    panel: {
      intro: {
        desc: "Safe, CQC-registered medical detox with 24/7 clinical care. Our doctors manage every stage of withdrawal.",
        allLabel: "All detox information",
        allHref: "/detox/",
      },
      groups: [
        {
          cols: 2,
          items: [
            {
              icon: Wine,
              label: "Alcohol detox",
              desc: "Medically managed alcohol withdrawal at our Bradford facility",
              href: "/detox/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug detox",
              desc: "Supervised detox from all substances with 24/7 clinical care",
              href: "/detox/drug/",
              subLinks: [
                { label: "Cannabis detox",      href: "/detox/drug/cannabis/" },
                { label: "Cocaine detox",       href: "/detox/drug/cocaine/" },
                { label: "Crack cocaine detox", href: "/detox/drug/crack-cocaine/" },
                { label: "Crystal meth detox",  href: "/detox/drug/crystal-meth/" },
                { label: "Ecstasy detox",       href: "/detox/drug/ecstasy/" },
                { label: "Heroin detox",        href: "/detox/drug/heroin/" },
                { label: "Ketamine detox",      href: "/detox/drug/ketamine/" },
                { label: "LSD detox",           href: "/detox/drug/lsd/" },
                { label: "Spice detox",         href: "/detox/drug/spice/" },
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── Rehab Treatment */
  {
    kind: "mega",
    label: "Rehab Treatment",
    href: "/rehab-treatment/",
    panel: {
      intro: {
        allLabel: "All treatment options",
        allHref: "/rehab-treatment/",
      },
      groups: [
        {
          cols: 3,
          items: [
            {
              icon: Wine,
              label: "Alcohol rehab",
              desc: "Residential inpatient alcohol rehabilitation",
              href: "/rehab-treatment/alcohol/",
            },
            {
              icon: Pill,
              label: "Drug rehab",
              desc: "Cannabis, cocaine, heroin, ketamine and more",
              href: "/rehab-treatment/drug/",
              subLinks: [
                { label: "Cannabis rehab",      href: "/rehab-treatment/drug/cannabis/" },
                { label: "Cocaine rehab",       href: "/rehab-treatment/drug/cocaine/" },
                { label: "Crack cocaine rehab", href: "/rehab-treatment/drug/crack-cocaine/" },
                { label: "Crystal meth rehab",  href: "/rehab-treatment/drug/crystal-meth/" },
                { label: "Ecstasy rehab",       href: "/rehab-treatment/drug/ecstasy/" },
                { label: "Heroin rehab",        href: "/rehab-treatment/drug/heroin/" },
                { label: "Ketamine rehab",      href: "/rehab-treatment/drug/ketamine/" },
                { label: "LSD rehab",           href: "/rehab-treatment/drug/lsd/" },
                { label: "Spice rehab",         href: "/rehab-treatment/drug/spice/" },
              ],
            },
            {
              icon: Sparkles,
              label: "Rehab programmes",
              desc: "Evidence-based and holistic therapies tailored to you",
              href: "/rehab-programme/",
              subLinks: [
                { label: "Art therapy",           href: "/rehab-programme/art-therapy/" },
                { label: "Auricular acupuncture", href: "/rehab-programme/auricular-acupuncture/" },
                { label: "CBT",                   href: "/rehab-programme/cbt/" },
                { label: "DBT",                   href: "/rehab-programme/dbt/" },
                { label: "Drumming therapy",      href: "/rehab-programme/drumming/" },
                { label: "EMDR",                  href: "/rehab-programme/emdr/" },
                { label: "Family support",        href: "/rehab-programme/family-support/" },
                { label: "Family therapy",        href: "/rehab-programme/family-therapy/" },
                { label: "Fibro scan",            href: "/rehab-programme/fibroscan/" },
                { label: "Gong therapy",          href: "/rehab-programme/gong-therapy/" },
                { label: "Group therapy",         href: "/rehab-programme/group-therapy/" },
                { label: "Holistic therapy",      href: "/rehab-programme/holistic-therapy/" },
                { label: "Humanistic therapy",    href: "/rehab-programme/humanistic-therapy/" },
                { label: "Individual therapy",    href: "/rehab-programme/individual-therapy/" },
                { label: "Meditation",            href: "/rehab-programme/meditation/" },
                { label: "Mindfulness",           href: "/rehab-programme/mindfulness-therapy/" },
                { label: "Music therapy",         href: "/rehab-programme/music-therapy/" },
                { label: "Nutrition",             href: "/rehab-programme/nutrition/" },
                { label: "Physical health",       href: "/rehab-programme/physical-health/" },
                { label: "Psychodynamic therapy", href: "/rehab-programme/psychodynamic-therapy/" },
                { label: "Psychotherapy",         href: "/rehab-programme/psychotherapy/" },
                { label: "Rehab fitness",         href: "/rehab-programme/rehab-fitness/" },
                { label: "Sound therapy",         href: "/rehab-programme/sound/" },
                { label: "Strengths model",       href: "/rehab-programme/strengths-model/" },
                { label: "Trauma therapy",        href: "/rehab-programme/trauma-therapy/" },
                { label: "Yoga therapy",          href: "/rehab-programme/yoga-therapy/" },
              ],
            },
            {
              icon: HeartHandshake,
              label: "Aftercare",
              desc: "Structured support that continues after you leave",
              href: "/rehab-treatment/aftercare/",
            },
            {
              icon: DollarSign,
              label: "Cost of rehab",
              desc: "Transparent pricing, NHS funding and private options",
              href: "/rehab-treatment/cost-alcohol-drug-rehab/",
            },
            {
              icon: CalendarCheck,
              label: "Secondary care",
              desc: "Bridging inpatient rehab and independent living",
              href: "/rehab-treatment/secondary-care-programme/",
            },
          ],
        },
      ],
    },
  },

  /* ── Dual Diagnosis */
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
          title: "Co-occurring conditions",
          cols: 5,
          items: [
            { icon: Zap,            label: "ADHD",                 desc: "Attention & hyperactivity",       href: "/dual-diagnosis/adhd/" },
            { icon: Activity,       label: "Anger management",     desc: "Anger issues & addiction",        href: "/dual-diagnosis/anger-management/" },
            { icon: Activity,       label: "Anxiety",              desc: "Generalised & panic disorders",   href: "/dual-diagnosis/anxiety/" },
            { icon: Brain,          label: "Autism",               desc: "Autism spectrum & addiction",     href: "/dual-diagnosis/autism/" },
            { icon: Brain,          label: "BDD",                  desc: "Body dysmorphic disorder",        href: "/dual-diagnosis/bdd/" },
            { icon: Sparkles,       label: "Bipolar disorder",     desc: "Mood stabilisation & recovery",   href: "/dual-diagnosis/bipolar/" },
            { icon: Users,          label: "Codependency",         desc: "Co-dependent relationships",      href: "/dual-diagnosis/co-dependency/" },
            { icon: Moon,           label: "Depression",           desc: "Clinical & treatment-resistant",  href: "/dual-diagnosis/depression/" },
            { icon: HeartHandshake, label: "Grief",                desc: "Bereavement & addiction",         href: "/dual-diagnosis/grief/" },
            { icon: Moon,           label: "Insomnia",             desc: "Sleep disorders & addiction",     href: "/dual-diagnosis/insomnia/" },
            { icon: Brain,          label: "OCD",                  desc: "Obsessive compulsive disorder",   href: "/dual-diagnosis/ocd/" },
            { icon: Users,          label: "Personality disorder", desc: "BPD & EUPD",                      href: "/dual-diagnosis/personality-disorder/" },
            { icon: ShieldCheck,    label: "PTSD",                 desc: "Trauma & post-traumatic stress",  href: "/dual-diagnosis/ptsd/" },
            { icon: Brain,          label: "Schizophrenia",        desc: "Psychosis & addiction",           href: "/dual-diagnosis/schizophrenia/" },
            { icon: Activity,       label: "Self harm",            desc: "Self-harm & addiction",           href: "/dual-diagnosis/self-harm/" },
            { icon: Activity,       label: "Stress",               desc: "Chronic stress & dependency",     href: "/dual-diagnosis/stress/" },
            { icon: Brain,          label: "Suicide",              desc: "Suicidal ideation & addiction",   href: "/dual-diagnosis/suicide/" },
          ],
        },
      ],
    },
  },

  /* ── About Us */
  {
    kind: "mega",
    label: "About Us",
    href: "/about/",
    panel: {
      intro: {
        desc: "Oasis Recovery Bradford is a CQC-registered private residential rehab centre in West Yorkshire. Part of the UKAT group — one of the UK's leading addiction treatment providers.",
        allLabel: "Learn about us",
        allHref: "/about/",
      },
      groups: [
        {
          cols: 5,
          items: [
            { icon: Building2,     label: "Our facility",   desc: "Private grounds, en-suite rooms",   href: "/about/facilities/" },
            { icon: FileText,      label: "Virtual tour",   desc: "Explore our facility online",        href: "/about/virtual-facility-tour/" },
            { icon: Users,         label: "Our team",       desc: "Experienced doctors & therapists",  href: "/about/our-team/" },
            { icon: ShieldCheck,   label: "CQC registered", desc: "Regulated, inspected, trusted",     href: "/cqc-report/" },
            { icon: Star,          label: "Reviews",        desc: "What our clients say",              href: "/reviews/" },
            { icon: MapPin,        label: "Rehab near me",  desc: "Find our Bradford location",        href: "/location/" },
            { icon: Users,         label: "UKAT alumni",    desc: "Join our alumni network",           href: "/about/alumni/" },
            { icon: MessageCircle, label: "Contact us",     desc: "Get in touch, any time",            href: "/about/contact/" },
            { icon: BookOpen,      label: "FAQ",            desc: "Common questions answered",         href: "/about/questions-and-answers/" },
            { icon: FileText,      label: "Brochure",       desc: "Download our treatment brochure",   href: "https://cdn.rehabfiles.com/sites/ukat/wp-content/uploads/brochure/oasis-bradford-v1.pdf" },
          ],
        },
      ],
    },
  },
];

/* ─────────────── SubLinkGrid */

function SubLinkGrid({
  subLinks,
  itemHref,
  onClose,
}: {
  subLinks: SubLink[];
  itemHref: string;
  onClose: () => void;
}) {
  const MAX = 10;
  const visible = subLinks.slice(0, MAX);
  const extra = subLinks.length - MAX;
  const twoCols = visible.length > 5;

  return (
    <div className={cn("mt-1.5 grid gap-x-5 gap-y-1", twoCols ? "grid-cols-2" : "grid-cols-1")}>
      {visible.map((sub) => (
        <a
          key={sub.label}
          href={sub.href}
          onClick={onClose}
          className="truncate text-[0.75rem] text-muted-foreground transition-colors hover:text-primary"
        >
          {sub.label}
        </a>
      ))}
      {extra > 0 && (
        <a
          href={itemHref}
          onClick={onClose}
          className="text-[0.75rem] font-medium text-primary hover:underline"
        >
          +{extra} more
        </a>
      )}
    </div>
  );
}

/* ─────────────── ItemBlock */

function ItemBlock({ item, onClose }: { item: MegaItem; onClose: () => void }) {
  return (
    <div>
      <a
        href={item.href}
        onClick={onClose}
        className="group/link inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        {item.label}
        <ArrowRight
          className="size-3 text-primary opacity-0 transition-all group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
          aria-hidden
        />
      </a>
      {item.subLinks?.length ? (
        <SubLinkGrid subLinks={item.subLinks} itemHref={item.href} onClose={onClose} />
      ) : (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
      )}
    </div>
  );
}

/* ─────────────── PanelLayout */

const COL_CLASS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

function PanelLayout({
  panel,
  panelLabel,
  onClose,
}: {
  panel: MegaPanel;
  panelLabel: string;
  onClose: () => void;
}) {
  return (
    <div>
      {/* Top bar */}
      <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
          {panelLabel}
        </p>
        {panel.intro && (
          <a
            href={panel.intro.allHref}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            {panel.intro.allLabel}
            <ArrowRight className="size-3" aria-hidden />
          </a>
        )}
      </div>

      {/* Optional intro description */}
      {panel.intro?.desc && (
        <p className="mb-6 max-w-2xl text-[0.8125rem] text-muted-foreground">
          {panel.intro.desc}
        </p>
      )}

      {/* Groups */}
      <div className="space-y-7">
        {panel.groups.map((group, gi) => {
          const n = group.items.length;
          const key = (group.cols ??
            (n <= 2 ? 2 : n <= 3 ? 3 : n <= 5 ? n : n === 6 ? 3 : 4)) as 1 | 2 | 3 | 4 | 5;
          return (
            <div key={gi}>
              {group.title && (
                <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground/40">
                  {group.title}
                </p>
              )}
              <div className={cn("grid gap-x-8 gap-y-5", COL_CLASS[key])}>
                {group.items.map((item) => (
                  <ItemBlock key={item.label} item={item} onClose={onClose} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── SiteHeader */

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">

      {/* ── Top bar */}
      <div className="section-x mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">

        <a href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-base leading-none">O</span>
          </span>
          <span className="font-display truncate text-lg tracking-tight">Oasis Recovery</span>
        </a>

        <div className="flex items-center gap-2">
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

      {/* ── Desktop mega panel */}
      {activeMega && activeEntry?.panel && (
        <div
          role="dialog"
          aria-label={`${activeMega} menu`}
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          className="animate-in fade-in slide-in-from-top-2 absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-[var(--shadow-lift)] duration-150"
        >
          <div className="section-x mx-auto max-w-7xl py-7">
            <PanelLayout
              panel={activeEntry.panel}
              panelLabel={activeMega}
              onClose={closeMega}
            />
          </div>
        </div>
      )}

      {/* ── Mobile nav */}
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
