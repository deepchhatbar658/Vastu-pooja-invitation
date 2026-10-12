import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';
import { GoldDivider } from '../components/GoldOrnament';
import { PetalCanvas } from '../components/PetalCanvas';
import { ASSET_MANIFEST } from '../data/assets';
import { INVITATION_DATA } from '../data/invitation';

interface DoorwayRevealProps {
  onComplete?: () => void;
}

export const Scene02_DoorwayReveal: React.FC<DoorwayRevealProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Video auto-playback caught:', err);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1F050B]">
      {/* Cinematic Video Layer: Diya -> Doors Open -> Golden Light */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={ASSET_MANIFEST.videos.doorReveal}
          playsInline
          muted
          autoPlay
          onEnded={onComplete}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Fallback image in case video is loading */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${ASSET_MANIFEST.images.doorOpen})` }}
        />
      </div>

      {/* Atmospheric Golden Sunbeam Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 223, 140, 0.15) 0%, rgba(74, 20, 32, 0.45) 60%, rgba(20, 10, 8, 0.85) 100%)',
        }}
      />

      {/* Drifting Marigold Petals */}
      <PetalCanvas count={18} active={true} />

      {/* Foreground Typographic Overlay: "A New Beginning..." */}
      <div className="relative z-30 text-center px-6 max-w-2xl mt-auto mb-20 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-2xl backdrop-blur-md"
          style={{
            background: 'rgba(31, 5, 11, 0.65)',
            border: '1px solid rgba(181, 138, 66, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Gujarati Subtitle */}
          <TextReveal delay={1.8} as="h2">
            <span
              className="font-gujarati text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide text-[#F4D38A] block mb-2"
              style={{ textShadow: '0 0 25px rgba(244, 211, 138, 0.5)' }}
            >
              {INVITATION_DATA.event.subheadingGu}
            </span>
          </TextReveal>

          <GoldDivider width={220} className="my-2" />

          {/* English Subtitle */}
          <TextReveal delay={2.3} as="p">
            <span className="font-serif italic text-2xl sm:text-3xl tracking-widest text-[#F5EBDD]">
              {INVITATION_DATA.event.subheadingEn}
            </span>
          </TextReveal>
        </motion.div>
      </div>
    </div>
  );
};
