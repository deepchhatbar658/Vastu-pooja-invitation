import invitationCard from '../assets/media/invitation_card.webp';
import pujaArrangement from '../assets/media/puja_arrangement.webp';
import prasadLunch from '../assets/media/prasad_lunch.webp';
import homeAtDusk from '../assets/media/home_at_dusk.webp';

import doorReveal from '../assets/media/door_reveal.mp4';
import doorRevealPoster from '../assets/media/door_reveal_poster.webp';
import hallwayGlide from '../assets/media/hallway_glide.mp4';
import hallwayGlidePoster from '../assets/media/hallway_glide_poster.webp';
import pujaCinematic from '../assets/media/puja_cinematic.mp4';
import pujaCinematicPoster from '../assets/media/puja_cinematic_poster.webp';

// Full-resolution originals live in /source-assets. The files imported here are
// mobile-sized exports of them (WebP images, 720p H.264 video without audio).
export const ASSETS = {
  images: {
    invitationCard,
    pujaArrangement,
    prasadLunch,
    homeAtDusk,
  },
  videos: {
    doorReveal: { src: doorReveal, poster: doorRevealPoster },
    hallwayGlide: { src: hallwayGlide, poster: hallwayGlidePoster },
    pujaCinematic: { src: pujaCinematic, poster: pujaCinematicPoster },
  },
  audio: {
    soundtrack: '/soundtrack.m4a',
  },
};
