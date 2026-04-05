# Concept Index Audit — Pages 01–13

**Audit Date:** 2026-04-05  
**Scope:** Pages 01 (Executive Summary) through 13 (CSR Hydration)  
**Auditor:** Automated analysis  

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Defined before or at first reference — no problem |
| ⚠️ FORWARD REF | Referenced before defined — reader encounters concept before it's explained |
| 🔴 UNDEFINED | Referenced but never defined within pages 01–13 |
| 🔁 RE-DEFINED | Definition repeated on a later page (potential redundancy) |
| 💬 BENEFIT-NO-WHY | A benefit is stated using this concept without explaining what the concept IS |

---

## Master Concept Index

### 1. Copy-Split-Strip

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "Copy the monolith, trim it per domain, swap the shell" (callout). "Copy, Don't Rewrite" card. Used as a label with minimal explanation. |
| **First DEFINED** | **05** | Full dedicated page: 5-step process (Copy, Rename, Strip, Deploy, Verify), detailed walkthrough with commands, file trees, risk mitigation. |
| 🔁 RE-DEFINED | 04 | Phase 1 section gives a 6-step summary of the process (lighter than page 05 but substantial). |
| 🔁 RE-DEFINED | 07 | Full Catalog domain walkthrough re-explains the strip process with concrete file trees. |
| **Verdict** | ⚠️ FORWARD REF | Pages 01–04 use "Copy-Split-Strip" as a label and shorthand. Page 01's "Copy, Don't Rewrite" card gives the gist (copy and delete what doesn't belong), but the full mechanics aren't explained until page 05. **Gap: 4 pages.** |

---

### 2. Strangler Fig Pattern

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "The Strangler Fig pattern has been the go-to enterprise migration approach for over 20 years. It was named by Martin Fowler." In "Why This Is Safe" section. Names it, cites it, doesn't explain the metaphor. |
| **First DEFINED** | **04** | Full definition with metaphor: "The strangler fig is a tropical tree that grows around an existing tree. Over time, the fig's roots replace the host tree's structure..." Full diagram. |
| 🔁 RE-DEFINED | 08 | Industry standard callout: "Extracting domains incrementally while the monolith continues serving traffic is the Strangler Fig pattern described by Martin Fowler." |
| **Verdict** | ⚠️ FORWARD REF | Page 01 name-drops the pattern and attributes it to Fowler but does NOT explain the tree metaphor or the core mechanism. A reader unfamiliar with the pattern would need to Google it or wait until page 04. **Gap: 3 pages.** |

---

### 3. Domain / Bounded Context

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "splitting it into independent domains" — used casually as if self-evident. |
| **First DEFINED** | **06** | "In Domain-Driven Design, a domain is a bounded context — a self-contained area of business functionality with clear boundaries, its own data, and its own rules." With Eric Evans DDD citation. |
| 🔁 RE-DEFINED | 05b | "Bounded Contexts" explained in the context of state boundaries: "Domain-Driven Design (DDD) calls this principle 'Bounded Contexts.'" |
| 🔁 RE-DEFINED | 09 | "Each domain is a bounded context (Domain-Driven Design) with an explicit API contract." |
| **Verdict** | ⚠️ FORWARD REF | "Domain" is used on every page from 01 onward as a core organizing concept, but the DDD definition of bounded context isn't given until page 06. Pages 01–05 use "domain" as if the reader understands it means an independent business vertical. **Gap: 5 pages.** This is the most significant forward reference in the document series — the foundational concept isn't formally defined until page 6 of 13. |

---

### 4. Domain Map

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **04** | "see Page 6: Domain Map" as a cross-reference in Phase 1. |
| **First DEFINED** | **06** | Full page with diagram of 8 domains, data flows, boundary principles. |
| **Verdict** | ✅ OK (intentional cross-reference) | Page 04 references it as a pointer to upcoming content — this is an acceptable navigational cross-reference, not a problematic forward reference. The concept is not used as assumed knowledge before it's defined. |

