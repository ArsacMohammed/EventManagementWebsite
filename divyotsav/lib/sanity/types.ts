export interface CMSService {
  title: string;
  slug: string;
  category: "Wedding" | "Corporate" | "Social Function" | "Luxury Gifting";
  sanskritLabel: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  designPhilosophy: string;
  priceFrom: number;
  features: string[];
  bannerImage?: string;
  galleryImages?: string[];
  timelineTitle?: string;
  timelineDescription?: string;
}

export interface CMSTestimonial {
  clientName: string;
  eventType: string;
  rating?: number;
  quote: string;
}

export interface CMSGalleryItem {
  title: string;
  image: string;
  category?: string;
}

export interface CMSSiteSettings {
  tagline?: string;
  heroVideoUrl?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  consultationHours?: string;
}
