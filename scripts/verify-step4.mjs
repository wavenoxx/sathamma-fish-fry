import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

const viewports = [
  { width: 375, height: 900, isMobile: true, name: "375px" },
  { width: 768, height: 1024, isMobile: false, name: "768px" },
  { width: 1024, height: 900, isMobile: false, name: "1024px" },
  { width: 1440, height: 1000, isMobile: false, name: "1440px" },
];

async function verifyStep4() {
  console.log("================ STEP 4 VERIFICATION ================");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
  page.on("requestfailed", (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  // 1. OVERFLOW AND BOUNDING RECT CHECK AT 320PX
  console.log("\n--- Checking 320px Horizontal Overflow & Bounding Rects ---");
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
  console.log(`320px overflowing elements beyond container left:`, overflow320.overflowingElements);

  // 2. VIEWPORT SCREENSHOTS & INSPECTION (375, 768, 1024, 1440)
  for (const vp of viewports) {
    console.log(`\n--- Inspecting ${vp.name} ---`);
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    // Capture Specials
    await page.evaluate(() => {
      document.getElementById("specials")?.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 600));
    const specialsShot = path.join(artifactDir, `step4_specials_${vp.name}.png`);
    const specialsEl = await page.$("#specials");
    if (specialsEl) {
      await specialsEl.screenshot({ path: specialsShot });
      console.log(`Saved specials screenshot: ${specialsShot}`);
    }

    // Capture About
    await page.evaluate(() => {
      document.getElementById("about")?.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 600));
    const aboutShot = path.join(artifactDir, `step4_about_${vp.name}.png`);
    const aboutEl = await page.$("#about");
    if (aboutEl) {
      await aboutEl.screenshot({ path: aboutShot });
      console.log(`Saved about screenshot: ${aboutShot}`);
    }
  }

  // 3. DETAILED 1440PX ALIGNMENT & RHYTHM AUDIT
  console.log("\n--- Detailed 1440px Layout & Alignment Audit ---");
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const layoutAudit = await page.evaluate(() => {
    // Check Specials slots & offset
    const slotIds = ["special-1", "special-2", "special-3", "special-4", "about-portrait", "about-wide"];
    const slotDetails = {};
    slotIds.forEach((id) => {
      const el = document.querySelector(`[data-slot-id="${id}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        slotDetails[id] = {
          width: Math.round(r.width),
          height: Math.round(r.height),
          aspectRatio: (r.width / r.height).toFixed(3),
          top: Math.round(r.top + window.pageYOffset),
        };
      }
    });

    // Check Specials column offset
    const s1 = slotDetails["special-1"];
    const s2 = slotDetails["special-2"];
    const s3 = slotDetails["special-3"];
    const s4 = slotDetails["special-4"];
    const specialsColOffset = s2.top - s1.top; // Should be ~80px (5rem)
    const specialsCol1Gap = s3.top - (s1.top + s1.height);
    const specialsCol2Gap = s4.top - (s2.top + s2.height);

    // Check About Row 2: portrait image vs body copy first line
    const aboutSection = document.querySelector("#about");
    const container = aboutSection.querySelector(".max-w-\\[1160px\\]") || aboutSection.firstElementChild;
    const cRect = container.getBoundingClientRect();

    const portraitEl = document.querySelector(`[data-slot-id="about-portrait"]`);
    const pRect = portraitEl.getBoundingClientRect();
    const portraitTop = pRect.top + window.pageYOffset;
    const portraitHeight = pRect.height;
    const portraitUpperThirdY = portraitTop + portraitHeight * (1 / 3);

    const firstP = aboutSection.querySelector("p");
    const firstPRect = firstP ? firstP.getBoundingClientRect() : null;
    const firstPTop = firstPRect ? firstPRect.top + window.pageYOffset : 0;

    // Check About Row 3: wide image inset from container edges
    const wideEl = document.querySelector(`[data-slot-id="about-wide"]`);
    const wRect = wideEl.getBoundingClientRect();
    const wideLeftInset = wRect.left - cRect.left;
    const wideRightInset = cRect.right - wRect.right;
    const isWideInset = wideLeftInset > 10 && wideRightInset > 10;

    // Check Ember count in #specials and #about
    let emberCount = 0;
    ["#specials", "#about"].forEach((sel) => {
      const sec = document.querySelector(sel);
      if (!sec) return;
      const all = sec.querySelectorAll("*");
      all.forEach((el) => {
        const cs = window.getComputedStyle(el);
        const hasEmberColor =
          cs.color === "rgb(196, 86, 42)" ||
          cs.backgroundColor === "rgb(196, 86, 42)" ||
          cs.borderColor === "rgb(196, 86, 42)";
        if (hasEmberColor) emberCount++;
      });
    });

    return {
      slotDetails,
      specialsColOffset,
      specialsCol1Gap,
      specialsCol2Gap,
      aboutRow2: {
        portraitTop: Math.round(portraitTop),
        portraitHeight: Math.round(portraitHeight),
        portraitUpperThirdY: Math.round(portraitUpperThirdY),
        firstPTop: Math.round(firstPTop),
        diffFromUpperThird: Math.round(firstPTop - portraitUpperThirdY),
      },
      aboutRow3: {
        containerWidth: Math.round(cRect.width),
        wideWidth: Math.round(wRect.width),
        wideLeftInset: Math.round(wideLeftInset),
        wideRightInset: Math.round(wideRightInset),
        isWideInset,
      },
      emberCount,
    };
  });

  console.log("Slot details & aspect ratios:", layoutAudit.slotDetails);
  console.log(`Specials Column Offset (Col 2 vs Col 1 top): ${layoutAudit.specialsColOffset}px (~5rem = 80px)`);
  console.log("About Row 2 alignment:", layoutAudit.aboutRow2);
  console.log("About Row 3 wide image inset:", layoutAudit.aboutRow3);
  console.log(`Ember count in Specials & About: ${layoutAudit.emberCount}`);

  // 4. CLS MEASUREMENT
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
  console.log(`Failed Requests: ${failedRequests.length}`);

  await browser.close();
  console.log("\n================ VERIFICATION COMPLETE ================");
}

verifyStep4().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