---

### 5. BFF (Backend-for-Frontend)

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "BFF adds a layer; it doesn't replace" in the "What Stays the Same" table. Also "CSR+BFF means simpler infrastructure" in Operations benefits. The acronym is used without expansion or explanation. |
| **First DEFINED** | **05b** | Section "Frontend to Backend: BFF Data Contracts" — explains BFF purpose (aggregation, authorization, response shaping, caching, versioning) with code examples and sequence diagrams. |
| 🔁 RE-DEFINED | 07 | "The Catalog BFF" section with detailed API surface and "Why a BFF Instead of Direct Backend Calls?" |
| 🔁 RE-DEFINED | 13 | "The BFF's Role in the CSR Architecture" — "BFF Is Not 'Just an API Gateway'" |
| 💬 BENEFIT-NO-WHY | 01 | "Simplified SSR elimination: Moving to CSR+BFF means simpler infrastructure" — states the benefit of BFF without explaining what BFF is. |
| **Verdict** | ⚠️ FORWARD REF | Page 01 uses "BFF" as an acronym without expansion. A non-technical reader or someone unfamiliar with the pattern would not know what it means. Pages 03 and 04 also reference "BFF" casually. First definition on page 05b. **Gap: ~4.5 pages.** |

---

### 6. Web Components / Custom Elements / Shadow DOM

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "W3C Web Components" in "Standards-Based Shell" card. "Web Component Shell" in diagram. Used as the target architecture label. |
| **First DEFINED (brief)** | **03** | "Custom Elements, Shadow DOM, HTML Templates, and ES Modules are W3C standards built into every browser." — Names the sub-technologies but doesn't explain how they work. |
| **First DEFINED (detailed)** | **05b** | Explains attributes-in/events-out pattern, `attributeChangedCallback`, `CustomEvent`, Shadow DOM slots — but focused on communication. |
| **First DEFINED (architecture)** | **10** | Full shell architecture showing how Custom Elements compose domains. |
| **First DEFINED (Shadow DOM detail)** | **12** | Full explanation of Shadow DOM isolation benefits with comparison table (CSS leakage, DOM collisions, framework conflicts). |
| 🔁 RE-DEFINED | 04, 10, 11, 12 | The Web Component concept is explained incrementally across many pages. |
| **Verdict** | ⚠️ FORWARD REF (mild) | Page 01 uses "W3C Web Components" as a label. Page 03 names the sub-technologies. But the reader doesn't get a working understanding of Custom Elements and Shadow DOM until pages 10–12. For a technical director audience, naming the W3C standards may be sufficient context on page 01, but for someone unfamiliar, it's a forward reference. **Gap: 2 pages for naming, 9+ pages for full understanding.** |

---

### 7. WCFramework

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | Phase 4 description: "teams can incrementally migrate to WCFramework, keep using React, use plain vanilla JS, or whatever is easiest." No explanation of what WCFramework is. |
| **First DEFINED** | **04** | Phase 4: "WCFramework is a standards-based component framework built on W3C Web Components. It provides the developer ergonomics teams need (templating, data binding, dependency injection) while compiling to native Custom Elements." |
| 🔁 RE-DEFINED | 11 | "WCFramework CSR Shell" — mentioned in comparison table but not re-explained. |
| **Verdict** | ⚠️ FORWARD REF | Page 01 uses "WCFramework" as a proper noun without explanation. A reader would not know if it's a proprietary tool, an open-source framework, or an internal project. First definition on page 04. **Gap: 3 pages.** |

---

### 8. Import Maps

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **09** | "loaded via the import map" in Shared/Core Layer section. |
| **First DEFINED** | **09** | Same section: "Import maps are a W3C standard (supported in all modern browsers) that allow controlling module resolution at runtime without a build step." |
| 🔁 RE-DEFINED | 10 | Full import map JSON example with `<script type="importmap">` code, benefit table, and explanation. |
| **Verdict** | ✅ OK | Defined on the same page it's first referenced. Page 10 provides more depth but page 09 gives sufficient initial definition. |

