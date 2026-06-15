# DESIGN.md — Divyotsav: Divine Celebrations
## AI Build Specification for Google Antigravity

---

## 1. BRAND IDENTITY

**Name:** Divyotsav
**Tagline:** Divine Celebrations
**Industry:** Premium Indian Event Management
**Services:** Weddings · Corporate Events · Social Functions · Luxury Gifting
**Tone:** Sacred · Restrained · Cinematic · Editorial

**Design DNA:**
- Aman Hotels (aman.com) → background palette, whitespace, typography scale, half-hidden video hero
- Sabyasachi (sabyasachi.com) → editorial luxury, Indian richness, heavy serif headings
- Four Seasons / Ritz Carlton → clean layout, purposeful negative space, premium service feel
- NOT: Bright, playful, startup-y, or fast-food luxury

---

## 2. COLOR SYSTEM

| Token | Hex | Usage |
|-------|-----|-------|
| `--cream` | `#F4EFE6` | Primary background — all light sections |
| `--obsidian` | `#1C1814` | Dark sections, nav overlay, text |
| `--gold` | `#B8965A` | Accent, hover borders, CTA, dividers |
| `--burgundy` | `#8B2635` | Very sparing — one accent per page max |
| `--warm-gray` | `#6B5D52` | Secondary body text |
| `--border` | `#D9D0C5` | Card borders, horizontal rules |
| `--cream-dark` | `#EAE3D8` | Subtle section alternation |

