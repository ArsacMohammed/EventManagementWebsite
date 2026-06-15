import CinematicSlide from "@/components/sections/CinematicSlide";
import QuoteSpacer from "@/components/sections/QuoteSpacer";

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

export default async function Home() {
  return (
    <main className="w-full flex flex-col">

      {/* Slide 1: 15 Years Divyotsav Intro Image */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/0-02_f96d731f-782b-4c36-b14e-4b8890424734_768x.jpg?v=1768196995"
        heading="15 YEARS DIVYOTSAV"
        subtitle="दिव्योत्सव • Divine Celebrations"
        buttonText="WATCH NOW"
        buttonLink="https://youtu.be/I5-uVkdgnTw"
        priority={true}
        altText="15 Years of Divyotsav Indian Luxury Event Management"
      />

      {/* Quote 1 */}
      <QuoteSpacer quote={"\u201cFor culture to be relevant, it needs to be dynamic.\u201d"} />

      <SlideDivider />

      {/* Slide 2: Weddings */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/DESKTOP_JPEG_768x.jpg?v=1770793985"
        heading="WEDDINGS"
        subtitle="विवाह • Sacred Unions, Timeless Elegance"
        buttonText="EXPLORE"
        buttonLink="/services/weddings"
        altText="Premium Luxury Weddings by Divyotsav"
      />

      <SlideDivider />

      {/* Slide 3: Corporate Events */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/0-01_66ec1176-3f6d-46b0-8f21-c0910cadcaf6_768x.jpg?v=1762339437"
        heading="CORPORATE EVENTS"
        subtitle="आयोजन • Boardroom Precision, Grand Celebration"
        buttonText="EXPLORE"
        buttonLink="/services/corporate-events"
        altText="High End Corporate Event Planning and Production"
      />

      <SlideDivider />

      {/* Slide 4: Social Functions */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/t0000.00seg_35caa918-bd0d-4173-8a00-768adcb8aadf_768x.png?v=1755717984"
        heading="SOCIAL FUNCTIONS"
        subtitle="सामुदायिक उत्सव • Community Bonded by Tradition"
        buttonText="EXPLORE"
        buttonLink="/services/social-functions"
        altText="Bespoke Social Events and Festivals"
      />

      <SlideDivider />

      {/* Slide 5: Luxury Gifting */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/Hero_Banner-01_ca8061c0-3038-4167-bafe-acdb234bde7c_768x.jpg?v=1768194740"
        heading="LUXURY GIFTING"
        subtitle="उपहार • Curated Tokens of Devotion"
        buttonText="EXPLORE"
        buttonLink="/services/luxury-gifting"
        altText="Bespoke Indian Luxury Gifts and Favours"
      />

      <SlideDivider />

      {/* Slide 6: Art of Curation */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/0-01_6db269bf-e2e8-41a0-b30b-f9b8e47ccc2d_768x.jpg?v=1755694146"
        heading="THE ART OF CURATION"
        subtitle="Divyotsav x Luxury Craftsmanship"
        buttonText="EXPLORE"
        buttonLink="/services"
        altText="Indian Royal Curation and Design Aesthetics"
      />

      <SlideDivider />

      {/* Slide 7: High Artistry */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/Banner_image-01_a09c7590-3ae8-4180-a57f-28e71553c784_768x.jpg?v=1762342549"
        heading="HIGH ARTISTRY"
        subtitle="Bespoke Event Architecture &amp; Floral Design"
        buttonText="EXPLORE"
        buttonLink="/contact"
        altText="Traditional Mandap Floral Design and Structure"
      />

      {/* Quote 2 */}
      <QuoteSpacer
        quote={
          "\u201cCrowded narrow lanes with balconies jutting out of beautiful old mansions and homes, jostling for space in North Calcutta. So rich in its nonchalance, between the clamour of grandeur and decay. It\u2019s almost spiritual, the neglect of luxury and the casual existence of glamour. It makes Calcutta unforgettable.\u201d"
        }
      />

      <SlideDivider />

      {/* Slide 8: Bridal Couture */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/Hero-01_7858bb31-290f-4fca-83b4-c14acec97ab9_768x.jpg?v=1721306155"
        heading="BRIDAL COUTURE"
        subtitle="Celebration of Indian Heritage &amp; Craft"
        buttonText="EXPLORE"
        buttonLink="/services/weddings"
        altText="Premium Bridal Lehenga and Wedding Wear Design Representation"
      />

      <SlideDivider />

      {/* Slide 9: Curiosity & Antiquity */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/Hero-01_1e8edafc-2d8f-418c-9551-ce3e693e28f8_768x.jpg?v=1763096730"
        heading="CURIOSITY &amp; ANTIQUITY"
        subtitle="Designing Bespoke Thematic Spaces"
        buttonText="EXPLORE"
        buttonLink="/services"
        altText="Curiosity Art and Indian Antiquities event styling"
      />

      <SlideDivider />

      {/* Slide 10: The Royal Embellishments */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/1_07614917-baab-48c2-b7ef-7931495f9dc8_768x.jpg?v=1731475150"
        heading="THE ROYAL EMBELLISHMENTS"
        subtitle="Hand-forged Brass &amp; Traditional Accents"
        buttonText="EXPLORE"
        buttonLink="/services"
        altText="Indian Royal Wedding Jewelry and Embellishments"
      />

      <SlideDivider />

      {/* Slide 11: Divine Celebrations */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/d_M4B0661_web_683812a1-403f-46db-8b3e-c9941f4400c6_768x.jpg?v=1692595282"
        heading="DIVINE CELEBRATIONS"
        subtitle="Crafting Experiences That Live Forever"
        buttonText="EXPLORE"
        buttonLink="/services"
        altText="Luxury Royal Indian Wedding Ceremony"
      />

      <SlideDivider />

      {/* Slide 12: The Art of Design */}
      <CinematicSlide
        imageSrc="https://sabyasachi.com/cdn/shop/files/D221009_SABYASACHI14880_768x.jpg?v=1696335498"
        heading="THE ART OF DESIGN"
        subtitle="Restrained Editorial Luxury"
        buttonText="EXPLORE"
        buttonLink="/contact"
        altText="Premium Restrained Luxury Indian Design and Architecture"
      />

    </main>
  );
}
