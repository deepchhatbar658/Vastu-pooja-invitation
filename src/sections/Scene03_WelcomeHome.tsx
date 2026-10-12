import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';
import { GoldDivider, GoldKalashIcon } from '../components/GoldOrnament';
import { ASSET_MANIFEST } from '../data/assets';

interface WelcomeHomeProps {
  onComplete?: () => void;
}

export const Scene03_WelcomeHome: React.FC<WelcomeHomeProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Welcome home video play caught:', err);
      });
    }
  }, []);

  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 overflow-hidden bg-[#1F050B]">
      {/* Cinematic Gliding Hallway Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={ASSET_MANIFEST.videos.hallwayGlide}
          playsInline
          muted
          autoPlay
          onEnded={onComplete}
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.1]"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Fallback image */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${ASSET_MANIFEST.images.homeEntrance})` }}
        />
      </div>

      {/* Warm Ambient Vignette and Sunbeam Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 10, 8, 0.7) 0%, rgba(74, 20, 32, 0.25) 50%, rgba(20, 10, 8, 0.85) 100%)',
        }}
      />

      {/* Top Auspicious Icon */}
      <motion.div
        className="relative z-20 pt-6 sm:pt-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <GoldKalashIcon size={44} className="drop-shadow-[0_0_12px_rgba(244,211,138,0.5)]" />
      </motion.div>

      {/* Centerpiece Typographic Card: Welcome Home */}
      <motion.div
        className="cinematic-panel relative z-30 max-w-2xl text-center px-6 py-8 sm:px-10 sm:py-10 rounded-2xl backdrop-blur-md my-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gujarati Welcome Greeting */}
        <TextReveal delay={1.2} as="h2">
          <span
            className="font-gujarati text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-[#F4D38A] block leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(244, 211, 138, 0.45)' }}
          >
            અમારા નવા ઘરમાં આપનું હાર્દિક સ્વાગત છે.
          </span>
        </TextReveal>

        <GoldDivider width={260} className="my-3 mx-auto" />

        {/* English Typography */}
        <TextReveal delay={1.6} as="p">
          <span className="font-serif italic text-xl sm:text-2xl md:text-3xl tracking-widest text-[#F5EBDD] block font-light">
            Welcome to our new home.
          </span>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#E9D8B9]/80 mt-4"
        >
          Saransh Courtyard • Dharnidhar
        </motion.p>
      </motion.div>

      {/* Bottom spacer */}
      <div className="relative z-10 pb-16" />
    </div>
  );
};
