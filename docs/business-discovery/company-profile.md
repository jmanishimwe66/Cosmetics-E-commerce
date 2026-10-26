# GRECE FOV — Company Profile

**Status:** Initial discovery draft  
**Research date:** 26 October 2026  
**Purpose:** Record what is known about the business before branding or website decisions.

This profile separates evidence from interpretation. It does not fill gaps with invented company history.

## How to read the labels

| Label | Meaning |
| --- | --- |
| VERIFIED | Supported by material in this repository, or by a cited external source that is about a named third party or a public market fact. |
| REPORTED | Stated in the stakeholder briefing of 26 October 2026. Not corroborated by company documents in the repository. |
| HYPOTHESIS | A reasonable reading that still needs validation. |
| UNKNOWN | Not available in the materials reviewed. |
| RECOMMENDATION | A proposed next decision. Not a fact about the company. |

## Company overview

| Topic | Status | What is known |
| --- | --- | --- |
| Working name | REPORTED | GRECE FOV. |
| Legal name | UNKNOWN | No registration extract, certificate, or letterhead was in the project. |
| Preferred brand writing, pronunciation, and lockup | UNKNOWN | The briefing uses the capitalised form GRECE FOV. No logo usage rules were found. |
| What the business does | REPORTED | It transforms coffee residue into cosmetic, personal-care, soap, and other products. |
| Named product groups | REPORTED | Body scrubs, jelly, liquid soap, bar soap, and other cosmetic products. Individual product names are unknown. |
| Intended positioning | REPORTED | Premium. No price, packaging, or distribution evidence in the project confirms that this position is already in market. |
| Customers | REPORTED | The business serves, or intends to serve, individual consumers and business customers. |
| Geographic ambition | REPORTED | Customers in Rwanda and international markets. |
| Headquarters and operating site | UNKNOWN | The briefing names Rwanda as a market ambition. It does not state that the company is registered or based there. |
| Founders and founding year | UNKNOWN | |
| Mission, vision, values | UNKNOWN | No statement was found in the repository. |
| Stage and capacity | UNKNOWN | It is not known whether products are in prototype, small-batch sale, or regular production. |
| Partnerships and distribution | UNKNOWN | |
| Public website or social profiles | UNKNOWN | Searches on 26 October 2026 did not return a page, registry entry, or social profile that could be confidently matched to this name. Absence of a search result does not prove the business has no public presence. |

## History and founders

**UNKNOWN.** No founder names, dates, locations, or origin story were in the repository or in a public source that could be tied to GRECE FOV.

The origin story matters because the brand is expected to communicate innovation and a sustainability approach. Until the founder account is recorded in the company’s own words, the website should not publish a narrative about why the business started.

## Mission, vision, and values

**UNKNOWN.** Nothing in the project states a mission, vision, or set of values.

**REPORTED** intentions that can guide discovery, and that are not yet a mission statement:

- Turn coffee residue into cosmetic, personal-care, and soap products.
- Present the brand as premium.
- Speak to individual buyers and to business buyers.
- Reach customers in Rwanda and in international markets.
- Use the future website for sales and for the story of the company, its products, its innovation, and its sustainability approach.

## Business objectives

| Horizon | Status | Objective |
| --- | --- | --- |
| Stated commercial aim | REPORTED | Sell online, and explain the company, products, innovation, and sustainability approach. |
| Market aim | REPORTED | Serve people and businesses, with ambitions in Rwanda and abroad. |
| Brand aim | REPORTED | Premium positioning. |
| Quantified goals | UNKNOWN | No revenue, volume, margin, or timeline targets were found. |
| Current project aim | VERIFIED | The repository README describes a professional online presence, discoverable products, a straightforward ordering experience, and a maintainable base for later growth. The first release is defined as product discovery and a simple ordering flow. Online payments, advanced inventory, shipping integrations, and customer accounts are deferred unless they are later approved. Source: `README.md`. |

The README describes the software project. It does not describe GRECE FOV’s operating history.

## Business model

