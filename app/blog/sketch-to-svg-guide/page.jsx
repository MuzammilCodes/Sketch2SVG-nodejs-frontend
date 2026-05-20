import Header from "../../components/Header";
import s from "../Blog.module.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sketch2svg.netlify.app";
const PATH = "/blog/sketch-to-svg-guide";

const TITLE = "Convert Image or Sketch to SVG Online (Free Tool Guide)";
const DESCRIPTION =
  "Learn how to convert image sketch to SVG using a fast and free online tool. Improve quality and scalability.";
const KEYWORDS =
  "image sketch to svg, convert image to svg, sketch image to svg online, svg converter tool";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faq = [
  {
    "@type": "Question",
    name: "What is SVG and why is it important?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "SVG is a vector format that scales without losing quality and is ideal for web graphics.",
    },
  },
  {
    "@type": "Question",
    name: "Why convert designs to SVG?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "SVG files are lightweight, scalable, and perfect for responsive web applications.",
    },
  },
  {
    "@type": "Question",
    name: "Can I convert a hand-drawn sketch to SVG?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Photograph or scan your sketch on a clean white background, then upload it to Sketch2SVG. The tool traces the lines and shapes into clean vector paths automatically.",
    },
  },
  {
    "@type": "Question",
    name: "What image formats does Sketch2SVG accept?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Sketch2SVG accepts PNG, JPG, GIF, and WebP. For best results, use PNG with a transparent or white background.",
    },
  },
  {
    "@type": "Question",
    name: "Is the SVG output ready to use in code?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Sketch2SVG produces optimized, production-ready SVG that can be dropped directly into HTML, React, or any design tool.",
    },
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PATH}` },
  author: { "@type": "Person", name: "Mohammed Muzammil Uddin" },
  publisher: { "@type": "Organization", name: "Sketch2SVG" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq,
};

export default function SketchToSvgGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0px 28px 60px" }}>
        <Header />
      </div>
      <div className={s.blogContainer}>
        <div className={s.hero}>
          <div className={s.heroMeta}>
            <span className={s.tag}>Guide</span>
            <span className={s.readTime}>7 min read</span>
          </div>
          <h1 className={s.heroTitle}>Sketch to SVG: Complete Guide for Developers</h1>
          <p className={s.heroSubtitle}>
            Converting designs and sketches into SVG is one of the best ways to build fast,
            scalable web applications. Learn the full process — from what SVG is to how to
            get production-ready output in seconds.
          </p>
        </div>

        <div className={s.topCta}>
          <div className={s.topCtaText}>
            <strong>Want to convert a sketch to SVG right now?</strong>
            Upload any image or hand-drawn sketch and get clean SVG output instantly — no account needed.
          </div>
          <a href="/" className={s.ctaBtn}>Try Sketch2SVG free →</a>
        </div>

        <div className={s.tocBox}>
          <p className={s.tocLabel}>In this guide</p>
          <ul className={s.tocList}>
            <li><a href="#what-is-svg">What is SVG?</a></li>
            <li><a href="#why-use-svg">Why use SVG?</a></li>
            <li><a href="#how-conversion-works">How conversion works</a></li>
            <li><a href="#sketch-to-svg">Converting hand-drawn sketches</a></li>
            <li><a href="#how-tool-helps">How Sketch2SVG helps</a></li>
            <li><a href="#use-cases">Use cases</a></li>
            <li><a href="#seo">SEO benefits</a></li>
            <li><a href="#tips">Tips for better output</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>

        <section id="what-is-svg">
          <h2>What is SVG?</h2>
          <p>
            SVG (Scalable Vector Graphics) is an XML-based vector image format defined by
            the W3C. Rather than storing images as a fixed grid of pixels like PNG or JPG,
            SVG describes images using mathematical paths, shapes, and coordinates.
          </p>
          <p>
            The practical result: an SVG file renders perfectly at any size — from a 16px
            favicon to a full-screen billboard — using the exact same file. No blurriness,
            no pixelation, ever.
          </p>
          <div className={s.callout}>
            <span className={s.calloutIcon}>💡</span>
            <span>SVG is plain text XML. Open any SVG in a code editor and you&apos;ll see readable markup — something impossible with PNG or JPG.</span>
          </div>
        </section>

        <section id="why-use-svg">
          <h2>Why Use SVG?</h2>
          <p>
            SVG has become the default format for icons, logos, and UI graphics in modern
            web development. Here&apos;s why:
          </p>
          <ul>
            <li><strong>Infinite scalability</strong> — sharp at any resolution, no retina variants needed</li>
            <li><strong>Small file size</strong> — simple icons are often 80–90% smaller than PNG equivalents</li>
            <li><strong>CSS styleable</strong> — change colors, sizes, and strokes directly in your stylesheet</li>
            <li><strong>JavaScript animatable</strong> — build loaders, transitions, and interactive graphics</li>
            <li><strong>Inline-ready</strong> — embed directly in HTML or JSX, zero extra network requests</li>
            <li><strong>Accessible</strong> — native support for <code>&lt;title&gt;</code> and <code>&lt;desc&gt;</code> tags for screen readers</li>
            <li><strong>SEO-friendly</strong> — faster pages from smaller assets improve Core Web Vitals rankings</li>
          </ul>

          <div className={s.statRow}>
            <div className={s.statCard}>
              <span className={s.statNum}>∞</span>
              <span className={s.statLabel}>Max scale without any quality loss</span>
            </div>
            <div className={s.statCard}>
              <span className={s.statNum}>~80%</span>
              <span className={s.statLabel}>Average file size reduction vs PNG for icons</span>
            </div>
            <div className={s.statCard}>
              <span className={s.statNum}>0ms</span>
              <span className={s.statLabel}>Extra load time when SVG is inlined in HTML</span>
            </div>
          </div>
        </section>

        <section id="how-conversion-works">
          <h2>How Conversion Works</h2>
          <p>
            Converting a raster image to SVG is called <strong>vectorization</strong>. The
            process analyzes your pixel data and reconstructs it as vector paths.
          </p>
          <h3>Step 1: Edge detection</h3>
          <p>
            The converter scans the image for boundaries between color regions. High-contrast
            images — like a dark logo on a white background — produce the cleanest results.
          </p>
          <h3>Step 2: Path tracing</h3>
          <p>
            Each detected region is traced into a closed vector path using bezier curves.
            The algorithm simplifies these paths by reducing point count while preserving
            visual accuracy.
          </p>
          <h3>Step 3: Color assignment</h3>
          <p>
            Each path is filled with the dominant color from the corresponding pixel region.
            Better converters use color quantization to keep the palette minimal and the
            output clean.
          </p>
          <h3>Step 4: Optimization</h3>
          <p>
            Redundant nodes are removed, coordinates are rounded, and editor metadata is
            stripped. This reduces file size without any visible change to the output.
          </p>
          <div className={s.callout}>
            <span className={s.calloutIcon}>⚡</span>
            <span>The cleaner your source image, the cleaner the SVG. A crisp PNG on a white background will always outperform a blurry JPEG on a textured background.</span>
          </div>
        </section>

        <section id="sketch-to-svg">
          <h2>Converting Hand-Drawn Sketches</h2>
          <p>
            One of the most powerful use cases for Sketch2SVG is turning physical, hand-drawn
            artwork into clean digital vector files. This workflow is popular with designers
            who prefer sketching by hand before moving to digital tools.
          </p>
          <h3>How to prepare your sketch</h3>
          <ul>
            <li><strong>Use a white background</strong> — plain white paper works perfectly</li>
            <li><strong>Draw with a dark pen</strong> — high contrast between ink and paper improves tracing accuracy</li>
            <li><strong>Photograph in good lighting</strong> — natural daylight or a bright lamp, avoid harsh shadows</li>
            <li><strong>Shoot straight on</strong> — angle distortion makes path tracing less accurate</li>
            <li><strong>Crop tightly</strong> — remove excess blank space before uploading</li>
          </ul>
          <h3>What to expect</h3>
          <p>
            Simple line drawings, logos, and icons convert very well. Complex shaded
            illustrations with many tones may need manual cleanup in Figma or Inkscape
            after conversion — but the bulk of the work is done automatically.
          </p>
        </section>

        <div className={s.midCta}>
          <div className={s.midCtaText}>
            <strong>Try it with your own sketch</strong>
            Upload a photo of any hand-drawn sketch and see the vector output instantly.
          </div>
          <a href="/" className={s.ctaBtnOutline}>Open the converter</a>
        </div>

        <section id="how-tool-helps">
          <h2>How Sketch2SVG Helps</h2>
          <p>
            Sketch2SVG handles the entire vectorization pipeline in your browser — no
            software to install, no command line, no account required. Upload your image,
            get your SVG.
          </p>
          <ul>
            <li><strong>Automatic optimization</strong> — output is already cleaned and compressed</li>
            <li><strong>Production-ready output</strong> — drop the file directly into your codebase or design tool</li>
            <li><strong>Works with any raster input</strong> — PNG, JPG, GIF, WebP, and scanned sketches</li>
            <li><strong>No watermarks</strong> — your output is yours, completely clean</li>
            <li><strong>Fast</strong> — most conversions complete in under 5 seconds</li>
          </ul>
          <div className={s.callout}>
            <span className={s.calloutIcon}>🛠️</span>
            <span>Instead of exporting from Illustrator, running SVGO, and manually cleaning paths — Sketch2SVG does all of that in a single step.</span>
          </div>
        </section>

        <section id="use-cases">
          <h2>Use Cases</h2>
          <p>SVG conversion is useful across a wide range of design and development workflows:</p>

          <div className={s.comparisonTable}>
            <div className={s.comparisonHeader}>
              <span>Use case</span>
              <span className={s.colSvg}>What you upload</span>
              <span className={s.colPng}>What you get</span>
            </div>
            {[
              ["App icons", "PNG icon export", "Scalable SVG for all screen sizes"],
              ["Brand logo", "JPG or PNG logo", "Vector logo for web and print"],
              ["Hand-drawn art", "Photo of sketch on paper", "Clean editable vector paths"],
              ["UI components", "Figma screenshot or export", "Inline-ready SVG for React"],
              ["Illustrations", "Flat-style PNG illustration", "Lightweight scalable SVG"],
              ["Animations", "Static icon PNG", "SVG base ready for CSS animation"],
            ].map(([usecase, input, output]) => (
              <div className={s.comparisonRow} key={usecase}>
                <span className={s.comparisonFeature}>{usecase}</span>
                <span className={s.comparisonSvg}>{input}</span>
                <span className={s.comparisonPng}>{output}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="seo">
          <h2>SEO Benefits of SVG</h2>
          <p>
            Switching from PNG to SVG for your UI graphics is one of the easiest performance
            improvements available — and performance directly affects search rankings.
          </p>
          <ul>
            <li><strong>Faster page loads</strong> — smaller SVG files reduce total page weight</li>
            <li><strong>Better Core Web Vitals</strong> — LCP and TBT scores improve with lighter assets</li>
            <li><strong>No extra retina assets</strong> — one SVG replaces <code>@1x</code>, <code>@2x</code>, and <code>@3x</code> PNGs</li>
            <li><strong>Inline SVG = zero HTTP requests</strong> — embed in HTML to eliminate image fetches entirely</li>
            <li><strong>Accessible markup</strong> — <code>&lt;title&gt;</code> inside SVG gives crawlers and screen readers context</li>
          </ul>
          <div className={s.callout}>
            <span className={s.calloutIcon}>📈</span>
            <span>Replacing your header logo and nav icons with SVG can improve your Lighthouse performance score by 5–15 points on a typical site.</span>
          </div>
        </section>

        <section id="tips">
          <h2>Tips for Better SVG Output</h2>
          <ul>
            <li><strong>Use transparent PNG backgrounds</strong> when possible — avoids white fill paths in output</li>
            <li><strong>Keep images simple</strong> — fewer colors and shapes = cleaner, smaller SVG</li>
            <li><strong>Avoid JPEG for source files</strong> — JPEG compression artifacts create noisy paths</li>
            <li><strong>Crop tightly before uploading</strong> — blank space adds unnecessary paths</li>
            <li><strong>Post-process with SVGOMG</strong> — for extra size reduction after conversion</li>
            <li><strong>Test at multiple sizes</strong> — open your SVG in browser and zoom in to verify quality</li>
          </ul>
        </section>

        <section id="faqs">
          <h2>FAQs</h2>
          <div className={s.faqList}>
            {[
              {
                q: "What is SVG and why is it important?",
                a: "SVG is a vector image format based on XML. Unlike PNG or JPG, SVG scales to any size without losing quality. It's the standard format for icons, logos, and UI graphics in modern web development because it's small, styleable, and works on every screen resolution.",
              },
              {
                q: "Why convert designs to SVG?",
                a: "SVG files are significantly smaller than raster equivalents for simple graphics, load faster, and look sharp on any device. They can also be styled with CSS and animated with JavaScript — making them far more flexible than PNG or JPG for web use.",
              },
              {
                q: "Can I convert a hand-drawn sketch to SVG?",
                a: "Yes. Photograph your sketch on a clean white background in good lighting, then upload it to Sketch2SVG. The tool traces your lines and shapes into vector paths automatically. Works best with high-contrast pen or marker drawings.",
              },
              {
                q: "What image formats does Sketch2SVG accept?",
                a: "Sketch2SVG accepts PNG, JPG, GIF, and WebP. For best results use PNG with a transparent or clean white background, and avoid heavily compressed JPEG files which introduce tracing artifacts.",
              },
              {
                q: "Is the SVG output ready to use in code?",
                a: "Yes. Sketch2SVG produces optimized, production-ready SVG. You can paste it directly into HTML, use it as a React component, or open it in Figma or Illustrator for further editing.",
              },
            ].map(({ q, a }) => (
              <div className={s.faqItem} key={q}>
                <h3 className={s.faqQ}>{q}</h3>
                <p className={s.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={s.bottomCta}>
          <h3>Convert your sketch to SVG now</h3>
          <p>Free, instant, no sign-up required. Upload once, download clean vector code.</p>
          <a href="/" className={s.ctaBtn}>Go to Sketch2SVG →</a>
        </div>
      </div>
    </>
  );
}
