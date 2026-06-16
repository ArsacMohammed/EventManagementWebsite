/**
 * Divyotsav — Sanity Content Seed Script (v2 — with real asset uploads)
 * -------------------------------------------------------------------------
 * Pushes all hardcoded fallback content into the Sanity "production" dataset
 * AND uploads every image/video asset so the live website fetches real CDN data.
 *
 * Usage:
 *   node scripts/seed-sanity.mjs
 *
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local  (already set: yov8682k)
 *   - NEXT_PUBLIC_SANITY_DATASET in .env.local      (already set: production)
 *   - SANITY_API_TOKEN in .env.local                (write token from sanity.io/manage)
 *
 * Idempotent — uses createOrReplace so running twice won't duplicate documents.
 * Asset uploads are deduplicated in-memory by URL / file path.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, extname } from "path";

// ── Load .env.local manually ─────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const envPath    = resolve(__dirname, "../.env.local");

function loadEnv(path) {
  try {
    const content = readFileSync(path, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key   = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.warn("⚠  Could not read .env.local — using existing process.env");
  }
}
loadEnv(envPath);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder") {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_API_TOKEN is not set in .env.local\n" +
    "    → Go to https://www.sanity.io/manage → your project → API → Tokens\n" +
    "    → Create a token with Editor permissions\n" +
    "    → Add SANITY_API_TOKEN=<token> to .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-15",
  token,
  useCdn: false,
});

// ── Asset Upload Cache (dedup by key so identical images aren't re-uploaded) ─
const assetCache = new Map(); // key → { _type: "reference", _ref: "image-xxxx" }

/**
 * Fetch a remote URL and return its Buffer + content-type.
 * Times out after 20 s to avoid hanging.
 */
