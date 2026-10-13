import { RefObject, useEffect } from 'react';

/**
 * Plays a muted inline video while it is on screen and pauses it otherwise,
 * so background films don't drain battery or data off-screen.
 * With `once`, a finished video holds its last frame instead of restarting.
 */
export function useInViewVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { once = false, threshold = 0.4 }: { once?: boolean; threshold?: number } = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && video.ended) return;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref, once, threshold]);
}
