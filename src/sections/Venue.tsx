import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Copy, Navigation } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { INVITATION } from '../data/invitation';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/Ornament';

export function Venue() {
  const { venue } = INVITATION;
  const photoRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.14, 1]);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.line1}, ${venue.line2}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the address is visible anyway.
    }
  };

  return (
    <section className="section !pt-6" aria-label="Venue">
      <Reveal>
        <SectionHeading eyebrow="The venue" gu="સ્થળ" en="Our new home" />
      </Reveal>

      <Reveal className="mt-9">
        <figure ref={photoRef} className="relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_24px_50px_-24px_rgba(69,18,27,0.55)]">
          <motion.img
            src={ASSETS.images.homeAtDusk}
            alt="Our new home at dusk, lit with diyas"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale }}
          />
        </figure>
      </Reveal>

      <Reveal className="mt-8 text-center">
        <p className="font-serif text-[1.65rem] font-semibold leading-tight text-maroon-deep">{venue.line1}</p>
        <p className="font-serif mt-1 text-lg text-ink-soft">{venue.line2}</p>
      </Reveal>

      <Reveal className="mt-7 flex justify-center gap-3">
        <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary">
          <Navigation size={16} strokeWidth={1.8} />
          Directions
        </a>
        <button type="button" onClick={copyAddress} className="btn-outline" aria-live="polite">
          {copied ? <Check size={16} strokeWidth={1.8} /> : <Copy size={16} strokeWidth={1.6} />}
          {copied ? 'Copied' : 'Copy address'}
        </button>
      </Reveal>
    </section>
  );
}
