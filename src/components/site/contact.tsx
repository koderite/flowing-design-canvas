import { useState, type FormEvent, type ReactNode } from "react";
import chas from "@/assets/badge-chas.png.asset.json";
import constructionline from "@/assets/badge-constructionline.png.asset.json";
import trustatrader from "@/assets/badge-trustatrader.png.asset.json";
import watersafe from "@/assets/badge-watersafe.png.asset.json";
import { EMAIL, LANDLINE, LANDLINE_TEL, PHONE, PHONE_TEL, SERVICES } from "@/lib/site";
import { ArrowRight, CheckIcon, ChevronDown, ShieldIcon } from "./icons";
import { delay } from "./use-reveal";

const BADGES = [
  { src: watersafe.url, alt: "WaterSafe quality assured", className: "h-[50px] w-[120px]" },
  { src: chas.url, alt: "CHAS accredited", className: "h-[51px] w-[68px]" },
  { src: constructionline.url, alt: "Constructionline member", className: "h-[60px] w-[62px]" },
  { src: trustatrader.url, alt: "TrustATrader approved", className: "size-14" },
];

function Row({ label, children, last }: { label: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-baseline gap-4 border-t border-hairline py-4 ${last ? "border-b" : ""}`}>
      <span className="eyebrow w-24 shrink-0 tracking-[0.14em] text-ink-faint">{label}</span>
      <div className="text-[15px] leading-6 text-ink">{children}</div>
    </div>
  );
}

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please add your name";
    if (!phone && !email) next.phone = "Add a phone number or email";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email looks off";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  }

  return (
    <section id="contact" className="bg-ground py-24 lg:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 lg:flex-row lg:gap-24 lg:px-0">
        <div id="areas" className="flex flex-col gap-[26px] lg:w-[520px] lg:shrink-0">
          <div data-reveal className="flex items-center gap-3">
            <span className="h-px w-7 shrink-0 bg-brand" />
            <span className="eyebrow text-ink-muted">Get in touch</span>
          </div>
          <h2
            data-reveal
            style={delay(80)}
            className="font-display text-[44px] leading-[1.07] tracking-[-0.022em] text-ink lg:text-[56px] lg:leading-[60px]"
          >
            Tell us what’s
            <br />
            happening.
          </h2>
          <p data-reveal style={delay(160)} className="max-w-[440px] text-[15px] leading-[26px] text-ink-muted">
            Send a note or call the crew direct. For active leaks and flooding, please ring us. It’s
            quicker than a form.
          </p>
          <div data-reveal style={delay(240)} className="max-w-[460px] pt-1.5">
            <Row label="Phone">
              <span className="font-medium">
                <a href={PHONE_TEL} className="transition-colors hover:text-brand">{PHONE}</a>
                <span className="mx-2 text-ink-faint">·</span>
                <a href={LANDLINE_TEL} className="transition-colors hover:text-brand">{LANDLINE}</a>
              </span>
            </Row>
            <Row label="Email">
              <a href={`mailto:${EMAIL}`} className="break-all transition-colors hover:text-brand">{EMAIL}</a>
            </Row>
            <Row label="Depot">
              Royal Oak House, 2 Worminghall Road,
              <br />
              Oakley, Aylesbury HP18 9QY
            </Row>
            <Row label="Hours" last>
              Weekdays 8am to 6pm · Sat 8am to 1pm
              <br />
              <span className="text-brand">Emergency callouts 24/7</span>
            </Row>
          </div>
          <div data-reveal style={delay(320)} className="flex flex-col gap-[18px] pt-3.5">
            <span className="text-[10px] leading-3 font-medium tracking-[0.18em] text-ink-faint uppercase">
              Accredited &amp; insured
            </span>
            <div className="flex flex-wrap items-center gap-7">
              {BADGES.map((b) => (
                <img
                  key={b.alt}
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className={`${b.className} object-contain grayscale-[35%] transition-[filter,transform] duration-500 hover:-translate-y-0.5 hover:grayscale-0`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          data-reveal
          style={delay(200)}
          className="relative flex-1 overflow-hidden rounded-sm border border-hairline bg-surface p-6 sm:p-10"
        >
          <form
            onSubmit={onSubmit}
            noValidate
            aria-hidden={sent}
            className={`flex flex-col gap-[22px] transition-all duration-700 ease-[var(--ease-out-expo)] ${sent ? "pointer-events-none -translate-y-4 opacity-0 blur-sm" : ""}`}
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-[27px] leading-8 text-ink">Quick enquiry</h3>
              <p className="text-[13px] text-ink-muted">No obligation. We reply within one working hour.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Jane Whitfield" autoComplete="name" error={errors.name} />
              <Field label="Phone" name="phone" type="tel" placeholder="07700 900 123" autoComplete="tel" error={errors.phone} />
            </div>
            <Field label="Email" name="email" type="email" placeholder="jane@example.co.uk" autoComplete="email" error={errors.email} />
            <label className="flex flex-col gap-2">
              <span className="text-[11px] leading-[14px] font-medium tracking-[0.1em] text-ink-muted uppercase">
                What do you need?
              </span>
              <span className="relative">
                <select name="service" className="field h-12 appearance-none px-3.5 pr-10" defaultValue="emergency">
                  <option value="emergency">Blocked drain · emergency</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.short}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-muted" />
              </span>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] leading-[14px] font-medium tracking-[0.1em] text-ink-muted uppercase">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Where is the problem, and when did it start?"
                className="field h-[104px] resize-none p-3.5 leading-[22px]"
              />
            </label>
            <button type="submit" disabled={sending} className="btn-pill btn-amber h-[52px] w-full text-sm disabled:opacity-80">
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 animate-spin rounded-pill border-2 border-surface/40 border-t-surface" />
                  Sending
                </span>
              ) : (
                <>
                  Send enquiry <ArrowRight className="btn-arrow" />
                </>
              )}
            </button>
            <p className="flex items-center gap-2 text-xs text-ink-muted">
              <ShieldIcon width={11} height={11} className="text-ink-faint" />
              Your details stay with us. No marketing lists.
            </p>
          </form>

          <div
            role="status"
            className={`absolute inset-0 flex flex-col items-center justify-center gap-5 p-10 text-center transition-all duration-700 ease-[var(--ease-out-expo)] ${sent ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"}`}
          >
            {sent && (
              <>
                <span className="flex size-14 items-center justify-center rounded-pill bg-brand text-surface animate-in zoom-in-50 duration-700">
                  <CheckIcon width={20} height={20} />
                </span>
                <h3 className="font-display text-[34px] leading-10 text-ink">Thanks, we’ve got it.</h3>
                <p className="max-w-[320px] text-sm leading-6 text-ink-muted">
                  Sandy or one of the crew will be in touch within the hour. If water is coming in, call{" "}
                  <a href={PHONE_TEL} className="font-medium text-brand">{PHONE}</a>.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="link-arrow text-[13px]"
                >
                  Send another enquiry
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  error?: string | undefined;
};

function Field({ label, name, placeholder, type = "text", autoComplete, error }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] leading-[14px] font-medium tracking-[0.1em] text-ink-muted uppercase">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className="field h-12 px-3.5"
      />
      <span
        className={`grid text-xs text-destructive transition-all duration-500 ease-[var(--ease-out-expo)] ${error ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <span className="overflow-hidden">{error}</span>
      </span>
    </label>
  );
}
