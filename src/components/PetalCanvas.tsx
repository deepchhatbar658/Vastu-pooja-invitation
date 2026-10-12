import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PetalCanvasProps {
  count?: number;
  active?: boolean;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ count = 16, active = true }) => {
  const reducedMotion = useReducedMotion();

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: 14 + Math.random() * 16,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 5,
      rotateStart: Math.random() * 360,
      color: i % 3 === 0 ? '#F39C12' : i % 3 === 1 ? '#E67E22' : '#F1C40F',
      opacity: 0.7 + Math.random() * 0.25,
      drift: -40 + Math.random() * 80,
    }));
  }, [count]);

  if (!active || reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-40"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            width: petal.size,
            height: petal.size * 0.7,
            opacity: petal.opacity,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.drift, petal.drift * 0.5, petal.drift],
            rotate: [petal.rotateStart, petal.rotateStart + 420],
            rotateX: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          {/* Marigold Petal Shape */}
          <svg viewBox="0 0 24 16" fill="none" style={{ width: '100%', height: '100%' }}>
            <path
              d="M 12 1 C 18 1, 23 5, 23 10 C 23 15, 17 15, 12 15 C 7 15, 1 15, 1 10 C 1 5, 6 1, 12 1 Z"
              fill={petal.color}
              stroke="#D35400"
              strokeWidth="0.4"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
