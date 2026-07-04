const TRANSPARENCY_FORMATS = ["image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function compressImageFile(
  file: File,
  maxDimension = 1400,
  quality = 0.82,
): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  // JPEG has no alpha channel — encoding a transparent source as JPEG would
  // flatten the transparent areas to solid black. Keep PNG (lossless, alpha-safe)
  // for formats that can carry transparency; only use lossy JPEG otherwise.
  if (TRANSPARENCY_FORMATS.includes(file.type)) {
    return canvas.toDataURL("image/png");
  }
  return canvas.toDataURL("image/jpeg", quality);
}
