/**
 * Compress an image File entirely in the browser and return a base64 data URL.
 *
 * Resizes to fit within `maxDim`, then steps JPEG quality down until the
 * encoded string fits under `maxBytes`. The result is stored directly in the
 * Firestore document `img` field — no Firebase Storage required.
 *
 * Firestore allows ~1 MB per document, so the default 700 KB ceiling leaves
 * comfortable room for the other fields.
 */
export async function compressImage(
  file: File,
  opts: { maxDim?: number; maxBytes?: number } = {},
): Promise<string> {
  const maxDim = opts.maxDim ?? 1280;
  const maxBytes = opts.maxBytes ?? 750_000;

  // SVG images can be read directly as base64 data URLs without lossy compression
  if (file.type === "image/svg+xml") {
    const dataUrl = await readAsDataURL(file);
    if (dataUrl.length > maxBytes) {
      throw new Error("SVG is larger than 750 KB. Please optimize the SVG before uploading.");
    }
    return dataUrl;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  const sourceUrl = await readAsDataURL(file);
  const img = await loadImage(sourceUrl);

  // Scale dimensions down to fit maxDim (keep aspect ratio).
  let { width, height } = img;
  const longest = Math.max(width, height);
  if (longest > maxDim) {
    const scale = maxDim / longest;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const draw = (w: number, h: number, fillWhite = true) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser.");
    if (fillWhite) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
  };

  // If PNG or WebP with transparency, try webp or png first if small
  const isTransparent = file.type === "image/png" || file.type === "image/webp";
  let canvas = draw(width, height, !isTransparent);

  // Try webp or jpeg
  const mime = isTransparent ? "image/webp" : "image/jpeg";
  let quality = 0.85;
  let out = canvas.toDataURL(mime, quality);

  // Fallback to jpeg if webp unsupported or still too large
  if (!out.startsWith(`data:${mime}`)) {
    canvas = draw(width, height, true);
    out = canvas.toDataURL("image/jpeg", quality);
  }

  while (out.length > maxBytes && quality > 0.25) {
    quality -= 0.12;
    out = canvas.toDataURL("image/jpeg", quality);
  }

  // Still too big? shrink dimensions further
  if (out.length > maxBytes) {
    canvas = draw(Math.round(width * 0.7), Math.round(height * 0.7), true);
    out = canvas.toDataURL("image/jpeg", 0.6);
  }

  if (out.length > maxBytes) {
    canvas = draw(Math.round(width * 0.5), Math.round(height * 0.5), true);
    out = canvas.toDataURL("image/jpeg", 0.5);
  }

  if (out.length > maxBytes) {
    throw new Error(
      `Image is too large (${approxKB(out)} KB) for Firestore free-tier document limit (~1 MB). Please choose a smaller image.`
    );
  }

  return out;
}

/**
 * Universal media-to-base64 converter for Firebase free tier (No Cloud Storage needed).
 * Handles images with automatic compression and audio/video/files under maxBytes.
 */
export async function fileToBase64(
  file: File,
  maxBytes = 850_000
): Promise<string> {
  if (file.type.startsWith("image/")) {
    return compressImage(file, { maxBytes });
  }

  // Non-image media (e.g. short audio/video clips, icons)
  if (file.size > maxBytes) {
    throw new Error(
      `Media file is too large (${Math.round(file.size / 1024)} KB). On Firebase free tier without Cloud Storage, files must be under ${Math.round(
        maxBytes / 1024
      )} KB to fit into Firestore documents.`
    );
  }

  const dataUrl = await readAsDataURL(file);
  if (dataUrl.length > maxBytes * 1.35) {
    throw new Error("Base64 representation exceeds Firestore 1MB document limit.");
  }
  return dataUrl;
}

/** Rough byte size of a base64 data URL, for showing the user. */
export function approxKB(dataUrl: string): number {
  return Math.round(dataUrl.length / 1024);
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode the image."));
    img.src = src;
  });
}
