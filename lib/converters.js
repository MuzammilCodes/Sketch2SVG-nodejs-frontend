/** Registry of converters. Add an entry here and a matching folder under app/<slug>/ to launch a new one. */
export const IMAGE_TO_SVG_PATH = "/image-to-svg-converter";

export const CONVERTERS = [
  {
    id: "image-to-svg",
    name: "Image to SVG Converter",
    path: IMAGE_TO_SVG_PATH,
    description: "Convert PNG, JPG, BMP, GIF and WebP images into clean SVG vector paths, free and in your browser.",
  },
];
