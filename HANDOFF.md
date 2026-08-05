# Dawid Kubiak - Portfolio Handoff

## Status

The portfolio is production-ready and `npm run build` passes on Next.js 16.3.0. It contains:

- bilingual English/Polish portfolio content;
- button-based navigation for profile sections;
- a Gemini AI assistant for natural-language recruiter questions;
- an SEO-ready favicon, Open Graph image, sitemap, robots rules, metadata, and Person JSON-LD;
- an optional Vercel Analytics integration that loads only on Vercel.

## How the site works

The buttons below the terminal display local portfolio sections: About, Skills, Projects, Education, Contact, Help, and Clear.

The input field is AI-only: any non-empty text is sent as a Gemini question. Visitors do not need to type `ask` or `zapytaj`. Up/Down arrow history contains only prior AI questions. Gemini receives only the curated facts from `data/profile.ts`, accepts questions up to 300 characters, and is instructed to provide concise answers without inventing information.

## Editable files

- `data/profile.ts` - all profile content and translations; this is the AI's source of truth.
- `app/layout.tsx` - metadata, canonical URL, social preview configuration, JSON-LD, and Vercel Insights script.
- `app/opengraph-image.tsx` and `app/icon.svg` - social card and browser favicon.
- `.env.example` - required environment-variable names; never commit `.env.local`.
- `README.md` - complete local-development and Vercel deployment instructions.

## Required Vercel setup

Before publishing, configure these in the Vercel dashboard:

1. Add `GEMINI_API_KEY` with the server-only Google AI Studio key.
2. Add `NEXT_PUBLIC_SITE_URL` with the final production URL, for example `https://your-portfolio.vercel.app` or your custom domain.
3. Enable **Web Analytics**, then redeploy. The site loads Vercel Insights only in the Vercel environment and does not send AI-question content as custom analytics events.
4. In **Firewall**, publish a rule for `POST /api/ask`:
   - action: **Rate Limit**;
   - strategy: **Fixed Window**;
   - key: **IP**;
   - limit: **5 requests per 10 minutes**;
   - response: default **429**.

The client already recognizes a `429` response, including a non-JSON WAF response, and presents a bilingual wait message.

## Launch checklist

- Confirm all details and links in `data/profile.ts` are accurate.
- Deploy to Vercel and set the two environment variables above.
- Test the live LinkedIn and email links, language toggle, each portfolio button, an AI success response, missing-key response, and rate-limit message.
- Open `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, and check the shared-link preview in LinkedIn.
- Ensure the AI privacy note is visible and that no visitor provides sensitive information in the AI field.
