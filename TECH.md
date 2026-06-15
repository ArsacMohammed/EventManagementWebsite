# TECH.md — Divyotsav Technical Architecture

---

## STACK DECISIONS

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14** (App Router) | SSG + SEO + image optimization + routing |
| Language | **TypeScript** | Type safety across CMS data and components |
| Styling | **Tailwind CSS** | Fast utility-first, pairs well with design tokens |
| Animation | **Framer Motion** | Performant, scroll-triggered, respects reduced-motion |
| CMS | **Sanity v3** | Free plan, beautiful Studio UI for client, webhooks |
| Deployment | **Firebase Hosting** | Free tier, global CDN, custom domain |
| CI/CD | **GitHub Actions** | Free, triggered by Sanity webhook |
| Forms | **Web3Forms** | Free tier, no backend needed, anti-spam |
| Video | **Native HTML5 video** | No third-party dependency for hero |

**All tools above have a free tier sufficient for this project.**

---

## PROJECT STRUCTURE

```
divyotsav/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, nav, footer, WhatsApp btn)
│   ├── page.tsx                  # Home /
│   ├── services/
│   │   ├── page.tsx              # /services catalog
│   │   └── [slug]/
│   │       └── page.tsx          # /services/weddings etc.
│   └── contact/
│       └── page.tsx              # /contact
│
├── components/
│   ├── ui/                       # Primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionLabel.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesBento.tsx
│   │   ├── StatsSection.tsx
│   │   ├── GalleryScroller.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactForm.tsx
│   │   └── CulturalTimeline.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # GROQ queries
│   │   └── image.ts              # Image URL builder
│   └── utils.ts
│
├── sanity/                       # Sanity Studio (embedded)
│   ├── sanity.config.ts
│   └── schemas/
│       ├── index.ts
│       ├── siteSettings.ts
│       ├── homePage.ts
│       ├── service.ts
│       ├── testimonial.ts
│       └── galleryItem.ts
│
├── public/
│   ├── videos/
│   │   ├── hero-1.mp4            # Client to provide
│   │   └── hero-2.mp4
│   └── images/
│       ├── about-bride.jpg
│       └── gallery/
│
├── DESIGN.md
├── TECH.md
├── next.config.ts
├── tailwind.config.ts
├── firebase.json
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## SANITY SCHEMAS

### siteSettings
```
Fields:
- tagline (string)                     ← "Divine Celebrations"
- heroVideoUrl (file)                  ← uploaded video
- whatsappNumber (string)              ← +91XXXXXXXXXX
- instagramHandle (string)             ← @handle
- facebookUrl (url)
- email (string)
- phone (string)
- address (text)
- consultationHours (string)
- metaTitle (string)
- metaDescription (text)
```

### service
```
Fields:
- title (string)                       ← "Weddings"
- slug (slug)                          ← weddings, corporate-events, social-functions, luxury-gifting
- category (string: Wedding|Corporate|Social|Gifting)
- sanskritLabel (string)               ← "विवाह (Vivah)"
- tagline (string)
- shortDescription (text)              ← for cards
- fullDescription (text)               ← for detail page
- designPhilosophy (text)
- priceFrom (number)
- features (array of strings)
- bannerImage (image)
- galleryImages (array of images)
- order (number)                       ← for sort order in grid
```

### testimonial
```
Fields:
- clientName (string)
- eventType (string)
- eventDate (date)
- rating (number 1–5)
- quote (text)
- order (number)
```

### galleryItem
```
Fields:
- title (string)
- image (image)
- category (string)
- order (number)
```

---

## WHATSAPP RECOMMENDATION FOR CLIENT

**Problem:** Client doesn't want to use a business social account for WhatsApp.

**Recommended Solution: WhatsApp Business App (free)**

Option A — Use personal number with WhatsApp Business:
1. Download "WhatsApp Business" app (separate from regular WhatsApp)
2. Port existing personal number OR keep regular WhatsApp on personal + use a second number for business
3. WhatsApp Business lets you set business name, hours, away messages, quick replies, catalog

Option B — Dedicated business number (recommended for separation):
1. Get a second SIM (Jio SIM costs ₹10 + a basic plan)
2. Use that number exclusively for WhatsApp Business
3. Personal number stays personal

**Website implementation:**
```
wa.me/91XXXXXXXXXX
```
This works for both personal WhatsApp and WhatsApp Business.

---

## PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| LCP | < 2.5s |
| CLS | 0 |
| FID | < 100ms |

**How to hit these:**
- Use `next/image` for all images (WebP, lazy load, proper sizing)
- Fonts loaded via `next/font` (no layout shift)
- Hero video: low-bitrate MP4 + static poster image for mobile
- Animations: only `transform` + `opacity` (GPU-only, no layout repaints)
- No unused Tailwind CSS (purge enabled by default in production)
- Framer Motion: `LazyMotion` with `domAnimation` feature bundle (smaller bundle)

---

## ACCESSIBILITY (WCAG 2.1 AA)

- All images: descriptive `alt` attributes
- All interactive elements: keyboard navigable, visible focus rings
- Color contrast: all text meets 4.5:1 ratio
  - `#F4EFE6` on `#1C1814` → passes
  - `#B8965A` on `#1C1814` → passes (for large text)
- Video: `aria-hidden="true"` (decorative), no autoplay audio
- Form: proper `<label>` association, error states announced via `aria-live`
- Navigation: `<nav>` landmark, `aria-current="page"` on active link
- Skip navigation link: hidden but focusable
- `rel="noopener noreferrer"` on all external links
