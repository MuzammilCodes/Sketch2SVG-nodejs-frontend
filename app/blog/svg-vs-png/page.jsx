import Link from "next/link";
import ArticleLayout from "../ArticleLayout";
import s from "../Blog.module.css";
import { SITE_URL } from "../../../lib/site";

const TITLE = "SVG vs PNG: Differences, Uses and When to Choose Each";
const DESCRIPTION = "Compare SVG and PNG image formats, understand vector and raster graphics, and choose the right format for logos, icons, illustrations and photographs.";
const PATH = "/blog/svg-vs-png";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "article", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const toc = [
  ["svg", "What is SVG?"],
  ["png", "What is PNG?"],
  ["comparison", "SVG vs PNG comparison"],
  ["choose-svg", "When to choose SVG"],
  ["choose-png", "When to choose PNG"],
  ["convert", "Can PNG be converted to SVG?"],
  ["seo", "Image formats and website SEO"],
];

export default function SvgVsPngGuide() {
  return (
    <ArticleLayout title={TITLE} description={DESCRIPTION} path={PATH} readTime={5} toc={toc}>
      <section id="svg">
        <h2>What is SVG?</h2>
        <p>SVG (Scalable Vector Graphics) is an XML-based format that describes graphics using paths, shapes, fills and other vector elements. A browser can render an SVG at different sizes without the pixel enlargement blur associated with a small raster image.</p>
        <p>SVG is commonly used for logos, icons, diagrams and illustrations. SVG files can also contain embedded raster images, so the file extension alone does not guarantee that every part of an SVG is vector artwork.</p>
      </section>
      <section id="png">
        <h2>What is PNG?</h2>
        <p>PNG (Portable Network Graphics) is a raster format that stores image data as pixels. It uses lossless compression and supports transparency, making it useful for screenshots, interface assets and images where preserving pixel detail matters.</p>
      </section>
      <section id="comparison">
        <h2>SVG vs PNG: key differences</h2>
        <div className={s.comparisonTable}>
          <div className={s.comparisonHeader}><span>Feature</span><span className={s.colSvg}>SVG</span><span className={s.colPng}>PNG</span></div>
          {[
            ["Image model", "Vector elements", "Pixel grid"],
            ["Scaling", "Paths stay sharp when scaled", "Can pixelate when enlarged"],
            ["Transparency", "Supported", "Supported"],
            ["Typical strengths", "Logos, icons, diagrams", "Screenshots, photos, detailed images"],
            ["Editing", "Paths and shapes can be edited", "Pixels are edited"],
            ["File size", "Often compact for simple graphics", "Depends on dimensions and image detail"],
          ].map(([feature, svg, png]) => <div className={s.comparisonRow} key={feature}><span className={s.comparisonFeature}>{feature}</span><span className={s.comparisonSvg}>{svg}</span><span className={s.comparisonPng}>{png}</span></div>)}
        </div>
        <p>Neither format is always smaller. A simple icon may be very compact as SVG, while a detailed or photographic image is often more practical as a compressed raster file.</p>
      </section>
      <section id="choose-svg">
        <h2>When should you choose SVG?</h2>
        <ul>
          <li>Your artwork is made from clear shapes, lines or paths.</li>
          <li>The graphic needs to appear at many sizes.</li>
          <li>You need to recolor or edit individual vector elements.</li>
          <li>You are preparing logos, symbols, icons or diagrams.</li>
        </ul>
      </section>
      <section id="choose-png">
        <h2>When should you choose PNG?</h2>
        <ul>
          <li>The image is a screenshot or contains pixel-level detail.</li>
          <li>The image is photographic or has complex textures and gradients.</li>
          <li>You need lossless raster output with transparency.</li>
          <li>The original appearance matters more than editable vector paths.</li>
        </ul>
      </section>
      <section id="convert">
        <h2>Can you convert PNG to SVG?</h2>
        <p>Yes. A tracing tool can analyse a PNG and approximate its visible regions with vector paths. This process is called vectorization. It is not a lossless format conversion: the SVG is a traced interpretation of the pixels, and fine details may be simplified.</p>
        <p>Simple, high-contrast graphics generally trace more cleanly than photographs. You can <Link href="/">try the Sketch2SVG PNG-to-SVG workflow</Link> with an image and adjust the tracing settings.</p>
      </section>
      <section id="seo">
        <h2>Do SVG and PNG affect website SEO?</h2>
        <p>Choosing an image format does not automatically improve rankings. The useful format is the one that delivers suitable visual quality at an efficient file size. Page performance can contribute to user experience, but an SVG is not inherently faster or better for SEO than a well-optimized PNG or WebP.</p>
        <p>For either format, use descriptive filenames, meaningful alternative text for informative images, appropriate dimensions and compression. Avoid converting photographs to SVG just to change the extension.</p>
      </section>
    </ArticleLayout>
  );
}
