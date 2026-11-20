import c from "./Sections.module.css";
import { GALLERY_IMAGES } from "../../../lib/site";

export default function BeforeAfterGallery({ t }) {
  return (
    <section id="gallery" className={c.section} aria-labelledby="gallery-title">
      <p className={c.eyebrow}>{t.eyebrow}</p>
      <h2 id="gallery-title" className={c.title}>{t.title}</h2>
      <p className={c.lead}>{t.lead}</p>

      {GALLERY_IMAGES.map((img) => (
        <figure key={img.path} className={c.compareFigure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.path}
            alt={t[img.altKey]}
            title={t[img.titleKey]}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}

      <p className={c.note}>{t.caption}</p>
    </section>
  );
}
