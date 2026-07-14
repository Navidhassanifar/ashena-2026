export interface Country {
  code: string;
  name: string;
  nameEn: string;
  flag: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  body: string;
  type: 'normal' | 'warning' | 'success' | 'danger';
}

export interface StoryAuthor {
  id: string;
  name: string;
  initials: string;
  originCity: string;
  migrationPath: string[];
  currentCity: string;
  occupation: string;
  languages: string[];
  helpTopics: string[];
  yearsExperienceSinceVisa: number;
  isSample: boolean;
}

export interface Story {
  id: string;
  author: StoryAuthor;
  countryCode: string;
  country: Country;
  visaCategory: string;
  title: string;
  subtitle: string;
  outcome: string;
  duration: string;
  appointmentWait: string;
  totalCost: string;
  timeline: TimelineEntry[];
  documents: string[];
  pitfall: string;
  outcomeNote: string;
  viewCount: number;
  helpedCount: number;
  isSample: boolean;
}

export interface WaitlistEntry {
  id: string;
  role: string;
  contactType: 'email' | 'phone';
  contact: string;
  willingToPay: string;
  priceExpectation: string;
  countryInterest: string;
  createdAt: string;
}