A full model is in this section only as far as the briefing and the software scaffold allow. Production detail is in `sustainability-and-production.md`. Commercial channels are not assumed to be live.

| Question | Status | Notes |
| --- | --- | --- |
| Raw material | REPORTED | Coffee residue. The type of residue, the suppliers, and the collection method are unknown. |
| Transformation | REPORTED | Residue is turned into cosmetic, personal-care, soap, and other products. The process steps, equipment, and site are unknown. |
| Own manufacture or partner manufacture | UNKNOWN | |
| Revenue today | UNKNOWN | No sales records were in the project. |
| Direct-to-consumer | REPORTED as an intention for the website | Whether DTC sales already happen, and through which channel, is unknown. |
| Wholesale, bulk, and business-to-business | REPORTED as an intention or current activity | The briefing says the business serves or intends to serve business customers. It does not confirm a live wholesale programme, price list, or minimum order. |
| Distribution and delivery | UNKNOWN | No courier, pickup, retail, or export arrangement was documented. |
| Payments | UNKNOWN | The current API accepts a guest order and does not collect payment. Source: `backend/README.md`, `backend/app/schemas/order.py`. That is a software fact, not evidence of how the company is paid. |

**HYPOTHESIS.** The economic model is a product business: residue is an input, finished personal-care goods are the offer, and revenue would come from retail prices and from trade prices. This remains a hypothesis until invoices, a price list, or a channel map exist.

## Location and reach

| Geography | Status |
| --- | --- |
| Country of registration | UNKNOWN |
| Workshop or factory address | UNKNOWN |
| Rwanda as a market | REPORTED ambition, and possibly a current market. The briefing does not say which. |
| International markets | REPORTED ambition. No destination country is named. |
| Languages the business can serve | UNKNOWN |

Rwanda’s coffee export sector is large and growing, which makes a coffee-linked personal-care story locally legible. That is market context, not evidence that GRECE FOV participates in the coffee export chain. In calendar year 2025, Rwanda exported 23,860 tonnes of green coffee and earned more than USD 148.6 million, according to the National Agricultural Export Development Board (NAEB), published on the NAEB site and accessed 26 October 2026: [Rwanda coffee export revenues hit record $150m in 2025](https://www.naeb.gov.rw/publications/news/rwanda-coffee-export-revenues-hit-record-150m-in-2025).

## Partnerships

**UNKNOWN.** No named coffee producer, café, washing station, manufacturer, retailer, hotel, salon, NGO, or distributor was found.

## What the software project shows

These points are verified facts about the repository on 26 October 2026. They are not facts about company operations.

- The repository is named Cosmetics-E-commerce. GRECE FOV is not named in `README.md`, the API, or the database seed.
- `frontend/` contains only `.gitkeep`. There is no website content, page copy, or visual design in the repo.
- The backend is a FastAPI service for a catalog, guest orders, and contact messages, backed by Supabase PostgreSQL. Source: `backend/README.md`.
- Sample categories are Skincare, Makeup, and Hair. Sample products are Rosewater Toner, Daily Moisturizer, Soft Matte Lipstick, and Repair Shampoo, with illustrative prices and no images. Source: `backend/scripts/seed.sql`.
- Those seed rows are technical sample data. They are not a GRECE FOV catalog.
- No logo, photography, packaging artwork, presentation, testimonial, or brand guideline file is in the repository.

## Sources

1. Stakeholder briefing in the discovery request, 26 October 2026. Treated as REPORTED.
2. Repository files reviewed the same day: `README.md`, `backend/README.md`, `backend/scripts/seed.sql`, `backend/supabase/migrations/001_initial_schema.sql`, `backend/app/schemas/product.py`, `backend/app/schemas/order.py`, `backend/app/schemas/contact.py`.
3. File inventory of the repository: no image, PDF, or brand-guideline files.
4. Web search for the name GRECE FOV and close variants, 26 October 2026: no confident public match.
5. NAEB, “Rwanda coffee export revenues hit record $150m in 2025”, accessed 26 October 2026. Market context only.
