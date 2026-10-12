import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { SCENES } from '../data/invitation';
import { SceneId } from '../types/invitation';

interface SceneControlsProps {
  currentScene: SceneId;
  isPlaying: boolean;
  onSceneChange: (scene: SceneId) => void;
  onTogglePlay: () => void;
  onReplay: () => void;
  onJumpToDetails: () => void;
}

export const SceneControls: React.FC<SceneControlsProps> = ({
  currentScene,
  isPlaying,
  onSceneChange,
  onTogglePlay,
  onReplay,
  onJumpToDetails,
}) => {
  const handlePrev = () => {
    if (currentScene > 1) {
      onSceneChange((currentScene - 1) as SceneId);
    }
  };

  const handleNext = () => {
    if (currentScene < 8) {
      onSceneChange((currentScene + 1) as SceneId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed bottom-[var(--safe-bottom)] left-1/2 -translate-x-1/2 z-50 w-full px-3 pointer-events-none"
    >
      {/* Phone navigation: deliberately compact so the invitation remains the focus. */}
      <div
        className="pointer-events-auto mx-auto flex w-fit items-center gap-1 rounded-full px-2 py-1.5 utility-surface md:hidden"
        style={{
          boxShadow: '0 12px 34px -12px rgba(0, 0, 0, 0.82)',
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentScene === 1}
          className="grid h-10 w-10 place-items-center rounded-full text-[#DFBA73] transition-colors hover:bg-[#4A1420]/70 disabled:opacity-30"
          aria-label="Previous scene"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#4A1420] text-[#F4D38A] transition-colors hover:bg-[#6A2131]"
          aria-label={isPlaying ? 'Pause film' : 'Play film'}
        >
          {isPlaying ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <span className="min-w-[3.25rem] text-center font-sans text-[10px] font-semibold tracking-[0.1em] text-[#E9D8B9]" aria-live="polite">
          {currentScene} / {SCENES.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentScene === 8}
          className="grid h-10 w-10 place-items-center rounded-full text-[#DFBA73] transition-colors hover:bg-[#4A1420]/70 disabled:opacity-30"
          aria-label="Next scene"
        >
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          onClick={onJumpToDetails}
          className="grid h-10 w-10 place-items-center rounded-full text-[#F4D38A] transition-colors hover:bg-[#4A1420]/70"
          aria-label="View event details"
        >
          <CalendarCheck size={18} />
        </button>
      </div>

      {/* Wider-screen navigation retains direct access to every scene. */}
      <div
        className="pointer-events-auto mx-auto hidden max-w-xl items-center justify-between gap-1.5 rounded-full px-2.5 py-2 utility-surface md:flex"
        style={{ boxShadow: '0 12px 34px -12px rgba(0, 0, 0, 0.82)' }}
      >
        <button
          type="button"
          onClick={onTogglePlay}
          className="p-2 rounded-full text-[#DFBA73] hover:text-white hover:bg-[#4A1420]/80 transition-colors focus-visible:outline-none"
          title={isPlaying ? 'Pause film' : 'Play film'}
          aria-label={isPlaying ? 'Pause film' : 'Play film'}
        >
          {isPlaying ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentScene === 1}
          className="p-1.5 rounded-full text-[#DFBA73] disabled:opacity-30 disabled:hover:bg-transparent hover:bg-[#4A1420]/60 transition-colors focus-visible:outline-none"
          title="Previous scene"
          aria-label="Previous scene"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2 px-1">
          {SCENES.map((scene) => {
            const isActive = currentScene === scene.id;
            const isPassed = currentScene > scene.id;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSceneChange(scene.id)}
                className="relative py-2 px-1 group focus-visible:outline-none"
                aria-label={`Jump to Scene ${scene.id}: ${scene.titleEn}`}
                title={`Scene ${scene.id}: ${scene.titleEn} (${scene.titleGu})`}
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 22 : 7,
                    height: 7,
                    background: isActive
                      ? 'linear-gradient(90deg, #F4D38A, #B58A42)'
                      : isPassed
                      ? '#B58A42'
                      : 'rgba(233, 216, 185, 0.25)',
                    boxShadow: isActive ? '0 0 8px rgba(244, 211, 138, 0.8)' : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentScene === 8}
          className="p-1.5 rounded-full text-[#DFBA73] disabled:opacity-30 disabled:hover:bg-transparent hover:bg-[#4A1420]/60 transition-colors focus-visible:outline-none"
          title="Next scene"
          aria-label="Next scene"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          onClick={onJumpToDetails}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 focus-visible:outline-none"
          style={{
            background: currentScene === 5 ? '#B58A42' : 'rgba(181, 138, 66, 0.15)',
            border: '1px solid rgba(181, 138, 66, 0.6)',
            color: currentScene === 5 ? '#1F050B' : '#F4D38A',
            fontWeight: 600,
          }}
          title="Jump directly to Event Details"
          aria-label="Jump to event details"
        >
          <CalendarCheck size={13} />
          <span className="hidden min-[390px]:inline">Details</span>
        </button>

        <button
          type="button"
          onClick={onReplay}
          className="p-2 rounded-full text-[#DFBA73] hover:text-white hover:bg-[#4A1420]/80 transition-colors focus-visible:outline-none"
          title="Replay invitation from the beginning"
          aria-label="Replay invitation"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </motion.div>
  );
};
