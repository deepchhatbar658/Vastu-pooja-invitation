import React from 'react';
import { motion } from 'framer-motion';
import { ASSET_MANIFEST } from '../data/assets';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full max-w-[620px] mx-auto rounded-xl p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(175deg, #FAF4E9 0%, #F5EBDD 50%, #E9D8B9 100%)',
        boxShadow: '0 25px 60px -15px rgba(20, 10, 5, 0.7), 0 0 1px 1px rgba(181, 138, 66, 0.5)',
        border: '1px solid rgba(181, 138, 66, 0.4)',
      }}
    >
      {/* Background Parchment Texture / Image Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSET_MANIFEST.images.invitationParchment})` }}
      />

      {/* Outer Fine Gold Border */}
      <div
        className="absolute inset-3 pointer-events-none rounded-lg border border-[#B58A42]/50"
        style={{
          boxShadow: 'inset 0 0 15px rgba(181, 138, 66, 0.1)',
        }}
      />

      {/* Inner Inset Border */}
      <div
        className="absolute inset-4.5 pointer-events-none rounded-md border border-[#B58A42]/30"
      />

      {/* Four Corner Ornaments (Paisley filigree) */}
      <svg className="absolute top-3 left-3 w-8 h-8 text-[#B58A42] pointer-events-none" viewBox="0 0 32 32" fill="none">
        <path d="M 2 2 L 18 2 M 2 2 L 2 18 M 5 5 C 12 5, 15 10, 15 15 M 5 5 C 5 12, 10 15, 15 15" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute top-3 right-3 w-8 h-8 text-[#B58A42] pointer-events-none transform scale-x-[-1]" viewBox="0 0 32 32" fill="none">
        <path d="M 2 2 L 18 2 M 2 2 L 2 18 M 5 5 C 12 5, 15 10, 15 15 M 5 5 C 5 12, 10 15, 15 15" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-3 left-3 w-8 h-8 text-[#B58A42] pointer-events-none transform scale-y-[-1]" viewBox="0 0 32 32" fill="none">
        <path d="M 2 2 L 18 2 M 2 2 L 2 18 M 5 5 C 12 5, 15 10, 15 15 M 5 5 C 5 12, 10 15, 15 15" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-3 right-3 w-8 h-8 text-[#B58A42] pointer-events-none transform scale-[-1]" viewBox="0 0 32 32" fill="none">
        <path d="M 2 2 L 18 2 M 2 2 L 2 18 M 5 5 C 12 5, 15 10, 15 15 M 5 5 C 5 12, 10 15, 15 15" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {children}
      </div>
    </motion.div>
  );
};
