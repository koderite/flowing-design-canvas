import type { ReactNode } from "react";
import emergencyImg from "@/assets/sandys-emergency.jpg.asset.json";
import mainsImg from "@/assets/sandys-mains.jpg.asset.json";
import { PHONE, PHONE_TEL, SERVICES } from "@/lib/site";
import { ArrowRight, CheckIcon, StarIcon } from "./icons";
import { delay } from "./use-reveal";

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-reveal className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-7 shrink-0 bg-brand" />
      <span className="eyebrow text-ink-muted">{children}</span>
    </div>
  );
}

const container = "mx-auto w-full max-w-[1200px] px-6 lg:px-0";

export function Intro() {
  return (
    <section id="about" className="bg-surface py-20 lg:py-[104px]">
      <div className={`${container} flex flex-col gap-10 lg:flex-row lg:gap-20`}>
        <div data-reveal className="flex w-[200px] shrink-0 flex-col gap-3.5 pt-2.5">
          <span className="h-px w-7 bg-brand" />
          <span className="eyebrow text-ink-muted">
            The local
            <br />
            specialists
          </span>
        </div>
        <div className="flex max-w-[880px] flex-col gap-7">
          <h2
            data-reveal
            style={delay(80)}
            className="font-display text-[34px] leading-[1.2] tracking-[-0.015em] text-ink lg:text-[44px] lg:leading-[54px]"
          >
            A family-run drainage crew that finds out why it blocked, then fixes that too.
          </h2>
          <div className="grid gap-6 text-base leading-[27px] text-ink-muted md:grid-cols-2 md:gap-14">
            <p data-reveal style={delay(160)}>
              Sandy’s Plumbing &amp; Drainage works across Bicester, Aylesbury and the villages in
              between. After twenty years on local ground, we can usually tell a collapsing Victorian
              clay run before the camera goes in.
            </p>
            <p data-reveal style={delay(240)}>
              Every job starts with a proper diagnosis and a written price. One crew handles the
              survey, the repair, putting the ground back and the paperwork. You deal with one phone
              number and get one guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-ground pt-24 pb-20 lg:pt-32 lg:pb-24">
      <div className={`${container} flex flex-col gap-14`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex max-w-[640px] flex-col gap-5">
            <Eyebrow>What we do</Eyebrow>
            <h2
              data-reveal
              style={delay(80)}
              className="font-display text-[42px] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[56px] lg:leading-[62px]"
            >
              One crew for every
              <br />
              drainage problem.
            </h2>
          </div>
          <div data-reveal style={delay(160)} className="flex max-w-[360px] flex-col gap-[18px]">
            <p className="text-[15px] leading-[26px] text-ink-muted">
              Emergency clearance or a full mains replacement, you get the same specialist team and
              a written price.
            </p>
            <a href="#contact" className="link-arrow self-start text-[13px]">
              All services &amp; pricing <ArrowRight width={13} height={13} />
            </a>
          </div>
        </div>

        <ul className="flex flex-col">
          {SERVICES.map((s, i) => (
            <li key={s.title} data-reveal style={delay(i * 70)}>
              <a
                href="#contact"
                className="service-row grid grid-cols-[32px_1fr_auto] items-center gap-x-5 gap-y-3 border-t border-hairline py-7 md:grid-cols-[44px_minmax(0,440px)_1fr_auto] md:gap-x-10 md:py-8 lg:px-0"
              >
                <span className="service-num text-xs leading-4 font-medium tracking-[0.08em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="service-title font-display text-[26px] leading-8 tracking-[-0.01em] text-ink md:text-[31px] md:leading-[38px]">
                  {s.title}
                </span>
                <span className="col-start-2 row-start-2 text-[15px] leading-[25px] text-ink-muted md:col-start-3 md:row-start-1">
                  {s.body}
                </span>
                <span className="service-cta col-start-3 row-start-1 flex size-[42px] items-center justify-center rounded-pill border border-hairline text-ink md:col-start-4">
                  <ArrowRight />
                </span>
              </a>
            </li>
          ))}
          <li data-reveal="line" className="h-px bg-hairline" />
        </ul>
      </div>
    </section>
  );
}

export function Mains() {
  const points = [
    "Full replacement, boundary to stopcock",
    "Trenching and reinstatement included",
    "WaterSafe registered and fully certified",
  ];
  return (
    <section className="flex flex-col bg-surface lg:flex-row">
      <div data-reveal="image" className="relative h-[420px] overflow-hidden lg:h-auto lg:min-h-[720px] lg:w-[43%] lg:shrink-0">
        <img
          src={mainsImg.url}
          alt="New copper pipework with brass fittings"
          loading="lazy"
          className="parallax absolute inset-0 size-full scale-[1.16] object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[26px] px-6 py-20 lg:py-24 lg:pr-[120px] lg:pl-[88px]">
        <Eyebrow>Water mains &amp; lead pipe</Eyebrow>
        <h2
          data-reveal
          style={delay(80)}
          className="max-w-[560px] font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[54px] lg:leading-[60px]"
        >
          Clean water, from the boundary to your tap.
        </h2>
        <p data-reveal style={delay(160)} className="max-w-[470px] text-base leading-7 text-ink-muted">
          Still got lead supply pipes, or a shared main that keeps losing pressure? We replace the
          whole run. Trenching, connection, testing and certification are all included.
        </p>
        <ul className="flex max-w-[470px] flex-col border-t border-hairline">
          {points.map((p, i) => (
            <li
              key={p}
              data-reveal
              style={delay(220 + i * 80)}
              className="flex items-center gap-3.5 border-b border-hairline py-3.5 text-sm text-ink"
            >
              <CheckIcon className="text-brand" />
              {p}
            </li>
          ))}
        </ul>
        <a data-reveal style={delay(480)} href="#contact" className="link-arrow self-start pt-2 text-sm">
          Book a mains survey <ArrowRight width={13} height={13} />
        </a>
      </div>
    </section>
  );
}

export function Emergency() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={emergencyImg.url}
          alt=""
          loading="lazy"
          className="parallax absolute inset-0 size-full scale-[1.16] object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--band-scrim)]" />
      </div>
      <div className={`${container} flex flex-col justify-between gap-12 py-20 lg:h-[460px] lg:flex-row lg:items-center lg:py-0`}>
        <div className="flex max-w-[640px] flex-col gap-5">
          <div data-reveal className="flex items-center gap-2.5">
            <span className="pulse-dot size-1.5 rounded-pill bg-amber" />
            <span className="eyebrow tracking-[0.2em] text-on-dark-muted">Emergency callout · 24 hours</span>
          </div>
          <h2
            data-reveal
            style={delay(100)}
            className="font-display text-[40px] leading-[1.1] tracking-[-0.022em] text-on-dark lg:text-[58px] lg:leading-[64px]"
          >
            Water where it shouldn’t be?
            <br />
            <span className="text-amber italic">We’ll be there today.</span>
          </h2>
        </div>
        <div data-reveal style={delay(200)} className="flex flex-col gap-5 lg:items-end">
          <span className="eyebrow text-on-dark-faint">Call the crew direct</span>
          <a
            href={PHONE_TEL}
            className="font-display text-[38px] leading-10 text-on-dark transition-colors duration-500 hover:text-amber"
          >
            {PHONE}
          </a>
          <a href="#contact" className="btn-pill btn-amber h-[52px] self-start px-7 text-sm lg:self-auto">
            Request a callout <ArrowRight className="btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    tag: "Diagnose",
    title: "We find the cause",
    body: "We put a camera down the line, show you the footage and talk you through the options.",
  },
  {
    tag: "Price it",
    title: "A fixed written quote",
    body: "One price for the whole job before any work starts. No day rates, and no extras that turn up halfway through.",
  },
  {
    tag: "Fix it",
    title: "Same crew, guaranteed",
    body: "We do the repair, put the ground back and clear the site. Our workmanship guarantee comes in writing.",
  },
];

