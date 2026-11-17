"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import s from "./components/Site.module.css";
import m from "./components/Machine.module.css";
import ComparisonMachine from "./components/ComparisonMachine";
import { toMonochrome } from "../lib/monochrome";

const API =
  process.env.NEXT_PUBLIC_API_URL || "https://svgconverterbackend.onrender.com";

const DEFAULTS = {
  threshold: 128,
  turdsize: 2,
  alphamax: 1.0,
  opttolerance: 0.2,
};

export default function Converter({ t }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [svgOutput, setSvgOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(DEFAULTS);
  const [showAdv, setShowAdv] = useState(false);
  const [progress, setProgress] = useState(0);
  const [svgBg, setSvgBg] = useState("checker"); // checker | white | dark
  const [mono, setMono] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const copyRef = useRef(null);

  // The SVG shown, copied and downloaded; black & white is derived so colour is never lost.
  const displaySvg = useMemo(
    () => (mono && svgOutput ? toMonochrome(svgOutput) : svgOutput),
    [mono, svgOutput]
  );
  const svgUrl = useMemo(
    () =>
      displaySvg
        ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(displaySvg)}`
        : null,
    [displaySvg]
  );

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

  useEffect(() => () => clearTimeout(copyRef.current), []);

  const handleFile = useCallback(
    (f) => {
      if (!f) return;
      const ok = ["image/png", "image/jpeg", "image/bmp", "image/gif", "image/webp"];
      if (!ok.includes(f.type)) {
        setError(t.errFormat);
        return;
      }
      setFile(f);
      setSvgOutput(null);
      setError(null);
      setProgress(0);
      const r = new FileReader();
      r.onload = (e) => setPreview(e.target.result);
      r.readAsDataURL(f);
    },
    [t.errFormat]
  );

  const browse = useCallback(() => inputRef.current?.click(), []);

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
        throw new Error(j.error || t.errServer.replace("{status}", res.status));
      }
      setSvgOutput(await res.text());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyMarkup = () => {
    if (!displaySvg) return;
    navigator.clipboard.writeText(displaySvg).then(() => {
      setCopied(true);
      clearTimeout(copyRef.current);
      copyRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  const download = () => {
    if (!displaySvg) return;
    const blob = new Blob([displaySvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      (file?.name?.replace(/\.[^.]+$/, "") || "output") + (mono ? "-bw" : "") + ".svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const set = (k, v) => setParams((p) => ({ ...p, [k]: v }));

  return (
    <>
      <main className={m.workbench}>
        {/* LEFT — comparison machine */}
        <ComparisonMachine
          t={t}
          previewUrl={preview}
          svgUrl={svgUrl}
          sweepKey={svgOutput}
          bg={svgBg}
          loading={loading}
          onFile={handleFile}
          onBrowse={browse}
        />

        {/* RIGHT — control console */}
        <div className={s.card}>
          <div className={s.cardLabel}>
            <LeafIcon /> {t.consoleTitle}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/bmp,image/gif,image/webp"
            className={s.hiddenInput}
            onChange={(e) => {
              handleFile(e.target.files[0]);
              e.target.value = "";
            }}
          />

          <button className={s.advToggle} onClick={browse} type="button">
            {file ? <SwapIcon /> : <UploadIcon />}
            {file ? t.replaceImage : t.chooseImage}
          </button>

          {file && (
            <div className={s.filePill}>
              <DocIcon />
              <span className={s.fileName}>{file.name}</span>
              <span className={s.fileKb}>{(file.size / 1024).toFixed(1)} KB</span>
            </div>
          )}

          <button
            className={s.advToggle}
            onClick={() => setShowAdv((v) => !v)}
            aria-expanded={showAdv}
            type="button"
          >
            <TuneIcon />
            {t.fineTune}
            <span className={`${s.chevron} ${showAdv ? s.open : ""}`}>▾</span>
          </button>

          {showAdv && (
            <div className={s.advPanel}>
              <Slider
                label={t.threshold.label}
                hint={t.threshold.hint}
                value={params.threshold}
                min={0}
                max={255}
                step={1}
                onChange={(v) => set("threshold", +v)}
              />
              <Slider
                label={t.speckle.label}
                hint={t.speckle.hint}
                value={params.turdsize}
                min={0}
                max={100}
                step={1}
                onChange={(v) => set("turdsize", +v)}
              />
              <Slider
                label={t.corners.label}
                hint={t.corners.hint}
                value={params.alphamax}
                min={0}
                max={1.33}
                step={0.01}
                onChange={(v) => set("alphamax", parseFloat(v))}
              />
              <Slider
                label={t.curve.label}
                hint={t.curve.hint}
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
                ↩ {t.reset}
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
                <SpinIcon className={s.spin} /> {t.converting}
              </>
            ) : (
              <>
                <ZapIcon /> {t.convert}
              </>
            )}
          </button>

          {(loading || progress > 0) && (
            <div className={s.progRow}>
              <div className={s.progTrack}>
                <div
                  className={`${s.progFill} ${progress === 100 ? s.done : ""}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={s.progPct}>
                {progress === 100 ? "✓" : `${progress}%`}
              </span>
            </div>
          )}

          {error && (
            <div className={s.errBox} role="alert">
              <WarningIcon /> {error}
            </div>
          )}

          {svgOutput && (
            <div className={m.outputTools}>
              <button
                type="button"
                role="switch"
                aria-checked={mono}
                className={`${m.switchRow} ${mono ? m.switchOn : ""}`}
                onClick={() => setMono((v) => !v)}
              >
                <span className={m.switchTrack}>
                  <span className={m.switchThumb} />
                </span>
                <span className={m.switchText}>
                  <strong>{t.bw}</strong>
                  <span>{t.bwHint}</span>
                </span>
              </button>

              <div className={m.toolRow}>
                <BgToggle value={svgBg} onChange={setSvgBg} t={t} />
                <span className={m.sizeInfo}>
                  SVG · {(displaySvg.length / 1024).toFixed(2)} KB
                </span>
              </div>

              <button className={s.dlBtn} onClick={download} type="button">
                <DownloadIcon /> {mono ? t.downloadBw : t.download}
              </button>
            </div>
          )}
        </div>
      </main>

      {displaySvg && (
        <div className={`${s.markupBlock} ${m.markup}`}>
          <div className={s.markupHeader}>
            <span className={s.markupTitle}>
              <CodeIcon /> {t.markup}
              {mono ? " · B&W" : ""}
            </span>
            <button
              className={`${s.copyBtn} ${copied ? s.copyDone : ""}`}
              onClick={copyMarkup}
              type="button"
            >
              {copied ? (
                <>
                  <CheckIcon /> {t.copied}
                </>
              ) : (
                <>
                  <CopyIcon /> {t.copy}
                </>
              )}
            </button>
          </div>
          <pre className={s.sourceCode}>
            <code>{displaySvg}</code>
          </pre>
        </div>
      )}
    </>
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
        aria-label={label}
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
function BgToggle({ value, onChange, t }) {
  const opts = [
    { id: "checker", label: "⊞" },
    { id: "white", label: "○" },
    { id: "dark", label: "●" },
  ];
  return (
    <div className={s.bgToggle} role="group" aria-label={t.bgLabel}>
      {opts.map((o) => (
        <button
          key={o.id}
          title={t.bg[o.id]}
          aria-label={t.bg[o.id]}
          aria-pressed={value === o.id}
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

// ── Inline icons ────────────────────────────────────────────────
const LeafIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0118 7a10 10 0 00-10 10c0 1.1.18 2.16.5 3.14" />
    <path d="M11 20c-.27-2.12.56-4.5 2-6" />
  </svg>
);
const UploadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 8 12 4 8 8" />
    <line x1="12" y1="4" x2="12" y2="16" />
    <path d="M20 16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
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
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="3" x2="12" y2="15" />
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
