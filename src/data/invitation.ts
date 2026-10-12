import { InvitationData, SceneMeta } from "../types/invitation";

export const INVITATION_DATA: InvitationData = {
  meta: {
    title: "A New Beginning — Griha Pravesh & Vastu Pooja",
    description:
      "Chhatbar Family Cordially Invites You to Griha Pravesh and Vastu Pooja Ceremony.",
  },
  invocation: {
    text: "॥ શ્રી ગણેશાય નમઃ ॥",
    subtextEn: "In the divine presence of Lord Ganesha",
  },
  event: {
    titleEn: "VASTU POOJA & GRIHA PRAVESH",
    titleGu: "વાસ્તુ પૂજન અને ગૃહ પ્રવેશ",
    subheadingEn: "A New Beginning…",
    subheadingGu: "એક નવી શરૂઆત…",
  },
  hosts: {
    familyTitle: "CHHATBAR FAMILY",
    couples: [
      { names: "Tejas & Hetal Chhatbar" },
      { names: "Taral & Archana Chhatbar" },
    ],
  },
  schedule: {
    date: {
      en: "Saturday, 24 October 2026",
      gu: "શનિવાર, ૨૪ ઑક્ટોબર, ૨૦૨૬",
      iso: "2026-10-24",
    },
    ceremony: {
      titleEn: "Auspicious Ceremony",
      titleGu: "વાસ્તુ પૂજન વિધિ",
      timeEn: "9:00 AM onwards",
      timeGu: "સવારે ૯:૦૦ વાગ્યાથી",
      note: "Vastu Shanti & Sacred Havan",
    },
    lunch: {
      titleEn: "BHOJAN ARAMBH / LUNCH",
      titleGu: "ભોજન આરંભ",
      timeEn: "12:30 PM onwards",
      timeGu: "બપોરે ૧૨:૩૦ વાગ્યાથી",
      note: "Traditional Festive Feast",
    },
  },
  venue: {
    address: "306, Saransh Courtyard, Dharnidhar",
    area: "Dharnidhar",
    city: "Ahmedabad",
    fullText: "306, Saransh Courtyard, Dharnidhar",
  },
  blessings: {
    textGu: "આપની ઉપસ્થિતિ અને આશીર્વાદની અપેક્ષા સાથે…",
    textEn: "With your presence and blessings…",
  },
  closing: {
    textGu: "આપ સહ પરિવાર પધારશો.",
    textEn: "We look forward to welcoming you and your family.",
    signOffEn: "With love,",
  },
};

export const SCENES: SceneMeta[] = [
  {
    id: 1,
    name: "Sacred Opening",
    duration: 10,
    titleEn: "Sacred Invocation",
    titleGu: "શ્રી ગણેશાય નમઃ",
  },
  {
    id: 2,
    name: "Doorway Reveal",
    duration: 9,
    titleEn: "A New Beginning",
    titleGu: "એક નવી શરૂઆત",
  },
  {
    id: 3,
    name: "Welcome Home",
    duration: 9,
    titleEn: "Welcome Home",
    titleGu: "સ્વાગતમ્",
  },
  {
    id: 4,
    name: "The Invitation",
    duration: 10,
    titleEn: "The Invitation",
    titleGu: "નિમંત્રણ",
  },
  {
    id: 5,
    name: "Event Details",
    duration: 12,
    titleEn: "Ceremony Details",
    titleGu: "સમય અને સ્થળ",
  },
  {
    id: 6,
    name: "Blessings",
    duration: 9,
    titleEn: "Sacred Blessings",
    titleGu: "શુભ આશીર્વાદ",
  },
  {
    id: 7,
    name: "Bhojan Arambh / Lunch",
    duration: 8,
    titleEn: "Bhojan Arambh / Lunch",
    titleGu: "ભોજન આરંભ",
  },
  {
    id: 8,
    name: "Final Welcome",
    duration: 10,
    titleEn: "Warm Welcome",
    titleGu: "સહ પરિવાર પધારશો",
  },
];
