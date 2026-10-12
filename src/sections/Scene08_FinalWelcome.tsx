import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, CalendarCheck, Share2, Check } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import { GoldDivider, GoldKalashIcon } from '../components/GoldOrnament';
import { ASSET_MANIFEST } from '../data/assets';
import { INVITATION_DATA } from '../data/invitation';

interface FinalWelcomeProps {
  onReplay: () => void;
  onJumpToDetails: () => void;
}

export const Scene08_FinalWelcome: React.FC<FinalWelcomeProps> = ({ onReplay, onJumpToDetails }) => {
  const [shared, setShared] = React.useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: INVITATION_DATA.meta.title,
          text: `${INVITATION_DATA.event.titleGu} - ${INVITATION_DATA.schedule.date.en} at ${INVITATION_DATA.venue.address}`,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // Dismissing the native share sheet is an expected outcome.
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2400);
      } catch {
        setShared(false);
      }
    }
  };

  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 overflow-hidden bg-[#1F050B]">
      {/* Background Cinematic Dusk Architectural View with Slow Camera Pull Back */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSET_MANIFEST.images.homeAtDusk})`,
          filter: 'brightness(0.65) contrast(1.12)',
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      />

      {/* Atmospheric Twilight Glow & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(255, 179, 71, 0.12) 0%, rgba(36, 22, 15, 0.6) 50%, rgba(15, 5, 8, 0.94) 95%)',
        }}
      />

      {/* Top Auspicious Icon */}
      <motion.div
        className="relative z-20 pt-6 sm:pt-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <GoldKalashIcon size={48} className="drop-shadow-[0_0_15px_rgba(244,211,138,0.5)]" />
      </motion.div>

      {/* Centerpiece Closing Card: Warm Invitation & Host Sign-off */}
      <motion.div
        className="cinematic-panel relative z-30 max-w-xl text-center px-6 py-8 sm:px-10 sm:py-10 rounded-2xl backdrop-blur-md my-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gujarati Final Invitation */}
        <TextReveal delay={0.8} as="h2">
          <span
            className="font-gujarati text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[#F4D38A] block leading-relaxed"
            style={{ textShadow: '0 0 25px rgba(244, 211, 138, 0.5)' }}
          >
            {INVITATION_DATA.closing.textGu}
          </span>
        </TextReveal>

        {/* English Warm Closing */}
        <TextReveal delay={1.2} as="p">
          <span className="font-serif italic text-lg sm:text-xl md:text-2xl tracking-wide text-[#F5EBDD] block mt-2">
            {INVITATION_DATA.closing.textEn}
          </span>
        </TextReveal>

        <GoldDivider width={260} className="my-5 mx-auto" />

        {/* Sign-off */}
        <TextReveal delay={1.6} as="p">
          <span className="font-serif italic text-sm sm:text-base tracking-widest uppercase text-[#DFBA73] block mb-1">
            {INVITATION_DATA.closing.signOffEn}
          </span>
        </TextReveal>

        {/* Hosts Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9 }}
          className="flex flex-col items-center gap-1 mt-2"
        >
          {INVITATION_DATA.hosts.couples.map((couple, index) => (
            <React.Fragment key={index}>
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#FFF]">
                {couple.names}
              </span>
              {index === 0 && (
                <span className="font-serif italic text-base text-[#DFBA73] select-none">&amp;</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Action Controls for Replay and Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-7 pt-5 border-t border-[#B58A42]/30"
        >
          <button
            type="button"
            onClick={onReplay}
            className="btn-gold !py-2.5 !px-5 text-xs font-sans tracking-widest uppercase"
            aria-label="Replay cinematic invitation"
          >
            <RotateCcw size={14} />
            <span>Replay Film</span>
          </button>

          <button
            type="button"
            onClick={onJumpToDetails}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded bg-[#4A1420]/80 hover:bg-[#6A2131] border border-[#B58A42]/50 text-[#F4D38A] text-xs font-sans font-medium tracking-widest uppercase transition-colors"
            aria-label="View event details again"
          >
            <CalendarCheck size={14} />
            <span>Event Details</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded bg-[#24160F]/80 hover:bg-[#382318] border border-[#B58A42]/40 text-[#DFBA73] text-xs font-sans tracking-widest uppercase transition-colors"
            aria-label="Share invitation"
          >
            {shared ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            <span>{shared ? 'Link Copied' : 'Share'}</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="relative z-10 pb-16" />
    </div>
  );
};
