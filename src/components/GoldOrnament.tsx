import React from 'react';
import { motion } from 'framer-motion';

interface GoldDividerProps {
  className?: string;
  animate?: boolean;
  width?: number;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = '',
  animate = true,
  width = 280,
}) => {
  return (
    <div className={`flex items-center justify-center my-4 ${className}`} style={{ width: '100%', maxWidth: width }}>
      <svg
        viewBox="0 0 320 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', maxHeight: 24, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(181, 138, 66, 0)" />
            <stop offset="25%" stopColor="#DFBA73" />
            <stop offset="50%" stopColor="#FFF2D1" />
            <stop offset="75%" stopColor="#DFBA73" />
            <stop offset="100%" stopColor="rgba(181, 138, 66, 0)" />
          </linearGradient>
        </defs>

        {/* Left flourish line */}
        <motion.path
          d="M 10 12 L 135 12 M 70 8 Q 110 8 130 12 M 70 16 Q 110 16 130 12"
          stroke="url(#goldFiligree)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* Center auspicious floral medallion */}
        <g transform="translate(160, 12)">
          {/* Diamond center */}
          <polygon points="0,-7 7,0 0,7 -7,0" fill="#DFBA73" stroke="#846124" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="2.5" fill="#FFF4D0" />
          {/* Petals */}
          <circle cx="-13" cy="0" r="1.8" fill="#B58A42" />
          <circle cx="13" cy="0" r="1.8" fill="#B58A42" />
          <circle cx="0" cy="-11" r="1.8" fill="#B58A42" />
          <circle cx="0" cy="11" r="1.8" fill="#B58A42" />
        </g>

        {/* Right flourish line */}
        <motion.path
          d="M 310 12 L 185 12 M 250 8 Q 210 8 190 12 M 250 16 Q 210 16 190 12"
          stroke="url(#goldFiligree)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

export const GoldKalashIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldKalashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4D38A" />
          <stop offset="45%" stopColor="#DFBA73" />
          <stop offset="85%" stopColor="#B58A42" />
          <stop offset="100%" stopColor="#7E5818" />
        </linearGradient>
      </defs>

      {/* Coconut on top */}
      <ellipse cx="32" cy="16" rx="8" ry="11" fill="url(#goldKalashGrad)" stroke="#55370C" strokeWidth="0.8" />
      <path d="M 28 8 Q 32 18 36 8" stroke="#DFBA73" strokeWidth="0.7" fill="none" />

      {/* Mango Leaves radiating */}
      <path d="M 24 22 C 16 14, 12 12, 10 16 C 14 22, 22 25, 24 25 Z" fill="#DFBA73" opacity="0.85" />
      <path d="M 40 22 C 48 14, 52 12, 54 16 C 50 22, 42 25, 40 25 Z" fill="#DFBA73" opacity="0.85" />
      <path d="M 28 22 C 22 13, 20 10, 18 14 C 21 19, 26 23, 28 23 Z" fill="#F4D38A" />
      <path d="M 36 22 C 42 13, 44 10, 46 14 C 43 19, 38 23, 36 23 Z" fill="#F4D38A" />

      {/* Kalash Pot Rim & Neck */}
      <ellipse cx="32" cy="27" rx="14" ry="3.5" fill="url(#goldKalashGrad)" stroke="#55370C" strokeWidth="0.8" />
      <path d="M 22 29 Q 14 38 18 48 Q 23 54 32 54 Q 41 54 46 48 Q 50 38 42 29 Z" fill="url(#goldKalashGrad)" stroke="#55370C" strokeWidth="1" />

      {/* Swastika on Pot */}
      <g stroke="#4A1420" strokeWidth="1.4" strokeLinecap="square">
        <line x1="32" y1="36" x2="32" y2="46" />
        <line x1="27" y1="41" x2="37" y2="41" />
        <line x1="32" y1="36" x2="36" y2="36" />
        <line x1="32" y1="46" x2="28" y2="46" />
        <line x1="27" y1="41" x2="27" y2="37" />
        <line x1="37" y1="41" x2="37" y2="45" />
      </g>

      {/* Base */}
      <ellipse cx="32" cy="54" rx="10" ry="2.5" fill="#7E5818" stroke="#DFBA73" strokeWidth="0.8" />
    </svg>
  );
};