export function Process() {
  return (
    <section className="bg-ground py-24 lg:py-32">
      <div className={`${container} flex flex-col gap-16`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex max-w-[560px] flex-col gap-5">
            <Eyebrow>How it works</Eyebrow>
            <h2
              data-reveal
              style={delay(80)}
              className="font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[52px] lg:leading-[58px]"
            >
              Three steps, start to finish.
            </h2>
          </div>
          <p data-reveal style={delay(160)} className="max-w-[360px] text-[15px] leading-[26px] text-ink-muted">
            You’ll know what we’re doing and what it costs before anyone picks up a tool.
          </p>
        </div>
        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.tag} className="relative flex flex-col gap-3.5 pt-[26px]">
              <span className="absolute inset-x-0 top-0 h-px bg-hairline" />
              <span
                data-reveal="line"
                style={delay(200 + i * 260)}
                className="absolute inset-x-0 top-0 h-px bg-ink"
              />
              <span data-reveal style={delay(260 + i * 160)} className="eyebrow tracking-[0.16em] text-brand">
                0{i + 1}
                <span className="ml-3">{s.tag}</span>
              </span>
              <h3
                data-reveal
                style={delay(320 + i * 160)}
                className="font-display text-[28px] leading-[34px] tracking-[-0.01em] text-ink"
              >
                {s.title}
              </h3>
              <p data-reveal style={delay(380 + i * 160)} className="text-sm leading-6 text-ink-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className={`${container} flex flex-col gap-16`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <Eyebrow>What customers say</Eyebrow>
            <h2
              data-reveal
              style={delay(80)}
              className="font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[52px] lg:leading-[58px]"
            >
              Trusted across north Oxfordshire.
            </h2>
          </div>
          <div data-reveal style={delay(160)} className="flex flex-col gap-2 lg:items-end">
            <div className="flex items-center gap-1.5 text-brand" aria-label="Rated 4.9 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="text-[13px] text-ink-muted">4.9 average · 120+ local reviews</span>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[72px]">
          <figure className="relative flex flex-col gap-[26px] pt-[34px] lg:w-[540px] lg:shrink-0">
            <span className="absolute inset-x-0 top-0 h-px bg-hairline" />
            <span data-reveal="line" className="absolute inset-x-0 top-0 h-px bg-ink" />
            <span data-reveal className="h-6 font-display text-[60px] leading-[34px] text-brand" aria-hidden>
              “
            </span>
            <blockquote
              data-reveal
              style={delay(100)}
              className="font-display text-[26px] leading-[36px] tracking-[-0.01em] text-ink lg:text-[31px] lg:leading-[42px]"
            >
              Sandy found a collapsed clay run two other firms had missed. Camera survey, a fixed
              price that afternoon, new pipe in and the drive reinstated in two days. Faultless.
            </blockquote>
            <figcaption data-reveal style={delay(200)} className="flex items-center gap-3">
              <span className="flex size-[38px] items-center justify-center rounded-pill bg-brand-wash text-[11px] font-medium tracking-[0.06em] text-brand">
                RH
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-ink">Rebecca H.</span>
                <span className="text-xs text-ink-muted">Bicester · Drain excavation</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-1 flex-col">
            {[
              {
                q: "Called at 7am with a blocked kitchen drain. Cleared and camera-checked by lunchtime, and they explained why it kept happening.",
                who: "Tom & Priya M. · Aylesbury",
              },
              {
                q: "Replaced the lead main on our 1930s house. Tidy, on time, and the WaterSafe paperwork was all handled for us.",
                who: "James W. · Kidlington",
              },
            ].map((r, i) => (
              <figure
                key={r.who}
                data-reveal
                style={delay(150 + i * 120)}
                className={`group flex flex-col gap-4 border-t border-hairline py-[30px] ${i === 1 ? "border-b" : ""}`}
              >
                <blockquote className="font-display text-[21px] leading-8 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {r.q}
                </blockquote>
                <figcaption className="text-xs text-ink-muted">{r.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
