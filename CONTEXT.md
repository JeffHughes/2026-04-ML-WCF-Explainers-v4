# V5 Medline Director Explainer Series — Master Context

## Project
- Location: `D:\software\InfiniteCabinet\backup-prd-docs\docs\explainers\v5\`
- Shared CSS: `shared.css` (all theme variables, mermaid-wrap, details, callouts, nav, etc.)
- Shared JS: `shared.js` (mermaid rendering, pan/zoom/fullscreen, theme toggle, progress bar)
- Total pages so far: 26 files (index.html + pages 01-25)

## Audience
- Technical Director at Medline
- Manages offshore teams who "only know how to vibe code"
- Does NOT want to hear about money or headcount
- DOES care about: migration simplicity, speed, safety, independence, industry standards

## Current Site (Medline)
- Monolithic Next.js 12.3 shell
- 84+ micro frontends
- React 17.x components, no common standards
- K8s SSR deployment
- Tightly coupled — one team's change can break everyone
- No component catalog — nobody knows what version is running where

## Target Architecture
- Copy-split-strip migration (copy monolith per domain, delete what domain doesn't need)
- Independent domains: Catalog, Cart, Mini-Cart, Checkout, Account, Search, Content, Admin
- New WCFramework CSR shell (NEVER say Angular — always "WCFramework" or "HTML-first MV* pattern")
- Wrap existing React MFEs in Web Components (Shadow DOM boundary)
- ML- prefix for all components (e.g., ml-product-card)
- Single module per component, CDN-loaded dynamically via import map
- BFF (Backend-for-Frontend) per domain
- App Catalog: registry of every component, every version, every API contract
- API scanning: automated contract discovery and breaking change detection
- 1-year core update cadence with change-mod scripts
- Blue/green deployments at domain level
- Instant rollback via import map versioning

## Hard Rules
1. NEVER say "Angular" — always "WCFramework" or "HTML-first MV* pattern" or "standards-based component framework"
2. NEVER talk about money or headcount
3. Top-down structure: simple concepts first, more detail as you go deeper
4. No repetition between pages — each page covers ONE concept, references others
5. LOTS of Mermaid diagrams (pan/zoom/fullscreen compatible)
6. LOTS of industry-standard green checkbox callouts (the .industry-std CSS class) — for NEW architecture patterns, not old transition stuff
7. Professional but persuasive tone — sell HARD
8. Every concept must be understandable by offshore devs who only know vibe coding
9. Expandable details sections for deep-dive content
10. Each page is bitesize — one concept per page

## Existing Pages (01-25) — Main Migration Series
These cover the migration journey from current state to target state.
Sections do NOT need to be repeated in the new sections.

## CSS/JS Infrastructure
- shared.css has: theme variables, progress-bar, nav, hero, stat-grid, main/section/h2/h3,
  expandable details, mermaid-wrap (toolbar, view, caption, source, fullscreen),
  callouts (callout, industry-std), compare-table, themes-grid/theme-card,
  doc-grid/doc-card, page-nav (prev/next), toast, footer, responsive breakpoints
- shared.js has: mermaid CDN import, theme toggle with localStorage, source/copy buttons for
  mermaid wraps, mermaid rendering, zoom/pan/fullscreen, progress bar scroll handler,
  expandAll/collapseAll functions

## Nav Template
Every page uses this nav with the current page marked class="active":
```html
<nav>
  <a href="index.html" class="logo">ML Modernization</a>
  <div class="nav-links">
    <!-- links to all 25 main pages + section-specific pages -->
  </div>
  <button class="theme-toggle" id="themeToggle" title="Toggle theme">&#9790;</button>
</nav>
```

## Page Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PAGE_TITLE — Medline Platform Modernization</title>
<link rel="stylesheet" href="shared.css">
</head>
<body>
<div class="progress-bar"></div>
<nav>...</nav>
<div class="hero">
  <div class="page-num">Section Label</div>
  <h1>Page Title</h1>
  <p class="subtitle">Page subtitle</p>
</div>
<main><!-- content --></main>
<div style="max-width:900px;margin:0 auto;padding:0 1.5rem;">
  <div class="page-nav">
    <a href="PREV.html"><span class="pn-label">← Previous</span><span class="pn-title">PREV</span></a>
    <a href="NEXT.html" class="next"><span class="pn-label">Next →</span><span class="pn-title">NEXT</span></a>
  </div>
</div>
<footer>Medline Platform Modernization — v5 — 2026-04-05 — Confidential</footer>
<div class="toast" id="toast">Copied!</div>
<script type="module" src="shared.js"></script>
</body>
</html>
```

## Mermaid Diagram Pattern
```html
<div class="mermaid-wrap" id="dNN-N">
  <div class="mw-toolbar">
    <button onclick="mzoom(this,1.2)">+</button>
    <button onclick="mzoom(this,0.8)">−</button>
    <button onclick="mreset(this)">Reset</button>
    <button onclick="mfull(this)">⛶</button>
  </div>
  <div class="mw-view">
    <div class="mermaid-inner" data-src="graph TD
      A --> B"></div>
  </div>
  <div class="mw-caption">Caption text</div>
</div>
```

## Industry Standard Callout Pattern
```html
<div class="industry-std">
  <strong>Industry Standard: Topic</strong>
  Description of why this is the standard way.
</div>
```
These are GREEN checkbox callouts. Use them for NEW architecture patterns only, not transition/migration stuff.
