import Link from "next/link";
import s from "../components/Site.module.css";
import seo from "./components/HomeSeo.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Converter from "./Converter";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import UseCases from "./components/UseCases";
import EmbedSnippet from "./components/EmbedSnippet";
import DeveloperCard from "../components/DeveloperCard";
import LocaleSync from "../components/LocaleSync";
import { DEFAULT_LOCALE, getDictionary, localePath } from "../../lib/i18n";
import { SITE_NAME, GALLERY_IMAGES, absoluteUrl, jsonLdString } from "../../lib/site";
import { IMAGE_TO_SVG_PATH as BASE } from "../../lib/converters";

export default function HomeView({ locale = DEFAULT_LOCALE }) {
  const t = getDictionary(locale);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: absoluteUrl(localePath(locale)),
    inLanguage: locale,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with JavaScript enabled.",
    description: t.meta.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
  };

  const imageJsonLd = GALLERY_IMAGES.map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(img.path),
    url: absoluteUrl(img.path),
    name: t.gallery[img.titleKey],
    description: t.gallery[img.altKey],
    caption: t.gallery[img.titleKey],
    encodingFormat: "image/jpeg",
    width: img.width,
    height: img.height,
    inLanguage: locale,
  }));

  return (
    <div lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(softwareJsonLd) }} />
      {imageJsonLd.map((ld) => (
        <script key={ld.url} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      ))}
      <LocaleSync locale={locale} />

      <div className={s.page}>
        <Header locale={locale} />

        <section className={s.hero}>
          <h1 className={s.heroTitle}>{t.hero.title}</h1>
          <p className={s.heroBody}>{t.hero.body}</p>
        </section>

        <Converter t={t.tool} />

        <BeforeAfterGallery t={t.gallery} />
        <UseCases t={t.useCases} />
        <EmbedSnippet t={t.embed} />

        {/* Crawlable explanatory content */}
        <section className={seo.content} aria-labelledby="about-converter">
          <div className={seo.inner}>
            <p className={seo.eyebrow}>{t.seo.eyebrow}</p>
            <h2 id="about-converter">{t.seo.h2}</h2>
            <p className={seo.lead}>{t.seo.lead}</p>

            <div className={seo.grid}>
              <section>
                <h3>{t.seo.formatsH}</h3>
                <p>{t.seo.formatsP}</p>
              </section>
              <section>
                <h3>{t.seo.howH}</h3>
                <ol>
                  {t.seo.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
              <section>
                <h3>{t.seo.goodH}</h3>
                <p>{t.seo.goodP}</p>
              </section>
              <section>
                <h3>{t.seo.rasterH}</h3>
                <p>{t.seo.rasterP}</p>
              </section>
            </div>

            <div className={seo.links}>
              <h3>{t.seo.learnH}</h3>
              <Link href={`${BASE}/blog/image-to-svg-guide`}>{t.seo.links[0]}</Link>
              <Link href={`${BASE}/blog/image-to-vector-guide`}>{t.seo.links[1]}</Link>
              <Link href={`${BASE}/blog/svg-vs-png`}>{t.seo.links[2]}</Link>
            </div>
          </div>
        </section>

        <DeveloperCard eyebrow={t.developer.eyebrow} />
      </div>

      <Footer locale={locale} />
    </div>
  );
}
