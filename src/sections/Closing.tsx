import { useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { INVITATION } from '../data/invitation';
import { Reveal } from '../components/Reveal';
import { Divider } from '../components/Ornament';
import { useInViewVideo } from '../hooks/useInViewVideo';

export function Closing({ onReplay }: { onReplay: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useInViewVideo(videoRef, { threshold: 0.25 });
  const { blessings, closing, hosts } = INVITATION;

  return (
    <section
      className="relative -mt-2 overflow-hidden rounded-t-[28px] bg-night text-ivory"
      aria-label="Blessings"
    >
      <video
        ref={videoRef}
        src={ASSETS.videos.pujaCinematic.src}
        poster={ASSETS.videos.pujaCinematic.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="closing-scrim absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[480px] flex-col items-center justify-center px-7 py-24 text-center">
        <Reveal>
          <p lang="gu" className="font-gujarati text-balance text-[1.35rem] leading-relaxed text-gold-light">
            {blessings.gu}
          </p>
          <p className="font-serif mt-2 text-balance text-lg italic text-ivory/80">{blessings.en}</p>
        </Reveal>

        <Reveal className="my-9 w-full" delay={0.1}>
          <Divider tone="light" />
        </Reveal>

        <Reveal delay={0.15}>
          <h2 lang="gu" className="font-gujarati text-[1.75rem] font-medium leading-relaxed tracking-wide text-gold-light">
            {closing.gu}
          </h2>
          <p className="font-serif mt-1 text-balance text-[1.6rem] font-light italic text-ivory/90">{closing.en}</p>
        </Reveal>

        <Reveal className="mt-12" delay={0.2}>
          <p className="eyebrow !text-gold-light">{closing.signOff}</p>
          <div className="mt-4 space-y-1">
            {hosts.couples.map((couple) => (
              <p key={couple} className="font-serif text-[1.7rem] font-medium leading-tight">
                {couple}
              </p>
            ))}
          </div>
          <p className="label mt-3 !text-ivory/60">{hosts.surname} Family</p>
        </Reveal>

        <Reveal className="mt-14" delay={0.25}>
          <button type="button" onClick={onReplay} className="label inline-flex items-center gap-2 !text-ivory/60 py-2">
            <RotateCcw size={13} strokeWidth={1.6} />
            Watch the doors open again
          </button>
        </Reveal>
      </div>
    </section>
  );
}
