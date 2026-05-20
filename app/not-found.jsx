import Link from "next/link";
import Header from "./components/Header";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 28px 60px" }}>
      <Header />
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem" }}>
          404 — Page not found
        </h2>
        <p style={{ marginTop: 16, color: "var(--text-soft)" }}>
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 22px",
              background: "var(--terracotta)",
              color: "var(--warm-white)",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            Go to the converter
          </Link>
        </p>
      </section>
    </div>
  );
}
