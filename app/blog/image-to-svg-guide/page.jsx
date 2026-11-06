import Link from "next/link";
import ArticleLayout from "../ArticleLayout";
import { SITE_URL } from "../../../lib/site";

const TITLE = "How to Convert an Image to SVG Online";
const DESCRIPTION = "Learn how raster-to-vector conversion works, which images trace well, and how to convert PNG, JPG, BMP, GIF and WebP files into SVG with Sketch2SVG.";
const PATH = "/blog/image-to-svg-guide";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "article", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const toc = [
  ["what-is-svg", "What is an SVG?"],
  ["raster-vs-vector", "Raster vs vector images"],
  ["how-tracing-works", "How image tracing works"],
  ["best-images", "Which images work best?"],
  ["steps", "Convert an image with Sketch2SVG"],
  ["settings", "Understanding tracing settings"],
  ["limitations", "What to expect from the result"],
];

export default function ImageToSvgGuide() {
  return (
    <ArticleLayout title={TITLE} description={DESCRIPTION} path={PATH} readTime={6} toc={toc}>
      <section id="what-is-svg">
        <h2>What is an SVG?</h2>
        <p>SVG stands for Scalable Vector Graphics. It is a vector image format that describes artwork with paths, shapes, fills and coordinates instead of storing a fixed grid of colored pixels.</p>
        <p>Because the browser draws those shapes at the requested size, a well-made SVG can be enlarged without the pixelation associated with enlarging a small raster image. SVG is commonly used for logos, icons, diagrams and illustrations.</p>
      </section>
      <section id="raster-vs-vector">
        <h2>Raster images vs vector images</h2>
        <p>PNG, JPG, BMP, GIF and WebP are raster formats. They represent an image as pixels. SVG is normally a vector format: its visible artwork is described by geometric elements such as paths and shapes.</p>
        <ul>
          <li><strong>Raster images:</strong> useful for photographs, screenshots, textures and detailed images.</li>
          <li><strong>Vector graphics:</strong> useful for logos, symbols, icons, diagrams and artwork with clear boundaries.</li>
          <li><strong>Vectorization:</strong> software analyses raster pixels and estimates paths or shapes that reproduce the image.</li>
        </ul>
        <p>Vectorization is an approximation. It does not recover the original designer&apos;s editable source paths from a flattened PNG or JPG.</p>
      </section>
      <section id="how-tracing-works">
        <h2>How image-to-SVG tracing works</h2>
        <p>An image tracer examines the contrast and regions in a raster image, identifies boundaries, then represents selected regions as vector paths. The exact result depends on the tracing algorithm, input image and settings.</p>
        <p>Sketch2SVG sends the uploaded file to its conversion API and returns SVG output. The browser interface lets you adjust threshold, speckle filtering, corner smoothing and curve accuracy before conversion.</p>
      </section>
      <section id="best-images">
        <h2>Which images produce the best SVG results?</h2>
        <p>High-contrast images with clearly separated foreground and background areas are usually easier to trace than photographs or complex artwork.</p>
        <ul>
          <li><strong>Good candidates:</strong> simple logos, icons, black-and-white artwork, silhouettes, symbols and line illustrations.</li>
          <li><strong>More difficult:</strong> photographs, soft shadows, gradients, textured images, anti-aliased edges and images with many similar colors.</li>
        </ul>
        <p>For best results, start with a clear, high-resolution source, crop away unnecessary background and use an image with strong contrast between the subject and its background.</p>
      </section>
      <section id="steps">
        <h2>How to convert an image to SVG with Sketch2SVG</h2>
        <ol>
          <li>Open the <Link href="/">Sketch2SVG converter</Link>.</li>
          <li>Choose a PNG, JPG/JPEG, BMP, GIF or WebP image.</li>
          <li>Open the fine-tune settings if you want to adjust the tracing result.</li>
          <li>Select the conversion action and wait for the API to return SVG markup.</li>
          <li>Preview the result, then download the SVG or copy its markup.</li>
        </ol>
        <p>The converter currently accepts the image formats shown in its upload control. Very large files or unsupported image encodings may be rejected by the conversion service.</p>
      </section>
      <section id="settings">
        <h2>Understanding the tracing settings</h2>
        <ul>
          <li><strong>Threshold:</strong> controls the pixel cutoff used to distinguish darker and lighter areas. Adjust it to change which parts of an image are traced.</li>
          <li><strong>Speckle filter:</strong> suppresses small isolated regions that may be caused by image noise.</li>
          <li><strong>Corner smoothing:</strong> changes how sharply or smoothly traced corners are represented.</li>
          <li><strong>Curve accuracy:</strong> controls how closely curves follow the source boundary. A tighter fit can create more nodes and more complex output.</li>
        </ul>
        <p>There is no single best setting for every image. Change one control at a time and compare the preview to the source.</p>
      </section>
      <section id="limitations">
        <h2>What to expect from a raster-to-vector result</h2>
        <p>An SVG file can contain vector paths, but vectorization does not automatically make every image infinitely scalable in a visually faithful way. Complex photos can produce very large or cluttered paths, and subtle colors or gradients may be simplified or lost depending on the tracing method.</p>
        <p>Review the output at its intended size before using it in a production design. For photographs, a raster format such as WebP, JPEG or PNG is often the better choice.</p>
      </section>
    </ArticleLayout>
  );
}
