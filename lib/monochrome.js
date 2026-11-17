// Client-only: uses DOMParser and a canvas to resolve any CSS colour.
const COLOR_ATTRS = ["fill", "stroke", "stop-color", "flood-color", "color"];
const SKIP = /^(none|transparent|inherit|currentcolor|context-fill|context-stroke|url\(.*)$/i;
const STYLE_PROP = /(fill|stroke|stop-color|flood-color|color)(\s*:\s*)([^;}"]+)/gi;

let ctx;
function parseColor(value) {
  ctx ||= document.createElement("canvas").getContext("2d");
  // A colour is valid only if both sentinel assignments end up with the same value.
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value;
  const a = ctx.fillStyle;
  ctx.fillStyle = "#ffffff";
  ctx.fillStyle = value;
  if (a !== ctx.fillStyle) return null;
  if (a.startsWith("#")) {
    return [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  }
  const m = a.match(/rgba?\(([^)]+)\)/);
  return m ? m[1].split(",").slice(0, 3).map((n) => parseFloat(n)) : null;
}

const hex = (n) => Math.round(n).toString(16).padStart(2, "0");

function mono(prop, value) {
  const v = value.trim();
  if (!v || SKIP.test(v)) return value;
  const rgb = parseColor(v);
  if (!rgb) return value;
  const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  // Gradient stops stay grey so gradients survive; every other colour snaps to black or white.
  if (prop === "stop-color") return `#${hex(lum)}${hex(lum)}${hex(lum)}`;
  return lum >= 128 ? "#ffffff" : "#000000";
}

const rewriteStyle = (css) => css.replace(STYLE_PROP, (_, p, sep, v) => `${p}${sep}${mono(p.toLowerCase(), v)}`);

export function toMonochrome(svgText) {
  if (!svgText || typeof DOMParser === "undefined") return svgText;
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  if (doc.querySelector("parsererror")) return svgText;

  doc.querySelectorAll("*").forEach((el) => {
    for (const attr of COLOR_ATTRS) {
      if (el.hasAttribute(attr)) el.setAttribute(attr, mono(attr, el.getAttribute(attr)));
    }
    if (el.hasAttribute("style")) el.setAttribute("style", rewriteStyle(el.getAttribute("style")));
    if (el.localName === "style") el.textContent = rewriteStyle(el.textContent);
  });
  return new XMLSerializer().serializeToString(doc);
}
