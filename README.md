# faq-schema-demo

Static demo site showing how an AI agent can audit FAQ accordion blocks across a resource center and propose enabling `FAQPage` JSON-LD schema on qualifying pages. 8 pages, each with an FAQ accordion gated by a `data-faq-schema` attribute.

## The point

The agent under demo finds pages where `data-faq-schema="false"`, judges whether the FAQ content qualifies for Google's `FAQPage` rich result, and proposes enabling the schema (flipping the attribute to `true` and injecting `FAQPage` JSON-LD into `<head>`) on the pages that qualify.

See `DEMO-SCRIPT.md` for the talking points and the expected agent verdicts.

## Pages

| Page | `data-faq-schema` | JSON-LD | Expected agent action |
|---|---|---|---|
| `cross-border-payments.html` | `true` | present | skip — already enabled |
| `multi-currency-accounts.html` | `true` | present | skip — already enabled |
| `usd-receiving-account.html` | `false` | — | **enable** — factual Q&A |
| `currency-conversion-fees.html` | `false` | — | **enable** — factual Q&A |
| `freelancer-getting-paid.html` | `false` | — | **enable** — factual Q&A |
| `marketplace-payouts.html` | `false` | — | skip — promotional FAQ |
| `b2b-invoicing.html` | `false` | — | skip — promotional FAQ |
| `index.html` | `false` | — | skip — hub page, mixed topics |

## FAQ accordion shape

Every page uses the same markup contract:

```html
<div data-block="faq-accordion" data-faq-schema="false">
  <div data-faq-item>
    <button class="faq-q">Question?</button>
    <div class="faq-a">Answer.</div>
  </div>
  ...
</div>
```

The `data-faq-schema` attribute on the wrapper is the toggle. The two pages where it's `true` also have a matching `<script type="application/ld+json">` block in `<head>`.

## Hosting

Push to `memento-knowledge/faq-schema-demo` and enable GitHub Pages on the `main` branch. The site is fully static — no build step.

```bash
cd faq-schema-demo   # or whatever your local folder is named
git init
git add .
git commit -m "initial demo site"
git branch -M main
git remote add origin git@github.com:memento-knowledge/faq-schema-demo.git
git push -u origin main
```

Then in the repo settings → Pages → Source: `main` / `/ (root)`.

## Local preview

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```
