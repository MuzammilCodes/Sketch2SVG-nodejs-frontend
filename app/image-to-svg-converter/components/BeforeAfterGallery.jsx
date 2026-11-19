import c from "./Sections.module.css";

export default function BeforeAfterGallery({ t }) {
  return (
    <section id="gallery" className={c.section} aria-labelledby="gallery-title">
      <p className={c.eyebrow}>{t.eyebrow}</p>
      <h2 id="gallery-title" className={c.title}>{t.title}</h2>
      <p className={c.lead}>{t.lead}</p>

      <div className={c.compare}>
        <figure className={c.side}>
          <figcaption className={c.sideHead}>
            <strong>{t.before}</strong>
            <span>{t.beforeMeta}</span>
          </figcaption>
          <div className={`${c.frame} ${c.frameBefore}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/turtle-before.png" alt={t.beforeAlt} width={350} height={350} loading="lazy" decoding="async" />
          </div>
        </figure>

        <div className={c.arrow} aria-hidden="true">
          <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path className={c.arrowDots} d="M4 20H96" strokeDasharray="0.1 9" />
            <path d="M94 9l15 11-15 11" strokeDasharray="0.1 7" />
          </svg>
        </div>

        <figure className={`${c.side} ${c.sideAfter}`}>
          <figcaption className={c.sideHead}>
            <strong>{t.after}</strong>
            <span>{t.afterMeta}</span>
          </figcaption>
          <div className={`${c.frame} ${c.frameAfter}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/turtle-after.svg" alt={t.afterAlt} width={350} height={350} loading="lazy" decoding="async" />
          </div>
        </figure>
      </div>

      <p className={c.note}>{t.caption}</p>
    </section>
  );
}
