import Header from "../../components/Header";
import s from "../Blog.module.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sketch2svg.netlify.app";
const PATH = "/blog/svg-vs-png";

const TITLE = "SVG vs PNG: Which Format is Better for Web?";
const DESCRIPTION =
  "Compare SVG vs PNG and learn which format is best for performance, SEO, and scalability.";
const KEYWORDS = "svg vs png, svg vs jpg, best image format web, svg advantages";

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
    name: "Is SVG better than PNG?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "SVG is better for scalability and performance, while PNG is better for complex images like photos.",
    },
  },
  {
    "@type": "Question",
    name: "When should I use PNG instead of SVG?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Use PNG for detailed images like photographs or images with many colors and gradients.",
    },
  },
  {
    "@type": "Question",
    name: "Does SVG help with SEO?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. SVG files are smaller and improve page load speed, which is a Google ranking factor. They can also include accessible text and title attributes.",
    },
  },
  {
    "@type": "Question",
    name: "Can browsers display SVG natively?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. All modern browsers support SVG natively with no plugins required.",
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

export default function SvgVsPngGuide() {
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
            <span className={s.readTime}>8 min read</span>
          </div>
          <h1 className={s.heroTitle}>SVG vs PNG: Which Format is Better for the Web?</h1>
          <p className={s.heroSubtitle}>
            Choosing the right image format can dramatically improve your site&apos;s performance,
            SEO ranking, and visual quality. Here&apos;s everything you need to know to make the
            right choice every time.
          </p>
        </div>

        <div className={s.topCta}>
          <div className={s.topCtaText}>
            <strong>Want to convert an image to SVG right now?</strong>
            Upload any PNG, JPG, or sketch and get clean SVG output instantly — no account needed.
          </div>
          <a href="/" className={s.ctaBtn}>Try Sketch2SVG free →</a>
        </div>

        <div className={s.tocBox}>
          <p className={s.tocLabel}>In this guide</p>
          <ul className={s.tocList}>
            <li><a href="#what-is-png">What is PNG?</a></li>
            <li><a href="#what-is-svg">What is SVG?</a></li>
            <li><a href="#key-differences">Key differences</a></li>
            <li><a href="#performance">Performance comparison</a></li>
            <li><a href="#when-svg">When to use SVG</a></li>
            <li><a href="#when-png">When to use PNG</a></li>
            <li><a href="#seo">SEO impact</a></li>
            <li><a href="#browser-support">Browser support</a></li>
            <li><a href="#conversion">Converting PNG to SVG</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>

        <section id="what-is-png">
          <h2>What is PNG?</h2>
          <p>
            PNG (Portable Network Graphics) is a <strong>raster image format</strong> — meaning it stores images
            as a grid of pixels. Developed in 1996 as a free alternative to GIF, PNG quickly became
            the go-to format for web graphics requiring transparency.
          </p>
          <p>
            PNG supports lossless compression, which means images retain full quality even after
            saving. This makes it ideal for screenshots, detailed illustrations, and any image where
            pixel-perfect accuracy matters.
          </p>
          <div className={s.callout}>
            <span className={s.calloutIcon}>💡</span>
            <span>PNG files store data as fixed pixels. Scaling them up causes blurriness — this is a hard limitation of the format.</span>
          </div>
        </section>

        <section id="what-is-svg">
          <h2>What is SVG?</h2>
          <p>
            SVG (Scalable Vector Graphics) is an <strong>XML-based vector format</strong> that describes images
            using mathematical paths, shapes, and coordinates — not pixels. This means an SVG
            file is essentially readable code that any browser can render at any size without
            quality loss.
          </p>
          <p>
            SVG was developed by the W3C in 1999 and is now a web standard. Because SVG is
            text-based, it can be embedded directly into HTML, manipulated with CSS, and animated
            with JavaScript — none of which is possible with PNG.
          </p>
          <div className={s.callout}>
            <span className={s.calloutIcon}>💡</span>
            <span>An SVG of your logo will look razor-sharp on a 4K display, a smartwatch, and a billboard — using the exact same file.</span>
          </div>
        </section>

        <section id="key-differences">
          <h2>Key Differences</h2>
          <div className={s.comparisonTable}>
            <div className={s.comparisonHeader}>
              <span></span>
              <span className={s.colSvg}>SVG</span>
              <span className={s.colPng}>PNG</span>
            </div>
            {[
              ["Format type", "Vector (math-based)", "Raster (pixel-based)"],
              ["Scalability", "Infinite, lossless", "Fixed resolution"],
              ["File size (simple graphics)", "Very small", "Larger"],
              ["File size (photos)", "Huge / unusable", "Reasonable"],
              ["Transparency", "Yes", "Yes"],
              ["CSS styling", "Yes", "No"],
              ["JavaScript animation", "Yes", "No"],
              ["Browser support", "All modern browsers", "All browsers"],
              ["Accessibility (alt text, titles)", "Built-in via XML", "Via HTML attribute"],
              ["Best use case", "Icons, logos, UI", "Photos, screenshots"],
            ].map(([feature, svg, png]) => (
              <div className={s.comparisonRow} key={feature}>
                <span className={s.comparisonFeature}>{feature}</span>
                <span className={s.comparisonSvg}>{svg}</span>
                <span className={s.comparisonPng}>{png}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="performance">
          <h2>Performance Comparison</h2>
          <p>
            Performance is one of the biggest reasons developers choose SVG over PNG for UI elements.
            Here&apos;s how they compare in real-world scenarios:
          </p>
          <h3>File Size</h3>
          <p>
            A simple icon as an SVG might be 1–3 KB. The same icon exported as a PNG at 2x
            resolution can easily reach 10–30 KB. Multiply that across 20 icons on a page and
            you&apos;re looking at a significant difference in page weight.
          </p>
          <h3>Rendering Speed</h3>
          <p>
            SVG files are parsed and rendered by the browser&apos;s rendering engine, which is
            extremely fast for simple shapes. PNGs require decoding pixel data, which is
            heavier for large images but faster for highly complex artwork.
          </p>
          <h3>Caching</h3>
          <p>
            Both formats benefit from HTTP caching. However, inline SVG (embedded directly
            in HTML) bypasses the need for a separate network request entirely.
          </p>
          <div className={s.statRow}>
            <div className={s.statCard}>
              <span className={s.statNum}>~80%</span>
              <span className={s.statLabel}>Average file size reduction for icons (SVG vs PNG@2x)</span>
            </div>
            <div className={s.statCard}>
              <span className={s.statNum}>0ms</span>
              <span className={s.statLabel}>Extra network request when SVG is inlined in HTML</span>
            </div>
            <div className={s.statCard}>
              <span className={s.statNum}>∞</span>
              <span className={s.statLabel}>Max scale without quality loss for SVG</span>
            </div>
          </div>
        </section>

        <div className={s.midCta}>
          <div className={s.midCtaText}>
            <strong>See the size difference for yourself</strong>
            Upload your PNG logo or icon and convert it to SVG — compare the file sizes instantly.
          </div>
          <a href="/" className={s.ctaBtnOutline}>Open the converter</a>
        </div>

        <section id="when-svg">
          <h2>When to Use SVG</h2>
          <p>SVG is the right choice whenever your image:</p>
          <ul>
            <li><strong>Is made of shapes, paths, or text</strong> — logos, icons, diagrams, charts</li>
            <li><strong>Needs to scale across device sizes</strong> — responsive design, retina displays</li>
            <li><strong>Will be styled or animated</strong> — hover effects, loading spinners, transitions</li>
            <li><strong>Is part of your brand UI</strong> — buttons, navigation icons, illustrations</li>
            <li><strong>Needs to be accessible</strong> — SVG supports <code>&lt;title&gt;</code> and <code>&lt;desc&gt;</code> for screen readers</li>
            <li><strong>Is used inline in code</strong> — React components, HTML templates</li>
          </ul>
        </section>

        <section id="when-png">
          <h2>When to Use PNG</h2>
          <p>PNG remains the better choice when:</p>
          <ul>
            <li><strong>Your image is photographic</strong> — SVG cannot represent photos efficiently</li>
            <li><strong>You have complex gradients and millions of colors</strong> — PNG handles these better</li>
            <li><strong>You need pixel-perfect screenshots</strong> — UI mockups, browser captures</li>
            <li><strong>The source is raster artwork</strong> — digital paintings, scanned drawings</li>
            <li><strong>You&apos;re supporting very old software</strong> — some legacy tools don&apos;t handle SVG</li>
          </ul>
        </section>

        <section id="seo">
          <h2>SEO Impact</h2>
          <p>
            Image format choice has a measurable effect on SEO. Google uses page speed as a
            direct ranking signal, and image files are often the largest assets on a page.
          </p>
          <h3>How SVG helps SEO</h3>
          <ul>
            <li>Smaller files = faster page loads = better Core Web Vitals scores</li>
            <li>SVG content (text inside paths) can be indexed by search engines</li>
            <li>Inline SVG eliminates render-blocking image requests</li>
            <li>SVG supports semantic accessibility attributes natively</li>
          </ul>
          <h3>PNG and SEO</h3>
          <p>
            PNG isn&apos;t bad for SEO, but large PNG files are a common cause of poor Largest
            Contentful Paint (LCP) scores. Always compress PNGs with tools like TinyPNG or
            Squoosh before deploying. For logos and icons, replacing PNG with SVG is one of
            the easiest performance wins available.
          </p>
        </section>

        <section id="browser-support">
          <h2>Browser Support</h2>
          <p>
            SVG has full support across all modern browsers — Chrome, Firefox, Safari, Edge,
            and Opera. It has been reliably supported since 2011. PNG has universal support
            across every browser ever made.
          </p>
          <p>
            For practical purposes, browser support is a non-issue for both formats in 2024.
            If you&apos;re building for IE8 or older (which you shouldn&apos;t be), PNG would be safer —
            but that&apos;s an edge case you can safely ignore.
          </p>
        </section>

        <section id="conversion">
          <h2>Converting PNG to SVG</h2>
          <p>
            If you have existing PNG assets — logos, icons, hand-drawn sketches — you can
            convert them to SVG using a process called <strong>image tracing</strong> or
            <strong>vectorization</strong>. This works by analyzing the pixel data and
            generating equivalent vector paths.
          </p>
          <p>
            The quality of conversion depends on the complexity of the image. Simple logos
            and icons convert almost perfectly. Photos and complex illustrations don&apos;t
            convert well because vector paths can&apos;t represent photographic detail efficiently.
          </p>
          <h3>Best tools for PNG to SVG conversion</h3>
          <ul>
            <li><strong>Sketch2SVG</strong> — Upload any image and get clean, optimized SVG output instantly</li>
            <li><strong>Adobe Illustrator</strong> — Professional-grade image trace with full control</li>
            <li><strong>Inkscape</strong> — Free, open-source, excellent for manual vectorization</li>
            <li><strong>Vector Magic</strong> — Good automated tracing for logos</li>
          </ul>
          <div className={s.callout}>
            <span className={s.calloutIcon}>🛠️</span>
            <span>For quick conversions, Sketch2SVG handles the entire process in seconds — no software installation required.</span>
          </div>
        </section>

        <section id="faqs">
          <h2>FAQs</h2>
          <div className={s.faqList}>
            {[
              {
                q: "Is SVG better than PNG?",
                a: "For scalable graphics like icons, logos, and UI elements — yes. SVG is smaller, sharper, and more flexible. For photographs or complex raster artwork, PNG (or WebP) is better.",
              },
              {
                q: "When should I use PNG instead of SVG?",
                a: "Use PNG for photographs, detailed digital paintings, screenshots, or any image with millions of colors and complex gradients that can't be represented as vector paths.",
              },
              {
                q: "Does SVG help with SEO?",
                a: "Yes. SVG files are significantly smaller than equivalent PNGs for simple graphics, improving page load speed and Core Web Vitals — both of which are Google ranking factors.",
              },
              {
                q: "Can I use SVG in a React app?",
                a: "Absolutely. You can import SVGs as React components, use them as image src attributes, or paste them inline as JSX. React has excellent SVG support out of the box.",
              },
              {
                q: "Can browsers display SVG natively?",
                a: "Yes. All modern browsers render SVG natively with no plugins or libraries required.",
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
          <h3>Ready to convert your PNG to SVG?</h3>
          <p>Free, instant, no sign-up required. Upload once, download clean vector code.</p>
          <a href="/" className={s.ctaBtn}>Go to Sketch2SVG →</a>
        </div>
      </div>
    </>
  );
}
