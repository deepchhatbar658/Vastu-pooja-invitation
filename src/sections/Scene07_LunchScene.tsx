import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import { GoldDivider } from '../components/GoldOrnament';
import { ASSET_MANIFEST } from '../data/assets';
import { INVITATION_DATA } from '../data/invitation';

export const Scene07_LunchScene: React.FC = () => {
  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 overflow-hidden bg-[#1F050B]">
      {/* Background High-res Traditional Feast Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSET_MANIFEST.images.prasadLunch})`,
          filter: 'brightness(0.65) contrast(1.08)',
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      />

      {/* Warm Ambient Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 10, 8, 0.75) 0%, rgba(74, 20, 32, 0.3) 50%, rgba(20, 10, 8, 0.92) 100%)',
        }}
      />

      {/* Top Auspicious Header */}
      <motion.div
        className="relative z-20 pt-6 sm:pt-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="p-3 rounded-full bg-[#4A1420]/80 border border-[#B58A42]/50 text-[#F4D38A] mb-2 shadow-lg">
          <Utensils size={24} />
        </div>
        <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#E9D8B9]/80">
          MAHAPRASAD &amp; CELEBRATION
        </span>
      </motion.div>

      {/* Centerpiece Typographic Card: Bhojan Arambh / Lunch */}
      <motion.div
        className="cinematic-panel relative z-30 max-w-xl text-center px-6 py-8 sm:px-10 sm:py-10 rounded-2xl backdrop-blur-md my-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gujarati Title */}
        <TextReveal delay={0.9} as="h2">
          <span
            className="font-gujarati text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#F4D38A] block leading-tight"
            style={{ textShadow: '0 0 25px rgba(244, 211, 138, 0.5)' }}
          >
            {INVITATION_DATA.schedule.lunch.titleGu}
          </span>
        </TextReveal>

        {/* English Title */}
        <TextReveal delay={1.2} as="h3">
          <span className="font-display text-base sm:text-lg tracking-[0.22em] uppercase text-[#F5EBDD] block mt-1">
            {INVITATION_DATA.schedule.lunch.titleEn}
          </span>
        </TextReveal>

        <GoldDivider width={240} className="my-4 mx-auto" />

        {/* Distinct Bhojan Arambh Timing Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="inline-flex flex-col items-center gap-1.5 px-6 py-4 rounded-xl mt-1 border border-[#B58A42]/40"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 20, 32, 0.7) 0%, rgba(36, 22, 15, 0.85) 100%)',
          }}
        >
          <div className="flex items-center gap-2 text-[#DFBA73]">
            <Clock size={18} />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF] tracking-wide">
              {INVITATION_DATA.schedule.lunch.timeEn}
            </span>
          </div>

          <span className="font-gujarati text-lg sm:text-xl font-medium text-[#F4D38A]">
            {INVITATION_DATA.schedule.lunch.timeGu}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="font-serif italic text-sm sm:text-base text-[#E9D8B9]/85 mt-4"
        >
          Join us for traditional festive delights and blessed fellowship
        </motion.p>
      </motion.div>

      <div className="relative z-10 pb-16" />
    </div>
  );
};
