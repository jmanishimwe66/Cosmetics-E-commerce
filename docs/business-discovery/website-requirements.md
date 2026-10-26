# GRECE FOV — Website Requirements

**Status:** Initial discovery draft  
**Research date:** 26 October 2026  
**Purpose:** Translate the business briefing and the current software scope into website objectives, and separate what is essential from what can wait.

Labels: **VERIFIED**, **REPORTED**, **HYPOTHESIS**, **UNKNOWN**, **RECOMMENDATION**. Definitions are in `company-profile.md`.

This document plans. It does not authorise design or implementation.

## Business objectives for the site

| Objective | Status | Notes |
| --- | --- | --- |
| Present the company professionally | REPORTED expectation | Blocked in practice until name, location, and a real product range can be shown. |
| Tell the origin and innovation story | REPORTED expectation | The story itself is UNKNOWN. The site structure can reserve a place for it. |
| Show the product range | REPORTED | Categories are known at group level only. See `product-catalog.md`. |
| Help people understand and compare products | REPORTED expectation | Comparison needs intended use, size, price, and texture. Those fields are UNKNOWN. |
| Support direct online purchase | REPORTED expectation | Payment provider, shipping provider, and checkout rules are UNKNOWN. The current API does not take payment. |
| Support wholesale and bulk enquiries | REPORTED audience includes business customers | A live wholesale programme is UNKNOWN. An enquiry path is the safe first step. |
| Explain the sustainability approach | REPORTED expectation | Publish only what `sustainability-and-production.md` can classify as reported or verified. |
| Build trust with verified information | REPORTED expectation | Address, labels, policies, and registration status are UNKNOWN. |
| State delivery, returns, and support | Required for a serious shop once sales are real | The policies themselves are UNKNOWN. |
| Serve local and international customers | REPORTED ambition | Operational reach is UNKNOWN. The site should sell only where fulfilment is real. |

## Users and jobs

Priorities are **RECOMMENDATION** until the business confirms who buys today. Detail is in `customers-and-market.md`.

| User | Job to support first | Job to postpone |
| --- | --- | --- |
| Individual buyer | Understand a product and place an order the business can fulfil. | Account history, subscriptions, wish lists. |
| Business buyer | Explain the need and request terms. | A self-serve trade portal with credit accounts. |
| First-time visitor | Grasp what GRECE FOV makes and why coffee residue is the point. | A long campaign site with no products. |
| Operator (the business) | Receive an order or enquiry with enough detail to reply. | A full admin back office, unless operations outgrow a simple inbox. The current API has no admin UI. |

## Essential requirements

**RECOMMENDATION.** These are the minimum for a credible first public site, and only after the discovery gaps that feed them are filled.

1. **Identity.** Brand name as the business writes it, a one-sentence description, and a contact method. Physical address when the business is willing to publish it.
2. **Story.** Origin and process, limited to confirmed facts. A clear statement of what coffee residue means in this company.
3. **Catalog.** Categories that match the real range. One page per product that is actually for sale. Products still in trial labelled as such, or omitted.
4. **Product understanding.** Intended use, ingredients from the label, size, price, currency, and photographs of the real pack. The jelly page must state the confirmed use.
5. **Comparison.** A way to see scrub, soap, and other formats by what they are for, so a buyer does not have to guess.
6. **Consumer purchase path.** Either a cart that creates an order the team will confirm manually, or a “request this product” action. Which of the two is essential depends on fulfilment and payment answers that are still UNKNOWN.
7. **Wholesale path.** A separate enquiry, with quantity, business name, and location. Not the consumer cart.
8. **Sustainability page.** Short, sourced from confirmed practice, with no unsupported absolute claims.
9. **Policies.** Delivery area, timing, cost, returns, and how to get help. Publish the real policy, including a narrow delivery area if that is the truth.
10. **Trust basics.** Maker or manufacturer as on the label, country of origin, shelf life or a pointer to the pack, and any registration number the business already holds.
11. **Language and currency.** At least the language and currency of the first real market. Others when operations support them.

The repository README already points the first software release at product discovery and a simple ordering flow, with payments, advanced inventory, shipping integrations, and customer accounts deferred unless later approved. Source: `README.md`. That project decision matches a manual-order first release. It does not by itself prove the business wants to launch that way.

## Optional later capabilities

