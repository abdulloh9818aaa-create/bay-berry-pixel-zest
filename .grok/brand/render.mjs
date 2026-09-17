import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const html = join(root, "card.html");

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shoot(kind, w, h, out) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${html}?kind=${kind}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const frame = page.locator("#frame");
  await frame.screenshot({ path: out, type: "png" });
  await page.close();
  console.log("wrote", out);
}

try {
  await shoot("og", 1200, 630, join(root, "og-raw.png"));
  await shoot("banner", 1200, 264, join(root, "banner-raw.png"));
} finally {
  await browser.close();
}
