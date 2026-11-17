import Link from "next/link";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import s from "./components/Site.module.css";
import n from "./components/NotFound.module.css";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  ["/", "Image to SVG converter"],
  ["/blog/image-to-svg-guide", "How to convert an image to SVG"],
  ["/blog/svg-vs-png", "SVG vs PNG"],
  ["/best-free-svg-converter-2027", "Best free SVG converter 2027"],
  ["/changelog", "Changelog"],
];

export default function NotFound() {
  return (
    <>
      <div className={s.page}>
        <PageHeader />
        <section className={n.wrap}>
          <p className={n.code} aria-hidden="true">
            4<span>0</span>4
          </p>
          <h1 className={n.title}>Page not found</h1>
          <p className={n.text}>
            This page doesn&apos;t exist or has moved. Check the address, or head back to the converter.
          </p>
          <Link href="/" className={n.btn}>
            Go to the converter
          </Link>

          <nav className={n.links} aria-label="Helpful pages">
            <h2>Maybe you were looking for</h2>
            <ul>
              {SUGGESTIONS.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
      <PageFooter />
    </>
  );
}
