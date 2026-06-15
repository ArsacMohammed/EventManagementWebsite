# ANTIGRAVITY_PROMPTS.md — Exact Prompts to Build Divyotsav

Use these prompts IN ORDER inside Google Antigravity. Paste one, let it complete, then move to the next.

---

## PROMPT 1 — Project Bootstrap

```
Create a Next.js 14 TypeScript project called "divyotsav" using the App Router.
Install: tailwind css, framer-motion, next-sanity, @sanity/image-url, web3forms.
Import Google Fonts via next/font: Cormorant Garamond (weights 300 400 600), Jost (weights 300 400), Noto Serif Devanagari (weight 400).
Set up CSS variables in globals.css:
--cream: #F4EFE6
--obsidian: #1C1814
--gold: #B8965A
--burgundy: #8B2635
--warm-gray: #6B5D52
--border: #D9D0C5
--cream-dark: #EAE3D8
Apply --cream as default body background. Apply --obsidian as default body text colour.
Read DESIGN.md for all design decisions.
```

---

## PROMPT 2 — Header & Footer

```
Build the fixed Header and Footer components. Read DESIGN.md section "NAVIGATION HEADER" and "FOOTER".
Header: fixed position, transparent on hero section, transitions to --obsidian on scroll past 80px. Logo left ("Divyotsav" in Cormorant Garamond + "Divine Celebrations" in Jost 11px tracked). Navigation: Home, Services, Contact Us. CTA: "Book Event" button (1px --gold border, no radius). Mobile: hamburger → full-screen overlay.
Footer: 4-column grid on --obsidian background. Brand column, Quick Links, Services (add Luxury Gifting उपहार), Contact column. Sub-footer with copyright and tagline.
Use placeholder text for social links (marked TODO_CLIENT).
0px border-radius everywhere. No box-shadow anywhere.
```

---

## PROMPT 3 — Home Page Hero Section

```
Build the Hero section for the home page. Read DESIGN.md section "Section 1 — HERO".
Full viewport height. Background: HTML5 video (autoplay muted loop playsinline), source: /public/videos/hero-1.mp4, poster: /public/images/hero-poster.jpg. Dark overlay rgba(28,24,20,0.45).
On mobile: hide video, show poster image as background.
Centred content:
- Sanskrit line: दिव्योत्सव • Divine Celebrations (Noto Serif Devanagari, 14px, gold, letter-spacing 0.2em, uppercase)
- Main heading: "We craft celebrations that live forever." (Cormorant Garamond, clamp(52px, 8vw, 100px), weight 300, --cream)
- Subtitle (Jost 18px weight 300, opacity 0.8)
- Two buttons: "Explore Our Work" (primary) and "Book an Event" (ghost)
Bottom-right: 3 floating stat badges (obsidian bg, gold number, cream label, 1px border).
Scroll indicator: thin white vertical line fading down with "SCROLL" label.
Framer Motion: fade-up entrance, 700ms, cubic-bezier(0.25,0.1,0.25,1). Stagger 100ms between elements.
```

---

## PROMPT 4 — Home Page Remaining Sections

```
Build remaining home page sections below the hero. Read DESIGN.md sections 2–6.
Section 2 (About): two-column, cream bg, left image placeholder, right text, EST. 2011 badge.
Section 3 (Services Bento): obsidian bg, 4 cards (Weddings, Corporate, Social, Luxury Gifting), unequal bento grid, Sanskrit labels, hover gold border. Bottom marquee: slow horizontal scroll "500+ events curated • 15+ years of excellence • royal weddings • corporate galas • luxury gifting •". Pause on hover.
Section 4 (Stats): cream-dark bg, 4 stats horizontal, gold vertical dividers between.
Section 5 (Gallery Scroller): obsidian bg, auto-scrolling horizontal image strip, pause on hover, hover overlay shows title.
Section 6 (Testimonials): cream bg, 2×2 card grid, quote in Cormorant Garamond italic.
All sections: scroll-triggered fade-up entrance (Framer Motion).
Section label pattern everywhere: thin gold line + uppercase Jost 11px + heading below.
```

---

## PROMPT 5 — Services Pages

