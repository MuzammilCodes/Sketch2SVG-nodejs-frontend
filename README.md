# Sketch2SVG — Node.js SSR

A server-rendered Node.js web app (Next.js 14 App Router) that converts raster images
(PNG, JPG, BMP, GIF, WebP) and hand-drawn sketches into clean SVG.

This version is a rewrite of the original React + Vite SPA, optimized for
**search engine crawlability** via full SSR, per-route metadata, structured data
(JSON-LD), and a Node-driven sitemap + robots.

## Features

- **Full SSR**: every route returns fully-rendered HTML on first request.
- **Per-page SEO**: `metadata` API drives `<title>`, description, canonical, Open Graph and Twitter cards on every page.
- **Structured data**: `WebSite`, `Article`, and `FAQPage` JSON-LD emitted server-side.
- **Dynamic sitemap & robots** via `app/sitemap.js` and `app/robots.js`.
- **Google Fonts via `next/font`** — zero layout shift, no render-blocking CSS.
- **CSS Modules** preserved from the original design.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000.

## Build & run in production

```bash
npm run build
npm start
```

Any Node.js host (Render, Railway, Fly.io, a plain VPS, etc.) will serve the
SSR output. For Vercel deployment, push the repo and import it — no extra config needed.

## Environment variables

| Variable                   | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Public canonical site URL (used in metadata + sitemap)   |
| `NEXT_PUBLIC_API_URL`      | Backend endpoint for `/convert` image-to-SVG requests    |
| `NEXT_PUBLIC_GA_ID`        | Google Analytics measurement ID (optional)               |

## Routes

| Route                              | Type                | Notes                                     |
| ---------------------------------- | ------------------- | ----------------------------------------- |
| `/`                                | SSR + client hydrate | Converter UI                              |
| `/blog/sketch-to-svg-guide`        | SSR (static)        | Long-form guide                           |
| `/blog/image-to-svg-guide`         | SSR (static)        | Long-form guide                           |
| `/blog/svg-vs-png`                 | SSR (static)        | Comparison guide                          |
| `/sitemap.xml`                     | Generated           | From `app/sitemap.js`                     |
| `/robots.txt`                      | Generated           | From `app/robots.js`                      |
