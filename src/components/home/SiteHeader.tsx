import { useState } from "react";
import { Menu, Phone, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Treatment", href: "#treatment" },
  { label: "Our Facility", href: "#facility" },
  { label: "Admissions", href: "#admissions" },
  { label: "Our Team", href: "#team" },
  { label: "Family Support", href: "#family" },
  { label: "Resources", href: "#resources" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="section-x mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-base leading-none">O</span>
          </span>
          <span className="font-display truncate text-lg tracking-tight">Oasis Recovery</span>
        </a>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">
              <Phone aria-hidden /> Speak to us
            </a>
          </Button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-grid h-10 w-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <Menu className="hidden" /> : null}
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="section-x mx-auto max-w-7xl py-2" aria-label="Mobile">
            <ul className="divide-y divide-border">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium"
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                  </a>
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
      ) : null}
    </header>
  );
}
