# GRECE FOV — Product Catalog

**Status:** Initial discovery draft  
**Research date:** 26 October 2026  
**Purpose:** Inventory only products and categories that the briefing or project files support, and list the fields still missing.

Labels: **VERIFIED**, **REPORTED**, **HYPOTHESIS**, **UNKNOWN**, **RECOMMENDATION**. Definitions are in `company-profile.md`.

## Catalog status

No GRECE FOV product list, ingredient list, price list, size, photograph, or label artwork was found in the repository.

The groups below are **REPORTED** in the stakeholder briefing of 26 October 2026. They are categories, not confirmed stock-keeping units. A product name inside a category is **UNKNOWN** unless a later section says otherwise.

The jelly’s intended use is **UNKNOWN**. This catalog does not treat it as a food and does not treat it as a leave-on cosmetic.

## Category inventory

| Category | Status | Intended use | Named products | Ingredients | Benefits with evidence | Sizes and variants | Price | Photos and copy | Safety and labelling | Wholesale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Coffee-based body scrubs | REPORTED category | **HYPOTHESIS:** body exfoliation. The briefing calls them body scrubs. Skin type, frequency, and face-or-body limits are unknown. | UNKNOWN | UNKNOWN | UNKNOWN. No test, review, or claim substantiation was found. | UNKNOWN | UNKNOWN | None in the repository | UNKNOWN | UNKNOWN |
| Jelly | REPORTED category | UNKNOWN. Do not describe it as edible or as a cosmetic until the business confirms the use. | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | None | UNKNOWN | UNKNOWN |
| Liquid soap | REPORTED category | **HYPOTHESIS:** cleansing for hands, body, or both. The briefing does not say which. | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | None | UNKNOWN | UNKNOWN |
| Bar soap | REPORTED category | **HYPOTHESIS:** cleansing, possibly with coffee-particle exfoliation. Particle size and whether the bar is for face or body are unknown. | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | None | UNKNOWN | UNKNOWN |
| Other cosmetics and personal-care products | REPORTED category | UNKNOWN. The briefing says the range includes other cosmetic products and does not name them. | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | None | UNKNOWN | UNKNOWN |

No additional product was verified in company materials.

## What a finished product record needs

**RECOMMENDATION.** Do not publish a product page until each item has at least the following, supplied by the business:

1. Commercial name and category.
2. Intended use, in the company’s words, including who should not use it.
3. Full ingredient list as it appears on the label.
4. Net content, variants, and packaging description.
5. Retail price, currency, and whether it is in stock.
6. At least one photograph of the real packaged product.
7. Shelf life, storage, batch identification, and country of origin.
8. Any registration or notification number that already exists.
9. Wholesale availability, unit size, and minimum order, if trade sale is real.
10. Claims the business is willing to make, and the evidence behind each claim.

Customer benefits such as smoothing, brightening, odour control, or suitability for sensitive skin are **UNKNOWN**. They must not be written as product facts until the business provides evidence it is prepared to stand behind.

## Safety, labelling, and regulatory notes

These notes are external regulatory context. They are not a finding that GRECE FOV is registered, inspected, or non-compliant.

**If products are sold in Rwanda,** Rwanda Food and Drugs Authority guidelines on cosmetic registration (document DD/CHCR/GDL/002, August 2025) distinguish non-medicated cosmetics from medicated cosmetics by active ingredients and intended use. A product presented as treating a skin condition can fall on the medicated side. The same guidelines say labels should be legible, in an official language of Rwanda, and carry brand name, manufacturer name and physical address, batch number, manufacturing and expiry dates, net content, ingredient list, intended use, instructions, country of origin, storage conditions, and warnings where relevant. Contract manufacture, where used, is expected to be documented and stated on the label. New-application assessment is described as within three months of a complete submission. Source: [Rwanda FDA guidelines, August 2025](https://rwandafda.gov.rw/monitoring-tool/documents-management/uploads/1/Guidelines/1767620839_GuiGuidelines-on-Submission-of-Documentation-for-Registration-of-Cosmetic-Products.pdf), accessed 26 October 2026.

Rwanda Standards Board maintains compulsory standards for cosmetics, including labelling of cosmetic products (referenced in the RSB compulsory-standards booklet as RS EAS 346) and lists of substances that must not be used, or that may be used only under restrictions. Source: [RSB compulsory standards booklet](https://www.rsb.gov.rw/fileadmin/user_upload/footer_files/Compulsory-mandatory_stds_booklet.pdf), accessed 26 October 2026.

**If products are sold in the European Union,** cosmetic products are governed by Regulation (EC) No 1223/2009, which requires a responsible person, a product information file, notification, and specific labelling. That obligation is not evidence about GRECE FOV. It is a condition to confirm before promising EU checkout. Official overview: [European Commission, Cosmetics](https://health.ec.europa.eu/cosmetics_en).

**RECOMMENDATION.** The website should repeat only claims and ingredient text taken from approved labels. Therapeutic language (“heals”, “treats”, “cures”) should stay off the site unless the product is registered for that purpose and the business approves the wording.

## Technical sample data in the repository

**VERIFIED** and **not part of this catalog.** `backend/scripts/seed.sql` inserts placeholder rows so the API can be tried locally:

| Seed category | Seed product | Seed price | Image |
| --- | --- | --- | --- |
| Skincare | Rosewater Toner | 18.00 | none |
| Skincare | Daily Moisturizer | 24.50 | none |
| Makeup | Soft Matte Lipstick | 16.00 | none |
| Hair | Repair Shampoo | 19.00 | none |

The seed file describes these rows as a sample catalog. The currency is not stated. The categories do not match the briefing (scrubs, jelly, liquid soap, bar soap, other cosmetics).

**RECOMMENDATION.** Keep this seed data out of any public GRECE FOV site. Replace categories and products only after the business confirms the real range.

## Product data the current database can store

**VERIFIED** against `backend/supabase/migrations/001_initial_schema.sql` and `backend/app/schemas/product.py`.

A product row can hold a category, name, slug, one description, one price, one image URL, a stock count, and a featured flag. It cannot hold variants, a second currency, an ingredient table, a wholesale price, a size, a batch, or a document such as a certificate.

That schema is a planning constraint for a later build. It is not a description of the products.