```
Build the services catalog page (/services) and dynamic service detail page (/services/[slug]).
Read DESIGN.md "PAGE: SERVICES" and "PAGE: SERVICE DETAIL".
Services page: editorial hero heading, filter buttons (All, Wedding, Corporate, Social Function, Luxury Gifting), 3-column service card grid, cultural significance alternating timeline with 4 entries.
Service detail page: back link, Sanskrit label, category badge, large title, italic tagline, full-bleed parallax banner image, narrative text, dark design philosophy block, floating sidebar card (coordination details, price starting from, features checklist, Plan Celebration CTA, detail gallery grid).
Service slugs and data: weddings (₹3,00,000), corporate-events (₹1,50,000), social-functions (₹60,000), luxury-gifting (₹25,000).
Add Luxury Gifting service content from DESIGN.md "Luxury Gifting Service Content" section.
```

---

## PROMPT 6 — Contact Page & WhatsApp Button

```
Build the contact page (/contact). Read DESIGN.md "PAGE: CONTACT".
Hero: "Let's Begin Your Story" heading, accent tagline.
Contact form: Name, Email, Phone, Event Type (dropdown: Weddings, Corporate Events, Social Functions, Luxury Gifting, Other), Event Date, Message. Submit button "Send Enquiry". Use Web3Forms for serverless form submission. Add honeypot for spam. Show success/error state.
5 info cards: Phone, Email, Instagram, Address, Consultation Hours.
Embedded Google Map: iframe centred on Colaba Mumbai (108 Sanskriti Heights).
Global WhatsApp floating button (fixed bottom-right, #25D366 circle 56px, white WhatsApp icon). Link to wa.me/91PLACEHOLDER — mark TODO_CLIENT.
```

---

## PROMPT 7 — Sanity CMS Integration

```
Set up Sanity v3 CMS schemas and integrate with the Next.js app.
Read TECH.md "SANITY SCHEMAS" section.
Create schemas: siteSettings, service, testimonial, galleryItem.
Create lib/sanity/client.ts (use NEXT_PUBLIC_SANITY_PROJECT_ID env var).
Create lib/sanity/queries.ts with GROQ queries for: all services, single service by slug, all testimonials, all gallery items, site settings.
Replace all hardcoded placeholder text in components with Sanity data fetching using generateStaticParams for service slugs.
Add revalidation: ISR every 60 seconds (revalidate: 60 in fetch options).
Create sanity/sanity.config.ts and embed Sanity Studio at /studio route (protect with basic auth or leave open for now).
```

---

## PROMPT 8 — SEO & Performance

```
Add SEO metadata and performance optimisations. Read SEO.md.
Add metadata export to each page with titles and descriptions from SEO.md.
Add JSON-LD structured data (EventPlanner schema) to app/layout.tsx as per SEO.md.
Install next-sitemap, create next-sitemap.config.js targeting https://divyotsav.com, exclude /studio.
Add postbuild script to package.json.
Ensure all next/image components have width, height, alt, and priority (hero image only).
Add next/font to layout.tsx, apply font CSS variables.
Add robots meta: index follow on all pages, noindex on /studio.
Verify zero hardcoded colours — all must reference CSS variables.
```

---

## PROMPT 9 — Firebase Deployment Config

```
Configure Firebase Hosting for static export deployment.
Add to next.config.ts: output: 'export', images: { unoptimized: true }.
Create firebase.json:
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
Create .firebaserc with project: "divyotsav-web".
Create .github/workflows/deploy.yml as per CMS_DEPLOY.md "Step 3 — GitHub Actions Workflow".
Ensure .env.local is in .gitignore.
Create a README.md with setup instructions referencing TECH.md, CMS_DEPLOY.md, SEO.md.
Run: npm run build — fix any build errors before finishing.
```

---

## TIPS FOR USING ANTIGRAVITY

- If output looks generic: type "Make this match the luxury aesthetic from DESIGN.md — less generic, more editorial"
- If animations are bouncy: type "Fix animations — easing must be cubic-bezier(0.25,0.1,0.25,1), no spring, no bounce"  
- If colors are wrong: type "Audit all colors — only use CSS variables from DESIGN.md, no hardcoded hex values"
- If fonts look off: type "Apply Cormorant Garamond to all headings, Jost to all body and nav, Noto Serif Devanagari to Sanskrit labels only"
- If border-radius appears: type "Remove all border-radius — 0px on every element, cards, buttons"
