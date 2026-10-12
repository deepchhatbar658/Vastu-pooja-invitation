import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { DiyaFlame } from '../components/DiyaFlame';
import { GoldDivider, GoldKalashIcon } from '../components/GoldOrnament';
import { TextReveal } from '../components/TextReveal';
import { INVITATION_DATA } from '../data/invitation';
import { ASSET_MANIFEST } from '../data/assets';

interface OpeningSceneProps {
  onStart: () => void;
  onSkipToDetails: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onStart, onSkipToDetails }) => {
  return (
    <div className="relative w-full min-h-[100svh] flex flex-col items-center justify-between px-5 pb-8 pt-20 sm:min-h-screen sm:p-10 overflow-hidden bg-[#1F050B]">
      {/* Background Carved Wooden Door with Subtle Warm Vignette */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSET_MANIFEST.images.doorClosed})`,
          filter: 'brightness(0.38) contrast(1.15)',
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      />

      {/* Deep Radial Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 68%, rgba(255, 179, 71, 0.18) 0%, rgba(36, 22, 15, 0.7) 45%, rgba(15, 5, 8, 0.96) 90%)',
        }}
      />

      {/* Top Auspicious Header */}
      <motion.div
        className="relative z-10 flex flex-col items-center pt-8 sm:pt-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <GoldKalashIcon size={46} className="mb-3 drop-shadow-[0_0_12px_rgba(223,186,115,0.4)]" />
        </motion.div>

        {/* Gujarati Invocation */}
        <h1
          className="font-gujarati text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider text-[#F4D38A] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]"
          style={{ textShadow: '0 0 20px rgba(223, 186, 115, 0.4)' }}
        >
          {INVITATION_DATA.invocation.text}
        </h1>

        {/* Ornamental gold line */}
        <GoldDivider width={300} className="mt-2" />

        <p className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E9D8B9]/85 mt-1">
          {INVITATION_DATA.invocation.subtextEn}
        </p>
      </motion.div>

      {/* Centerpiece: Glowing Brass Diya & Flickering Light */}
      <div className="relative z-20 flex flex-col items-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <DiyaFlame size="lg" showIncense={true} />
        </motion.div>

        {/* Delicate golden glow reflection below */}
        <motion.div
          className="w-36 h-2 rounded-full mt-1 bg-amber-400/20 blur-sm"
          animate={{ opacity: [0.3, 0.6, 0.35, 0.7, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Bottom Interaction Area: "Enter Our New Home" */}
      <motion.div
        className="relative z-20 flex flex-col items-center pb-8 sm:pb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      >
        <TextReveal delay={1.4}>
          <p className="font-serif italic text-lg sm:text-xl text-[#F5EBDD]/90 mb-5 tracking-wide">
            You are cordially invited to celebrate with us
          </p>
        </TextReveal>

        {/* Primary CTA */}
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="btn-gold group min-h-14 px-5 text-sm tracking-[0.1em] sm:px-[34px] sm:tracking-[0.16em]"
          aria-label="Enter Our New Home and start the invitation experience"
        >
          <Sparkles size={16} className="text-[#F4D38A] group-hover:rotate-12 transition-transform" />
          <span className="sm:hidden">Open Invitation</span>
          <span className="hidden sm:inline">Enter Our New Home</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="text-[#F4D38A]" />
          </motion.span>
        </motion.button>

        {/* Fast Jump Option */}
        <button
          type="button"
          onClick={onSkipToDetails}
          className="mt-4 text-xs font-sans tracking-widest uppercase text-[#DFBA73]/75 hover:text-[#FFF] transition-colors underline underline-offset-4"
        >
          Skip Intro &amp; View Details
        </button>
      </motion.div>
    </div>
  );
};
