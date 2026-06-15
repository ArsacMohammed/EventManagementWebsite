# MODULE Services catalog and dynamic pages (M3_services)
Slug: `MODULE_services.md` | Sprint: 2 | Status: DONE

## DB Models
*No entities registered for this layer.*

## Service Functions
*No entities registered for this layer.*

## Repository Functions
*No entities registered for this layer.*

## API Routes
*No entities registered for this layer.*

## Pydantic Schemas
*No entities registered for this layer.*

## Background Workers
*No entities registered for this layer.*

## Frontend Components
- **DIV-FE-SRV-001** (`ServicesPage`): Responsive service catalog view featuring dynamic category filtering, pricing summaries, and an alternating deep roots cultural significance timeline. in `divyotsav/app/services/page.tsx`
- **DIV-FE-SRV-002** (`ServiceDetailPage`): Dynamic service details page displaying Sanskrit subtitles, pricing, checklist grids, banner headers, design philosophies, and custom project galleries. in `divyotsav/app/services/[slug]/page.tsx`
- **DIV-FE-SRV-003** (`ServicesCatalog`): Interactive services filtering catalog component mapping dynamic CMS offerings with custom timeline layout and details explorer. in `divyotsav/components/sections/ServicesCatalog.tsx`

## Tests
*No entities registered for this layer.*

## Infrastructure Config
*No entities registered for this layer.*

## Other Entities
- **DIV-UTL-SRV-001** (`servicesData`): Bespoke database-like static representation of the 4 principal offerings containing pricing metrics, features checklists, and timeline information. in `divyotsav/lib/servicesData.ts`
