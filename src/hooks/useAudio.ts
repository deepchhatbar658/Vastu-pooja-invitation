import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoaded: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
}

export function useAudio(src: string): AudioState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const userInteractedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.75;
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn('Audio element error, falling back gracefully:', e);
      setIsLoaded(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    userInteractedRef.current = true;
    if (!audioRef.current) return;
    try {
      audioRef.current.muted = isMuted;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio play request was not allowed or failed:', err);
      setIsPlaying(false);
    }
  }, [isMuted]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        if (!next && audioRef.current.paused && userInteractedRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
      return next;
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  return {
    isPlaying,
    isMuted,
    isLoaded,
    play,
    pause,
    toggleMute,
    setVolume,
  };
}
