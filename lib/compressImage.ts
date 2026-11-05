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
  const maxBytes = opts.maxBytes ?? 700_000;

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

  const draw = (w: number, h: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser.");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
  };

  let canvas = draw(width, height);

  // Step quality down first.
  let quality = 0.82;
  let out = canvas.toDataURL("image/jpeg", quality);
  while (out.length > maxBytes && quality > 0.3) {
    quality -= 0.12;
    out = canvas.toDataURL("image/jpeg", quality);
  }

  // Still too big? shrink dimensions and try once more.
  if (out.length > maxBytes) {
    canvas = draw(Math.round(width * 0.7), Math.round(height * 0.7));
    out = canvas.toDataURL("image/jpeg", 0.6);
  }

  if (out.length > maxBytes) {
    throw new Error("Image is too large even after compression — try a smaller one.");
  }

  return out;
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
