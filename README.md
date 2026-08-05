# Dawid Kubiak - Terminal Portfolio

A bilingual (English/Polish) Next.js portfolio with local portfolio navigation and an optional Gemini AI assistant.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local`, then add `GEMINI_API_KEY` to enable AI responses locally. The site runs without a key, but the assistant will explain that it is not configured.

## Profile content

Edit `data/profile.ts` to update the English and Polish profile content. It is the only source of facts that Gemini receives.

The lower buttons show portfolio sections. The text field is exclusively for natural-language questions to the AI; no `ask` command is needed.

## Deploy to Vercel

1. Push the project to a Git repository and import it in [Vercel](https://vercel.com/new).
2. Add `GEMINI_API_KEY` and `NEXT_PUBLIC_SITE_URL` to Vercel Environment Variables. Use the final Vercel or custom-domain URL for `NEXT_PUBLIC_SITE_URL`.
3. Enable Web Analytics in the Vercel project dashboard, then redeploy.
4. In **Firewall**, create and publish a rate-limit rule:
   - condition: request path is `/api/ask` and method is `POST`;
   - action: **Rate Limit**, **Fixed Window**, keyed by **IP**;
   - limit: **5 requests** per **10 minutes**;
   - response: default `429`.
5. Check `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, the LinkedIn preview, and one AI question on the production URL.

## Privacy

Vercel Analytics measures anonymous visits. This project does not send AI questions to analytics or store them. Questions are sent only to the configured Gemini API to generate a response; visitors should not enter sensitive personal information.
