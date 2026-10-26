# GRECE FOV — Business Context

**Status:** Initial discovery draft  
**Research date:** 26 October 2026  
**Purpose:** One place to see verified facts, reported briefing points, hypotheses, and the strategic direction that is safe to hold before branding and website design.

This is the master note. Detail sits in the linked documents. Nothing here invents company history, formulas, prices, certificates, or customers.

## How statements are classified

| Label | Meaning |
| --- | --- |
| VERIFIED | Supported by this repository, or by a cited external source about a market or a named third party. |
| REPORTED | Stated in the stakeholder briefing of 26 October 2026, and not yet backed by a company file in the project. |
| HYPOTHESIS | A planning interpretation that needs the owner’s confirmation. |
| UNKNOWN | Not in the materials reviewed. |
| RECOMMENDATION | A proposed choice. Not a fact about GRECE FOV. |

## Verified facts

These describe the project and the public record. They do not describe GRECE FOV’s operations.

- The repository is an early cosmetics commerce project. The frontend directory is empty. The backend is a FastAPI catalog with guest orders and contact messages on Supabase. Payments, shipping integrations, advanced inventory, and accounts are described as later work unless requirements approve them. Sources: `README.md`, `backend/README.md`.
- The database seed is sample data: Skincare, Makeup, and Hair, with Rosewater Toner, Daily Moisturizer, Soft Matte Lipstick, and Repair Shampoo. Source: `backend/scripts/seed.sql`. Those rows are not GRECE FOV products.
- No logo, photograph, packaging file, brand guideline, testimonial, or company document is in the repository. File inventory, 26 October 2026.
- Web search on that date did not find a public site or profile that could be confidently attributed to the name GRECE FOV.
- External context that may matter later is documented, with sources, in `customers-and-market.md`, `product-catalog.md`, and `sustainability-and-production.md`: Rwanda’s coffee export scale (NAEB, MINECOFIN), Rwanda FDA cosmetic registration and labelling expectations (August 2025 guidelines), RSB cosmetic standards, and public profiles of Kandaka Naturals, a 2016 Huye coffee-soap cooperative article, Ela Beauty in Uganda, and UpCircle in the UK.

## Reported facts from the briefing

Treat these as the current business brief, pending documents.

- The working name is GRECE FOV.
- The business transforms coffee residue into cosmetic, personal-care, soap, and other products.
- The named range includes body scrubs, jelly, liquid soap, bar soap, and other cosmetic products.
- It serves, or intends to serve, individual consumers and business customers.
- It has ambitions to reach customers in Rwanda and in international markets.
- The intended positioning is premium.
- The website is expected to support online sales and to communicate story, products, innovation, and sustainability.
- Some brand assets exist. Their completeness and quality have not been established, and they are not in this repository.

## Current hypotheses

- The commercial offer is finished goods, at a retail price and a trade price, with coffee residue as the defining input.
- The jelly’s use is unconfirmed and must stay undescribed until the owner classifies it.
- The first website audience is undecided. Designing consumer checkout and international wholesale as if both were live would overstate operations.
- Distinctiveness, if the facts support it, is a traceable residue stream plus a small range of formats, not the mere presence of coffee in a soap. Coffee personal care already exists in Rwanda and internationally.
- “Premium” will be believed only if price, pack, photography, and claim discipline agree. The word alone is an intention.

## Unknown, and blocking

Founders and origin, legal name and location, mission, stage, capacity, residue definition and supplier, manufacturing model, ingredient lists, prices, real customers, delivery, payment, policies, registrations, measured environmental results, and the actual logo and pack. The full list and the questions that close it are in `discovery-gaps.md`.

## Business goals the work should serve

**REPORTED** goals: a premium presentation, a clear product range, a true innovation and sustainability story, online sales, and a path for business buyers, aimed at Rwanda and international customers as far as operations allow.

**RECOMMENDATION** for how to pursue them now:

