// Direct asset imports for Vite bundler
import doorClosedImg from '../assets/door_closed.png';
import doorOpenImg from '../assets/door_open.png';
import homeEntranceImg from '../assets/home_entrance.png';
import invitationParchmentImg from '../assets/invitation_parchment.png';
import pujaArrangementImg from '../assets/puja_arrangement.png';
import prasadLunchImg from '../assets/prasad_and_lunch.jpg';
import homeAtDuskImg from '../assets/home_at_dusk.jpg';

// Video asset imports
import doorRevealVideo from '../assets/door_reveal.mp4';
import hallwayVideo from '../assets/hallway_glide.mp4';
import pujaCinematicVideo from '../assets/puja_cinematic.mp4';

export const ASSET_MANIFEST = {
  images: {
    doorClosed: doorClosedImg,
    doorOpen: doorOpenImg,
    homeEntrance: homeEntranceImg,
    invitationParchment: invitationParchmentImg,
    pujaArrangement: pujaArrangementImg,
    prasadLunch: prasadLunchImg,
    homeAtDusk: homeAtDuskImg,
  },
  videos: {
    doorReveal: doorRevealVideo,
    hallwayGlide: hallwayVideo,
    pujaCinematic: pujaCinematicVideo,
  },
  audio: {
    soundtrack: '/soundtrack.m4a',
    audioIntro: '/audio_intro.m4a',
    audioScene2: '/audio_scene2.m4a',
    audioScene3: '/audio_scene3.m4a',
  }
};
