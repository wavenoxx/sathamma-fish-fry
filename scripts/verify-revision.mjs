import puppeteer from "puppeteer-core";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

function getFileChecksum(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function verifyRevision() {
  console.log("=== STEP 1 REVISION VERIFICATION ===");

  // 0. CHECK HERO IMAGES
  console.log("\n--- 0. Hero Source Images Verification ---");
  const desktopImgPath = "./public/images/hero-desktop.png";
  const mobileImgPath = "./public/images/hero-mobile.png";

  const desktopStats = fs.statSync(desktopImgPath);
  const mobileStats = fs.statSync(mobileImgPath);
  const desktopSha = getFileChecksum(desktopImgPath);
  const mobileSha = getFileChecksum(mobileImgPath);

  console.log(`hero-desktop.png:`);
  console.log(`  Size: ${desktopStats.size} bytes (${(desktopStats.size / 1024).toFixed(2)} KB)`);
  console.log(`  SHA-256: ${desktopSha}`);

  console.log(`hero-mobile.png:`);
  console.log(`  Size: ${mobileStats.size} bytes (${(mobileStats.size / 1024).toFixed(2)} KB)`);
  console.log(`  SHA-256: ${mobileSha}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const errors = [];
  const warnings = [];
  const fontRequests = [];

  // 1. DESKTOP TEST (1440x900)
  console.log("\n--- 1. Testing Desktop (1440x900) ---");
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  desktopPage.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") errors.push(`[Console Error]: ${text}`);
    if (text.includes("Hydration") || text.includes("Warning:")) warnings.push(`[Warning]: ${text}`);
  });
  desktopPage.on("pageerror", (err) => errors.push(`[Page Error]: ${err.message}`));

  desktopPage.on("response", async (response) => {
    const url = response.url();
    if (url.includes(".woff2") || url.includes("/fonts/") || response.headers()["content-type"]?.includes("font")) {
      try {
        const buffer = await response.buffer();
        fontRequests.push({
          url: url.split("/").pop(),
          sizeKB: (buffer.length / 1024).toFixed(2),
          bytes: buffer.length,
        });
      } catch (e) {}
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Measure desktop CLS
  const desktopCLS = await desktopPage.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 500);
    });
  });
  console.log(`Desktop CLS: ${desktopCLS}`);

  // Check Telugu glyphs in DOM
  const teluguGlyphCount = await desktopPage.evaluate(() => {
    const teluguRegex = /[\u0C00-\u0C7F]/g;
    const bodyText = document.body.innerText;
    const matches = bodyText.match(teluguRegex);
    return matches ? matches.length : 0;
  });
  console.log(`Telugu glyph count on page: ${teluguGlyphCount}`);

  // Check header wordmark styling & hierarchy
  const wordmarkStyles = await desktopPage.evaluate(() => {
    const header = document.querySelector("header");
    const sathammaSpan = header.querySelector("a span:first-child");
    const fishFrySpan = header.querySelector("a span:last-child");
    const sathammaCS = window.getComputedStyle(sathammaSpan);
    const fishFryCS = window.getComputedStyle(fishFrySpan);
    const headerCS = window.getComputedStyle(header);
    return {
      headerHeight: headerCS.height,
      sathamma: {
        text: sathammaSpan.textContent,
        fontSize: sathammaCS.fontSize,
        fontFamily: sathammaCS.fontFamily,
        fontWeight: sathammaCS.fontWeight,
      },
      fishFry: {
        text: fishFrySpan.textContent,
        fontSize: fishFryCS.fontSize,
        fontFamily: fishFryCS.fontFamily,
        fontWeight: fishFryCS.fontWeight,
        letterSpacing: fishFryCS.letterSpacing,
      },
    };
  });
  console.log("Wordmark styles check:", JSON.stringify(wordmarkStyles, null, 2));

  // Screenshot at scroll 0
  const desktopTopPath = path.join(artifactDir, "revision_desktop_top.png");
  await desktopPage.screenshot({ path: desktopTopPath });
  console.log(`Saved ${desktopTopPath}`);

  // Test Call button hover transition on desktop
  const callBtn = await desktopPage.$('header a[href^="tel:"]');
  if (callBtn) {
    await callBtn.hover();
    await new Promise((r) => setTimeout(r, 300));
  }
  const desktopCallHoverPath = path.join(artifactDir, "revision_desktop_call_hover.png");
  await desktopPage.screenshot({ path: desktopCallHoverPath });
  console.log(`Saved ${desktopCallHoverPath}`);

  // Scroll past 200px
  await desktopPage.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 400));
  const desktopScrolledPath = path.join(artifactDir, "revision_desktop_scrolled.png");
  await desktopPage.screenshot({ path: desktopScrolledPath });
  console.log(`Saved ${desktopScrolledPath}`);

  await desktopPage.close();

  // 2. MOBILE TEST (375x812)
  console.log("\n--- 2. Testing Mobile (375x812) ---");
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  mobilePage.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") errors.push(`[Mobile Error]: ${text}`);
    if (text.includes("Hydration") || text.includes("Warning:")) warnings.push(`[Mobile Warning]: ${text}`);
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // Measure mobile CLS
  const mobileCLS = await mobilePage.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 500);
    });
  });
  console.log(`Mobile CLS: ${mobileCLS}`);

  // Check mobile action bar specs
  const mobileBarInfo = await mobilePage.evaluate(() => {
    const bar = document.querySelector('aside[aria-label="Quick Actions"]');
    const barCS = window.getComputedStyle(bar);
    const grid = bar.querySelector(".grid");
    const gridCS = window.getComputedStyle(grid);
    const items = Array.from(bar.querySelectorAll("a")).map((a) => {
      const icon = a.querySelector("svg");
      const iconCS = window.getComputedStyle(icon);
      const label = a.querySelector("span");
      const labelCS = window.getComputedStyle(label);
      const aRect = a.getBoundingClientRect();
      return {
        text: label.textContent,
        iconColor: iconCS.color,
        iconWidth: iconCS.width,
        iconHeight: iconCS.height,
        labelFontSize: labelCS.fontSize,
        labelTracking: labelCS.letterSpacing,
        touchHeight: aRect.height,
        touchWidth: aRect.width,
      };
    });
    return {
      barBg: barCS.backgroundColor,
      gridHeight: gridCS.height,
      items,
    };
  });
  console.log("Mobile action bar specs:", JSON.stringify(mobileBarInfo, null, 2));

  // Mobile Top Screenshot
  const mobileTopPath = path.join(artifactDir, "revision_mobile_375_top.png");
  await mobilePage.screenshot({ path: mobileTopPath });
  console.log(`Saved ${mobileTopPath}`);

  // Scroll mobile past 200px
  await mobilePage.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 400));
  const mobileScrolledPath = path.join(artifactDir, "revision_mobile_375_scrolled.png");
  await mobilePage.screenshot({ path: mobileScrolledPath });
  console.log(`Saved ${mobileScrolledPath}`);

  await mobilePage.close();

  // 3. TESTING 320px VIEWPORT FOR OVERFLOW
  console.log("\n--- 3. Testing 320px Viewport (iPhone SE small) ---");
  const smallPage = await browser.newPage();
  await smallPage.setViewport({ width: 320, height: 600, deviceScaleFactor: 2 });
  await smallPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const overflow320 = await smallPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log("320px Overflow check:", overflow320);

  const mobile320Path = path.join(artifactDir, "revision_mobile_320.png");
  await smallPage.screenshot({ path: mobile320Path });
  console.log(`Saved ${mobile320Path}`);

  await smallPage.close();
  await browser.close();

  // 4. FONT PAYLOAD REPORT
  console.log("\n--- 4. Font Payload Report ---");
  console.log(`Total fonts loaded in browser: ${fontRequests.length}`);
  let totalFontBytes = 0;
  fontRequests.forEach((f) => {
    console.log(`  - Font: ${f.url} (${f.sizeKB} KB)`);
    totalFontBytes += f.bytes;
  });
  console.log(`Total font payload: ${(totalFontBytes / 1024).toFixed(2)} KB`);

  // SUMMARY
  console.log("\n--- Verification Summary ---");
  console.log(`Errors: ${errors.length}`);
  if (errors.length > 0) console.error(errors);
  console.log(`Warnings: ${warnings.length}`);
  if (warnings.length > 0) console.warn(warnings);
}

verifyRevision().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
