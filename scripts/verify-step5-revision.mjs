import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

async function verifyStep5Revision() {
  console.log("================ STEP 5 REVISION VERIFICATION ================");

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

  async function scrollToY(y) {
    await page.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }, y);
    await new Promise((r) => setTimeout(r, 400));
  }

  // 1. Check Page Order
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const sectionsOrder = await page.evaluate(() => {
    const mainChildren = Array.from(document.querySelector("main").children);
    return mainChildren.map((el) => {
      if (el.id) return `#${el.id}`;
      if (el.tagName === "FOOTER") return "footer";
      return el.tagName.toLowerCase();
    });
  });
  console.log("Rendered Page Section Order:", sectionsOrder);

  // 2. Desktop Gallery -> Visit Transition (1440 x 900)
  console.log("\n--- Capturing Desktop Gallery -> Visit Transition ---");
  const galleryRect1440 = await page.evaluate(() => {
    const el = document.querySelector("#gallery");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.pageYOffset, height: r.height, bottom: r.bottom + window.pageYOffset };
  });
  const visitRect1440 = await page.evaluate(() => {
    const el = document.querySelector("#visit");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.pageYOffset, height: r.height };
  });

  console.log("Desktop Coordinates:", { gallery: galleryRect1440, visit: visitRect1440 });

  // Scroll to show the bottom of Gallery and the top of Visit together
  await scrollToY(galleryRect1440.bottom - 450);
  const shotDesktopTransition = path.join(artifactDir, "step5_revision_desktop_gallery_to_visit.png");
  await page.screenshot({ path: shotDesktopTransition, fullPage: false });
  console.log(`Saved: ${shotDesktopTransition}`);

  // 3. Mobile Gallery -> Visit Transition (375 x 812)
  console.log("\n--- Capturing Mobile Gallery -> Visit Transition ---");
  await page.setViewport({
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const galleryRect375 = await page.evaluate(() => {
    const el = document.querySelector("#gallery");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.pageYOffset, height: r.height, bottom: r.bottom + window.pageYOffset };
  });
  const visitRect375 = await page.evaluate(() => {
    const el = document.querySelector("#visit");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.pageYOffset, height: r.height };
  });

  console.log("Mobile Coordinates:", { gallery: galleryRect375, visit: visitRect375 });

  // Scroll to transition boundary on mobile
  await scrollToY(galleryRect375.bottom - 380);
  const shotMobileTransition = path.join(artifactDir, "step5_revision_mobile_gallery_to_visit.png");
  await page.screenshot({ path: shotMobileTransition, fullPage: false });
  console.log(`Saved: ${shotMobileTransition}`);

  // 4. Check Spacing & Padding on Gallery and Visit
  const spacingAudit = await page.evaluate(() => {
    const gal = document.querySelector("#gallery");
    const vis = document.querySelector("#visit");
    const galStyle = window.getComputedStyle(gal);
    const visStyle = window.getComputedStyle(vis);
    return {
      gallery: {
        paddingTop: galStyle.paddingTop,
        paddingBottom: galStyle.paddingBottom,
        borderBottom: galStyle.borderBottom,
      },
      visit: {
        paddingTop: visStyle.paddingTop,
        paddingBottom: visStyle.paddingBottom,
        borderBottom: visStyle.borderBottom,
      },
    };
  });
  console.log("\nSpacing & Padding Audit:", spacingAudit);

  // 5. 320px Horizontal Overflow
  console.log("\n--- 320px Horizontal Overflow Audit ---");
  await page.setViewport({ width: 320, height: 800, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const overflow320 = await page.evaluate(() => {
    return {
      scrollWidth: document.body.scrollWidth,
      clientWidth: document.body.clientWidth,
      noOverflow: document.body.scrollWidth === document.body.clientWidth,
    };
  });
  console.log("320px Overflow:", overflow320);

  // 6. CLS
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
  console.log(`CLS Measurement: ${clsScore.toFixed(3)}`);
  console.log(`Console Errors: ${consoleErrors.length}`);

  await browser.close();
  console.log("\n================ VERIFICATION COMPLETE ================");
}

verifyStep5Revision().catch((err) => {
  console.error(err);
  process.exit(1);
});
