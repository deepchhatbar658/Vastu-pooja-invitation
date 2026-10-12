export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface SceneMeta {
  id: SceneId;
  name: string;
  duration: number; // in seconds
  titleEn: string;
  titleGu: string;
}

export interface HostCouple {
  names: string;
}

export interface InvitationData {
  meta: {
    title: string;
    description: string;
  };
  invocation: {
    text: string;
    subtextEn: string;
  };
  event: {
    titleEn: string;
    titleGu: string;
    subheadingEn: string;
    subheadingGu: string;
  };
  hosts: {
    familyTitle?: string;
    couples: HostCouple[];
  };
  schedule: {
    date: {
      en: string;
      gu: string;
      iso: string;
    };
    ceremony: {
      titleEn: string;
      titleGu: string;
      timeEn: string;
      timeGu: string;
      note?: string;
    };
    lunch: {
      titleEn: string;
      titleGu: string;
      timeEn: string;
      timeGu: string;
      note?: string;
    };
  };
  venue: {
    address: string;
    area: string;
    city: string;
    fullText: string;
  };
  blessings: {
    textGu: string;
    textEn: string;
  };
  closing: {
    textGu: string;
    textEn: string;
    signOffEn: string;
  };
}
