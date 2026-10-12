import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Copy, Check, Navigation } from 'lucide-react';
import { ParchmentCard } from '../components/ParchmentCard';
import { GoldDivider } from '../components/GoldOrnament';
import { TextReveal } from '../components/TextReveal';
import { INVITATION_DATA } from '../data/invitation';
import { ASSET_MANIFEST } from '../data/assets';

export const Scene05_EventDetails: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(INVITATION_DATA.venue.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-[#1F050B]">
      {/* Background Dimmed Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] blur-md scale-105"
        style={{ backgroundImage: `url(${ASSET_MANIFEST.images.homeEntrance})` }}
      />

      {/* Atmospheric Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(74, 20, 32, 0.45) 0%, rgba(20, 10, 8, 0.95) 100%)',
        }}
      />

      <div className="relative z-20 w-full max-w-xl my-auto py-4 sm:py-8">
        <ParchmentCard>
          {/* Header */}
          <div className="mb-4">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#7E5818] block">
              AUSPICIOUS CEREMONY DETAILS
            </span>
            <h2 className="font-gujarati text-2xl sm:text-3xl font-bold text-[#4A1420] mt-1">
              શુભ મુહૂર્ત અને વિધિ
            </h2>
          </div>

          <GoldDivider width={260} className="mb-6" />

          {/* Staggered Event Information List */}
          <div className="w-full flex flex-col gap-3.5 sm:gap-4 text-left">
            {/* 1. DATE */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-start gap-4 p-3.5 sm:p-4 rounded-lg bg-[var(--surface-paper)] border border-[#B58A42]/30"
            >
              <div className="p-2.5 rounded-full bg-[#4A1420] text-[#F4D38A] shrink-0 mt-0.5 shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#846124] uppercase block">
                  DATE / તારીખ
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#340A12] block leading-tight mt-0.5">
                  {INVITATION_DATA.schedule.date.en}
                </span>
                <span className="font-gujarati text-base sm:text-lg font-medium text-[#6A2131] block mt-0.5">
                  {INVITATION_DATA.schedule.date.gu}
                </span>
              </div>
            </motion.div>

            {/* 2. CEREMONY TIME */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-start gap-4 p-3.5 sm:p-4 rounded-lg bg-[var(--surface-paper)] border border-[#B58A42]/30"
            >
              <div className="p-2.5 rounded-full bg-[#4A1420] text-[#F4D38A] shrink-0 mt-0.5 shadow-sm">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#846124] uppercase block">
                  CEREMONY / વાસ્તુ પૂજન
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#340A12] block leading-tight mt-0.5">
                  {INVITATION_DATA.schedule.ceremony.timeEn}
                </span>
                <span className="font-gujarati text-base sm:text-lg font-medium text-[#6A2131] block mt-0.5">
                  {INVITATION_DATA.schedule.ceremony.timeGu}
                </span>
                <div className="mt-3 pt-3 border-t border-[#B58A42]/25">
                  <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#846124] uppercase block">
                    Bhojan Arambh / Lunch
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#340A12] block leading-tight mt-0.5">
                    {INVITATION_DATA.schedule.lunch.timeEn}
                  </span>
                  <span className="font-gujarati text-base sm:text-lg font-medium text-[#6A2131] block mt-0.5">
                    {INVITATION_DATA.schedule.lunch.timeGu}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 3. VENUE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-start gap-4 p-3.5 sm:p-4 rounded-lg bg-[var(--surface-paper)] border border-[#B58A42]/30"
            >
              <div className="p-2.5 rounded-full bg-[#4A1420] text-[#F4D38A] shrink-0 mt-0.5 shadow-sm">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#846124] uppercase block">
                  VENUE / સ્થળ
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#340A12] block leading-snug mt-0.5">
                  {INVITATION_DATA.venue.address}
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INVITATION_DATA.venue.fullText)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 rounded border border-[#4A1420]/25 bg-[#4A1420] px-3 text-xs font-sans font-semibold text-[#F4D38A] transition-colors hover:bg-[#6A2131]"
                    aria-label="Open directions to the venue in Google Maps"
                  >
                    <Navigation size={13} />
                    <span>Get Directions</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded border border-[#B58A42]/40 bg-[#DFBA73]/25 px-3 text-xs font-sans font-medium text-[#4A1420] transition-colors hover:bg-[#DFBA73]/50"
                    aria-live="polite"
                  >
                    {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                    <span>{copied ? 'Address Copied' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </ParchmentCard>
      </div>
    </div>
  );
};
