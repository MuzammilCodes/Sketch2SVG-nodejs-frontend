import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import s from "./Blog.module.css";
import { SITE_NAME, absoluteUrl, jsonLdString } from "../../lib/site";

/** Shared shell for the About, Privacy, Disclaimer, Terms and Changelog pages. */
export default function InfoPage({ title, description, path, label, updated, children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    dateModified: updated,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className={s.siteHeader}><PageHeader /></div>
      <article className={s.blogContainer}>
        <header className={s.hero}>
          <div className={s.heroMeta}>
            <span className={s.tag}>{label}</span>
            <span className={s.readTime}>Last updated {updated}</span>
          </div>
          <h1 className={s.heroTitle}>{title}</h1>
          <p className={s.heroSubtitle}>{description}</p>
        </header>
        {children}
      </article>
      <PageFooter />
    </>
  );
}
