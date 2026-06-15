# Divyotsav Project Context Instructions

This project uses a structured codebase memory system in `ai_context/`.

MANDATORY — before writing any code for any task:
1. Read [RULES.md](file:///ai_context/RULES.md)
2. Read [INDEX.md](file:///ai_context/INDEX.md)
3. Read the relevant MODULE file:
   - [MODULE_layout.md](file:///ai_context/modules/MODULE_layout.md) (M1_layout): Shell layout, components, header, footer.
   - [MODULE_home.md](file:///ai_context/modules/MODULE_home.md) (M2_home): Homepage sections, hero, bento grids, scrollers.
   - [MODULE_services.md](file:///ai_context/modules/MODULE_services.md) (M3_services): Services catalog, details page, timeline.
   - [MODULE_contact.md](file:///ai_context/modules/MODULE_contact.md) (M4_contact): Inquiry form, WhatsApp, Maps.
   - [MODULE_sanity.md](file:///ai_context/modules/MODULE_sanity.md) (M5_sanity): CMS client, GROQ queries, studio schemas.
   - [MODULE_infra.md](file:///ai_context/modules/MODULE_infra.md) (M6_infra): Deployment, SEO metadata, workflows.

MANDATORY — after completing any coding task:
1. Update `CODEMAP.json` with all new entities created.
2. Assign next sequential code: `DIV-{LAYER}-{MODULE}-{SEQ}`
   - LAYER: FE (frontend), UTL (utility), CFG (config), INF (infra), SCH (schema), RTE (route).
   - MODULE: LYT (layout), HOM (home), SRV (services), CON (contact), SAN (sanity), INF (infra).
3. Run `python update.py`

Never write a function, component, or utility that already appears in a MODULE file. Call it by its entity code instead.
