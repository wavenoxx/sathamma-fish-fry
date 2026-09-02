import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

async function verifyStep4Fix() {
  console.log("================ STEP 4 FIX VERIFICATION ================");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  // Helper for scrolling
  async function scrollToY(y) {
    await page.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }, y);
    await new Promise((r) => setTimeout(r, 400));
  }

  // Helper to get element top
  async function getElTop(selector) {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return 0;
      return el.getBoundingClientRect().top + window.pageYOffset;
    }, selector);
  }

  // 1. MOBILE VIEWPORT: 375 x 812
  console.log("\n--- 1. Mobile Viewport (375 x 812) ---");
  await page.setViewport({
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const specialsTop375 = await getElTop("#specials");
  const aboutTop375 = await getElTop("#about");

  // Specials top
  await scrollToY(specialsTop375 - 50);
  const shotSpecialsTop375 = path.join(artifactDir, "step4_fix_mobile_specials_top.png");
  await page.screenshot({ path: shotSpecialsTop375, fullPage: false });
  console.log(`Saved: ${shotSpecialsTop375}`);

  // Specials mid
  await scrollToY(specialsTop375 + 450);
  const shotSpecialsMid375 = path.join(artifactDir, "step4_fix_mobile_specials_mid.png");
  await page.screenshot({ path: shotSpecialsMid375, fullPage: false });
  console.log(`Saved: ${shotSpecialsMid375}`);

  // About top
  await scrollToY(aboutTop375 - 50);
  const shotAboutTop375 = path.join(artifactDir, "step4_fix_mobile_about_top.png");
  await page.screenshot({ path: shotAboutTop375, fullPage: false });
  console.log(`Saved: ${shotAboutTop375}`);

  // About mid
  await scrollToY(aboutTop375 + 450);
  const shotAboutMid375 = path.join(artifactDir, "step4_fix_mobile_about_mid.png");
  await page.screenshot({ path: shotAboutMid375, fullPage: false });
  console.log(`Saved: ${shotAboutMid375}`);

  // Measure mobile portrait width proportion
  const mobileProportions = await page.evaluate(() => {
    const container = document.querySelector("#about .max-w-\\[1160px\\]") || document.querySelector("#about").firstElementChild;
    const cWidth = container.getBoundingClientRect().width;
    const portraitSlot = document.querySelector('[data-slot-id="about-portrait"]');
    const pWidth = portraitSlot ? portraitSlot.getBoundingClientRect().width : 0;
    const ratio = pWidth / cWidth;
    return {
      containerWidth: Math.round(cWidth),
      portraitWidth: Math.round(pWidth),
      ratio: ratio.toFixed(3),
      percentage: (ratio * 100).toFixed(1) + "%",
    };
  });
  console.log("Mobile portrait width proportion:", mobileProportions);

  // 2. TABLET VIEWPORT: 768 x 1024
  console.log("\n--- 2. Tablet Viewport (768 x 1024) ---");
  await page.setViewport({
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: false,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const specialsTop768 = await getElTop("#specials");
  const aboutTop768 = await getElTop("#about");

  // Specials tablet
  await scrollToY(specialsTop768 - 76);
  const shotSpecials768 = path.join(artifactDir, "step4_fix_tablet_specials.png");
  await page.screenshot({ path: shotSpecials768, fullPage: false });
  console.log(`Saved: ${shotSpecials768}`);

  // About tablet
  await scrollToY(aboutTop768 - 76);
  const shotAbout768 = path.join(artifactDir, "step4_fix_tablet_about.png");
  await page.screenshot({ path: shotAbout768, fullPage: false });
  console.log(`Saved: ${shotAbout768}`);

  // Measure tablet specials column layout (must be single column)
  const tabletSpecialsLayout = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#specials article"));
    const rects = cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { left: Math.round(r.left), width: Math.round(r.width), top: Math.round(r.top) };
    });
    const allSameLeft = rects.every((r) => Math.abs(r.left - rects[0].left) < 5);
    return {
      cardCount: cards.length,
      allSameLeft,
      isSingleColumn: allSameLeft,
      rects,
    };
  });
  console.log("Tablet Specials single-column check:", tabletSpecialsLayout);

  // 3. DESKTOP VIEWPORT: 1440 x 900
  console.log("\n--- 3. Desktop Viewport (1440 x 900) ---");
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    isMobile: false,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const specialsTop1440 = await getElTop("#specials");
  const menuTop1440 = await getElTop("#menu");
  const aboutTop1440 = await getElTop("#about");

  // Specials top
  await scrollToY(specialsTop1440 - 76);
  const shotSpecialsTop1440 = path.join(artifactDir, "step4_fix_desktop_specials_top.png");
  await page.screenshot({ path: shotSpecialsTop1440, fullPage: false });
  console.log(`Saved: ${shotSpecialsTop1440}`);

  // Specials offset mid-scroll
  await scrollToY(specialsTop1440 + 320);
  const shotSpecialsMid1440 = path.join(artifactDir, "step4_fix_desktop_specials_mid.png");
  await page.screenshot({ path: shotSpecialsMid1440, fullPage: false });
  console.log(`Saved: ${shotSpecialsMid1440}`);

  // About
  await scrollToY(aboutTop1440 - 76);
  const shotAbout1440 = path.join(artifactDir, "step4_fix_desktop_about.png");
  await page.screenshot({ path: shotAbout1440, fullPage: false });
  console.log(`Saved: ${shotAbout1440}`);

  // Boundary between menu and about
  await scrollToY(aboutTop1440 - 320);
  const shotBoundary1440 = path.join(artifactDir, "step4_fix_desktop_boundary_menu_about.png");
  await page.screenshot({ path: shotBoundary1440, fullPage: false });
  console.log(`Saved: ${shotBoundary1440}`);

  // Inspect About heading alignment
  const aboutHeadingCheck = await page.evaluate(() => {
    const about = document.querySelector("#about");
    const label = about.querySelector('[class*="uppercase"]');
    const h2 = about.querySelector("h2");
    const lRect = label.getBoundingClientRect();
    const hRect = h2.getBoundingClientRect();
    const spaceBetween = hRect.top - lRect.bottom;
    const diffLeft = Math.abs(lRect.left - hRect.left);
    return {
      labelLeft: Math.round(lRect.left),
      h2Left: Math.round(hRect.left),
      diffLeft: Math.round(diffLeft),
      isLeftAligned: diffLeft < 2,
      spaceBetweenPx: Math.round(spaceBetween),
      isDirectlyAbove: spaceBetween > 10 && spaceBetween < 24,
    };
  });
  console.log("About heading visual grouping & alignment:", aboutHeadingCheck);

  // 4. 320PX OVERFLOW & BOUNDING RECTS
  console.log("\n--- 4. 320px Overflow & Bounding Rect Audit ---");
  await page.setViewport({ width: 320, height: 800, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const overflow320 = await page.evaluate(() => {
    const scrollWidth = document.body.scrollWidth;
    const clientWidth = document.body.clientWidth;
    const overflowingElements = [];

    const sections = ["#specials", "#about"];
    sections.forEach((sel) => {
      const sec = document.querySelector(sel);
      if (!sec) return;
      const container = sec.querySelector(".max-w-\\[1160px\\]") || sec.firstElementChild;
      const cRect = container.getBoundingClientRect();
      const all = sec.querySelectorAll("*");

      all.forEach((el) => {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) return;
        const cs = window.getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;

        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          if (r.left < cRect.left - 0.5) {
            overflowingElements.push({
              section: sel,
              tag: el.tagName,
              text: el.textContent?.trim().slice(0, 30),
              diffLeft: r.left - cRect.left,
            });
          }
        }
      });
    });

    return {
      scrollWidth,
      clientWidth,
      hasOverflow: scrollWidth > clientWidth,
      overflowingElements,
    };
  });
  console.log(`320px scrollWidth === clientWidth: ${!overflow320.hasOverflow} (${overflow320.scrollWidth}/${overflow320.clientWidth})`);
  console.log("320px overflowing elements:", overflow320.overflowingElements);

  // 5. CLS SCORE
  const clsScore = await page.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 500);
    });
  });

  console.log(`\nCLS Measurement: ${clsScore.toFixed(3)}`);
  console.log(`Console Errors: ${consoleErrors.length}`);

  await browser.close();
  console.log("\n================ VERIFICATION COMPLETE ================");
}

verifyStep4Fix().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
