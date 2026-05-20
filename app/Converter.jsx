"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import s from "./components/Site.module.css";
import Header from "./components/Header";

const API =
  process.env.NEXT_PUBLIC_API_URL || "https://svgconverterbackend.onrender.com";

const DEFAULTS = {
  threshold: 128,
  turdsize: 2,
  alphamax: 1.0,
  opttolerance: 0.2,
};

export default function Converter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [svgOutput, setSvgOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(DEFAULTS);
  const [dragOver, setDragOver] = useState(false);
  const [showAdv, setShowAdv] = useState(false);
  const [progress, setProgress] = useState(0);
  const [svgBg, setSvgBg] = useState("checker"); // checker | white | dark
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const copyRef = useRef(null);

  // Simulated progress bar
  useEffect(() => {
    if (loading) {
      setProgress(0);
      let v = 0;
      timerRef.current = setInterval(() => {
        v += Math.random() * 7;
        if (v > 88) v = 88;
        setProgress(Math.round(v));
      }, 220);
    } else {
      clearInterval(timerRef.current);
      if (svgOutput) setProgress(100);
    }
    return () => clearInterval(timerRef.current);
  }, [loading, svgOutput]);

  const handleFile = useCallback((f) => {
    if (!f) return;
    const ok = [
      "image/png",
      "image/jpeg",
      "image/bmp",
      "image/gif",
      "image/webp",
    ];
    if (!ok.includes(f.type)) {
      setError("Please upload a PNG, JPG, BMP, GIF, or WebP image.");
      return;
    }
    setFile(f);
    setSvgOutput(null);
    setError(null);
    setProgress(0);
    const r = new FileReader();
    r.onload = (e) => setPreview(e.target.result);
    r.readAsDataURL(f);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setSvgOutput(null);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("mode", "logo");
    fd.append("threshold", params.threshold);
    fd.append("turdsize", params.turdsize);
    fd.append("alphamax", params.alphamax);
    fd.append("opttolerance", params.opttolerance);
    try {
      const res = await fetch(`${API}/convert`, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Server error ${res.status}`);
      }
      setSvgOutput(await res.text());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyMarkup = () => {
    if (!svgOutput) return;
    navigator.clipboard.writeText(svgOutput).then(() => {
      setCopied(true);
      clearTimeout(copyRef.current);
      copyRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  const download = () => {
    if (!svgOutput) return;
    const blob = new Blob([svgOutput], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      (file?.name?.replace(/\.[^.]+$/, "") || "output") + ".svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const set = (k, v) => setParams((p) => ({ ...p, [k]: v }));

  return (
    <div className={s.page}>
      <Header />

      {/* ── Hero intro ── */}
      <section className={s.hero}>
        <h2 className={s.heroTitle}>
          Convert Images to SVG Instantly
          <br />
        </h2>
        <p className={s.heroBody}>
          Upload PNG, JPG, BMP, or any image and convert it into clean, scalable
          SVG in seconds. No login. No watermark.
        </p>
      </section>

      {/* ── Main converter ── */}
      <main className={s.converter}>
        {/* LEFT — upload + controls */}
        <div className={s.card}>
          <div className={s.cardLabel}>
            <LeafIcon /> Your image
          </div>

          <div
            className={`${s.dropzone} ${dragOver ? s.dragOver : ""} ${
              file ? s.filled : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/bmp,image/gif,image/webp"
              className={s.hiddenInput}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {preview ? (
              <div className={s.imgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Input preview" className={s.thumbImg} />
                <div className={s.imgHover}>
                  <SwapIcon /> Replace image
                </div>
              </div>
            ) : (
              <div className={s.dropContent}>
                <UploadIllustration />
                <p className={s.dropTitle}>Drop your image here</p>
                <p className={s.dropSub}>or click to browse</p>
                <div className={s.formatRow}>
                  {["PNG", "JPG", "BMP", "GIF", "WebP"].map((f) => (
                    <span key={f} className={s.fmt}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {file && (
            <div className={s.filePill}>
              <DocIcon />
              <span className={s.fileName}>{file.name}</span>
              <span className={s.fileKb}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}

          <button
            className={s.advToggle}
            onClick={() => setShowAdv((v) => !v)}
            type="button"
          >
            <TuneIcon />
            Fine-tune settings
            <span className={`${s.chevron} ${showAdv ? s.open : ""}`}>▾</span>
          </button>

          {showAdv && (
            <div className={s.advPanel}>
              <Slider
                label="Threshold"
                hint="Darkness cutoff (0–255)"
                value={params.threshold}
                min={0}
                max={255}
                step={1}
                onChange={(v) => set("threshold", +v)}
              />
              <Slider
                label="Speckle filter"
                hint="Suppress noise smaller than N px"
                value={params.turdsize}
                min={0}
                max={100}
                step={1}
                onChange={(v) => set("turdsize", +v)}
              />
              <Slider
                label="Corner smoothing"
                hint="0 = sharp · 1.33 = fully curved"
                value={params.alphamax}
                min={0}
                max={1.33}
                step={0.01}
                onChange={(v) => set("alphamax", parseFloat(v))}
              />
              <Slider
                label="Curve accuracy"
                hint="Lower = tighter fit, more nodes"
                value={params.opttolerance}
                min={0.1}
                max={0.5}
                step={0.01}
                onChange={(v) => set("opttolerance", parseFloat(v))}
              />
              <button
                className={s.resetLink}
                onClick={() => setParams(DEFAULTS)}
                type="button"
              >
                ↩ Reset to defaults
              </button>
            </div>
          )}

          <button
            className={`${s.convertBtn} ${loading ? s.busy : ""}`}
            onClick={convert}
            disabled={!file || loading}
            type="button"
          >
            {loading ? (
              <>
                <SpinIcon className={s.spin} /> Converting…
              </>
            ) : (
              <>
                <ZapIcon /> Convert to SVG
              </>
            )}
          </button>

          {(loading || progress > 0) && (
            <div className={s.progRow}>
              <div className={s.progTrack}>
                <div
                  className={`${s.progFill} ${
                    progress === 100 ? s.done : ""
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={s.progPct}>
                {progress === 100 ? "✓" : `${progress}%`}
              </span>
            </div>
          )}

          {error && (
            <div className={s.errBox}>
              <WarningIcon /> {error}
            </div>
          )}
        </div>

        {/* RIGHT — SVG output */}
        <div className={s.card}>
          <div className={s.cardLabel}>
            <VectorIcon /> SVG output
            {svgOutput && (
              <div className={s.labelRight}>
                <BgToggle value={svgBg} onChange={setSvgBg} />
                <button
                  className={s.dlBtn}
                  onClick={download}
                  type="button"
                >
                  <DownloadIcon /> Download .svg
                </button>
              </div>
            )}
          </div>

          <div
            className={`${s.outputBox} ${s[`bg_${svgBg}`]} ${
              svgOutput ? s.hasResult : ""
            }`}
          >
            {svgOutput ? (
              <>
                <div
                  className={s.svgInner}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: svgOutput }}
                />
                <div className={s.svgBadge}>
                  <span className={s.svgTag}>SVG</span>
                  <span className={s.svgSize}>
                    {(svgOutput.length / 1024).toFixed(2)} KB
                  </span>
                </div>
              </>
            ) : (
              <div className={s.emptyState}>
                <FrameIcon />
                <p>Your SVG preview appears here</p>
                <span>Upload an image and hit Convert</span>
              </div>
            )}
          </div>

          {svgOutput && (
            <div className={s.markupBlock}>
              <div className={s.markupHeader}>
                <span className={s.markupTitle}>
                  <CodeIcon /> SVG markup
                </span>
                <button
                  className={`${s.copyBtn} ${copied ? s.copyDone : ""}`}
                  onClick={copyMarkup}
                  type="button"
                >
                  {copied ? (
                    <>
                      <CheckIcon /> Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className={s.sourceCode}>
                <code>{svgOutput}</code>
              </pre>
            </div>
          )}
        </div>
      </main>

      {/* ── Developer Info ── */}
      <section className={s.devSection}>
        <div className={s.devInner}>
          <div className={s.devLeft}>
            <span className={s.devEyebrow}>Developer</span>
            <h3 className={s.devTitle}>
              Mohammed
              <br />
              Muzammil<span className={s.devAccent}>Uddin</span>
            </h3>
          </div>

          <div className={s.devLinks}>
            <a
              href="https://github.com/MuzammilCodes"
              target="_blank"
              rel="noreferrer"
              className={s.devLink}
            >
              <GithubIcon />
              <span>Github</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muzammil-codes/"
              target="_blank"
              rel="noreferrer"
              className={s.devLink}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://muzammilcodes-v2.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className={s.devLink}
            >
              <GlobeIcon />
              <span>Portfolio</span>
            </a>
          </div>
        </div>
      </section>

      <div className={s.bottomBand} />
    </div>
  );
}

// ── Slider ───────────────────────────────────────────────────────
function Slider({ label, hint, value, min, max, step, onChange }) {
  return (
    <div className={s.sliderWrap}>
      <div className={s.sliderTop}>
        <span className={s.sliderLabel}>{label}</span>
        <span className={s.sliderVal}>{value}</span>
      </div>
      <p className={s.sliderHint}>{hint}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={s.sliderEnds}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ── Background toggle ───────────────────────────────────────────
function BgToggle({ value, onChange }) {
  const opts = [
    { id: "checker", label: "⊞" },
    { id: "white", label: "○" },
    { id: "dark", label: "●" },
  ];
  return (
    <div className={s.bgToggle}>
      {opts.map((o) => (
        <button
          key={o.id}
          title={o.id}
          type="button"
          className={`${s.bgBtn} ${value === o.id ? s.bgActive : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Inline icons (kept inline to mirror the original; no extra payload) ──
const LeafIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0118 7a10 10 0 00-10 10c0 1.1.18 2.16.5 3.14" />
    <path d="M11 20c-.27-2.12.56-4.5 2-6" />
  </svg>
);
const UploadIllustration = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".5" aria-hidden="true">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);
const SwapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);
const DocIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const TuneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>
);
const ZapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const SpinIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
);
const WarningIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const VectorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const FrameIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".3" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
const CodeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
