export interface LocalizedString {
  id: string;
  en: string;
}

export interface LocalizedText {
  id: string;
  en: string;
}

export interface LocalizedArray {
  id: string[];
  en: string[];
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Product {
  _id: string;
  name: LocalizedString;
  slug: { current: string };
  category: '4t' | 'matic' | 'specialty';
  image: SanityImage;
  description: LocalizedText;
  viscosity: string;
  apiStandard: string;
  jasoStandard: string;
  volume: number;
  features?: LocalizedArray;
  recommended?: LocalizedArray;
  isFeatured: boolean;
  order: number;
}

export interface Dealer {
  _id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp?: string;
  operatingHours: LocalizedString;
  isActive: boolean;
}

export interface Promotion {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  image: SanityImage;
  description: LocalizedText;
  terms?: {
    id: unknown[];
    en: unknown[];
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface SiteSettings {
  logo: SanityImage;
  companyName: string;
  tagline: LocalizedString;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  address: LocalizedText;
  operatingHours: LocalizedString;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export type Locale = 'id' | 'en';
