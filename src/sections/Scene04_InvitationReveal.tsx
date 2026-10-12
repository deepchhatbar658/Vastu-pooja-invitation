import React from 'react';
import { motion } from 'framer-motion';
import { ParchmentCard } from '../components/ParchmentCard';
import { GoldDivider, GoldKalashIcon } from '../components/GoldOrnament';
import { TextReveal } from '../components/TextReveal';
import { INVITATION_DATA } from '../data/invitation';
import { ASSET_MANIFEST } from '../data/assets';

export const Scene04_InvitationReveal: React.FC = () => {
  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-[#1F050B]">
      {/* Dimmed Background: Home entrance with soft blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.22] blur-sm scale-105"
        style={{ backgroundImage: `url(${ASSET_MANIFEST.images.doorOpen})` }}
      />

      {/* Atmospheric Warm Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(74, 20, 32, 0.5) 0%, rgba(20, 10, 8, 0.95) 100%)',
        }}
      />

      {/* The Luxury Parchment Invitation Card */}
      <div className="relative z-20 w-full max-w-xl my-auto py-4 sm:py-8">
        <ParchmentCard>
          {/* Top Auspicious Invocation Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center mb-4"
          >
            <GoldKalashIcon size={52} className="mb-2" />
            <span className="font-gujarati text-lg sm:text-xl font-medium tracking-wide text-[#7A202E]">
              {INVITATION_DATA.invocation.text}
            </span>
          </motion.div>

          {/* Invitation Intro */}
          <TextReveal delay={0.4} as="p">
            <span className="font-serif italic text-sm sm:text-base text-[#5A3825] tracking-widest block uppercase">
              Cordially Invite You to
            </span>
          </TextReveal>

          {/* Main Gujarati Event Title */}
          <TextReveal delay={0.7} as="h1">
            <span className="font-gujarati text-3xl sm:text-4xl md:text-5xl font-bold tracking-normal text-[#4A1420] block mt-2 mb-1 leading-snug">
              {INVITATION_DATA.event.titleGu}
            </span>
          </TextReveal>

          {/* Main English Event Title */}
          <TextReveal delay={1.0} as="h2">
            <span className="font-display text-sm sm:text-base md:text-lg font-semibold tracking-[0.22em] text-[#846124] block uppercase">
              {INVITATION_DATA.event.titleEn}
            </span>
          </TextReveal>

          {/* Subtle Antique Gold Ornamental Divider */}
          <GoldDivider width={260} className="my-5" />

          {/* Host Family Introduction */}
          <TextReveal delay={1.3} as="p">
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#7E5818] font-semibold block mb-2">
              HOSTED WITH LOVE BY
            </span>
          </TextReveal>

          {/* Host Names - Principal Luxury Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex flex-col items-center gap-1.5 w-full mt-1"
          >
            {INVITATION_DATA.hosts.couples.map((couple, index) => (
              <React.Fragment key={index}>
                <div className="py-0.5">
                  <span className="font-serif text-2xl sm:text-3xl md:text-3xl font-semibold tracking-wide text-[#340A12] block">
                    {couple.names}
                  </span>
                </div>
                {index === 0 && (
                  <span className="font-serif italic text-lg text-[#846124] select-none">&amp;</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Subtle Bottom Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-6 pt-3 border-t border-[#B58A42]/30 w-3/4 flex justify-center"
          >
            <span className="font-serif italic text-xs sm:text-sm text-[#7A5034] tracking-widest">
              A New Chapter • A Sacred Hearth
            </span>
          </motion.div>
        </ParchmentCard>
      </div>
    </div>
  );
};