---

### 9. App Catalog

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "App Catalog" card: "A registry tracks every micro frontend: what version it's running, what APIs it calls, what components it uses, and whether it's healthy." |
| **First DEFINED (summary)** | **01** | The card in "Five Things That Change" gives a reasonable high-level definition. |
| **First DEFINED (detailed)** | **04** | Phase 3 provides operational detail: deploy registry, register domains, enable scanning, set policies. |
| 🔁 RE-DEFINED | 04 | Phase 3 section repeats and expands the definition. |
| **Verdict** | ✅ OK (adequate) | Page 01's card provides enough context for the reader to understand what App Catalog means. Page 04 elaborates. Full deep-dive is on page 16 (outside scope). No problematic forward reference. |

---

### 10. API Scanning

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "Automated scanning catches problems before they reach production" in App Catalog card. |
| **First REFERENCED (specific)** | **04** | Phase 3: "Automated CI hooks that report to the catalog on every deployment." |
| **First DEFINED** | 🔴 **NOT IN PAGES 01–13** | Full definition is on Page 17 (API Scanning). |
| **Verdict** | 🔴 UNDEFINED in scope | The concept of "scanning" is mentioned as a benefit on pages 01 and 04 but never explained within pages 01–13. The reader is told scanning is good but not told what gets scanned, how, or what the output looks like. |

---

### 11. Shell / Shell Swap

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "swap the shell to industry-standard Web Components" (one-sentence version). "Standards-Based Shell" card. |
| **First DEFINED (Shell)** | **10** | Full page: "The CSR Shell: How It Works" — architecture, routing, authentication, event bus, error boundaries, import map resolution. |
| **First DEFINED (Shell Swap)** | **11** | Full page: "The Shell Swap: Next.js to WCFramework" — four-phase swap process with rollback at each phase. |
| 🔁 RE-DEFINED | 04 | Phase 2 gives a summary of the shell swap process. |
| 💬 BENEFIT-NO-WHY | 01 | "The orchestration layer moves from a framework-specific SSR monolith to W3C Web Components — SEO-friendly CSR that runs from a CDN. No framework lock-in. No server rendering infrastructure." — States benefits without explaining what the shell does or how it works. |
| **Verdict** | ⚠️ FORWARD REF | Pages 01–04 reference "the shell" and "shell swap" extensively as core strategy elements. The reader must wait until pages 10–11 for the full explanation. **Gap: 9–10 pages.** This is expected given the document's structure (strategy first, mechanics later), but the gap is large. |

---

### 12. CSR (Client-Side Rendering)

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "SEO-friendly CSR that runs from a CDN" in Standards-Based Shell card. Acronym not expanded. |
| **First DEFINED (contrast)** | **02** | "The SSR Tax" section explains SSR's costs, implicitly positioning CSR as the alternative. Doesn't formally define CSR. |
| **First DEFINED (full)** | **13** | Full page: "CSR Hydration: Why Client-Side Wins" — detailed comparison, timeline diagrams, performance characteristics. |
| **Verdict** | ⚠️ FORWARD REF | Page 01 uses "CSR" without expanding the acronym. Page 02 explains SSR's problems (implying CSR is the solution) but doesn't define CSR itself. Full definition on page 13. **Gap: 12 pages** from first use to full definition. The acronym should at minimum be expanded on first use. |

---

### 13. SSR (Server-Side Rendering)

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "framework-specific SSR monolith" — acronym used without expansion. |
| **First DEFINED** | **02** | "The SSR Tax" section: explains the promise (SEO, perceived performance) and the cost (shared runtime, memory pressure, hydration cost, deployment coupling). |
| 🔁 RE-DEFINED | 13 | "The SSR Monolith Problem" repeats much of page 02's content with additional detail. |
| **Verdict** | ⚠️ FORWARD REF (minor) | Page 01 uses "SSR" without expanding it. Page 02 provides full context. **Gap: 1 page.** Minor issue — most of the target audience likely knows SSR, and the gap is only one page. |

