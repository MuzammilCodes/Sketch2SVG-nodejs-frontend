import Link from "next/link";
import InfoPage from "../components/InfoPage";
import { SITE_URL } from "../../lib/site";

const PATH = "/about";
const TITLE = "About Image2SVG";
const DESCRIPTION = "Image2SVG is a free online tool that traces supported raster images into SVG vector paths.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <InfoPage title={TITLE} description={DESCRIPTION} path={PATH} label="About" updated="2026-11-16">
      <section>
        <h2>What Image2SVG does</h2>
        <p>
          Image2SVG converts PNG, JPG, BMP, GIF and WebP images into SVG vector paths. You upload an image, adjust
          tracing settings such as threshold, speckle filtering, corner smoothing and curve accuracy, compare the original
          with the traced result, and download the SVG.
        </p>
        <p>
          The tool works best on logos, icons, silhouettes, line art and other high-contrast artwork. Photographs and
          soft gradients usually trace poorly, and our <Link href="/blog/image-to-vector-guide">guide to raster and vector images</Link>{" "}
          explains why.
        </p>
      </section>
      <section>
        <h2>How it works</h2>
        <p>
          Your browser sends the selected image to a separate conversion service, which traces it and returns SVG markup.
          The page then shows the result next to your original so you can judge the quality before downloading. The
          black &amp; white option is applied in your browser to the SVG that was returned.
        </p>
        <p>
          Read the <Link href="/privacy-policy">Privacy Policy</Link> for details about uploaded images, and the{" "}
          <Link href="/disclaimer">Disclaimer</Link> and <Link href="/terms">Terms of Use</Link> for the limits of the service.
        </p>
      </section>
      <section>
        <h2>Who builds it</h2>
        <p>
          Image2SVG is designed and developed by Mohammed Muzammil Uddin. You can find his work on{" "}
          <a href="https://github.com/MuzammilCodes" target="_blank" rel="noreferrer">GitHub</a>,{" "}
          <a href="https://www.linkedin.com/in/muzammil-codes/" target="_blank" rel="noreferrer">LinkedIn</a> and his{" "}
          <a href="https://muzammilcodes-v2.netlify.app/" target="_blank" rel="noreferrer">portfolio</a>.
        </p>
      </section>
      <section>
        <h2>What changed recently</h2>
        <p>
          See the <Link href="/changelog">changelog</Link> for a dated list of updates.
        </p>
      </section>
    </InfoPage>
  );
}
