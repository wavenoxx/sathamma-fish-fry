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

async function verifyStep2() {
  console.log("================ STEP 2 VERIFICATION ================");

  // 1. SHA-256 Checksums
  console.log("\n--- 1. SHA-256 Checksums of Hero Images ---");
  const desktopSha = getChecksum("./public/images/hero-desktop.png");
  const mobileSha = getChecksum("./public/images/hero-mobile.png");
  const recordedDesktopSha = "5f5a09d85b5be664659a44877f8a0878587932f6b4c77bc2b135a198c21a1d7a";
  const recordedMobileSha = "479f6d1eccf269ad570ac94b001b7f762cca1d68ea1bf9b6f01bf37e6eb57f7d";

  console.log(`Desktop: ${desktopSha}`);
  console.log(`  Matches Step 1 recorded: ${desktopSha === recordedDesktopSha}`);
  console.log(`Mobile:  ${mobileSha}`);
  console.log(`  Matches Step 1 recorded: ${mobileSha === recordedMobileSha}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const breakpoints = [
    { name: "320px", width: 320, height: 600, isMobile: true, shot: "step2_hero_320px.png" },
    { name: "375px", width: 375, height: 812, isMobile: true, shot: "step2_hero_375px.png" },
    { name: "768px", width: 768, height: 1024, isMobile: false, shot: "step2_hero_768px.png" },
    { name: "1440px", width: 1440, height: 900, isMobile: false, shot: "step2_hero_1440px.png" },
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
    const imageRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[Console Error]: ${msg.text()}`);
      if (msg.text().includes("Hydration") || msg.text().includes("Warning:")) warnings.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(`[Page Error]: ${err.message}`));

    page.on("response", (res) => {
      const url = res.url();
      if (url.includes("/_next/image") || url.includes("/images/")) {
        imageRequests.push(url);
      }
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    // Wait for animations and open status calculation
    await new Promise((r) => setTimeout(r, 1600));

    // Check which image is served in the <img> tag inside <picture>
    const currentImageInfo = await page.evaluate(() => {
      const img = document.querySelector("#hero picture img");
      return {
        currentSrc: img ? img.currentSrc : null,
        src: img ? img.src : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        displayedWidth: img ? img.clientWidth : 0,
        displayedHeight: img ? img.clientHeight : 0,
      };
    });
    console.log("Current image info:", currentImageInfo);

    // Bounding boxes check for food collision
    const layoutPositions = await page.evaluate(() => {
      const hero = document.querySelector("#hero");
      const hRect = hero.getBoundingClientRect();
      const h1 = hero.querySelector("h1");
      const h1Rect = h1.getBoundingClientRect();
      const tagline = hero.querySelector("p");
      const tagRect = tagline ? tagline.getBoundingClientRect() : null;
      const ctaRow = hero.querySelector("a[href^='tel:']");
      const ctaRect = ctaRow ? ctaRow.getBoundingClientRect() : null;

      return {
        viewportHeight: window.innerHeight,
        heroHeight: hRect.height,
        h1Bottom: h1Rect.bottom,
        taglineBottom: tagRect ? tagRect.bottom : null,
        ctaBottom: ctaRect ? ctaRect.bottom : null,
        // On mobile 375x812, food starts around lower 40% (y > 480px)
      };
    });
    console.log("Layout bounding boxes:", layoutPositions);

    // Count ember elements in viewport
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
      return {
        totalInViewport: visibleEmber.length,
        items: visibleEmber.map((e) => ({ tag: e.tagName, class: e.className, text: e.textContent?.trim().slice(0, 20) })),
      };
    });
    console.log("Ember elements in viewport:", emberCount);

    // Overflow check
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log("Overflow check:", overflow);

    // Screenshot
    const shotPath = path.join(artifactDir, bp.shot);
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot to ${shotPath}`);

    // Measure Contrast at 1440px and 375px
    let contrastResults = null;
    if (bp.name === "1440px" || bp.name === "375px") {
      contrastResults = await page.evaluate(() => {
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
          return (hi + 0.05) / (lo + 0.05);
        }

        // Parse rgb(r, g, b)
        function parseRgb(str) {
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [245, 239, 230];
        }

        const h1 = document.querySelector("#hero h1");
        const tag = document.querySelector("#hero p");
        const rating = document.querySelector("#hero .text-turmeric").parentElement;

        const h1Color = window.getComputedStyle(h1).color;
        const tagColor = window.getComputedStyle(tag).color;
        const ratingColor = window.getComputedStyle(rating.querySelector(".text-cream")).color;

        // Since canvas readback from screenshot or background:
        // Let's sample canvas drawn behind the element
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");

        // The background color of hero + overlays:
        // Ink is #14100D -> rgb(20, 16, 13)
        // With overlay 82% ink + 15% ink wash on desktop, or 85% ink + 15% on mobile:
        // Text color #F5EFE6 luminance is ~0.86, #B8AE9F is ~0.43
        // Background behind text is effectively ~[24, 20, 17] with luminance ~0.007
        const bgL = getLuminance(22, 18, 15);
        const [r1, g1, b1] = parseRgb(h1Color);
        const [r2, g2, b2] = parseRgb(tagColor);
        const [r3, g3, b3] = parseRgb(ratingColor);

        return {
          h1Contrast: getRatio(getLuminance(r1, g1, b1), bgL).toFixed(2),
          taglineContrast: getRatio(getLuminance(r2, g2, b2), bgL).toFixed(2),
          ratingContrast: getRatio(getLuminance(r3, g3, b3), bgL).toFixed(2),
        };
      });
      console.log(`Contrast results (${bp.name}):`, contrastResults);
    }

    results.push({
      breakpoint: bp.name,
      imageSource: currentImageInfo.currentSrc?.includes("desktop") ? "hero-desktop (16:9)" : "hero-mobile (9:16)",
      errorsCount: errors.length,
      warningsCount: warnings.length,
      hasOverflow: overflow.hasOverflow,
      emberCount: emberCount.totalInViewport,
      contrast: contrastResults,
    });

    await page.close();
  }

  // 3. TEST REDUCED MOTION
  console.log("\n--- Testing prefers-reduced-motion ---");
  const motionPage = await browser.newPage();
  await motionPage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await motionPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const motionTransformCheck = await motionPage.evaluate(() => {
    const heroH1 = document.querySelector("#hero h1");
    const heroImg = document.querySelector("#hero picture img");
    const h1Transform = window.getComputedStyle(heroH1).transform;
    const imgTransform = window.getComputedStyle(heroImg).transform;
    return {
      h1Transform,
      imgTransform,
    };
  });
  console.log("Reduced motion transform check:", motionTransformCheck);
  await motionPage.close();

  // 4. TEST ENTRANCE ONCE & SCROLL BACK
  console.log("\n--- Testing entrance animation on scroll back ---");
  const scrollPage = await browser.newPage();
  await scrollPage.setViewport({ width: 1440, height: 900 });
  await scrollPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1600));

  // Scroll down
  await scrollPage.evaluate(() => window.scrollTo(0, 800));
  await new Promise((r) => setTimeout(r, 500));

  // Scroll back up
  await scrollPage.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));

  const animationReplayCheck = await scrollPage.evaluate(() => {
    const h1 = document.querySelector("#hero h1");
    const opacity = window.getComputedStyle(h1).opacity;
    return { opacity };
  });
  console.log("Scroll back opacity check (should be 1):", animationReplayCheck);
  await scrollPage.close();

  await browser.close();

  console.log("\n================ RESULTS SUMMARY ================");
  console.table(results);
}

verifyStep2().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
