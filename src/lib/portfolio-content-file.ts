import fs from "node:fs";
import path from "node:path";
import { defaultPortfolioContent, mergePortfolioContent, PortfolioContentConfig } from "./portfolio-content";

const CONTENT_DIR = path.join(process.cwd(), "content");
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

export function writePortfolioContent(content: PortfolioContentConfig): void {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2) + "\n", "utf-8");
}
