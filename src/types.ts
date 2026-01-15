export interface CurrencyRates {
  USD: number;
  BRL: number;
  ZAR: number;
  lastUpdated: number;
}

export type CurrencyCode = 'USD' | 'BRL' | 'ZAR';

export type City = 'CPT' | 'JNB' | 'SP';

export interface Accommodation {
  id: string;
  name: string;
  link: string;
  breakfastIncluded: boolean;
  breakfastPrice?: string;
  security: string;
  securityScore: string;
  uberAirport: string;
  uberToCenter: string;
  market: string;
  differential: string;
  totalTripEst: string;
  rankLabel?: string;
  hasBRT?: boolean;
  hasPool?: boolean;
  dailyPrice: string;
  stayTotalHotels: string;
  description: string;
  checkInWarning: string;
  score: string;
  scoreLabel: string;
  neighborhoodInfo: string;
  leisureInfo: string;
  coolingType: 'AC' | 'Fan';
  coolingLabel: string;
}

export type ThemeColor = 'green' | 'gold' | 'red' | 'blue' | 'black';
export interface MenuItem {
  title: string;
  icon: React.ReactNode;
  gradientClass: string;
  textColor?: string;
}

// Translator Component Types
export type ScreenState = 'welcome' | 'language-select' | 'dialect-select' | 'category-select' | 'practice' | 'conversation';

export interface PhraseData {
  id: number;
  pt: string;
  target_text: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  countryCode: string;
  code: string;
}

export interface Dialect {
  id: string;
  name: string;
  countryCode: string;
  code: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  description: string;
}