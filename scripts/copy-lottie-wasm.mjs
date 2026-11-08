// Self-hosts the dotlottie renderer, so the player never loads it from a CDN (no third-party
// request). Runs before dev and build; the copy is not committed and always matches the installed version.
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const dist = dirname(require.resolve("@lottiefiles/dotlottie-web"));
mkdirSync("public/lottie", { recursive: true });
copyFileSync(join(dist, "dotlottie-player.wasm"), "public/lottie/dotlottie-player.wasm");
console.log("copied dotlottie-player.wasm to public/lottie/");
