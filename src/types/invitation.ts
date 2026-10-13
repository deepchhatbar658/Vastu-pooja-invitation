export interface Bilingual {
  en: string;
  gu: string;
}

export interface ScheduleItem {
  id: 'pooja' | 'bhojan';
  /** One-word label used on the invitation card, e.g. "Pooja". */
  short: string;
  time: Bilingual;
  title: Bilingual;
  note: string;
  image: string;
}

export interface InvitationData {
  meta: {
    title: string;
    description: string;
  };
  invocation: string;
  event: {
    title: Bilingual;
    tagline: Bilingual;
  };
  hosts: {
    surname: string;
    couples: string[];
  };
  date: Bilingual & {
    /** Start of the ceremony, with IST offset. Used for the calendar entry. */
    start: string;
    /** Approximate end of the day's programme, for the calendar entry. */
    end: string;
  };
  schedule: ScheduleItem[];
  venue: {
    line1: string;
    line2: string;
    /** Paste the exact Google Maps share link here to pin the building precisely. */
    mapsUrl: string;
  };
  welcome: Bilingual;
  blessings: Bilingual;
  closing: Bilingual & {
    signOff: string;
  };
}
