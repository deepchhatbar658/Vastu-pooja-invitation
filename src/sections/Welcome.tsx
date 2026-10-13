import { useRef } from 'react';
import { ASSETS } from '../data/assets';
import { INVITATION } from '../data/invitation';
import { Reveal } from '../components/Reveal';
import { useInViewVideo } from '../hooks/useInViewVideo';

/** A quiet interlude: gliding through the decorated hallway of the new home. */
export function Welcome() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useInViewVideo(videoRef, { once: true, threshold: 0.5 });
  const { welcome } = INVITATION;

  return (
    <section className="relative h-[86svh] min-h-[540px] overflow-hidden" aria-label="Welcome">
      <video
        ref={videoRef}
        src={ASSETS.videos.hallwayGlide.src}
        poster={ASSETS.videos.hallwayGlide.poster}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="feather-ivory absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[480px] px-8 pt-10 text-center">
        <Reveal>
          <p className="eyebrow">Swagatam</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 lang="gu" className="font-gujarati mt-4 text-balance text-[1.75rem] font-semibold leading-snug text-maroon">
            {welcome.gu}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-serif mt-2 text-xl italic text-ink-soft">{welcome.en}</p>
        </Reveal>
      </div>
    </section>
  );
}