async function fetchRemote(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ct  = res.headers.get("content-type") || "application/octet-stream";
    return { buf, contentType: ct };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Read a local public asset relative to the divyotsav project root.
 * e.g. "/images/gallery/1.png" → reads divyotsav/public/images/gallery/1.png
 */
function readLocal(publicPath) {
  const absPath = resolve(__dirname, "..", "public", publicPath.replace(/^\//, ""));
  const buf = readFileSync(absPath);
  const ext = extname(absPath).toLowerCase();
  const mimeMap = {
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif":  "image/gif",
    ".mp4":  "video/mp4",
    ".mov":  "video/quicktime",
  };
  return { buf, contentType: mimeMap[ext] || "application/octet-stream" };
}

/**
 * Upload a buffer to Sanity and return a Sanity asset reference object.
 * Uses the in-memory cache so the same source is never uploaded twice.
 *
 * @param {string}         cacheKey     Unique key (URL or file path)
 * @param {Buffer}         buf          File data
 * @param {string}         contentType  MIME type
 * @param {"image"|"file"} assetType    Sanity asset type
 * @param {string}         filename     Hint for the Sanity media library
 */
async function uploadAsset(cacheKey, buf, contentType, assetType = "image", filename = "asset") {
  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey);
  }
  const asset = await client.assets.upload(assetType, buf, {
    contentType,
    filename,
  });
  const ref = { _type: "reference", _ref: asset._id };
  assetCache.set(cacheKey, ref);
  return ref;
}

/**
 * Build a Sanity image field object from an asset reference.
 */
function sanityImage(ref) {
  return { _type: "image", asset: ref };
}

/**
 * Build a Sanity file field object from an asset reference.
 */
function sanityFile(ref) {
  return { _type: "file", asset: ref };
}

/**
 * Download a remote image and upload it to Sanity.
 * Returns a Sanity image field object ready to embed in a document.
 */
async function remoteImage(url, filename) {
  try {
    const { buf, contentType } = await fetchRemote(url);
    const ref = await uploadAsset(url, buf, contentType, "image", filename);
    return sanityImage(ref);
  } catch (err) {
    console.warn(`   ⚠  Could not upload remote image (${filename}): ${err.message}`);
    return null; // graceful — the field will be absent, fallback kicks in on the frontend
  }
}

/**
 * Read a local gallery image and upload it to Sanity.
 * Returns a Sanity image field object.
 */
async function localImage(publicPath) {
  try {
    const { buf, contentType } = readLocal(publicPath);
    const filename = publicPath.split("/").pop();
    const ref = await uploadAsset(publicPath, buf, contentType, "image", filename);
    return sanityImage(ref);
  } catch (err) {
    console.warn(`   ⚠  Could not upload local image (${publicPath}): ${err.message}`);
    return null;
  }
}

/**
 * Download a remote video/file and upload it to Sanity.
 * Returns a Sanity file field object.
 */
async function remoteVideo(url, filename) {
  try {
    const { buf, contentType } = await fetchRemote(url);
    const ref = await uploadAsset(url, buf, contentType, "file", filename);
    return sanityFile(ref);
  } catch (err) {
    console.warn(`   ⚠  Could not upload remote video (${filename}): ${err.message}`);
    return null;
  }
}

// ── Slide image source map ───────────────────────────────────────────────────
// Maps each slide _key to its external image URL (same as before) and a
// human-readable filename for the Sanity media library.
const slideImages = [
  { key: "slide-01", url: "https://sabyasachi.com/cdn/shop/files/0-02_f96d731f-782b-4c36-b14e-4b8890424734_768x.jpg?v=1768196995",     name: "divyotsav-15-years.jpg" },
  { key: "slide-02", url: "https://sabyasachi.com/cdn/shop/files/DESKTOP_JPEG_768x.jpg?v=1770793985",                                   name: "weddings-hero.jpg" },
  { key: "slide-03", url: "https://sabyasachi.com/cdn/shop/files/0-01_66ec1176-3f6d-46b0-8f21-c0910cadcaf6_768x.jpg?v=1762339437",     name: "corporate-events-hero.jpg" },
  { key: "slide-04", url: "https://sabyasachi.com/cdn/shop/files/t0000.00seg_35caa918-bd0d-4173-8a00-768adcb8aadf_768x.png?v=1755717984", name: "social-functions-hero.png" },
  { key: "slide-05", url: "https://sabyasachi.com/cdn/shop/files/Hero_Banner-01_ca8061c0-3038-4167-bafe-acdb234bde7c_768x.jpg?v=1768194740", name: "luxury-gifting-hero.jpg" },
  { key: "slide-06", url: "https://sabyasachi.com/cdn/shop/files/0-01_6db269bf-e2e8-41a0-b30b-f9b8e47ccc2d_768x.jpg?v=1755694146",     name: "art-of-curation.jpg" },
  { key: "slide-07", url: "https://sabyasachi.com/cdn/shop/files/Banner_image-01_a09c7590-3ae8-4180-a57f-28e71553c784_768x.jpg?v=1762342549", name: "high-artistry.jpg" },
  { key: "slide-08", url: "https://sabyasachi.com/cdn/shop/files/Hero-01_7858bb31-290f-4fca-83b4-c14acec97ab9_768x.jpg?v=1721306155",  name: "bridal-couture.jpg" },
  { key: "slide-09", url: "https://sabyasachi.com/cdn/shop/files/Hero-01_1e8edafc-2d8f-418c-9551-ce3e693e28f8_768x.jpg?v=1763096730",  name: "curiosity-antiquity.jpg" },
  { key: "slide-10", url: "https://sabyasachi.com/cdn/shop/files/1_07614917-baab-48c2-b7ef-7931495f9dc8_768x.jpg?v=1731475150",        name: "royal-embellishments.jpg" },
  { key: "slide-11", url: "https://sabyasachi.com/cdn/shop/files/d_M4B0661_web_683812a1-403f-46db-8b3e-c9941f4400c6_768x.jpg?v=1692595282", name: "divine-celebrations.jpg" },
  { key: "slide-12", url: "https://sabyasachi.com/cdn/shop/files/D221009_SABYASACHI14880_768x.jpg?v=1696335498",                        name: "art-of-design.jpg" },
];

// ── Seed Runner ───────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱 Divyotsav Sanity Seed (v2 — with real asset uploads)\n");
  console.log(`   Project : ${projectId}`);
  console.log(`   Dataset : ${dataset}\n`);

  // ── Step 1: Upload hero video ──────────────────────────────────────────────
  console.log("📹 Uploading hero video...");
  const heroVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-bride-and-groom-holding-hands-42290-large.mp4";
  const heroVideoField = await remoteVideo(heroVideoUrl, "divyotsav-hero-video.mp4");
  if (heroVideoField) console.log("   ✅ hero video uploaded");

  // ── Step 2: Upload all slide images ───────────────────────────────────────
  console.log("\n🖼  Uploading homepage slide images...");
  const slideImageRefs = {}; // key → Sanity image field or null
  for (const slide of slideImages) {
    process.stdout.write(`   ↑  ${slide.name} ... `);
    slideImageRefs[slide.key] = await remoteImage(slide.url, slide.name);
    console.log(slideImageRefs[slide.key] ? "✅" : "⚠  skipped");
  }

  // ── Step 3: Upload local gallery images ───────────────────────────────────
  console.log("\n🖼  Uploading local gallery images...");
  const galleryRefs = {}; // "/images/gallery/1.png" → Sanity image field or null
  const localPaths = [
    "/images/gallery/1.png",
    "/images/gallery/2.png",
    "/images/gallery/3.png",
    "/images/gallery/4.png",
    "/images/gallery/5.png",
    "/images/gallery/6.png",
    "/images/gallery/7.png",
  ];
  for (const p of localPaths) {
    process.stdout.write(`   ↑  ${p} ... `);
    galleryRefs[p] = await localImage(p);
    console.log(galleryRefs[p] ? "✅" : "⚠  skipped");
  }

  // ── Helper: convert local path → Sanity image field (or omit key if null) ─
  const gImg = (p) => galleryRefs[p] || undefined;

  // ── Step 4: Build siteSettings document ───────────────────────────────────
  const siteSettings = {
    _id:   "siteSettings-singleton",
    _type: "siteSettings",
    tagline:
      "Divyotsav is born of a sacred vision where ancient geometry and timeless cultural rituals meet modern design excellence. We craft celebrations that live forever.",
    ...(heroVideoField ? { heroVideoUrl: heroVideoField } : {}),
    whatsappNumber:    "+919876543210",
    instagramHandle:   "@divyotsav",
    facebookUrl:       "https://facebook.com/divyotsav",
    email:             "hello@divyotsav.com",
    phone:             "+91 98765 43210",
    address:
      "108, Sanskriti Heights, Luxury Avenue, Colaba, Mumbai – 400005, Maharashtra, India",
    consultationHours: "Mo-Sa 10:00-19:00",
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.1!2d72.82!3d18.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU0JzM2LjAiTiA3MsKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    metaTitle:
      "Divyotsav — Divine Celebrations | Premium Event Management India",
    metaDescription:
      "Divyotsav crafts luxury weddings, corporate galas, social functions, and bespoke gift experiences across India. 500+ events. 15+ years. Pan India.",
  };

  // ── Step 5: Build homepage document ───────────────────────────────────────
  // Each cinematicSlide has an `image` field that is now a Sanity image reference.
  const homepage = {
    _id:   "homepage-singleton",
    _type: "homepage",
    title: "Homepage Layout",
    sections: [
      {
        _type:      "cinematicSlide",
        _key:       "slide-01",
        heading:    "15 YEARS DIVYOTSAV",
        subtitle:   "दिव्योत्सव • Divine Celebrations",
        ...(slideImageRefs["slide-01"] ? { image: slideImageRefs["slide-01"] } : {}),
        buttonText: "WATCH NOW",
        buttonLink: "https://youtu.be/I5-uVkdgnTw",
        altText:    "15 Years of Divyotsav Indian Luxury Event Management",
      },
      {
        _type: "quoteSpacer",
        _key:  "quote-01",
        quote: "\u201cFor culture to be relevant, it needs to be dynamic.\u201d",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-02",
        heading:    "WEDDINGS",
        subtitle:   "विवाह • Sacred Unions, Timeless Elegance",
        ...(slideImageRefs["slide-02"] ? { image: slideImageRefs["slide-02"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services/weddings",
        altText:    "Premium Luxury Weddings by Divyotsav",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-03",
        heading:    "CORPORATE EVENTS",
        subtitle:   "आयोजन • Boardroom Precision, Grand Celebration",
        ...(slideImageRefs["slide-03"] ? { image: slideImageRefs["slide-03"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services/corporate-events",
        altText:    "High End Corporate Event Planning and Production",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-04",
        heading:    "SOCIAL FUNCTIONS",
        subtitle:   "सामुदायिक उत्सव • Community Bonded by Tradition",
        ...(slideImageRefs["slide-04"] ? { image: slideImageRefs["slide-04"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services/social-functions",
        altText:    "Bespoke Social Events and Festivals",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-05",
        heading:    "LUXURY GIFTING",
        subtitle:   "उपहार • Curated Tokens of Devotion",
        ...(slideImageRefs["slide-05"] ? { image: slideImageRefs["slide-05"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services/luxury-gifting",
        altText:    "Bespoke Indian Luxury Gifts and Favours",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-06",
        heading:    "THE ART OF CURATION",
        subtitle:   "Divyotsav x Luxury Craftsmanship",
        ...(slideImageRefs["slide-06"] ? { image: slideImageRefs["slide-06"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services",
        altText:    "Indian Royal Curation and Design Aesthetics",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-07",
        heading:    "HIGH ARTISTRY",
        subtitle:   "Bespoke Event Architecture & Floral Design",
        ...(slideImageRefs["slide-07"] ? { image: slideImageRefs["slide-07"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/contact",
        altText:    "Traditional Mandap Floral Design and Structure",
      },
      {
        _type: "quoteSpacer",
        _key:  "quote-02",
        quote:
          "\u201cCrowded narrow lanes with balconies jutting out of beautiful old mansions and homes, jostling for space in North Calcutta. So rich in its nonchalance, between the clamour of grandeur and decay. It\u2019s almost spiritual, the neglect of luxury and the casual existence of glamour. It makes Calcutta unforgettable.\u201d",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-08",
        heading:    "BRIDAL COUTURE",
        subtitle:   "Celebration of Indian Heritage & Craft",
        ...(slideImageRefs["slide-08"] ? { image: slideImageRefs["slide-08"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services/weddings",
        altText:    "Premium Bridal Lehenga and Wedding Wear Design Representation",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-09",
        heading:    "CURIOSITY & ANTIQUITY",
        subtitle:   "Designing Bespoke Thematic Spaces",
        ...(slideImageRefs["slide-09"] ? { image: slideImageRefs["slide-09"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services",
        altText:    "Curiosity Art and Indian Antiquities event styling",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-10",
        heading:    "THE ROYAL EMBELLISHMENTS",
        subtitle:   "Hand-forged Brass & Traditional Accents",
        ...(slideImageRefs["slide-10"] ? { image: slideImageRefs["slide-10"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services",
        altText:    "Indian Royal Wedding Jewelry and Embellishments",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-11",
        heading:    "DIVINE CELEBRATIONS",
        subtitle:   "Crafting Experiences That Live Forever",
        ...(slideImageRefs["slide-11"] ? { image: slideImageRefs["slide-11"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/services",
        altText:    "Luxury Royal Indian Wedding Ceremony",
      },
      {
        _type:      "cinematicSlide",
        _key:       "slide-12",
        heading:    "THE ART OF DESIGN",
        subtitle:   "Restrained Editorial Luxury",
        ...(slideImageRefs["slide-12"] ? { image: slideImageRefs["slide-12"] } : {}),
        buttonText: "EXPLORE",
        buttonLink: "/contact",
        altText:    "Premium Restrained Luxury Indian Design and Architecture",
      },
    ],
  };

  // ── Step 6: Build services documents ──────────────────────────────────────
  const services = [
    {
      _id:   "service-weddings",
      _type: "service",
      title: "Weddings",
      slug:  { _type: "slug", current: "weddings" },
      category: "Wedding",
      sanskritLabel: "विवाह (Vivah)",
      tagline: "Sacred Unions, Timeless Elegance",
      shortDescription:
        "Immersive design, ritualistic depth, and flawless coordination for your royal wedding.",
      fullDescription:
        "In Indian culture, a wedding is not merely a social gathering, but a sacred transition (Samskara) bringing together families, souls, and heritage. We elevate this holy union into an immersive visual narrative. Every floral architecture, lantern path, and mandap detail is meticulously planned to harmonize with ancient geometry and luxury styling.",
      designPhilosophy:
        "We focus on breathing room and natural light. We blend rich Indian silks, hand-worked brass pots, and locally sourced jasmine garlands with contemporary metal structures to construct a visual signature that feels timelessly sacred.",
      priceFrom: 300000,
      features: [
        "Full Mandap Architectural Design",
        "Vedic Ritual Space Styling",
        "Custom Guest Flow & Coordination",
        "Traditional Lighting & Sangeet Setup",
        "Artisan Favor Sourcing",
      ],
      ...(gImg("/images/gallery/1.png") ? { bannerImage: gImg("/images/gallery/1.png") } : {}),
      galleryImages: [
        gImg("/images/gallery/1.png"),
        gImg("/images/gallery/2.png"),
        gImg("/images/gallery/3.png"),
      ].filter(Boolean),
      timelineTitle:       "The Sacred Canopy",
      timelineDescription:
        "In Indian marriages, the Mandap represents the universe under which the couple takes their holy vows. We honor this architecture with bespoke floral detailing.",
      order: 1,
    },
    {
      _id:   "service-corporate-events",
      _type: "service",
      title: "Corporate Events",
      slug:  { _type: "slug", current: "corporate-events" },
      category: "Corporate",
      sanskritLabel: "आयोजन (Aayojan)",
      tagline: "Boardroom Precision, Grand Celebration",
      shortDescription:
        "High-stakes corporate galas, keynotes, and product launches designed with editorial clarity.",
      fullDescription:
        "Corporate celebrations demand absolute precision paired with high-impact aesthetics. We design keynote stages, gala setups, and launch environments that translate your company's core values into structural forms, ensuring that every touchpoint resonates with editorial elegance and flawless logistics.",
      designPhilosophy:
        "We employ sharp lines, geometric glass elements, and dramatic accent lighting. We avoid standard corporate booths, curating custom-designed lounges and interactive spaces that encourage executive networking.",
      priceFrom: 150000,
      features: [
        "Custom Keynote Stage Design",
        "Interactive Product Launch Lounges",
        "Full Audio-Visual Logistics",
        "Executive Hospitality Flow",
        "Bespoke Branding Integrations",
      ],
      ...(gImg("/images/gallery/5.png") ? { bannerImage: gImg("/images/gallery/5.png") } : {}),
      galleryImages: [
        gImg("/images/gallery/5.png"),
        gImg("/images/gallery/6.png"),
        gImg("/images/gallery/3.png"),
      ].filter(Boolean),
      timelineTitle:       "Structural Harmony",
      timelineDescription:
        "Corporate staging requires clean symmetry and high visibility. We build stages that frame your speakers with architectural gravitas.",
      order: 2,
    },
    {
      _id:   "service-social-functions",
      _type: "service",
      title: "Social Functions",
      slug:  { _type: "slug", current: "social-functions" },
      category: "Social Function",
      sanskritLabel: "सामुदायिक उत्सव",
      tagline: "Community Bonded by Tradition",
      shortDescription:
        "Milestone anniversaries, traditional ustavs, and intimate private dinners.",
      fullDescription:
        "Milestone family functions and traditional festivals represent the glue that holds our communities together. We create private celebrations, Diwali utsavs, and silver anniversaries that emphasize heritage, intimacy, and warm hospitality, giving your family a beautiful backdrop for their memories.",
      designPhilosophy:
        "Intimate and sensory-rich. We layer warm lighting, hand-dipped candles, aromatic herbs, and traditional sitting arrangements (Diwans) to make guests feel immediately at home.",
      priceFrom: 60000,
      features: [
        "Intimate Dinings & Seating Layouts",
        "Traditional Festive Theming",
        "Heritage Music & Lounge Spaces",
        "Bespoke Catering Presentational Styling",
        "Anniversary Ritual Coordination",
      ],
      ...(gImg("/images/gallery/6.png") ? { bannerImage: gImg("/images/gallery/6.png") } : {}),
      galleryImages: [
        gImg("/images/gallery/6.png"),
        gImg("/images/gallery/4.png"),
        gImg("/images/gallery/2.png"),
      ].filter(Boolean),
      timelineTitle:       "The Hearth of Hospitality",
      timelineDescription:
        "Traditional Indian hospitality (Athithi Devo Bhava) centers on welcoming guests into a warm home. We design custom lounges to invoke this spirit.",
      order: 3,
    },
    {
      _id:   "service-luxury-gifting",
      _type: "service",
      title: "Luxury Gifting",
      slug:  { _type: "slug", current: "luxury-gifting" },
      category: "Luxury Gifting",
      sanskritLabel: "उपहार (Upahaar)",
      tagline: "Curated Tokens of Devotion",
      shortDescription:
        "Bespoke favour hampers, executive corporate gifts, and festive collections.",
      fullDescription:
        "In Indian tradition, the act of gifting (Dana) is an expression of grace, love, and spiritual generosity. From bespoke wedding favour hampers to curated festive collections and executive corporate gift sets, we design tokens that carry the soul of celebration.",
      designPhilosophy:
        "We source from Indian artisans — hand-block prints, brass figurines, organic sweets, and custom packaging that reflects your event's aesthetic.",
      priceFrom: 25000,
      features: [
        "Custom Gift Hamper Curation",
        "Artisan Sourcing & Packaging Design",
        "Corporate Gift Set Branding",
        "Festive Collection Design",
      ],
      ...(gImg("/images/gallery/3.png") ? { bannerImage: gImg("/images/gallery/3.png") } : {}),
      galleryImages: [
        gImg("/images/gallery/3.png"),
        gImg("/images/gallery/4.png"),
        gImg("/images/gallery/1.png"),
      ].filter(Boolean),
      timelineTitle:       "The Art of Giving",
      timelineDescription:
        "Every gift represents a connection. We package each item in sustainable, hand-crafted containers that reflect artisanal heritage.",
      order: 4,
    },
  ];

  // ── Step 7: Testimonials ───────────────────────────────────────────────────
  const testimonials = [
    {
      _id:   "testimonial-01",
      _type: "testimonial",
      clientName: "Priya & Arjun Mehta",
      eventType:  "Wedding",
      eventDate:  "2024-02-14",
      rating: 5,
      quote:
        "Divyotsav transformed our wedding into a living poem. Every detail was curated with such reverence for our heritage. The mandap was breathtaking — exactly what we had dreamed of for years.",
      order: 1,
    },
    {
      _id:   "testimonial-02",
      _type: "testimonial",
      clientName: "Kavitha Rajan, CEO",
      eventType:  "Corporate Gala",
      eventDate:  "2024-11-08",
      rating: 5,
      quote:
        "Our annual leadership summit was elevated into a truly editorial experience. The stage design and environmental branding exceeded every expectation our leadership team had.",
      order: 2,
    },
    {
      _id:   "testimonial-03",
      _type: "testimonial",
      clientName: "Sunita & Ramesh Agarwal",
      eventType:  "Silver Anniversary",
      eventDate:  "2024-06-22",
      rating: 5,
      quote:
        "Twenty-five years of marriage celebrated in the most beautiful way possible. The intimate dinner Divyotsav curated felt like stepping into a dream of old India — warm, generous, and deeply meaningful.",
      order: 3,
    },
    {
      _id:   "testimonial-04",
      _type: "testimonial",
      clientName: "Ananya Sharma",
      eventType:  "Wedding",
      eventDate:  "2025-01-20",
      rating: 5,
      quote:
        "The luxury gifting hampers for our wedding were extraordinary. Each guest received a piece of art — hand-packaged with intention. Many told us it was the finest gift they had ever received at a wedding.",
      order: 4,
    },
  ];

  // ── Step 8: Seed all documents ─────────────────────────────────────────────
  const allDocs = [
    siteSettings,
    homepage,
    ...services,
    ...testimonials,
  ];

  console.log(`\n📄 Seeding ${allDocs.length} documents into Sanity...\n`);

  let successCount = 0;
  let errorCount   = 0;

  for (const doc of allDocs) {
    try {
      const result = await client.createOrReplace(doc);
      console.log(`   ✅ ${doc._type.padEnd(18)} → ${result._id}`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ ${doc._type.padEnd(18)} → ${doc._id}`);
      console.error(`      ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n─────────────────────────────────────────────`);
  console.log(`   Assets   : ${assetCache.size} uploaded/cached`);
  console.log(`   Seeded   : ${successCount} documents ✅`);
  if (errorCount > 0) {
    console.log(`   Failed   : ${errorCount} documents ❌`);
  }
  console.log(
    `\n🎉 Done! Open the Studio to review: http://localhost:3000/studio\n`
  );
}

seed().catch((err) => {
  console.error("\n❌ Fatal error during seeding:", err.message);
  process.exit(1);
});
