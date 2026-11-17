import Link from "next/link";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import s from "./Blog.module.css";
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLdString } from "../../lib/site";

const GUIDES = [
  ["/best-free-svg-converter-2027", "Best Free SVG Converter 2027", "What to look for in a free image-to-SVG converter."],
  ["/blog/image-to-svg-guide", "Image to SVG Guide", "Step-by-step guide to converting PNG and JPG images to SVG."],
  ["/blog/image-to-vector-guide", "Image to Vector Guide", "How raster-to-vector tracing works and how to get cleaner paths."],
  ["/blog/svg-vs-png", "SVG vs PNG", "Differences between vector and raster formats and when to use each."],
];

export default function ArticleLayout({ title, description, path, readTime, toc, children }) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    datePublished: "2026-11-06",
    dateModified: "2026-11-06",
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }} />
      <div className={s.siteHeader}><PageHeader /></div>
      <article className={s.blogContainer}>
        <header className={s.hero}>
          <div className={s.heroMeta}><span className={s.tag}>Guide</span><span className={s.readTime}>{readTime} min read</span></div>
          <h1 className={s.heroTitle}>{title}</h1>
          <p className={s.heroSubtitle}>{description}</p>
        </header>
        <aside className={s.topCta} aria-label="Try the image to SVG converter">
          <div className={s.topCtaText}>
            <strong>Ready to convert an image to SVG?</strong>
            Upload a supported image, adjust the tracing controls and download the resulting SVG.
          </div>
          <Link href="/" className={s.ctaBtn}>Open free converter →</Link>
        </aside>
        <nav className={s.tocBox} aria-label="Article contents">
          <p className={s.tocLabel}>In this guide</p>
          <ul className={s.tocList}>{toc.map(([id, label]) => <li key={id}><Link href={`#${id}`}>{label}</Link></li>)}</ul>
        </nav>
        {children}
        <nav className={s.relatedBox} aria-label="Related guides">
          <h2>Related guides</h2>
          <ul>
            {GUIDES.filter(([href]) => href !== path).map(([href, label, blurb]) => (
              <li key={href}><Link href={href}>{label}</Link> – {blurb}</li>
            ))}
          </ul>
        </nav>
        <aside className={s.bottomArticleCta}>
          <h2>Try Image2SVG</h2>
          <p>Convert a supported raster image into SVG vector output. The result depends on the image and tracing settings.</p>
          <Link href="/" className={s.ctaBtn}>Convert an image →</Link>
        </aside>
      </article>
      <PageFooter />
    </>
  );
}
