import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function ArrowRight(props: P) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon(props: P) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path
        d="M3.2 2.2h2.1l1 2.6-1.3 1c.5 1.2 1.4 2.1 2.6 2.6l1-1.3 2.6 1v2.1c0 .6-.5 1.1-1.1 1C5.6 11 3 8.4 2.2 3.3c0-.6.4-1.1 1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M6 1.2 10.2 3v3.1c0 2.4-1.7 4.1-4.2 4.7C3.5 10.2 1.8 8.5 1.8 6.1V3L6 1.2Z" stroke="currentColor" />
      <path d="m4.2 6 1.3 1.3 2.3-2.4" stroke="currentColor" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="m1.8 6.2 2.6 2.6L10.2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon(props: P) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden {...props}>
      <path d="M7 0.8l1.8 3.9 4.2.5-3.1 2.9.8 4.2L7 10.3 3.3 12.3l.8-4.2L1 5.2l4.2-.5L7 .8Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronDown(props: P) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo(props: P) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden {...props}>
      <circle cx="13" cy="13" r="12" className="stroke-ink" />
      <path
        d="M13 5.5c2.4 3.1 4.4 5.4 4.4 8a4.4 4.4 0 1 1-8.8 0c0-2.6 2-4.9 4.4-8Z"
        className="stroke-brand"
        strokeWidth="1.2"
      />
    </svg>
  );
}
