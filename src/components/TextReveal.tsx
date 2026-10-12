import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  direction = 'up',
  as = 'div',
}) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const yOffset = direction === 'up' ? 24 : -24;

  return (
    <div className="overflow-hidden inline-block" style={{ verticalAlign: 'top' }}>
      <motion.div
        initial={{ y: yOffset, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -yOffset, opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1], // cinematic smooth ease
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
