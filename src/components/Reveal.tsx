import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const EASE_GENTLE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fades content up softly the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, delay, ease: EASE_GENTLE }}
    >
      {children}
    </motion.div>
  );
}