**Rules:**
- Never use pure white (#FFFFFF) or pure black (#000000)
- Never introduce a new color not listed above
- Gold is for accents only — not for large fills
- Burgundy max once per page, for one meaningful word or underline

---

## 3. TYPOGRAPHY

### Fonts (Google Fonts — free)
```
Display/Headings : Cormorant Garamond
Body            : Jost
Sanskrit Labels : Noto Serif Devanagari
```

### Scale
| Role | Font | Size | Weight | Letter Spacing |
|------|------|------|--------|----------------|
| Hero Display | Cormorant Garamond | clamp(52px, 8vw, 120px) | 300 | -0.01em |
| H1 | Cormorant Garamond | clamp(36px, 5vw, 72px) | 400 | -0.01em |
| H2 | Cormorant Garamond | clamp(28px, 4vw, 52px) | 400 | 0 |
| H3 | Cormorant Garamond | clamp(22px, 3vw, 36px) | 400 | 0 |
| Section Label | Jost | 11–13px | 400 | 0.2em |
| Body | Jost | 16–18px | 300 | 0 |
| Nav Links | Jost | 12px | 400 | 0.15em |
| Sanskrit | Noto Serif Devanagari | 14–18px | 400 | 0.05em |

### Rules
- Line height: 1.15 for headlines, 1.75 for body
- Section labels ALWAYS uppercase, preceded by `——` thin line in gold
- Max 45–65 characters per line for body text
- Never bold body text — use italic for emphasis
- NEVER use more than these 3 fonts

---

## 4. SPACING & LAYOUT

- **Content max-width:** 1440px, centered
- **Section padding:** `clamp(80px, 12vw, 160px)` top/bottom
- **Side gutter:** 24px mobile · 48px tablet · 80–120px desktop
- **Card gap:** 24px mobile · 40px desktop
- **Component padding:** 40–64px internal for cards

### Grid
- Homepage alternating sections: full-bleed dark/light
- Services grid: CSS Grid, 2 cols tablet, 4 cols desktop
- Bento grid: unequal column sizes for visual hierarchy

---

## 5. MOTION & ANIMATION

### Principles
- Animations use ONLY `opacity` and `transform` — no other CSS properties
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` — never bouncy
- Entrance duration: 700–900ms
- Hover duration: 250–300ms
- All animations respect `prefers-reduced-motion`

### Scroll-triggered Entrance (ALL section entries)
```
Initial:  opacity: 0, translateY: 30px
Final:    opacity: 1, translateY: 0
Stagger:  100ms between siblings
```

### Hero Video
- `autoplay` `muted` `loop` `playsinline`
- NO controls visible
- Overlay: `rgba(28, 24, 20, 0.45)` — darkens video for text legibility
- Video is full viewport height on desktop
- On mobile: replace video with static image (poster attribute)

### Navigation
- On load: transparent background, white/cream text
- On scroll (>80px): smooth transition to `--obsidian` background, full opacity
- Transition: 400ms opacity + background-color

### Card Hover
- Border color: `--border` → `--gold`
- `translateY: 0 → -4px`
- No scale transforms on cards

### AVOID
- Parallax effects on mobile
- Spinning loaders
- Slide-in from sides (only fade-up)
- Loop animations (except video hero and horizontal marquee)
- Aggressive scale transforms

---

## 6. UI COMPONENTS

### Buttons (0px border-radius — always sharp)

**Primary (on dark bg):**
```
border: 1px solid #B8965A
background: transparent
color: #F4EFE6
padding: 14px 36px
font: Jost 12px uppercase tracked
hover: background #B8965A, color #1C1814
```

**Secondary (on cream bg):**
```
border: 1px solid #1C1814
background: transparent
color: #1C1814
padding: 14px 36px
hover: background #1C1814, color #F4EFE6
```

### Cards (0px border-radius — always sharp)
```
border: 1px solid #D9D0C5
background: #1C1814 (dark variant) OR transparent (light variant)
padding: 40–56px
hover border: #B8965A
hover transform: translateY(-4px)
transition: 300ms
NO box-shadow ever
```

### Section Label Pattern
```
—— SECTION LABEL   (gold line + uppercase Jost 11px tracked)
Large Heading Below in Cormorant Garamond
```

### Horizontal Rule Dividers
```
height: 1px
color: #D9D0C5
margin: 0 auto
```

### WhatsApp Floating Button
```
Position: fixed, bottom-right (bottom: 32px, right: 32px)
Background: #25D366
Icon: WhatsApp SVG icon, white
Shape: circle, 56px
Hover: scale 1.05 (this is the ONE allowed scale)
z-index: 999
```

---

## 7. PAGE SPECIFICATIONS

---

### PAGE: HOME (/)

#### Section 1 — HERO
- Full viewport height (100vh)
- Background: Autoplay video (client to provide) with `rgba(28,24,20,0.45)` overlay
- Mobile: Static image fallback (poster)
- Video is partially visible below the fold — do NOT crop to 100vh on desktop, let the lower 15–20% peek through before the content
- Content (vertically/horizontally centered):
  ```
  [Sanskrit text] दिव्योत्सव • Divine Celebrations
                  (Noto Serif Devanagari, 14px, gold, tracked, uppercase)

  [Main Heading]  We craft celebrations
                  that live forever.
                  (Cormorant Garamond, clamp(52px, 8vw, 100px), weight 300, cream)

  [Subtitle]      From intimate weddings to grand corporate galas —
                  every event is a divine story, uniquely yours.
                  (Jost, 18px, weight 300, cream, opacity 0.8)

  [CTA Row]       [Explore Our Work]    [Book an Event]
  ```
- Bottom-right floating stats:
  ```
  500+   Events Curated
  15+    Years of Excellence
  Pan India  Coverage
  ```
  (Small cards, obsidian bg, gold number, cream label, 1px border)

- Scroll indicator: thin vertical white line, fading downward with "SCROLL" in tiny uppercase

---

#### Section 2 — ABOUT
- Two-column layout: left = image, right = text
- Background: `--cream`
- Left: Large vertical image (client to provide: Indian bride in lehenga, editorial feel)
  - Black and white or muted tones preferred
  - Subtle gold border accent bottom-left corner (CSS border trick)
- Right:
  ```
  —— OUR STORY

  [Para 1] Divyotsav is born of a sacred vision where ancient geometry
           and timeless cultural rituals meet modern design excellence...

  [Para 2] From cinematic lighting installations to hand-forged brass
           details and meticulously planned guest flows...

  [Badge] EST. 2011  (small, bordered, gold)
  ```

---

#### Section 3 — SERVICES BENTO GRID
- Background: `--obsidian`
- Header:
  ```
  —— WHAT WE INVOKE
  Our Sacred Craft
  ```
- 4-card bento grid (unequal widths on desktop — 2 wide + 2 narrow):
  ```
  Card 1: WEDDINGS          Card 2: CORPORATE EVENTS
  विवाह (Vivah)             आयोजन (Aayojan)
  Sacred Unions,            Boardroom Precision,
  Timeless Elegance         Grand Celebration

  Card 3: SOCIAL FUNCTIONS  Card 4: LUXURY GIFTING
  सामुदायिक उत्सव          उपहार (Upahaar)
  Community Bonded          Curated Tokens
  by Tradition              of Devotion   ← NEW SERVICE
  ```
- Each card: dark bg with subtle texture, gold Sanskrit label, heading, snippet, "Explore →" CTA
- Hover: gold border appears

- Bottom: "Explore All Our Services →" link in gold
- Infinite horizontal marquee:
  ```
  500+ events curated • 15+ years of excellence • royal weddings • corporate galas •
  luxury gifting • social celebrations • pan india •
  ```
  Slow, smooth scroll. Pause on hover.

---

#### Section 4 — STATS
- Background: `--cream-dark`
- 4-column horizontal strip:
  ```
  500+          15+           50+           ∞
  Events        Years of      Destinations  Smiles
  Curated       Excellence                  Sparked
  ```
- Numbers: Cormorant Garamond, 72px, weight 300
- Labels: Jost, 12px, uppercase, tracked
- Thin gold vertical dividers between stats

---

#### Section 5 — GALLERY HORIZONTAL SCROLLER
- Background: `--obsidian`
- Header:
  ```
  —— PORTFOLIO
  Moments frozen in time.
  ```
- Horizontal scroll strip (auto-scrolling, pause on hover):
  - 7 images in tall portrait format (4:5 ratio)
  - On hover: image slightly brightens, overlay text appears (title in Cormorant Garamond)
  - Images:
    1. Royal Wedding Entry
    2. Mandap Floral Architecture
    3. Heritage Sangeet Night
    4. Lantern Pathway Design
    5. Corporate Keynote Stage
    6. Grand Social Celebration
    7. Authentic Ritual Lounge
- Footer tip: `← Hover to pause · Aesthetic Craftsmanship`

---

#### Section 6 — TESTIMONIALS
- Background: `--cream`
- Header:
  ```
  —— REFLECTIONS
  What Our Clients Feel
  ```
- Card carousel or 2x2 grid (desktop):
  ```
  Client: Rohan & Anjali       | Amit Sharma
  Event:  Royal Palace Wedding | TechCorp Annual Gala
  Stars:  ★★★★★               | ★★★★★
  Quote:  "The entire event..."| "Flawless execution..."

  Mrs. Kapoor & Family         | Dr. Verma
  Diwali Mega Utsav            | Silver Anniversary Party
  ★★★★★                        | ★★★★★
  "The authenticity..."        | "Our silver anniversary..."
  ```
- Card: cream bg, 1px border, quote in Cormorant Garamond italic, name in Jost uppercase

---

#### FOOTER
- Background: `--obsidian`
- 4 columns:
  - Col 1: Brand name + manifesto paragraph
  - Col 2: Quick Links (Home, Our Story, Services, Book Event)
  - Col 3: Services (Weddings विवाह, Corporate आयोजन, Festivals उत्सव, Parties आनंदोत्सव, Gifting उपहार)
  - Col 4: Contact (address, phone, email, social icons)
- Social icons: Instagram, Facebook, WhatsApp — small, gold on hover
- Sub-footer: `© [Year] Divyotsav. All rights reserved. · Indian Luxury Craftsmanship • Aesthetic Excellence`
- "Scroll to top" arrow — gold, bottom right

---

### PAGE: SERVICES (/services)

#### Section 1 — Hero
- Large editorial heading (no video, static image bg with heavy overlay)
  ```
  We Invoke Divine Celebrations.
  (Jost body text for subtitle)
  ```

#### Section 2 — Filter + Grid
- Filter pills (Jost, uppercase, tracked):
  ```
  [ All ] [ Wedding ] [ Corporate ] [ Social Function ] [ Luxury Gifting ]
  ```
  Active filter: gold border + gold text
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Each card links to `/services/[slug]`

#### Section 3 — Cultural Significance Timeline
- Alternating left/right layout
- Section label: `—— DEEP ROOTS` → `Cultural Significance`
- 4 entries: Weddings · Corporate · Social · Luxury Gifting

---

### PAGE: SERVICE DETAIL (/services/[slug])

Layout: Two-column hero (text left, price card right)
```
← Back to services

[Sanskrit Label]
[Category Badge]
[Large Service Title]
[Gold italic tagline]

[Full-bleed parallax banner image]

[Narrative & Significance text]

[Design Philosophy block — dark bg, cream text]

Sidebar/Card:
  Event Coordination
  What We Curate
  Starting ₹X,XX,XXX
  [Feature checklist]
  [Plan Celebration →] CTA
```

**Pricing:**
- Weddings: Starting ₹3,00,000
- Corporate Events: Starting ₹1,50,000
- Social Functions: Starting ₹60,000
- Luxury Gifting: Starting ₹25,000

**Luxury Gifting Service Content:**
```
Sanskrit: उपहार (Upahaar)
Tagline: Curated Tokens of Devotion
Description: In Indian tradition, the act of gifting (Dana) is an expression of grace,
             love, and spiritual generosity. From bespoke wedding favour hampers to
             curated festive collections and executive corporate gift sets, we design
             tokens that carry the soul of celebration.

Design Philosophy: We source from Indian artisans — hand-block prints, brass figurines,
                   organic sweets, and custom packaging that reflects your event's aesthetic.

Features:
  1. Custom Gift Hamper Curation
  2. Artisan Sourcing & Packaging Design
  3. Corporate Gift Set Branding
  4. Festive Collection Design
```

---

### PAGE: CONTACT (/contact)

```
—— CONNECT WITH US
Let's Begin Your Story
"Every great celebration starts with a conversation."
```

Form fields: Name · Email · Phone · Event Type (dropdown) · Event Date · Message
Submit CTA: "Send Enquiry" (gold primary button)

Info cards (2x2 grid + 1 full-width):
- +91 [CLIENT_PHONE]
- [CLIENT_EMAIL]
- @[CLIENT_INSTAGRAM]
- 108, Sanskriti Heights, Luxury Avenue, Mumbai
- Mon–Sat · 10:00 AM – 7:00 PM IST

Map: Embedded Google Map, colaba Mumbai area

WhatsApp floating button always visible.

---

## 8. NAVIGATION HEADER

```
[Divyotsav · Divine Celebrations]    Home   Services   Contact Us   [Book Event]
```

- Fixed position, full-width
- Transparent on hero → obsidian background on scroll
- Logo: Cormorant Garamond for "Divyotsav", Jost 11px tracked for "Divine Celebrations"
- Mobile: hamburger → full-screen overlay menu, obsidian bg

---

## 9. SOCIAL & CONTACT CONTENT

> ⚠️ All values below to be provided by client (Ashrishta). Use placeholders until received.

| Field | Placeholder | Notes |
|-------|-------------|-------|
| WhatsApp Number | +91 XXXXXXXXXX | See TECH.md for WhatsApp recommendation |
| Instagram Handle | @divyotsav | |
| Facebook URL | facebook.com/divyotsav | |
| Email | hello@divyotsav.com | |
| Phone | +91 98765 43210 | |
| Hero Video 1 | /public/videos/hero-1.mp4 | Client to provide |
| Hero Video 2 | /public/videos/hero-2.mp4 | Client to provide |
| About Image | /public/images/about-bride.jpg | Client to provide |
| Gallery (7 images) | /public/images/gallery/1–7.jpg | Client to provide |

---

## 10. DO'S AND DON'TS

### DO
- Lots of whitespace — when in doubt, add more padding
- Use `Cormorant Garamond` for any heading that needs gravitas
- Use thin gold lines as dividers, not heavy bars
- Keep body copy short — single paragraphs, never walls of text
- Sanskrit labels before or above all service titles
- Sharp corners (0px radius) on ALL interactive elements
- Mobile-first layout — test at 375px first

### DON'T
- Never use bright or saturated colors
- Never add box-shadows
- Never round corners (not even 2px)
- Never use more than 3 typefaces
- Never animate anything other than opacity + transform
- Never use stock photo aesthetic — all images should feel editorial
- Never add multiple fonts for different sections
- Never place dense text blocks — break into short paragraphs
- Never animate on mobile scroll (performance)
