import CinematicSlide from "@/components/sections/CinematicSlide";
import QuoteSpacer from "@/components/sections/QuoteSpacer";
import { sanityFetch } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";
import { CMSHomepage, CMSHomepageSection } from "@/lib/sanity/types";

// Thin cream divider strip between each full-screen cinematic slide.
// Shows the --cream background as editorial breathing room per design spec.
function SlideDivider() {
  return (
    <div
      className="w-full bg-cream border-t border-border/30"
      style={{ height: "clamp(24px, 4vw, 56px)" }}
    />
  );
}

// Fallback layout representing the initial 12 slides and 2 quotes
const defaultSections: CMSHomepageSection[] = [
  {
    _type: "cinematicSlide",
    heading: "15 YEARS DIVYOTSAV",
    subtitle: "दिव्योत्सव • Divine Celebrations",
    image: "https://sabyasachi.com/cdn/shop/files/0-02_f96d731f-782b-4c36-b14e-4b8890424734_768x.jpg?v=1768196995",
    buttonText: "WATCH NOW",
    buttonLink: "https://youtu.be/I5-uVkdgnTw",
    altText: "15 Years of Divyotsav Indian Luxury Event Management",
  },
  {
    _type: "quoteSpacer",
    quote: "\u201cFor culture to be relevant, it needs to be dynamic.\u201d",
  },
  {
    _type: "cinematicSlide",
    heading: "WEDDINGS",
    subtitle: "विवाह • Sacred Unions, Timeless Elegance",
    image: "https://sabyasachi.com/cdn/shop/files/DESKTOP_JPEG_768x.jpg?v=1770793985",
    buttonText: "EXPLORE",
    buttonLink: "/services/weddings",
    altText: "Premium Luxury Weddings by Divyotsav",
  },
  {
    _type: "cinematicSlide",
    heading: "CORPORATE EVENTS",
    subtitle: "आयोजन • Boardroom Precision, Grand Celebration",
    image: "https://sabyasachi.com/cdn/shop/files/0-01_66ec1176-3f6d-46b0-8f21-c0910cadcaf6_768x.jpg?v=1762339437",
    buttonText: "EXPLORE",
    buttonLink: "/services/corporate-events",
    altText: "High End Corporate Event Planning and Production",
  },
  {
    _type: "cinematicSlide",
    heading: "SOCIAL FUNCTIONS",
    subtitle: "सामुदायिक उत्सव • Community Bonded by Tradition",
    image: "https://sabyasachi.com/cdn/shop/files/t0000.00seg_35caa918-bd0d-4173-8a00-768adcb8aadf_768x.png?v=1755717984",
    buttonText: "EXPLORE",
    buttonLink: "/services/social-functions",
    altText: "Bespoke Social Events and Festivals",
  },
  {
    _type: "cinematicSlide",
    heading: "LUXURY GIFTING",
    subtitle: "उपहार • Curated Tokens of Devotion",
    image: "https://sabyasachi.com/cdn/shop/files/Hero_Banner-01_ca8061c0-3038-4167-bafe-acdb234bde7c_768x.jpg?v=1768194740",
    buttonText: "EXPLORE",
    buttonLink: "/services/luxury-gifting",
    altText: "Bespoke Indian Luxury Gifts and Favours",
  },
  {
    _type: "cinematicSlide",
    heading: "THE ART OF CURATION",
    subtitle: "Divyotsav x Luxury Craftsmanship",
    image: "https://sabyasachi.com/cdn/shop/files/0-01_6db269bf-e2e8-41a0-b30b-f9b8e47ccc2d_768x.jpg?v=1755694146",
    buttonText: "EXPLORE",
    buttonLink: "/services",
    altText: "Indian Royal Curation and Design Aesthetics",
  },
  {
    _type: "cinematicSlide",
    heading: "HIGH ARTISTRY",
    subtitle: "Bespoke Event Architecture & Floral Design",
    image: "https://sabyasachi.com/cdn/shop/files/Banner_image-01_a09c7590-3ae8-4180-a57f-28e71553c784_768x.jpg?v=1762342549",
    buttonText: "EXPLORE",
    buttonLink: "/contact",
    altText: "Traditional Mandap Floral Design and Structure",
  },
  {
    _type: "quoteSpacer",
    quote: "\u201cCrowded narrow lanes with balconies jutting out of beautiful old mansions and homes, jostling for space in North Calcutta. So rich in its nonchalance, between the clamour of grandeur and decay. It\u2019s almost spiritual, the neglect of luxury and the casual existence of glamour. It makes Calcutta unforgettable.\u201d",
  },
  {
    _type: "cinematicSlide",
    heading: "BRIDAL COUTURE",
    subtitle: "Celebration of Indian Heritage & Craft",
    image: "https://sabyasachi.com/cdn/shop/files/Hero-01_7858bb31-290f-4fca-83b4-c14acec97ab9_768x.jpg?v=1721306155",
    buttonText: "EXPLORE",
    buttonLink: "/services/weddings",
    altText: "Premium Bridal Lehenga and Wedding Wear Design Representation",
  },
  {
    _type: "cinematicSlide",
    heading: "CURIOSITY & ANTIQUITY",
    subtitle: "Designing Bespoke Thematic Spaces",
    image: "https://sabyasachi.com/cdn/shop/files/Hero-01_1e8edafc-2d8f-418c-9551-ce3e693e28f8_768x.jpg?v=1763096730",
    buttonText: "EXPLORE",
    buttonLink: "/services",
    altText: "Curiosity Art and Indian Antiquities event styling",
  },
  {
    _type: "cinematicSlide",
    heading: "THE ROYAL EMBELLISHMENTS",
    subtitle: "Hand-forged Brass & Traditional Accents",
    image: "https://sabyasachi.com/cdn/shop/files/1_07614917-baab-48c2-b7ef-7931495f9dc8_768x.jpg?v=1731475150",
    buttonText: "EXPLORE",
    buttonLink: "/services",
    altText: "Indian Royal Wedding Jewelry and Embellishments",
  },
  {
    _type: "cinematicSlide",
    heading: "DIVINE CELEBRATIONS",
    subtitle: "Crafting Experiences That Live Forever",
    image: "https://sabyasachi.com/cdn/shop/files/d_M4B0661_web_683812a1-403f-46db-8b3e-c9941f4400c6_768x.jpg?v=1692595282",
    buttonText: "EXPLORE",
    buttonLink: "/services",
    altText: "Luxury Royal Indian Wedding Ceremony",
  },
  {
    _type: "cinematicSlide",
    heading: "THE ART OF DESIGN",
    subtitle: "Restrained Editorial Luxury",
    image: "https://sabyasachi.com/cdn/shop/files/D221009_SABYASACHI14880_768x.jpg?v=1696335498",
    buttonText: "EXPLORE",
    buttonLink: "/contact",
    altText: "Premium Restrained Luxury Indian Design and Architecture",
  },
];

export const revalidate = 60; // Revalidate dynamic home contents hourly or every minute for active studio updates

export default async function Home() {
  const homepageData = await sanityFetch<CMSHomepage | null>({
    query: homepageQuery,
    fallback: null,
  });

  const sections = homepageData?.sections && homepageData.sections.length > 0
    ? homepageData.sections
    : defaultSections;

  return (
    <main className="w-full flex flex-col">
      {sections.map((section, idx) => {
        if (section._type === "cinematicSlide") {
          const isNextSlide = sections[idx + 1]?._type === "cinematicSlide";
          return (
            <div key={`slide-${idx}`} className="w-full flex flex-col">
              <CinematicSlide
                imageSrc={section.image || "/images/about-bride.png"}
                heading={section.heading}
                subtitle={section.subtitle}
                buttonText={section.buttonText}
                buttonLink={section.buttonLink}
                priority={idx === 0}
                altText={section.altText}
              />
              {isNextSlide && <SlideDivider />}
            </div>
          );
        }

        if (section._type === "quoteSpacer") {
          return (
            <QuoteSpacer
              key={`quote-${idx}`}
              quote={section.quote}
            />
          );
        }

        return null;
      })}
    </main>
  );
}
