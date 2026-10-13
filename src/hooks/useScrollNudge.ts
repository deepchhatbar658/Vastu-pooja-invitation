import { useEffect } from 'react';
import { useAnimationControls, useReducedMotion } from 'framer-motion';
import { EASE_GENTLE } from '../components/Reveal';

// When to peek (ms after the card is revealed). The first lands just after the
// card's text has finished appearing; the second only if the guest is still idle.
const NUDGE_AT = [4600, 11500];
const NUDGE_S = 2.4;

/**
 * Hints that the page continues: lifts the page briefly so the top of the next
 * section peeks into view, then settles back. Stops for good as soon as the
 * guest touches, scrolls or presses a key.
 */
export function useScrollNudge(active: boolean) {
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || reduce) return;
    let stopped = false;
    const timers: number[] = [];
    const events = ['touchstart', 'wheel', 'keydown', 'scroll'] as const;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      timers.forEach(window.clearTimeout);
      events.forEach((e) => window.removeEventListener(e, stop));
      controls.stop();
      void controls.start({ y: 0, transition: { duration: 0.35, ease: 'easeOut' } });
    };

    const nudge = () => {
      if (stopped || window.scrollY > 8) return;
      const lift = Math.min(110, window.innerHeight * 0.12);
      void controls.start({
        y: [0, -lift, -lift, 0],
        transition: { duration: NUDGE_S, times: [0, 0.35, 0.62, 1], ease: EASE_GENTLE },
      });
    };

    NUDGE_AT.forEach((ms) => timers.push(window.setTimeout(nudge, ms)));
    events.forEach((e) => window.addEventListener(e, stop, { passive: true }));

    return () => {
      stopped = true;
      timers.forEach(window.clearTimeout);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [active, reduce, controls]);

  return controls;
}
