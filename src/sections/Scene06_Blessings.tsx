import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';
import { GoldDivider, GoldKalashIcon } from '../components/GoldOrnament';
import { ASSET_MANIFEST } from '../data/assets';
import { INVITATION_DATA } from '../data/invitation';

interface BlessingsSceneProps {
  onComplete?: () => void;
}

export const Scene06_Blessings: React.FC<BlessingsSceneProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Blessings video playback caught:', err);
      });
    }
  }, []);

  return (
    <div className="scene-shell relative w-full h-full min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 overflow-hidden bg-[#1F050B]">
      {/* Cinematic Macro Puja Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={ASSET_MANIFEST.videos.pujaCinematic}
          playsInline
          muted
          autoPlay
          onEnded={onComplete}
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.1]"
          style={{ width: '100%', height: '100%' }}
        />
        {/* High-res image fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${ASSET_MANIFEST.images.pujaArrangement})` }}
        />
      </div>

      {/* Atmospheric Sacred Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 10, 8, 0.75) 0%, rgba(74, 20, 32, 0.25) 50%, rgba(20, 10, 8, 0.9) 100%)',
        }}
      />

      {/* Top Auspicious Icon */}
      <motion.div
        className="relative z-20 pt-6 sm:pt-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <GoldKalashIcon size={46} className="drop-shadow-[0_0_15px_rgba(244,211,138,0.5)]" />
      </motion.div>

      {/* Sincere Blessings Typographic Overlay */}
      <motion.div
        className="cinematic-panel relative z-30 max-w-xl text-center px-6 py-8 sm:px-10 sm:py-9 rounded-2xl backdrop-blur-md my-auto"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gujarati Blessings Overlay */}
        <TextReveal delay={1.1} as="p">
          <span
            className="font-gujarati text-2xl sm:text-3xl md:text-3xl font-medium tracking-wide text-[#F4D38A] block leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(244, 211, 138, 0.5)' }}
          >
            {INVITATION_DATA.blessings.textGu}
          </span>
        </TextReveal>

        <GoldDivider width={240} className="my-3.5 mx-auto" />

        {/* English Blessings Overlay */}
        <TextReveal delay={1.6} as="p">
          <span className="font-serif italic text-xl sm:text-2xl tracking-widest text-[#F5EBDD] block font-light">
            {INVITATION_DATA.blessings.textEn}
          </span>
        </TextReveal>
      </motion.div>

      <div className="relative z-10 pb-16" />
    </div>
  );
};
