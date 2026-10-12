import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneId } from './types/invitation';
import { SCENES, INVITATION_DATA } from './data/invitation';
import { ASSET_MANIFEST } from './data/assets';
import { useAudio } from './hooks/useAudio';
import { useReducedMotion } from './hooks/useReducedMotion';

import { FilmGrain } from './components/FilmGrain';
import { AudioController } from './components/AudioController';
import { SceneControls } from './components/SceneControls';
import { PetalCanvas } from './components/PetalCanvas';

import { OpeningScene } from './sections/OpeningScene';
import { Scene02_DoorwayReveal } from './sections/Scene02_DoorwayReveal';
import { Scene03_WelcomeHome } from './sections/Scene03_WelcomeHome';
import { Scene04_InvitationReveal } from './sections/Scene04_InvitationReveal';
import { Scene05_EventDetails } from './sections/Scene05_EventDetails';
import { Scene06_Blessings } from './sections/Scene06_Blessings';
import { Scene07_LunchScene } from './sections/Scene07_LunchScene';
import { Scene08_FinalWelcome } from './sections/Scene08_FinalWelcome';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isPlaying: isAudioPlaying, isMuted, play: playAudio, toggleMute } = useAudio(ASSET_MANIFEST.audio.soundtrack);
  const reducedMotion = useReducedMotion();

  // Clear scene timer helper
  const clearSceneTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handle scene advance
  const advanceScene = useCallback(() => {
    setCurrentScene((prev) => {
      if (prev < 8) {
        return (prev + 1) as SceneId;
      }
      setIsPlaying(false);
      return prev;
    });
  }, []);

  // Timer choreography based on target durations
  useEffect(() => {
    clearSceneTimer();

    // Scene 1 does not auto-advance until user clicks "Enter Our New Home"
    if (isPlaying && currentScene > 1 && currentScene < 8) {
      const sceneMeta = SCENES.find((s) => s.id === currentScene);
      const durationMs = (sceneMeta?.duration || 10) * 1000;

      timerRef.current = setTimeout(() => {
        advanceScene();
      }, durationMs);
    }

    return () => clearSceneTimer();
  }, [currentScene, isPlaying, advanceScene, clearSceneTimer]);

  // Start Experience from Scene 1
  const handleStartExperience = useCallback(() => {
    playAudio().catch(() => {});
    setCurrentScene(2);
    setIsPlaying(true);
  }, [playAudio]);

  // Jump to Event Details
  const handleJumpToDetails = useCallback(() => {
    clearSceneTimer();
    setCurrentScene(5);
    setIsPlaying(false);
  }, [clearSceneTimer]);

  // Replay from beginning
  const handleReplay = useCallback(() => {
    clearSceneTimer();
    setCurrentScene(1);
    setIsPlaying(false);
    playAudio().catch(() => {});
  }, [clearSceneTimer, playAudio]);

  // Direct scene change from dots or navigation
  const handleSceneChange = useCallback((scene: SceneId) => {
    clearSceneTimer();
    setCurrentScene(scene);
  }, [clearSceneTimer]);

  const handleTogglePlay = useCallback(() => {
    if (!isPlaying && currentScene === 1) {
      handleStartExperience();
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [isPlaying, currentScene, handleStartExperience]);

  // Video scene completion triggers immediate smooth advance
  const handleVideoSceneComplete = useCallback(() => {
    if (isPlaying && (currentScene === 2 || currentScene === 3 || currentScene === 6)) {
      advanceScene();
    }
  }, [isPlaying, currentScene, advanceScene]);

  return (
    <main className="relative w-full min-h-screen bg-[#1F050B] text-[#F5EBDD] overflow-hidden">
      {/* Analog Cinematic Film Grain */}
      <FilmGrain />

      {/* Marigold Petals on celebratory scenes */}
      <PetalCanvas
        count={16}
        active={currentScene === 2 || currentScene === 3 || currentScene === 7 || currentScene === 8}
      />

      {/* Top Floating Utility Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-[var(--safe-top)] sm:px-6 pointer-events-none">
        {/* Subtle Watermark Branding */}
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="font-display text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#DFBA73] utility-surface px-3 py-1.5 rounded-full">
            Chhatbar Griha Pravesh
          </span>
        </div>

        {/* Audio Controller */}
        <div className="pointer-events-auto">
          <AudioController
            isPlaying={isAudioPlaying}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      </header>

      {/* Scene Transitions with Framer Motion AnimatePresence */}
      <div className="relative w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.section
              key="scene-1"
              aria-label="Scene 1: Sacred Opening"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <OpeningScene
                onStart={handleStartExperience}
                onSkipToDetails={handleJumpToDetails}
              />
            </motion.section>
          )}

          {currentScene === 2 && (
            <motion.section
              key="scene-2"
              aria-label="Scene 2: Doorway Reveal"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene02_DoorwayReveal onComplete={handleVideoSceneComplete} />
            </motion.section>
          )}

          {currentScene === 3 && (
            <motion.section
              key="scene-3"
              aria-label="Scene 3: Welcome Home"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene03_WelcomeHome onComplete={handleVideoSceneComplete} />
            </motion.section>
          )}

          {currentScene === 4 && (
            <motion.section
              key="scene-4"
              aria-label="Scene 4: The Invitation Reveal"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene04_InvitationReveal />
            </motion.section>
          )}

          {currentScene === 5 && (
            <motion.section
              key="scene-5"
              aria-label="Scene 5: Event Details"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene05_EventDetails />
            </motion.section>
          )}

          {currentScene === 6 && (
            <motion.section
              key="scene-6"
              aria-label="Scene 6: Blessings"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene06_Blessings onComplete={handleVideoSceneComplete} />
            </motion.section>
          )}

          {currentScene === 7 && (
            <motion.section
              key="scene-7"
              aria-label="Scene 7: Prasad and Lunch"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene07_LunchScene />
            </motion.section>
          )}

          {currentScene === 8 && (
            <motion.section
              key="scene-8"
              aria-label="Scene 8: Final Welcome"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <Scene08_FinalWelcome
                onReplay={handleReplay}
                onJumpToDetails={handleJumpToDetails}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Scene Controls (timeline, play/pause, dots, details jump, replay) */}
      {currentScene !== 1 && (
        <SceneControls
          currentScene={currentScene}
          isPlaying={isPlaying}
          onSceneChange={handleSceneChange}
          onTogglePlay={handleTogglePlay}
          onReplay={handleReplay}
          onJumpToDetails={handleJumpToDetails}
        />
      )}
    </main>
  );
}
