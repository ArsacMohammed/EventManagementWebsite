# MODULE Deployment, SEO, and optimization (M6_infra)
Slug: `MODULE_infra.md` | Sprint: 3 | Status: DONE

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
*No entities registered for this layer.*

## Tests
*No entities registered for this layer.*

## Infrastructure Config
- **DIV-INF-INF-001** (`DeployWorkflow`): GitHub Actions workflow running production Next.js compilation, sitemap generation, and automated Firebase Hosting publication. in `.github/workflows/deploy.yml`

## Other Entities
- **DIV-CFG-INF-001** (`SitemapConfig`): next-sitemap configuration file setting canonical url, robots indexing rules, and priority levels for auto-generated sitemaps. in `divyotsav/next-sitemap.config.js`
- **DIV-CFG-INF-002** (`FirebaseConfig`): Firebase Hosting deployment config mapping static exports and clean route redirects. in `divyotsav/firebase.json`
