export type Language = 'en' | 'ml';

export interface LeadData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  condition: 'infertility' | 'mental_health' | 'allergy' | 'hereditary' | 'general';
  preferredDate?: string;
  preferredTime?: string;
  language: 'English' | 'Malayalam';
  notes?: string;
  submittedAt?: string;
  status?: 'pending' | 'contacted' | 'resolved';
}

export interface SpecializationDetail {
  id: string;
  titleKey: string;
  icon: string;
  taglineKey: string;
  overviewKey: string;
  symptomsTreatedKeys: string[];
  approachKeys: string[];
  successStoryKey: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: { en: string; ml: string };
  category: 'clinic' | 'infertility' | 'mental_health' | 'remedies';
  description: { en: string; ml: string };
  imageUrl: string;
}

export interface TestimonialItem {
  id: string;
  patientName: { en: string; ml: string };
  location: { en: string; ml: string };
  category: 'infertility' | 'mental_health' | 'general';
  condition: { en: string; ml: string };
  story: { en: string; ml: string };
  rating: number;
  duration: { en: string; ml: string };
}

export interface FAQItem {
  question: { en: string; ml: string };
  answer: { en: string; ml: string };
  category: 'general' | 'infertility' | 'mental_health';
}