1. Finish discovery before visual design and before any further product implementation.
2. Make the first public site truthful at a small scope: real products, real delivery area, real claims.
3. Let wholesale start as an enquiry.
4. Add paid checkout and international shipping only after a provider, a policy, and a destination list exist.
5. Keep the sample seed catalog off any public surface.

## Preliminary strategic direction

The direction below is **RECOMMENDATION**. It is a way to aim the next workshop. It is not a brand platform and not an approved site map.

### Positioning to test

A premium personal-care range defined by coffee residue: specific about source, specific about what each product is for, and specific about what has been measured. Consumer purchase and business enquiry are both visible, and only the path the company can fulfil is transactional.

Do not lock this until questions 5, 8, and 10 in `discovery-gaps.md` are answered. If the residue is not traceable, or the price is not premium, the position should be rewritten rather than decorated.

### Differentiation to investigate

| Possible difference | Status |
| --- | --- |
| Residue, not virgin coffee, as the input | REPORTED, not documented |
| A range across scrub, jelly, liquid soap, and bar soap | REPORTED at category level |
| A named Rwandan or other origin story | UNKNOWN |
| Sensory or performance quality above other coffee soaps | UNKNOWN |
| Trade capability for hotels, retailers, or export | UNKNOWN |

### Customer priority to test

Ask who has already paid (question 9) before ranking audiences. Until then, prepare content for a careful retail buyer and a business buyer who needs specifications, and do not build export self-service.

### Storytelling

The story worth preparing, once facts exist, is: where the residue comes from, what would have happened to it, what is made from it, and who makes it. Process and pack photography will do more work than adjectives. Unsupported absolutes stay out.

### Website goals for a first release

Professional presence, a true catalog, an explanation of use, a manual order or a clear enquiry, a wholesale enquiry, and policies that match operations. Paid international checkout is a later release. Page-level notes are in `website-requirements.md`.

### Potential site structure

Home, shop, product, story, how it is made, for businesses, delivery and returns, contact. Add a cart only for products that can ship. Details and dependencies are in `website-requirements.md`.

### Brand exploration

Review the owner’s existing files first. Territories that may fit, and that are not yet chosen: premium beauty, circular innovation, natural personal care within what the label allows, and a contemporary origin story once place and founders are known. No palette or logo is proposed. See `brand-audit.md`.

### E-commerce

Use the capabilities that already exist only as a technical reference: catalog, guest order without payment, and contact. Do not assume a payment or shipping provider. Confirm currency, fulfilment area, and wholesale terms before promising a shop. See `website-requirements.md`.

## Decisions that cannot be made yet

- Final positioning line and claim set.
- Visual identity and design system.
- Which products appear, and how the jelly is described.
- Whether the first release takes money online.
- Which countries can check out.
- Any environmental figure or certification.
- Any statement that GRECE FOV is ahead of another brand.

## Document map

| Document | Use it for |
| --- | --- |
| [company-profile.md](company-profile.md) | Identity, history, objectives, business model, project context. |
| [product-catalog.md](product-catalog.md) | Categories, missing product fields, regulatory context, seed-data warning. |
| [customers-and-market.md](customers-and-market.md) | Segments, hypotheses, comparable brands, market sources. |
| [sustainability-and-production.md](sustainability-and-production.md) | Residue, process gaps, claim boundary. |
| [brand-audit.md](brand-audit.md) | Missing assets and territories to explore later. |
| [website-requirements.md](website-requirements.md) | Objectives, essential and later features, proposed structure. |
| [discovery-gaps.md](discovery-gaps.md) | Assumptions, evidence to collect, owner questions, next steps. |

## Next step

Answer the questions in `discovery-gaps.md` with the owner, starting with the first ten. Update these files from that conversation. Design and implementation stay paused until the catalog, the residue definition, the fulfilment boundary, and the existing brand files are in hand.
