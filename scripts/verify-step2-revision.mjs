import puppeteer from "puppeteer-core";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

function getChecksum(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sRGBtoLin(colorChannel) {
  const c = colorChannel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getLuminance(r, g, b) {
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
}

function getContrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function verifyStep2Revision() {
  console.log("================ STEP 2 REVISION VERIFICATION ================");

  // 1. Checksums
  console.log("\n--- 1. SHA-256 Checksums ---");
  const desktopSha = getChecksum("./public/images/hero-desktop.png");
  const mobileSha = getChecksum("./public/images/hero-mobile.png");
  const recordedDesktopSha = "5f5a09d85b5be664659a44877f8a0878587932f6b4c77bc2b135a198c21a1d7a";
  const recordedMobileSha = "479f6d1eccf269ad570ac94b001b7f762cca1d68ea1bf9b6f01bf37e6eb57f7d";

  console.log(`Desktop: ${desktopSha} (matches: ${desktopSha === recordedDesktopSha})`);
  console.log(`Mobile:  ${mobileSha} (matches: ${mobileSha === recordedMobileSha})`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const breakpoints = [
    { name: "320px", width: 320, height: 600, isMobile: true, shot: "step2_rev_320px.png" },
    { name: "375px", width: 375, height: 812, isMobile: true, shot: "step2_rev_375px.png" },
    { name: "430px", width: 430, height: 932, isMobile: true, shot: "step2_rev_430px.png" },
    { name: "768px", width: 768, height: 1024, isMobile: false, shot: "step2_rev_768px.png" },
    { name: "1024px", width: 1024, height: 768, isMobile: false, shot: "step2_rev_1024px.png" },
    { name: "1440px", width: 1440, height: 900, isMobile: false, shot: "step2_rev_1440px.png" },
  ];

  const results = [];

  for (const bp of breakpoints) {
    console.log(`\n--- Testing breakpoint: ${bp.name} (${bp.width}x${bp.height}) ---`);
    const page = await browser.newPage();
    await page.setViewport({
      width: bp.width,
      height: bp.height,
      deviceScaleFactor: 2,
      isMobile: bp.isMobile,
      hasTouch: bp.isMobile,
    });

    const errors = [];
    const warnings = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[Console Error]: ${msg.text()}`);
      if (msg.text().includes("Hydration") || msg.text().includes("Warning:")) warnings.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(`[Page Error]: ${err.message}`));

    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1400));

    // 1. Ember element count
    const emberCount = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll("*"));
      const visibleEmber = all.filter((el) => {
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || cs.display === "none" || cs.visibility === "hidden") return false;
        if (rect.bottom < 0 || rect.top > window.innerHeight) return false;
        const bg = cs.backgroundColor;
        const color = cs.color;
        const isEmber = (c) => c.includes("196, 86, 42") || c.includes("196,86,42") || c.includes("#c4562a") || c.includes("#C4562A");
        return isEmber(bg) || isEmber(color);
      });
      return visibleEmber.length;
    });

    // 2. Interactive buttons in mobile hero viewport
    const interactiveButtons = await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll("a, button"));
      const inViewport = allButtons.filter((el) => {
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || cs.display === "none" || cs.visibility === "hidden") return false;
        if (rect.bottom < 0 || rect.top > window.innerHeight) return false;
        return true;
      });
      return inViewport.map((el) => ({
        tag: el.tagName,
        ariaLabel: el.getAttribute("aria-label"),
        href: el.getAttribute("href"),
        text: el.textContent?.trim().slice(0, 30),
      }));
    });

    // 3. Open status bottom Y position as % of viewport height
    const openStatusPosition = await page.evaluate(() => {
      const hero = document.querySelector("#hero");
      // Find open status element
      const statusText = hero.querySelector("span.text-cream-dim:last-of-type");
      const statusContainer = statusText ? statusText.parentElement : null;
      if (!statusContainer) return null;
      const rect = statusContainer.getBoundingClientRect();
      const vh = window.innerHeight;
      const bottomPx = rect.bottom;
      const percent = (bottomPx / vh) * 100;
      return {
        bottomPx: Math.round(bottomPx),
        percentOfViewport: percent.toFixed(1) + "%",
        isUnder50: percent < 50,
      };
    });

    // 4. H1 line count & text-wrapping
    const h1Details = await page.evaluate(() => {
      const h1 = document.querySelector("#hero h1");
      if (!h1) return null;
      const rect = h1.getBoundingClientRect();
      const lineHeight = parseFloat(window.getComputedStyle(h1).lineHeight);
      const lines = Math.round(rect.height / lineHeight);
      return {
        lines,
        text: h1.innerText.replace(/\n/g, " "),
        height: rect.height,
      };
    });

    // 5. Overflow check
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    // 6. Contrast ratios
    const contrast = await page.evaluate(() => {
      function sRGBtoLin(c) {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      }
      function getLuminance(r, g, b) {
        return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
      }
      function getRatio(l1, l2) {
        const hi = Math.max(l1, l2);
        const lo = Math.min(l1, l2);
        return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
      }
      function parseRgb(str) {
        const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [245, 239, 230];
      }

      // Background behind text is deep ink (>= 90% opacity over dark tones)
      // Actual background RGB is ~ [20, 16, 13]
      const bgL = getLuminance(20, 16, 13);

      const h1 = document.querySelector("#hero h1");
      const tag = document.querySelector("#hero p");
      const star = document.querySelector("#hero .text-turmeric");
      const rating = star ? star.parentElement.querySelector(".text-cream") : null;
      const status = document.querySelector("#hero span.text-cream-dim:last-of-type");

      const [r1, g1, b1] = parseRgb(window.getComputedStyle(h1).color);
      const [r2, g2, b2] = parseRgb(window.getComputedStyle(tag).color);
      const [r3, g3, b3] = parseRgb(window.getComputedStyle(rating).color);
      const [r4, g4, b4] = parseRgb(window.getComputedStyle(status).color);

      return {
        h1: getRatio(getLuminance(r1, g1, b1), bgL),
        tagline: getRatio(getLuminance(r2, g2, b2), bgL),
        rating: getRatio(getLuminance(r3, g3, b3), bgL),
        openStatus: getRatio(getLuminance(r4, g4, b4), bgL),
      };
    });

    // Save screenshot
    const shotPath = path.join(artifactDir, bp.shot);
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot: ${shotPath}`);

    results.push({
      breakpoint: bp.name,
      emberCount,
      interactiveButtonsCount: interactiveButtons.length,
      interactiveButtons: interactiveButtons.map((b) => b.text || b.ariaLabel),
      openStatusPosition,
      h1Details,
      contrast,
      hasOverflow: overflow.hasOverflow,
      errorsCount: errors.length,
      warningsCount: warnings.length,
    });

    await page.close();
  }

  await browser.close();

  console.log("\n================ SUMMARY TABLE ================");
  console.log(JSON.stringify(results, null, 2));
}

verifyStep2Revision().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
