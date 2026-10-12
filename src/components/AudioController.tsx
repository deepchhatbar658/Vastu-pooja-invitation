import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioControllerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  isMuted,
  onToggleMute,
}) => {
  const isAudible = isPlaying && !isMuted;

  return (
    <motion.button
      type="button"
      onClick={onToggleMute}
      aria-label={isAudible ? 'Mute ceremonial music' : 'Unmute ceremonial music'}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 focus:outline-none"
      style={{
        background: 'rgba(36, 22, 15, 0.75)',
        border: '1px solid rgba(181, 138, 66, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#DFBA73',
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.05, borderColor: '#F4D38A' }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Soundwaves indicator */}
      <div className="flex items-center gap-0.5 h-4 w-4 justify-center" aria-hidden="true">
        {isAudible ? (
          <>
            <motion.span
              className="w-0.5 bg-amber-300 rounded-full"
              animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.span
              className="w-0.5 bg-amber-300 rounded-full"
              animate={{ height: ['10px', '4px', '16px', '8px', '10px'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.span
              className="w-0.5 bg-amber-300 rounded-full"
              animate={{ height: ['6px', '16px', '8px', '14px', '6px'] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
            />
          </>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
        )}
      </div>

      {/* Lucide Icon */}
      {isAudible ? (
        <Volume2 size={16} className="text-[#DFBA73]" />
      ) : (
        <VolumeX size={16} className="text-[#A78B71]" />
      )}

      {/* Label on wider screens */}
      <span className="text-[11px] font-sans tracking-widest uppercase text-[#E9D8B9] hidden sm:inline-block">
        {isAudible ? 'Music' : 'Muted'}
      </span>
    </motion.button>
  );
};
