import heroImg from "@/assets/sandys-hero.jpg.asset.json";
import { PHONE, PHONE_TEL } from "@/lib/site";
import { CountUp } from "./count-up";
import { ArrowRight, PhoneIcon } from "./icons";
import { delay } from "./use-reveal";

const STATS = [
  { value: <CountUp to={20} suffix="+ yrs" delayMs={900} />, label: "Local experience" },
  { value: "Fixed", label: "Priced in writing" },
  { value: <><CountUp to={4.9} decimals={1} delayMs={900} /> / 5</>, label: "Customer rating" },
  { value: "24/7", label: "Emergency callout" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-scrim">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroImg.url}
          alt="Rain running into a street drain at dusk"
          className="hero-media size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[image:var(--hero-scrim)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-124px)] max-w-[1200px] flex-col justify-end gap-14 px-6 pt-24 lg:h-[780px] lg:min-h-0 lg:px-0">
        <div className="flex max-w-[660px] flex-col gap-7">
          <div className="intro-fade flex items-center gap-2.5" style={delay(100)}>
            <span className="pulse-dot size-1.5 rounded-pill bg-amber" />
            <span className="eyebrow tracking-[0.2em] text-on-dark-muted">Bicester · Oxfordshire · 24/7</span>
          </div>

          <h1 className="font-display text-[56px] leading-[0.98] tracking-[-0.025em] text-on-dark sm:text-[72px] lg:text-[88px] lg:leading-[88px]">
            <span className="line-mask">
              <span style={delay(200)}>Blocked drains,</span>
            </span>
            <span className="line-mask">
              <span className="text-amber italic" style={delay(340)}>
                sorted properly.
              </span>
            </span>
          </h1>

          <p className="intro-fade max-w-[500px] text-[17px] leading-7 text-on-dark-muted" style={delay(560)}>
            CCTV surveys, drain excavation and lead pipe replacement across Bicester and north
            Oxfordshire. One specialist crew, a clear price, and a tidy site when we leave.
          </p>

          <div className="intro-fade flex flex-wrap items-center gap-3.5" style={delay(700)}>
            <a href="#contact" className="btn-pill btn-amber h-[54px] px-[30px] text-sm">
              Get a free quote <ArrowRight className="btn-arrow" />
            </a>
            <a href={PHONE_TEL} className="btn-pill btn-ghost-dark h-[54px] px-[26px] text-sm">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 border-t border-on-dark-line pt-6 pb-9 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`intro-fade flex flex-col-reverse gap-1.5 py-3 lg:py-0 ${i % 2 === 1 ? "border-l border-on-dark-line pl-6 lg:pl-10" : ""} ${i === 2 ? "lg:border-l lg:border-on-dark-line lg:pl-10" : ""}`}
              style={delay(850 + i * 90)}
            >
              <dt className="eyebrow tracking-[0.14em] text-on-dark-faint">{s.label}</dt>
              <dd className="font-display text-[28px] leading-[30px] text-on-dark">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
