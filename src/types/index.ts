export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  emoji: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  emoji: string;
  features: string[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  initials: string;
  age: number;
  service: string;
  quote: string;
  rating: number;
  result: string;
  resultLabel: string;
}