---

### 14. Blue-Green / Canary Deployments

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **05** | "Canary deployment (1% → 10% → 50% traffic)" in the extraction timeline table. |
| **First REFERENCED (blue-green)** | **11** | "Blue-Green Deployment" in industry standard callout in rollback section. |
| **First DEFINED (canary)** | **11** | Rollout schedule table shows percentage-based canary approach (1% → 5% → 25% → 50% → 100%) with gate criteria. |
| **First DEFINED (blue-green)** | 🔴 **NOT IN PAGES 01–13** | Mentioned by name on page 11 but not explained. Full definition on page 22. |
| 💬 BENEFIT-NO-WHY | 05, 07, 08 | "Canary deployment" is used as a technique name without explaining what canary deployment means. |
| **Verdict** | ⚠️ FORWARD REF + partially 🔴 UNDEFINED | "Canary" is used on pages 05, 07, 08 without definition. Page 11 shows the mechanics (percentage ramp) but doesn't formally define the term. "Blue-green" is name-dropped on page 11 but never explained. **A reader unfamiliar with deployment strategies would not understand these terms from pages 01–13 alone.** |

---

### 15. 1-Year Core Cadence

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **03** | "Adopt a 1-year core cadence with automated scripts that handle the upgrade" — listed as a next-step action item. |
| **First DEFINED (brief)** | **04** | Phase 4: "Once on WCFramework, core updates follow a predictable 1-year cycle: January: New core version released... February–March: Teams run migration scripts... April: Domain-by-domain rollout... May–December: Feature development." |
| **First DEFINED (full)** | 🔴 **NOT IN PAGES 01–13** | Full definition on page 20 (Core Cadence). |
| 💬 BENEFIT-NO-WHY | 03 | "Adopt a 1-year core cadence" stated as a benefit without explaining WHY 1 year (vs 6 months, 2 years), what "core" means in this context, or what the cadence actually entails beyond a brief schedule. |
| **Verdict** | ⚠️ FORWARD REF | Page 03 uses it as an action item. Page 04 gives a month-by-month sketch but not a thorough explanation. Full treatment is on page 20. **Within pages 01–13, the concept is named and given a brief calendar, but not truly explained.** |

---

### 16. Change-Mod Scripts

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **03** | "automated scripts that handle the upgrade" (unnamed). |
| **First REFERENCED** | **04** | "automated migration schematics" in Phase 4. |
| **First DEFINED** | 🔴 **NOT IN PAGES 01–13** | The specific term "Change-Mod Scripts" does not appear. Related concepts ("migration schematics", "automated scripts") are mentioned without naming or defining the tool/pattern. |
| **Verdict** | 🔴 UNDEFINED | The term "Change-Mod Scripts" is not used in pages 01–13. Related automation concepts are mentioned in passing but never named or defined. |

---

### 17. Contract Testing

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | — | The specific phrase "contract testing" does not appear in pages 01–13. Related concepts: "data contracts" (05b, 06), "API contracts" (01), "event contracts" (05b). |
| **First DEFINED** | 🔴 **NOT IN PAGES 01–13** | Full definition likely on page 21 (Testing Strategy). |
| **Verdict** | 🔴 UNDEFINED | The testing methodology called "contract testing" is not referenced or defined in pages 01–13. The word "contract" appears frequently in the context of data/API contracts, but the testing practice is absent. |

---

