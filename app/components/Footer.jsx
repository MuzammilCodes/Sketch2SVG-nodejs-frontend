import Link from "next/link";
import f from "./Footer.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, localePath } from "../../lib/i18n";
import { SITE_NAME } from "../../lib/site";
import { IMAGE_TO_SVG_PATH as BASE } from "../../lib/converters";

export default function Footer({ locale = "en" }) {
  const t = getDictionary(locale);
  const ft = t.footer;
  const home = localePath(locale);

  const tagLinks = [
    `${BASE}/blog/image-to-svg-guide`,
    `${BASE}/blog/image-to-vector-guide`,
    `${BASE}/blog/svg-vs-png`,
    `${BASE}/best-free-svg-converter-2027`,
    `${home}#use-cases`,
    `${home}#embed`,
  ];

  return (
    <footer className={f.footer}>
      <div className={f.inner}>
        <div className={f.top}>
          <div className={f.brand}>
            <span className={f.logo}>
              Image<span>2</span>SVG
            </span>
            <p className={f.tagline}>{ft.tagline}</p>
            <LanguageSwitcher current={locale} label={ft.languageH} full />
          </div>

          <nav className={f.col} aria-label={ft.toolH}>
            <h2>{ft.toolH}</h2>
            <ul>
              <li><Link href={home}>{ft.tool.converter}</Link></li>
              <li><Link href={`${home}#gallery`}>{ft.tool.gallery}</Link></li>
              <li><Link href={`${home}#use-cases`}>{ft.tool.useCases}</Link></li>
              <li><Link href={`${home}#embed`}>{ft.tool.embed}</Link></li>
              <li><Link href="/changelog">{ft.tool.changelog}</Link></li>
            </ul>
          </nav>

          <nav className={f.col} aria-label={ft.guidesH}>
            <h2>{ft.guidesH}</h2>
            <ul>
              <li><Link href={`${BASE}/best-free-svg-converter-2027`}>{t.nav.best}</Link></li>
              <li><Link href={`${BASE}/blog/image-to-svg-guide`}>{t.nav.guide}</Link></li>
              <li><Link href={`${BASE}/blog/image-to-vector-guide`}>{t.nav.vector}</Link></li>
              <li><Link href={`${BASE}/blog/svg-vs-png`}>{t.nav.svgPng}</Link></li>
            </ul>
          </nav>

          <nav className={f.col} aria-label={ft.companyH}>
            <h2>{ft.companyH}</h2>
            <ul>
              <li><Link href="/about">{ft.company.about}</Link></li>
              <li><Link href="/privacy-policy">{ft.company.privacy}</Link></li>
              <li><Link href="/disclaimer">{ft.company.disclaimer}</Link></li>
              <li><Link href="/terms">{ft.company.terms}</Link></li>
            </ul>
          </nav>
        </div>

        <div className={f.tags}>
          <h2>{ft.tagsH}</h2>
          <ul>
            {ft.tags.map((label, i) => (
              <li key={label}>
                <Link href={tagLinks[i]}>#{label.replace(/\s+/g, "-")}</Link>
              </li>
            ))}
          </ul>
        </div>

        <p className={f.disclaimer}>{ft.disclaimer}</p>

        <div className={f.bottom}>
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. {ft.rights}
          </span>
          {ft.englishNote && <span>{ft.englishNote}</span>}
        </div>
      </div>
    </footer>
  );
}
