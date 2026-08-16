# E-commerce product design

Use this reference for shopper discovery through post-purchase service. Keep commercial clarity and user agency ahead of short-term conversion tricks.

## Discovery, search, and listing

Support category browsing, query search, suggestions, spelling/zero results, filters, sorting, comparison, recently viewed, and return to results. Show attributes people need to decide in the list; make important displayed attributes filterable when the catalog supports it. Preserve filters, sort, scroll, and item state after product-page return.

Treat filter guidance as empirical and category-dependent. Baymard's [product-list research](https://baymard.com/research/ecommerce-product-lists) is recognized secondary usability evidence, not a normative standard; validate findings against this catalog, audience, locale, and device.

## Product and availability

Present identity, imagery/media alternatives, price and price basis, variant, availability, fulfillment estimate, seller where relevant, returns, material constraints, and trust evidence before the add decision. Keep variant selection, price, image, SKU, inventory, delivery, and cart line synchronized. Explain unavailable combinations and offer safe alternatives without silently changing the choice.

## Cart and checkout

- Preserve line identity, selected variants, quantity limits, price changes, discounts, stock, delivery/pickup, taxes, and total.
- Offer guest checkout when the business and risk model permit; do not disguise account creation as required if it is not.
- Ask only for data needed for fulfillment, payment, fraud prevention, or explicit consent. Reuse data with permission and keep correction easy.
- Show shipping method, delivery estimate, tax, fees, discount, currency, recurring terms, and final total before the order action.
- Keep order review and edit paths. Prevent duplicate submission and make the irreversible payment/order boundary explicit.
- On payment failure, distinguish validation, issuer decline, authentication, timeout, and unknown result without inventing a cause. Preserve cart and non-sensitive fields, offer retry or another method, and reconcile ambiguous outcomes before another charge.

Shopify's official [storefront design guidance](https://shopify.dev/docs/storefronts/themes/best-practices/design) emphasizes accessible, intuitive product discovery and a clear path to checkout. Translate the principles; do not copy Shopify-specific layout or policy.

## Confirmation and post-purchase

Confirm order identity, charged/authorized amount, fulfillment state, delivery/pickup expectation, receipt path, and next action. A confirmation screen is not proof of successful charge; align it with authoritative order state. Support tracking, address correction where allowed, cancellation, returns/exchanges, refund status, and support escalation.

## Trust and guardrails

Use accurate availability, reviews, delivery claims, price history, sponsorship, and scarcity. Do not preselect paid additions, hide recurring terms or fees, create false urgency, make rejection harder than consent, or obstruct returns/cancellation. Make privacy/security cues factual rather than decorative guarantees.

Test search-to-product, variant switch, out of stock, guest and signed-in checkout, address/tax/shipping changes, discount rejection, payment failure and ambiguous result, duplicate tap, order confirmation, tracking, cancellation, return, localization, currency, keyboard, screen reader, small screen, and connection loss.