### 18. Shift Left

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "We shift left on quality — catching issues early in the pipeline instead of in production" in Technical Directors benefits. |
| **First DEFINED** | 🔴 **NOT IN PAGES 01–13** | The phrase is used but never formally defined. |
| 💬 BENEFIT-NO-WHY | 01 | "Shift left" is used as a benefit. The parenthetical "catching issues early" gives partial context, but a non-DevOps reader might not understand the term. |
| **Verdict** | 🔴 UNDEFINED (with partial inline hint) | Page 01 uses "shift left" as jargon with a brief inline explanation. It's never revisited or defined in pages 01–13. The inline hint is likely sufficient for the target audience (technical directors), but it's still undefined as a formal concept. |

---

### 19. CVE Scanning

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **07** | "same container base images and security scanning" in deployment section. |
| **First REFERENCED (indirect)** | **04** | Phase 3: "security compliance" as a policy type for the App Catalog. |
| **First DEFINED** | 🔴 **NOT IN PAGES 01–13** | The specific term "CVE scanning" does not appear. "Security scanning" is mentioned in passing. |
| **Verdict** | 🔴 UNDEFINED | CVE scanning is not referenced by name or defined in pages 01–13. General "security scanning" is mentioned twice without detail. |

---

### 20. Component Communication (events, stores, message bus)

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | Implicitly via "independent domains" — the question of how they communicate isn't addressed. |
| **First REFERENCED (explicit)** | **05** | FAQ: "Domains communicate through well-defined API contracts, not shared state. For real-time UI updates, domains communicate through browser-level events (Custom Events)." |
| **First DEFINED** | **05b** | Full dedicated page: 4-layer model (within component, within domain, between domains, frontend-to-backend), domain stores, message bus, typed event contracts, code examples, sequence diagrams. |
| 🔁 RE-DEFINED | 08 | Cart/Checkout cross-domain communication section repeats event bus pattern with concrete event catalog. |
| 🔁 RE-DEFINED | 10 | Shell's event bus responsibility re-explains the pattern. |
| **Verdict** | ✅ OK (with minor forward ref) | Page 05 gives a brief answer in the FAQ. Page 05b provides the comprehensive definition immediately after. The implicit question from page 01 ("how do domains talk?") is answered within a reasonable distance. |

---

### 21. Data Contracts

| Aspect | Page | Details |
|--------|------|---------|
| **First REFERENCED** | **01** | "API Contracts... No [change]" in the "What Stays the Same" table. |
| **First DEFINED** | **05b** | BFF Data Contracts section with TypeScript interfaces showing `ProductDetailRequest` and `ProductDetailResponse`. "These contracts are the only coupling between frontend and backend." |
| 🔁 RE-DEFINED | 06 | "domains share data contracts, not data stores" — reinforces the principle with emphasis on API-only communication. |
| **Verdict** | ⚠️ FORWARD REF (minor) | Page 01 mentions "API Contracts" staying the same, assuming the reader understands what they are. Page 05b provides the formal definition with code. **Gap: ~4.5 pages.** For the target audience, "API contracts" is likely understood, so this is a minor issue. |

---

## Summary: Forward Reference Severity

### 🔴 Critical Forward References (concept used extensively before definition)

| Concept | First Used | First Defined | Gap | Impact |
|---------|-----------|--------------|-----|--------|
| **Domain / Bounded Context** | Page 01 | Page 06 | 5 pages | Foundational concept used on every page before being defined |
| **Shell / Shell Swap** | Page 01 | Page 10–11 | 9–10 pages | Core strategy element explained very late |
| **CSR** | Page 01 | Page 13 | 12 pages | Acronym never expanded on first use; full explanation is last page in scope |

### ⚠️ Moderate Forward References

| Concept | First Used | First Defined | Gap |
|---------|-----------|--------------|-----|
| **Copy-Split-Strip** | Page 01 | Page 05 | 4 pages |
| **Strangler Fig** | Page 01 | Page 04 | 3 pages |
| **BFF** | Page 01 | Page 05b | ~4.5 pages |
| **WCFramework** | Page 01 | Page 04 | 3 pages |
| **1-Year Core Cadence** | Page 03 | Page 04 (brief) / Page 20 (full) | 1 page (brief) |
| **Blue-Green / Canary** | Page 05 | Page 11 (partial) / Page 22 (full) | 6 pages |
| **Data Contracts** | Page 01 | Page 05b | ~4.5 pages |

