// Recolors the downloaded LottieFiles animations (lottie/source/*.json) to the site palette and
// packs each one as a .lottie file in public/lottie/. Run with `node scripts/build-lottie.mjs`
// after changing lottie/icons.json; the generated files are committed.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { strToU8, zipSync } from "fflate";

const icons = JSON.parse(readFileSync("lottie/icons.json", "utf8"));
const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// Every fill/stroke color is a static [r,g,b,a] or a list of keyframes with { s: [r,g,b,a] }.
function colorValues(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => colorValues(n, out));
  else if (node && typeof node === "object") {
    if ((node.ty === "fl" || node.ty === "st") && node.c) {
      const k = node.c.k;
      if (Array.isArray(k) && typeof k[0] === "number") out.push(k);
      else if (Array.isArray(k)) k.forEach((frame) => frame.s && out.push(frame.s));
    }
    Object.values(node).forEach((v) => colorValues(v, out));
  }
  return out;
}

mkdirSync("public/lottie", { recursive: true });
let total = 0;
for (const icon of icons) {
  const anim = JSON.parse(readFileSync(`lottie/source/${icon.key}.json`, "utf8"));
  if ((anim.assets ?? []).some((a) => a.p)) throw new Error(`${icon.key}: embedded images cannot be recolored`);
  const values = colorValues(anim);
  // The darkest original color becomes the primary accent, every lighter one the secondary.
  const darkest = Math.min(...values.map((c) => luminance(c)));
  const [p, s] = [hexToRgb(icon.primary), hexToRgb(icon.secondary)];
  for (const c of values) c.splice(0, 3, ...(luminance(c) - darkest < 0.05 ? p : s));

  const manifest = { version: "1", generator: "scripts/build-lottie.mjs", animations: [{ id: icon.key }] };
  const zip = zipSync(
    {
      "manifest.json": strToU8(JSON.stringify(manifest)),
      [`animations/${icon.key}.json`]: strToU8(JSON.stringify(anim)),
    },
    { level: 9 },
  );
  writeFileSync(`public/lottie/${icon.key}.lottie`, zip);
  total += zip.length;
  console.log(`${icon.key.padEnd(11)} ${String(zip.length).padStart(6)} B  (${values.length} colors)`);
}
console.log(`total       ${String(total).padStart(6)} B`);
