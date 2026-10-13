import { motion } from 'framer-motion';

interface MusicToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export function MusicToggle({ muted, onToggle }: MusicToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={muted ? 'Play music' : 'Mute music'}
      aria-pressed={!muted}
      className="glass fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 grid h-11 w-11 place-items-center rounded-full text-maroon"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="m22 9-6 6M16 9l6 6" />
        </svg>
      ) : (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="eq-bar w-[2.5px] rounded-full bg-current" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
      )}
    </motion.button>
  );
}
