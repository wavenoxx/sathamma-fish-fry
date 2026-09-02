import puppeteer from "puppeteer-core";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

function getChecksum(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

async function verifyFinal() {
  console.log("=== STEP 1 FINAL REVISION VERIFICATION ===");

  // 1. HERO SOURCE IMAGES CHECKSUM VERIFICATION
  console.log("\n--- 1. Hero Source Image Checksums ---");
  const desktopImg = "./public/images/hero-desktop.png";
  const mobileImg = "./public/images/hero-mobile.png";

  const dSha = getChecksum(desktopImg);
  const mSha = getChecksum(mobileImg);
  const dStats = fs.statSync(desktopImg);
  const mStats = fs.statSync(mobileImg);

  console.log(`hero-desktop.png: ${dStats.size} bytes (${(dStats.size / 1024).toFixed(2)} KB)`);
  console.log(`  SHA-256: ${dSha}`);
  console.log(`hero-mobile.png: ${mStats.size} bytes (${(mStats.size / 1024).toFixed(2)} KB)`);
  console.log(`  SHA-256: ${mSha}`);

  const prevDesktopSha = "5f5a09d85b5be664659a44877f8a0878587932f6b4c77bc2b135a198c21a1d7a";
  const prevMobileSha = "479f6d1eccf269ad570ac94b001b7f762cca1d68ea1bf9b6f01bf37e6eb57f7d";

  const matchesDesktop = dSha === prevDesktopSha;
  const matchesMobile = mSha === prevMobileSha;
  console.log(`  Matches recorded desktop checksum: ${matchesDesktop}`);
  console.log(`  Matches recorded mobile checksum: ${matchesMobile}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const errors = [];
  const warnings = [];
  const fontRequests = [];

  // Helper to count ember elements
  async function countEmberElements(page) {
    return await page.evaluate(() => {
      // #C4562A in rgb is rgb(196, 86, 42)
      // in oklab or hex
      const allElements = Array.from(document.querySelectorAll("*"));
      const emberEls = allElements.filter((el) => {
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        // check if visible
        if (rect.width === 0 || rect.height === 0 || cs.display === "none" || cs.visibility === "hidden") {
          return false;
        }
        // check if within current viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight) return false;

        const bg = cs.backgroundColor;
        const color = cs.color;
        const border = cs.borderColor;

        const isEmber = (c) =>
          c.includes("196, 86, 42") ||
          c.includes("196,86,42") ||
          c.includes("#c4562a") ||
          c.includes("#C4562A") ||
          (c.includes("oklab") && c.includes("0.55") && c.includes("0.1"));

        return isEmber(bg) || isEmber(color);
      });
      return {
        count: emberEls.length,
        tags: emberEls.map((e) => ({
          tag: e.tagName,
          className: e.className,
          text: e.textContent?.trim().slice(0, 30),
        })),
      };
    });
  }

  // 2. DESKTOP TEST (1440x900)
  console.log("\n--- 2. Testing Desktop (1440x900) ---");
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[Console Error]: ${msg.text()}`);
    if (msg.text().includes("Hydration") || msg.text().includes("Warning:")) warnings.push(msg.text());
  });
  desktopPage.on("pageerror", (err) => errors.push(`[Page Error]: ${err.message}`));

  desktopPage.on("response", async (res) => {
    const url = res.url();
    if (url.includes(".woff2") || url.includes("/fonts/") || res.headers()["content-type"]?.includes("font")) {
      try {
        const buf = await res.buffer();
        fontRequests.push({
          name: url.split("/").pop(),
          sizeKB: (buf.length / 1024).toFixed(2),
          bytes: buf.length,
        });
      } catch (e) {}
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Measure desktop CLS
  const desktopCLS = await desktopPage.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      obs.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        obs.disconnect();
        resolve(cls);
      }, 500);
    });
  });
  console.log(`Desktop CLS: ${desktopCLS}`);

  // Header dimensions & styling
  const headerInfo = await desktopPage.evaluate(() => {
    const header = document.querySelector("header");
    const headerRect = header.getBoundingClientRect();
    const wordmark = header.querySelector("a");
    const wordmarkRect = wordmark.getBoundingClientRect();
    const sathamma = wordmark.querySelector("span:first-child");
    const fishFry = wordmark.querySelector("span:last-child");
    const sCS = window.getComputedStyle(sathamma);
    const fCS = window.getComputedStyle(fishFry);

    return {
      headerHeight: headerRect.height,
      wordmarkHeight: wordmarkRect.height,
      sathamma: {
        fontSize: sCS.fontSize,
        fontFamily: sCS.fontFamily,
        fontWeight: sCS.fontWeight,
      },
      fishFry: {
        fontSize: fCS.fontSize,
        fontFamily: fCS.fontFamily,
        fontWeight: fCS.fontWeight,
        letterSpacing: fCS.letterSpacing,
      },
    };
  });
  console.log("Header info desktop:", JSON.stringify(headerInfo, null, 2));

  // Count ember on desktop at scroll 0
  const desktopEmber0 = await countEmberElements(desktopPage);
  console.log("Desktop Ember elements at scroll 0:", desktopEmber0);

  // Desktop screenshot scroll 0
  const dTopPath = path.join(artifactDir, "final_desktop_top.png");
  await desktopPage.screenshot({ path: dTopPath });
  console.log(`Saved ${dTopPath}`);

  // Scroll past 200px
  await desktopPage.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 400));

  const desktopEmberScrolled = await countEmberElements(desktopPage);
  console.log("Desktop Ember elements scrolled past 200px:", desktopEmberScrolled);

  const dScrolledPath = path.join(artifactDir, "final_desktop_scrolled.png");
  await desktopPage.screenshot({ path: dScrolledPath });
  console.log(`Saved ${dScrolledPath}`);

  await desktopPage.close();

  // 3. MOBILE TEST (375x812)
  console.log("\n--- 3. Testing Mobile (375x812) ---");
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[Mobile Error]: ${msg.text()}`);
    if (msg.text().includes("Hydration") || msg.text().includes("Warning:")) warnings.push(msg.text());
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileCLS = await mobilePage.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      obs.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        obs.disconnect();
        resolve(cls);
      }, 500);
    });
  });
  console.log(`Mobile CLS: ${mobileCLS}`);

  const mobileHeaderAndBar = await mobilePage.evaluate(() => {
    const header = document.querySelector("header");
    const hRect = header.getBoundingClientRect();
    const bar = document.querySelector('aside[aria-label="Quick Actions"]');
    const barGrid = bar.querySelector(".grid");
    const bRect = barGrid.getBoundingClientRect();
    return {
      mobileHeaderHeight: hRect.height,
      mobileActionBarHeight: bRect.height,
    };
  });
  console.log("Mobile Header & Bar dimensions:", mobileHeaderAndBar);

  const mobileEmber0 = await countEmberElements(mobilePage);
  console.log("Mobile Ember elements at scroll 0 (must be exactly 1):", mobileEmber0);

  const mTopPath = path.join(artifactDir, "final_mobile_top.png");
  await mobilePage.screenshot({ path: mTopPath });
  console.log(`Saved ${mTopPath}`);

  // Scroll mobile past 200px
  await mobilePage.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 400));

  const mobileEmberScrolled = await countEmberElements(mobilePage);
  console.log("Mobile Ember elements scrolled past 200px:", mobileEmberScrolled);

  const mScrolledPath = path.join(artifactDir, "final_mobile_scrolled.png");
  await mobilePage.screenshot({ path: mScrolledPath });
  console.log(`Saved ${mScrolledPath}`);

  await mobilePage.close();

  // 4. 320px OVERFLOW TEST
  console.log("\n--- 4. Testing 320px Viewport ---");
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

  const m320Path = path.join(artifactDir, "final_mobile_320.png");
  await smallPage.screenshot({ path: m320Path });
  console.log(`Saved ${m320Path}`);

  await smallPage.close();
  await browser.close();

  // 5. FONT PAYLOAD REPORT
  console.log("\n--- 5. Font Payload Report ---");
  console.log(`Total fonts loaded in browser: ${fontRequests.length}`);
  let totalFontBytes = 0;
  fontRequests.forEach((f) => {
    console.log(`  - Font: ${f.name} (${f.sizeKB} KB)`);
    totalFontBytes += f.bytes;
  });
  console.log(`Total font payload: ${(totalFontBytes / 1024).toFixed(2)} KB`);

  // 6. SUMMARY
  console.log("\n--- 6. Verification Summary ---");
  console.log(`Errors count: ${errors.length}`);
  if (errors.length > 0) console.error(errors);
  console.log(`Warnings count: ${warnings.length}`);
  if (warnings.length > 0) console.warn(warnings);
}

verifyFinal().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
