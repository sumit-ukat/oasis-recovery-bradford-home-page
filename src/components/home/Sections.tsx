import {
  ArrowRight,
  Clock,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Leaf,
  CalendarCheck,
  Sparkles,
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

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const LOREM_LONG = `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

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
      <h2 className="mt-3 text-[1.75rem] leading-[1.15] sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-[0.9375rem] text-muted-foreground sm:text-base">{intro}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ Hero */

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

        {/* Hero image A — 4:3 on mobile so it never eats the first screen, 5:4 from lg */}
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

/* ------------------------------------------------------------- Treatment */

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
    <section id="treatment" className="section-x mx-auto max-w-7xl py-14 sm:py-20">
      <SectionHead
        eyebrow="Treatment"
        title="A programme built around the whole person"
        intro={LOREM}
      />
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {PROGRAMMES.map(({ icon: Icon, title, href }) => (
          <li
            key={title}
            className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
            <a
              href={href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Learn more <ArrowRight className="size-4" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------- Facility */

export function Facility() {
  return (
    <section id="facility" className="bg-secondary/50 py-14 sm:py-20">
      <div className="section-x mx-auto max-w-7xl">
        <SectionHead eyebrow="Our facility" title="A calm, private place to recover" intro={LOREM} />

        {/* Mobile: B full width 4:3, then C + D side by side 1:1. Desktop: B tall left, C/D stacked right. */}
        <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-4">
          <ImagePlaceholder
            letter="B"
            note="Facility main"
            className="aspect-[4/3] rounded-2xl sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
            <ImagePlaceholder
              letter="C"
              note="Bedroom"
              className="aspect-square rounded-2xl lg:aspect-[4/3]"
            />
            <ImagePlaceholder
              letter="D"
              note="Grounds"
              className="aspect-square rounded-2xl lg:aspect-[4/3]"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["En-suite rooms", "Private grounds", "Chef-prepared meals"].map((t) => (
            <div key={t} className="flex items-start gap-2.5 rounded-lg bg-card p-4">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{LOREM}</p>
              </div>
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

/* ------------------------------------------------------------ Admissions */

const STEPS = [
  "Confidential first call",
  "Clinical assessment",
  "Arrival & detox planning",
  "Therapy programme",
  "Aftercare & alumni",
];

export function Admissions() {
  return (
    <section id="admissions" className="section-x mx-auto max-w-7xl py-14 sm:py-20">
      <SectionHead
        eyebrow="Admissions"
        title="Getting started takes one phone call"
        intro={LOREM}
        align="center"
      />

      <ol className="relative mt-10 grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-4">
        {STEPS.map((step, i) => (
          <li key={step} className="relative flex gap-4 lg:block">
            <div className="flex flex-col items-center lg:flex-row lg:items-center">
              <span className="z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="w-px flex-1 bg-border lg:h-px lg:w-full lg:flex-1"
                />
              ) : null}
            </div>
            <div className="min-w-0 pb-2 lg:mt-4 lg:pr-6">
              <h3 className="text-base sm:text-lg">{step}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <Button asChild variant="cta" size="lg">
          <a href="/admissions/">
            <Phone aria-hidden /> Start your admissions today
          </a>
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Team */

const TEAM = [
  { letter: "E", role: "Placeholder role" },
  { letter: "F", role: "Placeholder role" },
  { letter: "G", role: "Placeholder role" },
];

export function Team() {
  return (
    <section id="team" className="bg-secondary/50 py-14 sm:py-20">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <SectionHead eyebrow="Our team" title="Led by experienced clinicians" intro={LOREM} />
          <a
            href="/about/our-team/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Meet the team <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.letter} className="overflow-hidden rounded-2xl bg-card">
              <ImagePlaceholder
                letter={m.letter}
                note="Team portrait"
                className="aspect-[3/2] rounded-none sm:aspect-[4/5]"
              />
              <div className="p-5">
                <h3 className="text-lg">Name Placeholder</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------- Family and aftercare */

export function FamilyAftercare() {
  return (
    <section id="family" className="section-x mx-auto max-w-7xl space-y-12 py-14 sm:space-y-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <ImagePlaceholder
          letter="H"
          note="Family support"
          className="aspect-[3/2] rounded-2xl lg:aspect-[4/3]"
        />
        <div>
          <SectionHead eyebrow="Family support" title="Recovery involves the whole family" />
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{LOREM_LONG}</p>
          <Button asChild variant="outline" size="lg" className="mt-6 w-full sm:w-auto">
            <a href="/rehab-programme/family-support/">Family support programme</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <ImagePlaceholder
          letter="I"
          note="Aftercare"
          className="aspect-[3/2] rounded-2xl lg:order-2 lg:aspect-[4/3]"
        />
        <div className="lg:order-1">
          <SectionHead eyebrow="Aftercare" title="Support that continues after you leave" />
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{LOREM_LONG}</p>
          <div className="mt-6 flex flex-wrap gap-3">
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

/* ---------------------------------------------------------- Testimonials */

export function Testimonials() {
  return (
    <section className="bg-deep py-14 text-deep-foreground sm:py-20">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div>
            <p className="eyebrow text-deep-foreground/60">Client stories</p>
            <h2 className="mt-3 max-w-xl text-[1.75rem] leading-[1.15] sm:text-4xl">
              What people say about Oasis
            </h2>
          </div>
          <a
            href="/reviews/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-deep-foreground/70 hover:text-deep-foreground hover:underline sm:inline-flex"
          >
            View all reviews <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="rounded-2xl border border-deep-foreground/15 bg-deep-foreground/5 p-6"
            >
              <p className="text-[0.9375rem] leading-relaxed text-deep-foreground/85">
                "{LOREM}"
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-deep-foreground/15 text-xs font-semibold">
                  ?
                </span>
                <span className="min-w-0 text-sm">
                  <span className="block truncate font-semibold">Client placeholder</span>
                  <span className="block truncate text-deep-foreground/60">Placeholder detail</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 sm:hidden">
          <a
            href="/reviews/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-deep-foreground/70 hover:text-deep-foreground hover:underline"
          >
            View all reviews <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

export function Faq() {
  return (
    <section className="section-x mx-auto max-w-3xl py-14 sm:py-20">
      <SectionHead eyebrow="FAQs" title="Common questions" align="center" />
      <Accordion type="single" collapsible className="mt-8">
        {[
          "How long does treatment last?",
          "Is treatment confidential?",
          "How much does it cost?",
          "Can family visit?",
          "Do you accept private insurance?",
        ].map((q) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {LOREM_LONG}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 text-center">
        <a
          href="/about/questions-and-answers/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View all FAQs <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Resources */

export function Resources() {
  return (
    <section id="resources" className="bg-secondary/50 py-14 sm:py-20">
      <div className="section-x mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <SectionHead eyebrow="Resources" title="Guides and articles" />
          <a
            href="/blog/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["J", "K", "L"].map((letter) => (
            <li key={letter} className="overflow-hidden rounded-2xl bg-card">
              <ImagePlaceholder
                letter={letter}
                note="Article"
                className="aspect-[16/9] rounded-none"
              />
              <div className="p-5">
                <p className="eyebrow">Category · 0 min read</p>
                <h3 className="mt-2 text-lg leading-snug">Article heading placeholder</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3 sm:hidden">
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

/* --------------------------------------------------------------- Contact */

export function Contact() {
  return (
    <section id="contact" className="section-x mx-auto max-w-7xl py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <SectionHead
            eyebrow="Contact"
            title="Talk to our admissions team today"
            intro={LOREM_LONG}
          />
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { icon: Phone, label: "Placeholder phone number" },
              { icon: Clock, label: "Open 24 hours, 7 days" },
              { icon: MapPin, label: "Placeholder address, Placeholder county" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0 truncate">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
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
              <Label htmlFor="enquiry">Enquiry type</Label>
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
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

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
      <div className="section-x mx-auto max-w-7xl py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="font-display text-lg">Oasis Recovery</a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
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
              <h3 className="text-sm font-semibold tracking-wide">{col.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-foreground hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © Placeholder. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- Mobile sticky action */

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
