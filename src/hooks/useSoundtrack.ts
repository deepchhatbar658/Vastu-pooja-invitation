import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET_VOLUME = 0.55;
const FADE_IN_S = 3;
const MUTE_FADE_S = 0.5;

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

/**
 * Background soundtrack with gentle fades.
 *
 * iOS Safari ignores `HTMLMediaElement.volume`, so fades go through a Web Audio
 * GainNode when available and fall back to stepping `volume` elsewhere.
 * `start()` must be called from inside a user gesture (the "open" tap).
 */
export function useSoundtrack(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const stepTimerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const rampTo = useCallback((value: number, seconds: number) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(value, now + seconds);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (stepTimerRef.current) window.clearInterval(stepTimerRef.current);
    const from = audio.volume;
    const steps = Math.max(1, Math.round((seconds * 1000) / 50));
    let i = 0;
    stepTimerRef.current = window.setInterval(() => {
      i += 1;
      audio.volume = from + ((value - from) * i) / steps;
      if (i >= steps && stepTimerRef.current) {
        window.clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
    }, 50);
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'auto';
      audioRef.current = audio;

      const Ctx = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
      if (Ctx) {
        try {
          const ctx = new Ctx();
          const gain = ctx.createGain();
          gain.gain.value = 0;
          ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);
          ctxRef.current = ctx;
          gainRef.current = gain;
        } catch {
          ctxRef.current = null;
          gainRef.current = null;
        }
      }
      if (!gainRef.current) audio.volume = 0;
    }
    void ctxRef.current?.resume();

    audio
      .play()
      .then(() => {
        setStarted(true);
        if (!mutedRef.current) rampTo(TARGET_VOLUME, FADE_IN_S);
      })
      .catch(() => {
        // Autoplay refused; the music toggle can still start it later.
        startedRef.current = false;
      });
  }, [src, rampTo]);

  const toggleMute = useCallback(() => {
    // Music never started (autoplay refused): treat the tap as "play".
    if (!startedRef.current) {
      mutedRef.current = false;
      setMuted(false);
      start();
      return;
    }
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    rampTo(next ? 0 : TARGET_VOLUME, MUTE_FADE_S);
  }, [rampTo, start]);

  // Pause while the page is hidden (switching apps, locking the phone).
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !startedRef.current) return;
      if (document.hidden) {
        audio.pause();
      } else {
        void ctxRef.current?.resume();
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(
    () => () => {
      if (stepTimerRef.current) window.clearInterval(stepTimerRef.current);
      audioRef.current?.pause();
      void ctxRef.current?.close();
    },
    [],
  );

  return { start, started, muted, toggleMute };
}
