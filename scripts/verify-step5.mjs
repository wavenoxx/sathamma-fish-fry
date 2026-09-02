import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

async function verifyStep5() {
  console.log("================ STEP 5 VERIFICATION ================");

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

  async function getElTop(selector) {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return 0;
      return el.getBoundingClientRect().top + window.pageYOffset;
    }, selector);
  }

  // 1. MOBILE VIEWPORT (375 x 812)
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

  const galleryTop375 = await getElTop("#gallery");
  const reviewsTop375 = await getElTop("#reviews");
  const visitTop375 = await getElTop("#visit");
  const footerTop375 = await getElTop("footer");

  // Mobile Gallery top
  await scrollToY(galleryTop375 - 50);
  const shotMobileGalleryTop = path.join(artifactDir, "step5_mobile_gallery_top.png");
  await page.screenshot({ path: shotMobileGalleryTop, fullPage: false });
  console.log(`Saved: ${shotMobileGalleryTop}`);

  // Mobile Gallery mid
  await scrollToY(galleryTop375 + 400);
  const shotMobileGalleryMid = path.join(artifactDir, "step5_mobile_gallery_mid.png");
  await page.screenshot({ path: shotMobileGalleryMid, fullPage: false });
  console.log(`Saved: ${shotMobileGalleryMid}`);

  // Mobile Reviews
  await scrollToY(reviewsTop375 - 50);
  const shotMobileReviews = path.join(artifactDir, "step5_mobile_reviews.png");
  await page.screenshot({ path: shotMobileReviews, fullPage: false });
  console.log(`Saved: ${shotMobileReviews}`);

  // Mobile Visit details
  await scrollToY(visitTop375 - 50);
  const shotMobileVisitDetails = path.join(artifactDir, "step5_mobile_visit_details.png");
  await page.screenshot({ path: shotMobileVisitDetails, fullPage: false });
  console.log(`Saved: ${shotMobileVisitDetails}`);

  // Mobile Visit map
  await scrollToY(visitTop375 + 480);
  const shotMobileVisitMap = path.join(artifactDir, "step5_mobile_visit_map.png");
  await page.screenshot({ path: shotMobileVisitMap, fullPage: false });
  console.log(`Saved: ${shotMobileVisitMap}`);

  // Mobile Footer
  await scrollToY(footerTop375 - 50);
  const shotMobileFooter = path.join(artifactDir, "step5_mobile_footer.png");
  await page.screenshot({ path: shotMobileFooter, fullPage: false });
  console.log(`Saved: ${shotMobileFooter}`);

  // Check ember count in mobile viewports
  const mobileEmberAudit = await page.evaluate(() => {
    // Check elements with bg-ember, text-ember, etc.
    const all = Array.from(document.querySelectorAll("*"));
    const emberEls = all.filter((el) => {
      const cs = window.getComputedStyle(el);
      const bg = cs.backgroundColor;
      const col = cs.color;
      // Ember is rgb(194, 84, 41) or #C25429
      const isEmberBg = bg.includes("194, 84, 41") || bg.includes("194,84,41");
      const isEmberCol = col.includes("194, 84, 41") || col.includes("194,84,41");
      return isEmberBg || isEmberCol;
    });
    return {
      totalEmberElements: emberEls.length,
      descriptions: emberEls.map((el) => ({
        tag: el.tagName,
        classes: el.className,
        text: el.textContent?.trim().slice(0, 30),
      })),
    };
  });
  console.log("Mobile Ember Audit (Sticky Action Bar Call button only):", mobileEmberAudit);

  // 2. TABLET VIEWPORT (768 x 1024)
  console.log("\n--- 2. Tablet Viewport (768 x 1024) ---");
  await page.setViewport({
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: false,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const galleryTop768 = await getElTop("#gallery");
  const reviewsTop768 = await getElTop("#reviews");
  const visitTop768 = await getElTop("#visit");

  // Tablet Gallery
  await scrollToY(galleryTop768 - 76);
  const shotTabletGallery = path.join(artifactDir, "step5_tablet_gallery.png");
  await page.screenshot({ path: shotTabletGallery, fullPage: false });
  console.log(`Saved: ${shotTabletGallery}`);

  // Tablet Reviews
  await scrollToY(reviewsTop768 - 76);
  const shotTabletReviews = path.join(artifactDir, "step5_tablet_reviews.png");
  await page.screenshot({ path: shotTabletReviews, fullPage: false });
  console.log(`Saved: ${shotTabletReviews}`);

  // Tablet Visit
  await scrollToY(visitTop768 - 76);
  const shotTabletVisit = path.join(artifactDir, "step5_tablet_visit.png");
  await page.screenshot({ path: shotTabletVisit, fullPage: false });
  console.log(`Saved: ${shotTabletVisit}`);

  // 3. DESKTOP VIEWPORT (1440 x 900)
  console.log("\n--- 3. Desktop Viewport (1440 x 900) ---");
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    isMobile: false,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const galleryTop1440 = await getElTop("#gallery");
  const reviewsTop1440 = await getElTop("#reviews");
  const visitTop1440 = await getElTop("#visit");
  const footerTop1440 = await getElTop("footer");

  // Desktop Gallery top
  await scrollToY(galleryTop1440 - 76);
  const shotDesktopGalleryTop = path.join(artifactDir, "step5_desktop_gallery_top.png");
  await page.screenshot({ path: shotDesktopGalleryTop, fullPage: false });
  console.log(`Saved: ${shotDesktopGalleryTop}`);

  // Desktop Gallery mid-scroll
  await scrollToY(galleryTop1440 + 380);
  const shotDesktopGalleryMid = path.join(artifactDir, "step5_desktop_gallery_mid.png");
  await page.screenshot({ path: shotDesktopGalleryMid, fullPage: false });
  console.log(`Saved: ${shotDesktopGalleryMid}`);

  // Desktop Reviews
  await scrollToY(reviewsTop1440 - 76);
  const shotDesktopReviews = path.join(artifactDir, "step5_desktop_reviews.png");
  await page.screenshot({ path: shotDesktopReviews, fullPage: false });
  console.log(`Saved: ${shotDesktopReviews}`);

  // Desktop Visit
  await scrollToY(visitTop1440 - 76);
  const shotDesktopVisit = path.join(artifactDir, "step5_desktop_visit.png");
  await page.screenshot({ path: shotDesktopVisit, fullPage: false });
  console.log(`Saved: ${shotDesktopVisit}`);

  // Desktop Footer
  await scrollToY(footerTop1440 - 76);
  const shotDesktopFooter = path.join(artifactDir, "step5_desktop_footer.png");
  await page.screenshot({ path: shotDesktopFooter, fullPage: false });
  console.log(`Saved: ${shotDesktopFooter}`);

  // Inspect Desktop Gallery Slots & Offsets
  const galleryAudit = await page.evaluate(() => {
    const slots = [1, 2, 3, 4, 5, 6].map((num) => {
      const id = `gallery-${num}`;
      const el = document.querySelector(`[data-slot-id="${id}"]`);
      const parent = el ? el.closest(".group") : null;
      const r = el ? el.getBoundingClientRect() : null;
      const pR = parent ? parent.getBoundingClientRect() : null;
      return {
        id,
        aspectRatio: r ? (r.width / r.height).toFixed(3) : null,
        width: r ? Math.round(r.width) : null,
        height: r ? Math.round(r.height) : null,
        left: pR ? Math.round(pR.left) : null,
        top: pR ? Math.round(pR.top) : null,
      };
    });

    const g1 = slots.find((s) => s.id === "gallery-1");
    const g2 = slots.find((s) => s.id === "gallery-2");
    const g3 = slots.find((s) => s.id === "gallery-3");
    const g4 = slots.find((s) => s.id === "gallery-4");

    const offsetG2 = g2 && g1 ? g2.top - g1.top : 0;
    const offsetG4 = g4 && g3 ? g4.top - g3.top : 0;

    return {
      slots,
      offsetG2_vs_G1: offsetG2,
      offsetG4_vs_G3: offsetG4,
    };
  });
  console.log("Gallery Aspect Ratios and Offsets Audit:", galleryAudit);

  // Check OpenStatus usage
  const openStatusAudit = await page.evaluate(() => {
    const heroStatus = document.querySelector("#hero [aria-label*=\"Restaurant status\"]");
    const visitStatus = document.querySelector("#visit [aria-label*=\"Restaurant status\"]");
    return {
      heroStatusPresent: Boolean(heroStatus),
      visitStatusPresent: Boolean(visitStatus),
      heroText: heroStatus?.textContent?.trim(),
      visitText: visitStatus?.textContent?.trim(),
    };
  });
  console.log("OpenStatus Shared Component Audit:", openStatusAudit);

  // Check Review placeholders
  const reviewTextAudit = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#reviews article"));
    return cards.map((c) => ({
      name: c.querySelector("span")?.textContent?.trim(),
      isTODO: c.querySelector("p")?.textContent?.startsWith("TODO:"),
      textPreview: c.querySelector("p")?.textContent?.slice(0, 40),
    }));
  });
  console.log("Reviews Placeholder Audit:", reviewTextAudit);

  // Check Map iframe
  const mapAudit = await page.evaluate(() => {
    const iframe = document.querySelector("#visit iframe");
    if (!iframe) return { present: false };
    const cs = window.getComputedStyle(iframe);
    return {
      present: true,
      src: iframe.getAttribute("src"),
      title: iframe.getAttribute("title"),
      filter: cs.filter,
      width: Math.round(iframe.getBoundingClientRect().width),
      height: Math.round(iframe.getBoundingClientRect().height),
    };
  });
  console.log("Map Iframe Audit:", mapAudit);

  // 4. 320PX OVERFLOW & BOUNDING RECTS
  console.log("\n--- 4. 320px Overflow & Bounding Rect Audit ---");
  await page.setViewport({ width: 320, height: 800, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const overflow320 = await page.evaluate(() => {
    const scrollWidth = document.body.scrollWidth;
    const clientWidth = document.body.clientWidth;
    const overflowingElements = [];

    const sections = ["#gallery", "#reviews", "#visit", "footer"];
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

verifyStep5().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
