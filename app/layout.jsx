import { Lora, Fraunces, DM_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL, jsonLdString } from "../lib/site";
import "./globals.css";

const lora = Lora({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "500", "700"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Image to SVG Converter Online | Image2SVG",
    template: "%s | Image2SVG",
  },
  description:
    "Convert PNG, JPG, BMP, GIF and WebP images into SVG vector paths online with Image2SVG. Adjust tracing settings and download your SVG for free.",
  applicationName: SITE_NAME,
  keywords: [
    "image to svg converter",
    "convert image to svg",
    "png to svg",
    "jpg to svg",
    "image to vector",
    "raster to vector converter",
    "free svg converter",
  ],
  authors: [{ name: "Image2SVG" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Free Image to SVG Converter Online | Image2SVG",
    description: "Turn raster images into SVG vector paths. Upload an image, adjust tracing settings and download your SVG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to SVG Converter Online | Image2SVG",
    description: "Convert PNG, JPG and other supported images into SVG vector paths online.",
  },
  verification: {
    google: "YZbXQI6OEIL9yor3J53MKpDVNVRlUYQVd2GOmoE_QQM",
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f0e8" };

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${fraunces.variable} ${dmMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd) }} />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
