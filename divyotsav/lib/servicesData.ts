export interface ServiceData {
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
  bannerImage: string;
  galleryImages: string[];
  timelineTitle: string;
  timelineDescription: string;
}

export const servicesData: ServiceData[] = [
  {
    title: "Weddings",
    slug: "weddings",
    category: "Wedding",
    sanskritLabel: "विवाह (Vivah)",
    tagline: "Sacred Unions, Timeless Elegance",
    shortDescription: "Immersive design, ritualistic depth, and flawless coordination for your royal wedding.",
    fullDescription: "In Indian culture, a wedding is not merely a social gathering, but a sacred transition (Samskara) bringing together families, souls, and heritage. We elevate this holy union into an immersive visual narrative. Every floral architecture, lantern path, and mandap detail is meticulously planned to harmonize with ancient geometry and luxury styling.",
    designPhilosophy: "We focus on breathing room and natural light. We blend rich Indian silks, hand-worked brass pots, and locally sourced jasmine garlands with contemporary metal structures to construct a visual signature that feels timelessly sacred.",
    priceFrom: 300000,
    features: [
      "Full Mandap Architectural Design",
      "Vedic Ritual Space Styling",
      "Custom Guest Flow & Coordination",
      "Traditional Lighting & Sangeet Setup",
      "Artisan Favor Sourcing",
    ],
    bannerImage: "/images/gallery/1.png",
    galleryImages: ["/images/gallery/1.png", "/images/gallery/2.png", "/images/gallery/3.png"],
    timelineTitle: "The Sacred Canopy",
    timelineDescription: "In Indian marriages, the Mandap represents the universe under which the couple takes their holy vows. We honor this architecture with bespoke floral detailing.",
  },
  {
    title: "Corporate Events",
    slug: "corporate-events",
    category: "Corporate",
    sanskritLabel: "आयोजन (Aayojan)",
    tagline: "Boardroom Precision, Grand Celebration",
    shortDescription: "High-stakes corporate galas, keynotes, and product launches designed with editorial clarity.",
    fullDescription: "Corporate celebrations demand absolute precision paired with high-impact aesthetics. We design keynote stages, gala setups, and launch environments that translate your company's core values into structural forms, ensuring that every touchpoint resonates with editorial elegance and flawless logistics.",
    designPhilosophy: "We employ sharp lines, geometric glass elements, and dramatic accent lighting. We avoid standard corporate booths, curating custom-designed lounges and interactive spaces that encourage executive networking.",
    priceFrom: 150000,
    features: [
      "Custom Keynote Stage Design",
      "Interactive Product Launch Lounges",
      "Full Audio-Visual Logistics",
      "Executive Hospitality Flow",
      "Bespoke Branding Integrations",
    ],
    bannerImage: "/images/gallery/5.png",
    galleryImages: ["/images/gallery/5.png", "/images/gallery/6.png", "/images/gallery/3.png"],
    timelineTitle: "Structural Harmony",
    timelineDescription: "Corporate staging requires clean symmetry and high visibility. We build stages that frame your speakers with architectural gravitas.",
  },
  {
    title: "Social Functions",
    slug: "social-functions",
    category: "Social Function",
    sanskritLabel: "सामुदायिक उत्सव",
    tagline: "Community Bonded by Tradition",
    shortDescription: "Milestone anniversaries, traditional ustavs, and intimate private dinners.",
    fullDescription: "Milestone family functions and traditional festivals represent the glue that holds our communities together. We create private celebrations, Diwali utsavs, and silver anniversaries that emphasize heritage, intimacy, and warm hospitality, giving your family a beautiful backdrop for their memories.",
    designPhilosophy: "Intimate and sensory-rich. We layer warm lighting, hand-dipped candles, aromatic herbs, and traditional sitting arrangements (Diwans) to make guests feel immediately at home.",
    priceFrom: 60000,
    features: [
      "Intimate Dinings & Seating Layouts",
      "Traditional Festive Theming",
      "Heritage Music & Lounge Spaces",
      "Bespoke Catering Presentational Styling",
      "Anniversary Ritual Coordination",
    ],
    bannerImage: "/images/gallery/6.png",
    galleryImages: ["/images/gallery/6.png", "/images/gallery/4.png", "/images/gallery/2.png"],
    timelineTitle: "The Hearth of Hospitality",
    timelineDescription: "Traditional Indian hospitality (Athithi Devo Bhava) centers on welcoming guests into a warm home. We design custom lounges to invoke this spirit.",
  },
  {
    title: "Luxury Gifting",
    slug: "luxury-gifting",
    category: "Luxury Gifting",
    sanskritLabel: "उपहार (Upahaar)",
    tagline: "Curated Tokens of Devotion",
    shortDescription: "Bespoke favour hampers, executive corporate gifts, and festive collections.",
    fullDescription: "In Indian tradition, the act of gifting (Dana) is an expression of grace, love, and spiritual generosity. From bespoke wedding favour hampers to curated festive collections and executive corporate gift sets, we design tokens that carry the soul of celebration.",
    designPhilosophy: "We source from Indian artisans — hand-block prints, brass figurines, organic sweets, and custom packaging that reflects your event's aesthetic.",
    priceFrom: 25000,
    features: [
      "Custom Gift Hamper Curation",
      "Artisan Sourcing & Packaging Design",
      "Corporate Gift Set Branding",
      "Festive Collection Design",
    ],
    bannerImage: "/images/gallery/3.png",
    galleryImages: ["/images/gallery/3.png", "/images/gallery/4.png", "/images/gallery/1.png"],
    timelineTitle: "The Art of Giving",
    timelineDescription: "Every gift represents a connection. We package each item in sustainable, hand-crafted containers that reflect artisanal heritage.",
  },
];
