# MODULE Shared Utilities & Config (shared)
Slug: `MODULE_shared.md` | Contains global helpers and configuration keys.

## Shared Utilities
- **DIV-UTL-SRV-001** (`servicesData`): Bespoke database-like static representation of the 4 principal offerings containing pricing metrics, features checklists, and timeline information. in `divyotsav/lib/servicesData.ts`
- **DIV-UTL-SAN-001** (`SanityClient`): Dynamic Sanity API client setup with query fetching, caching, error logging, and static data fallback structures. in `divyotsav/lib/sanity/client.ts`
- **DIV-UTL-SAN-002** (`SanityQueries`): GROQ queries for siteSettings metadata, services listings, testimonials arrays, and portfolio gallery listings. in `divyotsav/lib/sanity/queries.ts`
- **DIV-UTL-SAN-003** (`SanityImageBuilder`): Sanity CDN utility returning fully qualified image URLs from CMS asset references. in `divyotsav/lib/sanity/image.ts`

## Configuration Keys
- **DIV-CFG-SAN-001** (`SanityConfig`): Embedded Sanity Studio dashboard configuration routing base studio path and binding custom structural plugin schemas.
- **DIV-CFG-INF-001** (`SitemapConfig`): next-sitemap configuration file setting canonical url, robots indexing rules, and priority levels for auto-generated sitemaps.
- **DIV-CFG-INF-002** (`FirebaseConfig`): Firebase Hosting deployment config mapping static exports and clean route redirects.