### 🔴 Concepts Referenced but NEVER Defined in Pages 01–13

| Concept | First Referenced | Notes |
|---------|-----------------|-------|
| **API Scanning** | Page 01 | Mentioned as benefit; full definition on page 17 |
| **Change-Mod Scripts** | N/A | Term not used; "migration schematics" mentioned on page 04 |
| **Contract Testing** | N/A | Term not used in pages 01–13 |
| **CVE Scanning** | N/A | Term not used; "security scanning" mentioned in passing |
| **Shift Left** | Page 01 | Used as jargon with inline hint, never formally defined |

### 💬 Benefits Stated Without Explaining the Concept

| Page | Benefit Statement | Missing Explanation |
|------|-------------------|---------------------|
| 01 | "CSR+BFF means simpler infrastructure" | What is BFF? What is CSR? (reader at page 01 doesn't know) |
| 01 | "We shift left on quality" | What does "shift left" mean? (inline hint provided but jargon-heavy) |
| 01 | "SEO-friendly CSR that runs from a CDN" | Asserts CSR is SEO-friendly without explaining how (resolved on page 13) |
| 03 | "Adopt a 1-year core cadence" | Why 1 year? What is "core"? |
| 05, 08 | "Canary deployment" | What is canary deployment? Assumed known. |

---

## Redundancy Analysis: Concepts Re-Defined

| Concept | Pages Where Defined/Re-Defined | Assessment |
|---------|-------------------------------|------------|
| **Copy-Split-Strip** | 04 (summary), 05 (full), 07 (concrete example) | **Acceptable** — progressive elaboration from overview → mechanics → example |
| **Strangler Fig** | 04 (full), 08 (industry callout) | **Minor redundancy** — page 08 callout adds no new information vs page 04 |
| **Domain / Bounded Context** | 06 (full), 05b (DDD reference), 09 (re-stated) | **Minor redundancy** — pages 05b and 09 re-state without adding depth |
| **BFF** | 05b (purpose), 07 (Catalog example), 13 (CSR role) | **Acceptable** — each page covers a different facet |
| **Web Components** | 03 (brief), 05b (communication), 10 (shell), 12 (wrapping) | **Acceptable** — genuinely different aspects covered per page |
| **SSR** | 02 (problems), 13 (vs CSR comparison) | **Some redundancy** — page 13 repeats page 02's SSR critique with additional metrics |

---

## Recommendations

1. **Page 01 needs a glossary callout or brief definitions** for: CSR, SSR, BFF, WCFramework, Strangler Fig, and "domain" (in the DDD sense). Even a single paragraph or sidebar would eliminate most forward references.

2. **Expand acronyms on first use**: CSR (Client-Side Rendering), SSR (Server-Side Rendering), BFF (Backend-for-Frontend) should be spelled out on page 01.

3. **"Domain" should be given a one-sentence working definition on page 01**: e.g., "A domain is an independent business vertical (like Catalog, Cart, or Checkout) with its own code, data, and deployment pipeline."

4. **Pages 01–04 (strategy section) should include a mini-glossary** that previews key terms that are defined in detail later. This acknowledges the forward references and gives readers enough context to follow the strategy narrative.

5. **The "shift left" usage on page 01** should either be replaced with plain language or given a brief parenthetical definition.

6. **"Canary deployment" should be briefly defined** on page 05 where it first appears (e.g., "canary deployment — gradually routing a small percentage of traffic to the new service").

7. **Concepts that are undefined in pages 01–13** (API Scanning, Contract Testing, CVE Scanning, Change-Mod Scripts) are acceptable IF the document is meant to be read as a full 25-page series. However, if pages 01–13 are expected to stand alone, these concepts need at least brief definitions where first referenced.
