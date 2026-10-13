import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ASSETS } from '../data/assets';
import { INVITATION } from '../data/invitation';
import { EASE_GENTLE } from '../components/Reveal';

// Moments in the door film (seconds of video time). The doors are fully open
// by ~4.5s; from ~8s the camera pushes into the light, which is where the film
// dissolves into the invitation card.
const TAGLINE_IN = 4.4;
const TAGLINE_OUT = 7.8;
const DISSOLVE_AT = 8.2;
const DISSOLVE_S = 1.2;
// The film plays slightly faster than recorded; the moments above stay in video time.
const PLAYBACK_RATE = 1.35;
// If the film makes no progress for this long (slow network), move on.
const STALL_MS = 5000;

type Phase = 'gate' | 'film' | 'dissolve';

interface OpeningProps {
  /** Called inside the tap gesture, so audio is allowed to start. */
  onOpen: () => void;
  /** Called once the screen is fully ivory and the page can take over. */
  onDone: () => void;
}

export function Opening({ onOpen, onDone }: OpeningProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>('gate');
  const [showTagline, setShowTagline] = useState(false);
  const finishedRef = useRef(false);
  const reduce = useReducedMotion();
  const { invocation, event, hosts } = INVITATION;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setShowTagline(false);
    setPhase('dissolve');
    window.setTimeout(onDone, DISSOLVE_S * 1000);
  }, [onDone]);

  useEffect(() => {
    const { documentElement: html, body } = document;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, []);

  const handleOpen = () => {
    if (phase !== 'gate') return;
    onOpen();
    if (reduce) {
      finish();
      return;
    }
    setPhase('film');
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = PLAYBACK_RATE;
    video.play().catch(finish);
  };

  // Drive the overlays from the video's own clock so they stay in sync even
  // if playback starts late on a slow connection.
  useEffect(() => {
    if (phase !== 'film') return;
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    let lastTime = -1;
    let lastProgressAt = performance.now();
    const tick = () => {
      const t = video.currentTime;
      const now = performance.now();
      if (t !== lastTime) {
        lastTime = t;
        lastProgressAt = now;
      }
      setShowTagline(t >= TAGLINE_IN && t < TAGLINE_OUT);
      if (t >= DISSOLVE_AT || video.ended || now - lastProgressAt > STALL_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, finish]);

  const gateIn = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE_GENTLE },
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-night"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      role="dialog"
      aria-label="Invitation opening"
    >
      <motion.video
        ref={videoRef}
        src={ASSETS.videos.doorReveal.src}
        poster={ASSETS.videos.doorReveal.poster}
        muted
        playsInline
        preload="auto"
        onError={() => phase === 'film' && finish()}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: reduce ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: 'easeOut' }}
      />

      {/* Gate: scrim, lamp glow and the invitation to open the doors */}
      <motion.div
        className="gate-scrim absolute inset-0"
        animate={{ opacity: phase === 'gate' ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <AnimatePresence>
        {phase === 'gate' && (
          <motion.div
            key="gate"
            className="absolute inset-0 flex flex-col items-center px-8 text-center"
            exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          >
            <div className="diya-glow" aria-hidden="true" />

            <div className="pt-[max(14svh,4.5rem)]">
              <motion.p {...gateIn(0.3)} lang="gu" className="font-gujarati text-lg text-gold-light">
                {invocation}
              </motion.p>
              <motion.p {...gateIn(0.55)} className="eyebrow mt-7 text-balance text-ivory/75">
                The {hosts.surname} family invites you
              </motion.p>
              <motion.h1
                {...gateIn(0.75)}
                lang="gu"
                className="font-gujarati mt-3 text-balance text-[2.15rem] font-semibold leading-tight text-gold-light [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
              >
                {event.title.gu}
              </motion.h1>
              <motion.p {...gateIn(0.95)} className="font-display mt-3 text-[0.8rem] tracking-[0.2em] text-ivory/85 uppercase">
                {event.title.en}
              </motion.p>
            </div>

            <div className="absolute inset-x-0 top-[54%] flex flex-col items-center">
              <motion.button
                {...gateIn(1.3)}
                type="button"
                onClick={handleOpen}
                className="btn-gate"
                aria-label="Open the doors and view the invitation"
              >
                Open the doors
              </motion.button>
              <motion.p {...gateIn(1.7)} className="label mt-4 text-ivory/60">
                Best with sound on
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tagline over the opened doors */}
      <AnimatePresence>
        {showTagline && (
          <motion.div
            key="tagline"
            className="tagline-scrim absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-[max(16svh,6rem)] pt-40 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <motion.p
              lang="gu"
              className="font-gujarati text-[2.1rem] font-semibold text-gold-light [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.6, ease: EASE_GENTLE }}
            >
              {event.tagline.gu}
            </motion.p>
            <p className="font-serif mt-1 text-xl italic text-ivory/90">{event.tagline.en}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'film' && (
        <motion.button
          type="button"
          onClick={finish}
          className="label absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 px-2 py-2 text-ivory/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Skip
        </motion.button>
      )}

      {/* Dissolve: the light blooms, then settles into the ivory page */}
      <motion.div
        className="light-bloom pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'dissolve' ? 1 : 0 }}
        transition={{ duration: DISSOLVE_S * 0.6, ease: 'easeIn' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-ivory"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'dissolve' ? 1 : 0 }}
        transition={{ duration: DISSOLVE_S * 0.7, delay: phase === 'dissolve' ? DISSOLVE_S * 0.3 : 0, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
