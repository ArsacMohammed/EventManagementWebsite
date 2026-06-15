# MODULE Sanity CMS integration and Studio schemas (M5_sanity)
Slug: `MODULE_sanity.md` | Sprint: 3 | Status: DONE

## DB Models
*No entities registered for this layer.*

## Service Functions
*No entities registered for this layer.*

## Repository Functions
*No entities registered for this layer.*

## API Routes
*No entities registered for this layer.*

## Pydantic Schemas
- **DIV-SCH-SAN-001** (`SchemaIndex`): CMS schemas collection index registering siteSettings, service, testimonial, and galleryItem schemas. in `divyotsav/sanity/schemas/index.ts`
- **DIV-SCH-SAN-002** (`SiteSettingsSchema`): Sanity document schema for general configuration, tagline, meta titles/descriptions, and contact information. in `divyotsav/sanity/schemas/siteSettings.ts`
- **DIV-SCH-SAN-003** (`ServiceSchema`): Sanity service model defining Sanskrit labels, categories, descriptions, checklists, pricing, banners, and timeline narratives. in `divyotsav/sanity/schemas/service.ts`
- **DIV-SCH-SAN-004** (`TestimonialSchema`): Sanity testimonial record containing host client names, event types, rating thresholds, and quote statements. in `divyotsav/sanity/schemas/testimonial.ts`
- **DIV-SCH-SAN-005** (`GalleryItemSchema`): Sanity portfolio image reference model declaring gallery titles, categorizations, and grid sort orders. in `divyotsav/sanity/schemas/galleryItem.ts`

## Background Workers
*No entities registered for this layer.*

## Frontend Components
*No entities registered for this layer.*

## Tests
*No entities registered for this layer.*

## Infrastructure Config
*No entities registered for this layer.*

## Other Entities
- **DIV-CFG-SAN-001** (`SanityConfig`): Embedded Sanity Studio dashboard configuration routing base studio path and binding custom structural plugin schemas. in `divyotsav/sanity.config.ts`
- **DIV-UTL-SAN-001** (`SanityClient`): Dynamic Sanity API client setup with query fetching, caching, error logging, and static data fallback structures. in `divyotsav/lib/sanity/client.ts`
- **DIV-UTL-SAN-002** (`SanityQueries`): GROQ queries for siteSettings metadata, services listings, testimonials arrays, and portfolio gallery listings. in `divyotsav/lib/sanity/queries.ts`
- **DIV-UTL-SAN-003** (`SanityImageBuilder`): Sanity CDN utility returning fully qualified image URLs from CMS asset references. in `divyotsav/lib/sanity/image.ts`
