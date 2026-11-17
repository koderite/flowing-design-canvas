import type { ReactNode } from "react";
import { AREAS, EMAIL, PHONE, PHONE_TEL, SERVICES } from "@/lib/site";
import { ArrowRight } from "./icons";
import { delay } from "./use-reveal";

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] leading-3 font-medium tracking-[0.18em] text-on-dark-faint uppercase">{title}</span>
      {children}
    </div>
  );
}

const item = "text-sm leading-7 text-on-dark-muted";

export function Footer() {
  return (
    <footer className="bg-ink-deep pt-24 pb-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 lg:px-0">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div data-reveal className="flex flex-col gap-3">
            <span className="font-display text-[52px] leading-[54px] tracking-[-0.02em] text-on-dark">
              Sandy’s<span className="text-amber">.</span>
            </span>
            <span className="text-[13px] text-on-dark-faint">
              Plumbing &amp; Drainage · Bicester &amp; north Oxfordshire
            </span>
          </div>
          <div data-reveal style={delay(100)} className="flex flex-wrap items-center gap-7">
            <div className="flex flex-col gap-1 lg:items-end">
              <span className="text-[10px] leading-3 font-medium tracking-[0.18em] text-on-dark-faint uppercase">
                24/7 emergency
              </span>
              <a href={PHONE_TEL} className="font-display text-[30px] leading-8 text-on-dark transition-colors hover:text-amber">
                {PHONE}
              </a>
            </div>
            <a href="#contact" className="btn-pill btn-ghost-dark h-[50px] px-[26px] text-[13px]">
              Get a quote <ArrowRight className="btn-arrow" width={13} height={13} />
            </a>
          </div>
        </div>

        <div data-reveal="line" className="h-px bg-on-dark-line" />

        <div className="grid grid-cols-2 gap-10 md:grid-cols-[320px_1fr_1fr_1fr]">
          <div data-reveal className="col-span-2 md:col-span-1">
            <Col title="Depot">
              <p className={`${item} leading-6`}>
                Royal Oak House, 2 Worminghall Road,
                <br />
                Oakley, Aylesbury HP18 9QY
              </p>
              <a href={`mailto:${EMAIL}`} className={`${item} pt-1.5 transition-colors hover:text-on-dark`}>
                {EMAIL}
              </a>
            </Col>
          </div>
          <div data-reveal style={delay(80)}>
            <Col title="Services">
              {SERVICES.map((s) => (
                <a key={s.short} href="#services" className={`${item} transition-colors hover:text-on-dark`}>
                  {s.short}
                </a>
              ))}
            </Col>
          </div>
          <div data-reveal style={delay(160)}>
            <Col title="Areas served">
              {AREAS.map((a) => (
                <span key={a} className={item}>
                  {a}
                </span>
              ))}
            </Col>
          </div>
          <div data-reveal style={delay(240)}>
            <Col title="Opening hours">
              <span className={item}>Weekdays · 8am to 6pm</span>
              <span className={item}>Saturday · 8am to 1pm</span>
              <span className={item}>Sunday · emergencies only</span>
              <span className="text-sm leading-7 text-amber">24/7 emergency line</span>
            </Col>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-on-dark-line pt-6 sm:flex-row sm:items-center">
          <span className="text-xs text-on-dark-faint">© 2026 Sandy’s Plumbing &amp; Drainage Ltd. All rights reserved.</span>
          <span className="text-[10px] leading-3 font-medium tracking-[0.16em] text-on-dark-faint uppercase">
            £5m public liability insured
          </span>
        </div>
      </div>
    </footer>
  );
}
