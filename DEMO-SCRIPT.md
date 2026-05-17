# GlobalPay Demo — Talking Script

## The setup (30 seconds)

> "What you're looking at is a mirror of GlobalPay's resource center — 8 pages covering the topics you actually publish: cross-border payments, multi-currency accounts, USD receiving, FX, freelancers, marketplace payouts, B2B invoicing.
>
> Every page has an FAQ accordion. Each accordion has a `data-faq-schema` attribute — `true` or `false`. When it's `true`, the page emits a `FAQPage` JSON-LD block and is eligible for the rich FAQ snippet in Google search. When it's `false`, the page doesn't.
>
> The question for any content team running a site like this is: **which `false` pages should be flipped to `true`?** The wrong answer here costs you in two directions — leave it `false` and you miss free SERP real estate; flip it `true` on a page that doesn't qualify and Google can penalize the whole domain for structured-data spam.
>
> That decision is what the agent is for."

## The starting state (15 seconds)

Open the repo / show the 8 pages. Walk through the baseline:

| Page | `data-faq-schema` | JSON-LD in `<head>` |
|---|---|---|
| `cross-border-payments.html` | `true` | ✅ present |
| `multi-currency-accounts.html` | `true` | ✅ present |
| `index.html` | `false` | — |
| `usd-receiving-account.html` | `false` | — |
| `currency-conversion-fees.html` | `false` | — |
| `freelancer-getting-paid.html` | `false` | — |
| `marketplace-payouts.html` | `false` | — |
| `b2b-invoicing.html` | `false` | — |

> "Two pages are already on. Six are off. The agent's job is to look at each `false` page and decide: should this be on?"

## Running the agent (live)

Hit run. The agent should:

1. **Crawl** the 8 pages.
2. **Identify** the 6 with `data-faq-schema="false"`.
3. **For each one**, read the FAQ accordion content and decide whether the questions and answers meet Google's `FAQPage` eligibility criteria:
   - Real user questions (not marketing-driven)
   - Direct, factual answers (not "contact us" / "talk to sales")
   - Content visible on the page (it is — accordion content counts)
   - Topically coherent (not a grab-bag)
4. **Propose** enabling schema on the qualifying pages — flipping the attribute to `true` and injecting the corresponding `FAQPage` JSON-LD block into `<head>`.
5. **Skip** the pages that don't qualify, with a reason.

## Expected verdicts (the demo's punchline)

### ✅ ENABLE (3 pages)

**`usd-receiving-account.html`** — six factual Q&As covering account mechanics, ACH support, residency requirements, the legal distinction vs. a US bank account, limits, and timing. Every answer is specific and stands alone.

**`currency-conversion-fees.html`** — six Q&As on mid-market rates, margin math, when conversion happens, and how to avoid fees. Each answer is genuinely informative.

**`freelancer-getting-paid.html`** — six Q&As on payment methods, timing, costs, withdrawals, and registration. Numbers and percentages in the answers.

For each, the agent should produce:
- The updated attribute (`true`)
- The exact JSON-LD block to inject (built from the visible FAQ HTML)

### ⏭ SKIP (3 pages)

**`marketplace-payouts.html`** — FAQ is promotional fluff. Q's like "Is GlobalPay right for my business?" and A's like "Talk to our team." These would fail Google's structured-data review.

**`b2b-invoicing.html`** — same pattern. Sales-pitch questions, sales-pitch answers. No factual content to schema-ize.

**`index.html`** — the questions don't share a single topic (it's a hub page), and the answers point elsewhere. Even if individual answers were stronger, a hub-page FAQ is the wrong place for `FAQPage` schema.

## What to emphasize in the conversation

1. **The agent is making a judgment call, not running a checklist.** It's not just toggling everything to `true` — it's reading the content and applying Google's eligibility rules. That's the value vs. "just write a script."

2. **The risk on the other side is real.** Flipping every page to `true` can get the whole domain demoted in search for structured-data spam. A bad batch is worse than no schema.

3. **The output is concrete.** Not a report. A diff: attribute flip + JSON-LD block, ready to merge.

4. **It scales.** This demo has 8 pages. Their real resource center probably has hundreds. Same logic, same agent.

## If asked: "What if our writers update an FAQ later?"

> "Re-run the agent on commit. If the FAQ content drifts off the page that's schema'd (e.g., a Q gets deleted), the agent flags the JSON-LD as stale and either re-syncs or proposes disabling the schema to stay compliant."

## If asked: "Can we trust it to write the JSON-LD correctly?"

> "It's literally lifting the visible Q&A out of the DOM. The risk surface isn't generation — it's the eligibility judgment, which is the part it's actually doing."

## Recovery if something goes off-script

- If the agent enables one that shouldn't be: that's fine, walk through *why* the model thought it qualified, and use it to talk about tuning the eligibility prompt.
- If the agent skips one that should: same — show the FAQ side-by-side and discuss the borderline case. Borderline cases are where humans want a co-pilot, not full automation.
