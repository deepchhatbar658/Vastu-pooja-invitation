import { ReactNode } from 'react';

interface DividerProps {
  className?: string;
  tone?: 'gold' | 'light';
}

/** Thin gold rule with a lotus-diamond centre. */
export function Divider({ className = '', tone = 'gold' }: DividerProps) {
  const stroke = tone === 'gold' ? 'var(--color-gold)' : 'var(--color-gold-light)';
  return (
    <svg
      className={`mx-auto block h-3 w-40 ${className}`}
      viewBox="0 0 160 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 6 H64" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <path d="M96 6 H158" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="68" cy="6" r="1.2" fill={stroke} />
      <circle cx="92" cy="6" r="1.2" fill={stroke} />
      <path d="M80 1 L85 6 L80 11 L75 6 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
      <circle cx="80" cy="6" r="1.4" fill={stroke} />
    </svg>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  /** Extra lines shown under the heading, above the divider. */
  children?: ReactNode;
  gu: string;
  en?: string;
  tone?: 'dark' | 'light';
}

export function SectionHeading({ eyebrow, gu, en, children, tone = 'dark' }: SectionHeadingProps) {
  const light = tone === 'light';
  return (
    <div className="text-center">
      <p className={`eyebrow ${light ? 'text-gold-light' : ''}`}>{eyebrow}</p>
      <h2
        lang="gu"
        className={`font-gujarati mt-3 text-[1.9rem] font-semibold leading-snug ${
          light ? 'text-ivory' : 'text-maroon'
        }`}
      >
        {gu}
      </h2>
      {en && (
        <p
          className={`font-serif mt-1 text-lg italic ${
            light ? 'text-ivory/80' : 'text-ink-soft'
          }`}
        >
          {en}
        </p>
      )}
      {children}
      <Divider className="mt-5" tone={light ? 'light' : 'gold'} />
    </div>
  );
}
