import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { defaultPortfolioContent, mergePortfolioContent, PortfolioContentConfig } from "./portfolio-content";

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "portfolio-content.json");

export function readPortfolioContent(): PortfolioContentConfig {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    return mergePortfolioContent(JSON.parse(raw));
  } catch {
    writePortfolioContent(defaultPortfolioContent);
    return defaultPortfolioContent;
  }
}

// Best-effort safety net: every save becomes a git commit, so a bad edit (by the
// admin, or by a future automated cleanup) can always be recovered from history.
// Silently does nothing if git isn't available/configured (e.g. on Vercel) —
// this must never block the actual content save.
function autoCommitContent(): void {
  try {
    if (!fs.existsSync(path.join(PROJECT_ROOT, ".git"))) return;
    execFileSync("git", ["add", "--", "content/portfolio-content.json"], { cwd: PROJECT_ROOT, stdio: "ignore" });
    execFileSync(
      "git",
      ["commit", "-m", `Update portfolio content (${new Date().toISOString()})`],
      { cwd: PROJECT_ROOT, stdio: "ignore" },
    );
  } catch {
    // Nothing to commit, git unavailable, or no identity configured — safe to skip.
  }
}

export function writePortfolioContent(content: PortfolioContentConfig): void {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2) + "\n", "utf-8");
  autoCommitContent();
}
