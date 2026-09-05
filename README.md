# FETLAB.org

The FETLAB (Future & Emerging Technology Laboratory) website — a multidisciplinary research, innovation, and collaboration platform.

## Stack

- **Next.js** (App Router) + Tailwind CSS + shadcn/ui
- **Sanity** — content management (Studio embedded at `/studio`)
- **next-intl** — i18n (English, বাংলা, Svenska)
- **next-themes** — light/dark mode with system detection
- Deploys to **Cloudflare Workers** via the OpenNext adapter

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` and fill in your Sanity project ID to connect real content (research groups, people, notices, blog posts). Without it, the site falls back to placeholder content.

## Content

Manage all content at `/studio`: Site Settings, Research Groups, People, Notices (vacancies/calls/announcements), and Blog Posts.

## Deploying to Cloudflare Workers

```bash
npm run deploy
```

Requires `wrangler login` once, and `NEXT_PUBLIC_SANITY_PROJECT_ID` set as a var/secret in `wrangler.jsonc` or the Cloudflare dashboard.
