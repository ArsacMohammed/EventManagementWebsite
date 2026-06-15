# Divyotsav Module Status & Index

Last Updated: 2026-06-15T15:07:38.697367Z by update.py script
Total Entities: 28 | Active Sprint: 3

## Module Status
| Module ID | Name | Sprint | Status | Slug |
|---|---|---|---|---|
| M1_layout | Core layout and components | 1 | IN_PROGRESS | layout |
| M2_home | Homepage implementation | 1 | DONE | home |
| M3_services | Services catalog and dynamic pages | 2 | DONE | services |
| M4_contact | Contact page and WhatsApp Integration | 2 | DONE | contact |
| M5_sanity | Sanity CMS integration and Studio schemas | 3 | DONE | sanity |
| M6_infra | Deployment, SEO, and optimization | 3 | DONE | infra |

## Shared Utilities
| Code | Name | File Path | Description |
|---|---|---|---|
| DIV-UTL-SAN-001 | SanityClient | divyotsav/lib/sanity/client.ts | Dynamic Sanity API client setup with query fetching, caching, error logging, and static data fallback structures. |
| DIV-UTL-SAN-002 | SanityQueries | divyotsav/lib/sanity/queries.ts | GROQ queries for siteSettings metadata, services listings, testimonials arrays, and portfolio gallery listings. |
| DIV-UTL-SAN-003 | SanityImageBuilder | divyotsav/lib/sanity/image.ts | Sanity CDN utility returning fully qualified image URLs from CMS asset references. |
| DIV-UTL-SRV-001 | servicesData | divyotsav/lib/servicesData.ts | Bespoke database-like static representation of the 4 principal offerings containing pricing metrics, features checklists, and timeline information. |

## Config Keys
| Code | Name | Description |
|---|---|---|
| DIV-CFG-INF-001 | SitemapConfig | next-sitemap configuration file setting canonical url, robots indexing rules, and priority levels for auto-generated sitemaps. |
| DIV-CFG-INF-002 | FirebaseConfig | Firebase Hosting deployment config mapping static exports and clean route redirects. |
| DIV-CFG-SAN-001 | SanityConfig | Embedded Sanity Studio dashboard configuration routing base studio path and binding custom structural plugin schemas. |

## Architectural Dependency Rules
1. **animation_properties**: Animations must use only opacity and transform properties to ensure smooth performance.
2. **no_border_radius**: Zero border-radius is enforced everywhere on cards, buttons, and images (always sharp corners).
3. **no_box_shadows**: Box shadows are forbidden on all cards, buttons, and other UI elements.
4. **no_desktop_video_mobile**: On mobile devices, hero background videos must be replaced with static poster fallback images.
5. **no_hardcoded_colors**: All colors must reference CSS variables defined in DESIGN.md, no hardcoded hex values are allowed.
6. **no_unused_fonts**: Only Cormorant Garamond, Jost, and Noto Serif Devanagari fonts are allowed.
7. **reduced_motion**: All animations must respect users' prefers-reduced-motion media query settings.
8. **sanity_client_only**: All data fetching for dynamic content must go through the Sanity client and utilize static generation.
9. **sanskrit_labels**: Sanskrit labels in Noto Serif Devanagari must precede or sit above all service titles.
10. **secure_form**: Contact forms must use Web3Forms with honeypot spam protection.
11. **seo_optimizations**: All pages must export appropriate metadata and include schema.org EventPlanner structured data.
