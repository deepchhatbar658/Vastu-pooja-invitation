import React from 'react';
import { motion } from 'framer-motion';

interface DiyaFlameProps {
  size?: 'sm' | 'md' | 'lg';
  showIncense?: boolean;
  className?: string;
}

export const DiyaFlame: React.FC<DiyaFlameProps> = ({
  size = 'md',
  showIncense = true,
  className = '',
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.4 : 1;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
      style={{ transform: `scale(${scale})` }}
      aria-label="Auspicious brass diya flame"
    >
      {/* Ambient Radial Bloom Light */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(255, 179, 71, 0.35) 0%, rgba(223, 138, 42, 0.15) 45%, rgba(74, 20, 32, 0) 70%)',
          filter: 'blur(18px)',
        }}
        animate={{
          scale: [1, 1.08, 0.98, 1.05, 1],
          opacity: [0.85, 1, 0.78, 0.95, 0.85],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Incense Smoke Particles */}
      {showIncense && (
        <div className="absolute -top-16 pointer-events-none overflow-visible" style={{ width: 40, height: 70 }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 w-2 h-8 rounded-full"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.4), rgba(220,200,180,0))',
                filter: 'blur(3px)',
                transformOrigin: 'bottom center',
              }}
              animate={{
                y: [-10, -65],
                x: [0, (i % 2 === 0 ? 1 : -1) * (12 + i * 4)],
                opacity: [0.45, 0],
                scaleX: [1, 2.5],
              }}
              transition={{
                duration: 2.8 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.9,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Flame Outer Aura */}
      <motion.div
        className="relative z-10"
        animate={{
          scaleY: [1, 1.07, 0.96, 1.04, 1],
          scaleX: [1, 0.95, 1.05, 0.98, 1],
          skewX: [-0.8, 1.2, -0.6, 0.9, -0.8],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="44" height="60" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="flameOuter" cx="50%" cy="80%" r="65%">
              <stop offset="0%" stopColor="#FFF4D0" />
              <stop offset="35%" stopColor="#FFA439" />
              <stop offset="70%" stopColor="#E65100" />
              <stop offset="100%" stopColor="rgba(183, 28, 28, 0)" />
            </radialGradient>
            <radialGradient id="flameCore" cx="50%" cy="85%" r="45%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFF59D" />
              <stop offset="85%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="rgba(255, 179, 0, 0)" />
            </radialGradient>
            <filter id="flameGlow">
              <feGaussianBlur stdDeviation="2.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Flame Teardrop */}
          <path
            d="M22 2 C 16 18, 5 32, 5 43 C 5 52, 12 58, 22 58 C 32 58, 39 52, 39 43 C 39 32, 28 18, 22 2 Z"
            fill="url(#flameOuter)"
            filter="url(#flameGlow)"
          />

          {/* Inner Bright Core Flame */}
          <path
            d="M22 18 C 18 28, 12 37, 12 45 C 12 51, 16 55, 22 55 C 28 55, 32 51, 32 45 C 32 37, 26 28, 22 18 Z"
            fill="url(#flameCore)"
          />
        </svg>
      </motion.div>

      {/* Brass Lamp Base */}
      <svg width="68" height="26" viewBox="0 0 68 26" fill="none" className="-mt-1 z-10">
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA73" />
            <stop offset="35%" stopColor="#B58A42" />
            <stop offset="70%" stopColor="#7E5818" />
            <stop offset="100%" stopColor="#DFBA73" />
          </linearGradient>
        </defs>
        <path
          d="M6 6 C 14 16, 54 16, 62 6 C 60 14, 48 20, 34 20 C 20 20, 8 14, 6 6 Z"
          fill="url(#brassGrad)"
          stroke="#55370C"
          strokeWidth="1"
        />
        <ellipse cx="34" cy="5" rx="28" ry="4" fill="#DFBA73" stroke="#846124" strokeWidth="1" />
        <path d="M26 20 L24 25 L44 25 L42 20 Z" fill="url(#brassGrad)" />
      </svg>
    </div>
  );
};
