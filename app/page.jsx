import Converter from "./Converter";
import { SITE_NAME, SITE_URL, jsonLdString } from "../lib/site";

export const metadata = {
  title: "Free Image to SVG Converter Online",
  description:
    "Convert PNG, JPG, BMP, GIF and WebP images into SVG vector paths online. Fine-tune tracing settings and download your SVG with Sketch2SVG for free.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Free Image to SVG Converter Online | Sketch2SVG",
    description: "Convert supported raster images into SVG vector paths with adjustable tracing settings.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern browser with JavaScript enabled.",
  description: "A browser-based tool that sends supported raster images to a conversion service and returns SVG vector output.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isAccessibleForFree: true,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(softwareJsonLd) }} />
      <Converter />
    </>
  );
}
