"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import m from "./Machine.module.css";

const FORMATS = ["PNG", "JPG", "BMP", "GIF", "WebP"];
const clamp = (v) => Math.min(100, Math.max(0, v));

export default function ComparisonMachine({ t, previewUrl, svgUrl, sweepKey, bg, loading, onFile, onBrowse }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const stageRef = useRef(null);
  const draggingRef = useRef(false);
  const rafRef = useRef(0);

  const hasImage = Boolean(previewUrl);
  const hasResult = Boolean(svgUrl);
  // Park the carriage at the right edge until there is something to compare.
  const shown = hasResult ? pos : hasImage ? 100 : 50;
  const pct = Math.round(shown);

  // Sweep the carriage in whenever a new conversion arrives.
  useEffect(() => {
    if (!sweepKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    setPos(100);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setPos(100 - 50 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sweepKey]);

  const moveTo = useCallback((clientX) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (r?.width) setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  const onPointerDown = (e) => {
    if (!hasResult || (e.pointerType === "mouse" && e.button !== 0)) return;
    cancelAnimationFrame(rafRef.current);
    draggingRef.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (draggingRef.current) moveTo(e.clientX);
  };
  const endDrag = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  const onKeyDown = (e) => {
    if (!hasResult) return;
    const step = e.shiftKey ? 10 : 2;
    const next = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      Home: 0,
      End: 100,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    cancelAnimationFrame(rafRef.current);
    setPos(clamp(next));
  };

  const status = loading ? "tracing" : hasResult ? "done" : "ready";

  return (
    <div className={m.scene} role="group" aria-label={t.machineLabel}>
      <div className={`${m.machine} ${dragging ? m.isDragging : ""}`}>
        <Screws />

        <div className={m.topPlate}>
          <span className={m.brand}>{t.brand}</span>
          <div className={m.leds} aria-live="polite">
            <Led label={t.statusReady} on={status === "ready"} color="green" />
            <Led label={t.statusTracing} on={status === "tracing"} color="amber" blink />
            <Led label={t.statusDone} on={status === "done"} color="green" />
          </div>
        </div>

        <div
          className={`${m.stageWrap} ${hasResult ? m.interactive : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className={`${m.rail} ${m.railTop}`} />
          <div className={`${m.rail} ${m.railBottom}`} />
          <div className={m.bezel} />

          <div
            ref={stageRef}
            className={`${m.stage} ${!hasImage ? m.stageEmpty : ""} ${dragOver ? m.dragOver : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              onFile(e.dataTransfer.files[0]);
            }}
          >
            {hasResult && (
              <div className={`${m.layer} ${m[`bg_${bg}`]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svgUrl} alt={t.outputAlt} className={m.layerImg} draggable={false} />
              </div>
            )}

            {hasImage && (
              <div className={`${m.layer} ${m[`bg_${bg}`]}`} style={{ clipPath: `inset(0 ${100 - shown}% 0 0)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt={t.originalAlt} className={m.layerImg} draggable={false} />
              </div>
            )}

            {hasResult && (
              <>
                <span className={`${m.tag} ${m.tagLeft}`}>{t.before}</span>
                <span className={`${m.tag} ${m.tagRight}`}>{t.after}</span>
              </>
            )}

            {loading && <div className={m.scan} aria-hidden="true" />}

            {hasImage && !hasResult && !loading && <p className={m.awaiting}>{t.awaiting}</p>}

            {!hasImage && (
              <button type="button" className={m.dropBtn} onClick={onBrowse}>
                <UploadIllustration />
                <span className={m.dropTitle}>{t.dropTitle}</span>
                <span className={m.dropSub}>{t.dropSub}</span>
                <span className={m.formats}>
                  {FORMATS.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </span>
              </button>
            )}
          </div>

          <div
            className={`${m.carriage} ${hasResult ? "" : m.locked} ${hasImage ? "" : m.hidden}`}
            style={{ left: `${shown}%` }}
            role="slider"
            tabIndex={hasResult ? 0 : -1}
            aria-label={t.sliderLabel}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={t.sliderValue.replace("{n}", pct)}
            aria-disabled={!hasResult}
            onKeyDown={onKeyDown}
          >
            <span className={`${m.cBlock} ${m.cTop}`} />
            <span className={`${m.cBlock} ${m.cBottom}`} />
            <span className={m.blade} />
            <span className={m.knob}>
              <GripIcon />
            </span>
          </div>
        </div>

        <div className={m.bottomPlate}>
          <span className={m.plate}>{t.originalPlate}</span>
          <span className={m.lcd}>
            {hasResult ? `${t.split} ${String(pct).padStart(3, "0")}/${String(100 - pct).padStart(3, "0")}` : t.hint}
          </span>
          <span className={m.plate}>{t.svgPlate}</span>
        </div>
      </div>
    </div>
  );
}

function Led({ label, on, color, blink }) {
  return (
    <span className={m.ledItem}>
      <span className={`${m.led} ${on ? (color === "amber" ? m.ledAmber : m.ledGreen) : ""} ${on && blink ? m.ledBlink : ""}`} />
      <span className={m.ledText}>{label}</span>
    </span>
  );
}

const Screws = () => (
  <>
    <span className={`${m.screw} ${m.s1}`} />
    <span className={`${m.screw} ${m.s2}`} />
    <span className={`${m.screw} ${m.s3}`} />
    <span className={`${m.screw} ${m.s4}`} />
  </>
);

const GripIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 6 3 12 8 18" />
    <polyline points="16 6 21 12 16 18" />
  </svg>
);

const UploadIllustration = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);