| Capability | Why it can wait |
| --- | --- |
| Card or mobile-money capture | No provider is confirmed. Taking payment before delivery works is a trust risk. |
| Customer accounts | Not required to place the guest order the API already models. |
| International checkout, duties, and tax | Destination countries are unknown. |
| Multi-currency | Unknown. |
| Subscriptions and replenishment | Needs a stable product and a known reorder cycle. |
| Blog or journal | Useful after there is a true process and a photography set. |
| Store locator | Needs confirmed retail doors. |
| Private-label or amenity configurator | Private label is UNKNOWN. |
| Loyalty and promotions | Premature before a price architecture exists. |
| Live inventory sync to several warehouses | Stock process is UNKNOWN. |
| Product reviews | No review programme exists. Invented testimonials must not be added. |

## E-commerce considerations

**UNKNOWN, and not to be assumed:** payment provider, shipping provider, international delivery, tax handling, and the exact checkout workflow.

What the current backend can do is **VERIFIED**:

| Capability | Present now | Source |
| --- | --- | --- |
| List categories | Yes | `GET /api/v1/categories` |
| Search and filter products, including a featured flag | Yes | `GET /api/v1/products` |
| Product detail by slug | Yes | `GET /api/v1/products/{slug}` |
| Guest order with name, email, phone, address, notes, and line quantities | Yes. Status starts as pending. Price is taken from the database, not from the browser. Stock is reduced on insert. | `POST /api/v1/orders`, `backend/README.md` |
| Contact or order enquiry | Yes. Name, email, subject, message. | `POST /api/v1/contact` |
| Payment capture | No | README scope |
| Shipping rate | No. The order stores a free-text address. | `backend/app/schemas/order.py` |
| Returns workflow | No | |
| Accounts | No | |
| Wholesale price list | No | Schema has one price per product |
| Variants, ingredients, documents | No | `001_initial_schema.sql` |
| Content pages for story or sustainability | No | Frontend directory is empty |

**RECOMMENDATION.** For a first release, a confirmed manual order is a better fit than a card checkout that the business cannot reconcile. Use the contact endpoint for wholesale. Put consumer prices in the catalog only when the business has approved them. Do not load `backend/scripts/seed.sql` products into a public site.

**HYPOTHESIS.** If the first market is Rwanda, buyers may expect mobile money as well as cards or bank transfer. That is a market pattern to confirm with the owner and with a payments partner. It is not a selected provider.

## Proposed site structure

**RECOMMENDATION, not a build specification.**

| Page | Role | Depends on |
| --- | --- | --- |
| Home | Name, what is made from coffee residue, a few real products, paths for shoppers and for businesses. | Approved line and at least some real products. |
| Shop | Categories: body scrubs, jelly (with its confirmed use), liquid soap, bar soap, other confirmed cosmetics. | Real catalog. |
| Product | Use, ingredients, size, price, photos, availability. | Label and price approval. |
| Our story | Founders, place, and why residue. | Founder interview. |
| How it is made | Source, steps, what is measured. | Production interview. Omit steps that are not confirmed. |
| For businesses | Wholesale and bulk enquiry. | Confirmation that trade sales are wanted. |
| Delivery and returns | The actual policy. | Owner decision. |
| Contact | People, email, and any phone the business wants public. | Owner decision. |
| Order request or cart | Only for products that can be fulfilled. | Fulfilment and payment answers. |

Pages that should not exist until evidence exists: a certification gallery, a store locator, an international shipping calculator, and any page that ranks the brand against competitors.

## Content principles

**RECOMMENDATION.**

- Write from labels, interviews, and photos, not from category clichés.
- Mark sample, coming soon, and on sale differently.
- State the delivery boundary in the first screen of checkout, not in a footer only.
- Keep consumer and trade language on separate paths so a hotel buyer is not forced through a single-unit cart.
- If a fact is unknown, leave it out. A short true page is more premium than a long speculative one.

## Trust, policies, and support

Minimum policy set before money changes hands, each item **UNKNOWN** today:

- Where orders ship, and where they do not.
- How long delivery takes, and who carries it.
- How the customer pays, and when the order is confirmed.
- How to return or refuse a damaged order.
- How to report a skin reaction.
- Who answers, and in which language.

Regulatory context for labels and registration is in `product-catalog.md`. The website is not a substitute for Rwanda FDA registration, RSB compliance, or destination-market notification.

## Decisions that must wait

- Final information architecture and visual design.
- Whether the first release takes payment.
- Whether international visitors can check out.
- Whether jelly appears in the shop, and under what description.
- Which seed-schema fields are enough, and which need a later data model.

Those decisions sit behind the questions in `discovery-gaps.md`.
