# Divyotsav Project Rules & Guidelines

Before writing code for any task, you must read:
1. `ai_context/RULES.md`
2. `ai_context/INDEX.md`
3. The relevant `ai_context/modules/MODULE_{name}.md` for the code you are editing.

## Architectural Rules
1. Saturated or bright colors are forbidden; only use the specified design token color palette.
2. Pure white (#FFFFFF) and pure black (#000000) are forbidden in all styles and layouts.
3. Rounded corners (border-radius > 0px) are forbidden on all elements including buttons, cards, and images.
4. Box shadows are forbidden on all cards, buttons, and UI elements.
5. Gold fills are forbidden; gold is strictly reserved for borders, thin lines, CTAs, and active text state.
6. Burgundy is forbidden to be used more than once per page as a single-word/accent highlight.
7. Fonts other than Cormorant Garamond, Jost, and Noto Serif Devanagari are forbidden.
8. Animations on CSS properties other than opacity and transform are forbidden.
9. Scroll-triggered animations are forbidden on mobile devices.
10. Stock photo style imagery is forbidden; all visual assets must have a premium editorial feel.
11. Images without next/image, priority loading (for LCP), or descriptive alt attributes are forbidden.
12. Fonts must be loaded exclusively via next/font.
13. Sanskrit labels in Noto Serif Devanagari must precede or sit above all service titles.
14. Body copy must be split into single paragraphs of max 45-65 characters per line.
15. External links must always include rel="noopener noreferrer".

## Entity Registration
Update `CODEMAP.json` and run `python update.py` after creating any new code entities.
Entity Code Format: `DIV-{LAYER}-{MODULE}-{SEQ}`
- LAYER: FE (frontend), UTL (utility), CFG (config), INF (infra), SCH (schema), RTE (route).
- MODULE: LYT (layout), HOM (home), SRV (services), CON (contact), SAN (sanity), INF (infra).
