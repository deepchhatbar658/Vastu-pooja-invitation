import { InvitationData } from '../types/invitation';
import { ASSETS } from './assets';

export const INVITATION: InvitationData = {
  meta: {
    title: 'Vastu Pooja & Griha Pravesh — Chhatbar Family',
    description:
      'The Chhatbar family warmly invites you to the Vastu Pooja and Griha Pravesh of our new home.',
  },
  invocation: '॥ શ્રી ગણેશાય નમઃ ॥',
  event: {
    title: {
      en: 'Vastu Pooja & Griha Pravesh',
      gu: 'વાસ્તુ પૂજન અને ગૃહ પ્રવેશ',
    },
    tagline: {
      en: 'A new beginning',
      gu: 'એક નવી શરૂઆત',
    },
  },
  hosts: {
    surname: 'Chhatbar',
    couples: ['Tejas & Hetal', 'Taral & Archana'],
  },
  date: {
    en: 'Saturday, 24 October 2026',
    gu: 'શનિવાર, ૨૪ ઑક્ટોબર, ૨૦૨૬',
    start: '2026-10-24T09:00:00+05:30',
    end: '2026-10-24T14:30:00+05:30',
  },
  schedule: [
    {
      id: 'pooja',
      short: 'Pooja',
      time: { en: '9:00 AM', gu: 'સવારે ૯:૦૦ વાગ્યાથી' },
      title: { en: 'Vastu Pooja', gu: 'વાસ્તુ પૂજન' },
      note: 'Vastu Shanti & sacred havan',
      image: ASSETS.images.pujaArrangement,
    },
    {
      id: 'bhojan',
      short: 'Bhojan',
      time: { en: '12:30 PM', gu: 'બપોરે ૧૨:૩૦ વાગ્યાથી' },
      title: { en: 'Bhojan Arambh', gu: 'ભોજન આરંભ' },
      note: 'A traditional festive lunch',
      image: ASSETS.images.prasadLunch,
    },
  ],
  venue: {
    line1: '306, Saransh Courtyard',
    line2: 'Dharnidhar, Ahmedabad',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Saransh Courtyard, Dharnidhar, Ahmedabad'),
  },
  welcome: {
    gu: 'અમારા નવા ઘરમાં આપનું હાર્દિક સ્વાગત છે',
    en: 'Welcome to our new home',
  },
  blessings: {
    gu: 'આપની ઉપસ્થિતિ અને આશીર્વાદની અપેક્ષા સાથે…',
    en: 'Your presence and blessings would mean the world to us.',
  },
  closing: {
    gu: 'આપને ભાવભર્યું આમંત્રણ છે',
    en: 'You are warmly invited',
    signOff: 'With love,',
  },
};
