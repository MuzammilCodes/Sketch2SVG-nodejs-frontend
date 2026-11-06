# Sketch2SVG SEO update

This update keeps the existing Next.js 14 App Router SSR application and preserves the browser converter and its separate conversion API.

## Before deploying

1. Keep `NEXT_PUBLIC_SITE_URL=https://sketch2svg.netlify.app` until the custom domain has been purchased, connected to Netlify, and HTTPS is active.
2. Keep `NEXT_PUBLIC_API_URL` pointed at the existing Node.js conversion API. Do not change the `/convert` API contract as part of this SEO update.
3. Set `NEXT_PUBLIC_GA_ID` only if you want Google Analytics enabled.
4. Add the environment variables in the Netlify production environment and trigger a fresh deploy. These are `NEXT_PUBLIC_` variables, so they are included in the client build; never put API secrets in them.
5. Verify `/robots.txt` and `/sitemap.xml` after deployment.

## Custom domain migration (when purchased)

1. Connect the domain in Netlify and wait until HTTPS is provisioned.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, without a trailing slash (for example `https://example.com`).
3. Redeploy so canonical URLs, Open Graph URLs, JSON-LD and sitemap URLs use the new domain.
4. In Google Search Console, add and verify the new domain/property, submit `https://example.com/sitemap.xml`, and monitor indexing.
5. Keep the old Netlify hostname available and configure a permanent host-level redirect to the custom domain if Netlify's domain configuration supports it. Do not create conflicting redirect chains.

## URL change

`/blog/sketch-to-svg-guide` is permanently redirected (308 via Next.js `permanent: true`) to `/blog/image-to-vector-guide`. The new URL is in the sitemap and navigation. If the old URL has already been indexed, keep this redirect in place.

## Files changed

- `lib/site.js`: shared site URL and safe JSON-LD serialization helpers.
- `app/layout.jsx`: global metadata, canonical base, Organization/WebSite JSON-LD and analytics initialization.
- `app/page.jsx`: homepage metadata and WebApplication structured data.
- `app/Converter.jsx`: homepage H1 and crawlable image-to-SVG explanatory content; converter request and settings remain unchanged.
- `app/components/Header.jsx`: accessible brand link and relevant internal navigation.
- `app/components/HomeSeo.module.css`: styling for the new homepage explanatory content.
- `app/blog/ArticleLayout.jsx`: shared server-rendered article shell and Article JSON-LD.
- `app/blog/image-to-svg-guide/page.jsx`: rewritten general image-to-SVG guide.
- `app/blog/image-to-vector-guide/page.jsx`: new general image-to-vector guide.
- `app/blog/svg-vs-png/page.jsx`: rewritten SVG vs PNG article with more accurate format and SEO explanations.
- `app/best-free-svg-converter-2027/page.jsx`: new 2027 landing/article targeting free SVG converter and image-to-SVG search intent.
- `app/blog/Blog.module.css`: responsive article layout additions.
- `app/sitemap.js`: canonical public URLs and stable modification date; includes the new 2027 page.
- `app/components/Header.jsx`: navigation includes the new 2027 page.
- `app/robots.js`: crawl allowance and sitemap declaration.
- `next.config.mjs`: permanent redirect from the old sketch-focused blog URL.
- `.env.example`: safe deployment variable template.

## Validation note

The source files were reviewed and the converter component's upload, settings, API endpoint, and download flow were intentionally left intact. A full `next build` could not be completed in this environment because dependency installation (`npm ci`) timed out. Run `npm ci` and `npm run build` locally or in Netlify before publishing.

## Dependency security warning

The supplied `package.json` still pins Next.js `14.2.5`. This is not changed in this SEO-content update because a framework major-version migration should be handled and tested separately. Current Next.js security guidance published in May 2026 states that all Next.js 14.x versions should move to a patched Next.js 15.5.18 or 16.2.6 release. Treat the reported critical npm audit finding as a release blocker: do not deploy this dependency set publicly until the framework and related React/ESLint packages have been upgraded and `npm audit` and `npm run build` have been reviewed. See https://vercel.com/changelog/next-js-may-2026-security-release.

Do not run `npm audit fix --force` blindly. First run `npm audit` and retain the full report. Then plan the Next.js/React upgrade, update the lockfile using `npm install`, run the build and test the converter end-to-end against the separate API. The deprecation warnings are not build failures by themselves; the vulnerability report is the security concern.
