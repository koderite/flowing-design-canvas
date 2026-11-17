import { useEffect, useState } from "react";
import { EMAIL, PHONE, PHONE_TEL } from "@/lib/site";
import { ArrowRight, Logo, PhoneIcon, ShieldIcon } from "./icons";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Sandy’s", href: "#about" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

export function TopBar() {
  return (
    <div className="bg-ink-deep">
      <div className="mx-auto flex h-11 max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-0">
        <div className="flex items-center gap-2 text-amber">
          <ShieldIcon />
          <span className="eyebrow tracking-[0.12em] text-on-dark-muted">
            WaterSafe approved <span className="hidden sm:inline">&amp; CHAS accredited</span>
          </span>
        </div>
        <div className="flex items-center gap-7">
          <span className="eyebrow hidden tracking-[0.12em] text-on-dark-faint md:inline">
            Bicester · Aylesbury · Oxfordshire
          </span>
          <a href={PHONE_TEL} className="group flex items-center gap-2">
            <span className="eyebrow hidden tracking-[0.12em] text-on-dark-faint sm:inline">24/7 callout</span>
            <span className="text-xs font-medium text-on-dark transition-colors group-hover:text-amber">
              {PHONE}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled || open}
      className={`site-header sticky top-0 z-50 border-b border-hairline bg-ground ${scrolled ? "h-[72px]" : "h-20 lg:h-24"}`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-0">
        <a href="#top" className="group flex items-center gap-3.5" aria-label="Sandy’s Plumbing & Drainage, home">
          <Logo className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
          <span className="flex flex-col gap-px">
            <span className="font-display text-[27px] leading-7 tracking-[-0.01em] text-ink">Sandy’s</span>
            <span className="text-[9px] leading-3 font-medium tracking-[0.22em] text-ink-muted uppercase">
              Plumbing &amp; Drainage
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link text-sm text-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={PHONE_TEL} className="text-[13px] text-ink-muted transition-colors hover:text-ink">
            {PHONE}
          </a>
          <a href="#contact" className="btn-pill btn-amber h-[42px] px-[22px] text-[13px] tracking-[0.01em]">
            Get a quote
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PHONE_TEL}
            aria-label={`Call ${PHONE}`}
            className="flex size-10 items-center justify-center rounded-pill border border-hairline text-ink"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative flex size-10 items-center justify-center rounded-pill bg-ink text-surface"
          >
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[72px] bottom-0 bg-ground transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav className="flex flex-col px-6 pt-6" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-hairline py-5 font-display text-4xl text-ink transition-all duration-700 ease-[var(--ease-out-expo)] ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {n.label}
              <ArrowRight className="text-brand" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-pill btn-amber mt-8 h-[54px] text-sm"
          >
            Get a free quote <ArrowRight className="btn-arrow" />
          </a>
          <a href={`mailto:${EMAIL}`} className="mt-6 text-center text-sm text-ink-muted">
            {EMAIL}
          </a>
        </nav>
      </div>
    </header>
  );
}
