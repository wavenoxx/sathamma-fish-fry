import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

const breakpoints = [320, 375, 430, 768, 1024, 1280, 1440, 1920];

async function verifyStep3Fix() {
  console.log("================ STEP 3 FIX VERIFICATION ================");

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

  const results = {};

  for (const w of [320, 375, 768, 1024, 1440, 1920]) {
    console.log(`\n----------------- Testing ${w}px -----------------`);
    await page.setViewport({
      width: w,
      height: 900,
      deviceScaleFactor: 2,
      isMobile: w < 768,
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    // Scroll to Menu section top
    await page.evaluate(() => {
      document.getElementById("menu").scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));

    // 1. TOP OF MENU SCREENSHOT
    const topShotPath = path.join(artifactDir, `step3_fix_menu_${w}px_top.png`);
    await page.screenshot({ path: topShotPath });
    console.log(`Saved top screenshot: ${topShotPath}`);

    // Check at top of menu
    const topCheck = await page.evaluate(() => {
      const menuEl = document.querySelector("#menu");
      const container = menuEl.querySelector(".max-w-\\[1160px\\]") || menuEl.firstElementChild;
      const cRect = container.getBoundingClientRect();
      const all = Array.from(menuEl.querySelectorAll("*"));

      // Find any element whose bounding rect extends beyond the container's left edge
      const elementsBeyondLeft = [];
      all.forEach((el) => {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) return;
        const cs = window.getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;

        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          // Check if left edge extends beyond container left edge
          if (r.left < cRect.left - 0.5) {
            elementsBeyondLeft.push({
              tag: el.tagName,
              id: el.id,
              class: el.className?.slice ? el.className.slice(0, 50) : "",
              text: el.textContent?.trim().slice(0, 30),
              left: r.left,
              containerLeft: cRect.left,
              diff: r.left - cRect.left,
            });
          }
        }
      });

      // Check tagline text
      const taglineEl = menuEl.querySelector("p");
      const taglineText = taglineEl ? taglineEl.textContent.trim() : "";

      // Check sticky nav items (if present)
      const aside = menuEl.querySelector("aside");
      let stickyNames = [];
      let leftOfSticky = [];
      if (aside && window.getComputedStyle(aside).display !== "none") {
        const asideRect = aside.getBoundingClientRect();
        stickyNames = Array.from(aside.querySelectorAll("a")).map((a) => a.textContent.trim());
        // Find if anything in menu renders to the left of aside
        all.forEach((el) => {
          if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) return;
          const cs = window.getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && el.children.length === 0 && el.textContent.trim().length > 0) {
            if (r.top >= asideRect.top && r.bottom <= asideRect.bottom && r.right <= asideRect.left) {
              leftOfSticky.push({
                text: el.textContent.trim(),
                left: r.left,
                asideLeft: asideRect.left,
              });
            }
          }
        });
      }

      return {
        containerRect: { left: cRect.left, right: cRect.right, width: cRect.width },
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.body.clientWidth,
        hasHorizontalOverflow: document.body.scrollWidth > document.body.clientWidth,
        elementsBeyondLeft,
        taglineText,
        stickyNames,
        leftOfSticky,
      };
    });

    // 2. MID-SCROLL SCREENSHOT (Scroll to Chicken category)
    await page.evaluate(() => {
      const chicken = document.getElementById("category-chicken");
      if (chicken) {
        window.scrollTo({
          top: chicken.getBoundingClientRect().top + window.pageYOffset - 110,
          behavior: "instant",
        });
      }
    });
    await new Promise((r) => setTimeout(r, 800));

    const midShotPath = path.join(artifactDir, `step3_fix_menu_${w}px_scrolled.png`);
    await page.screenshot({ path: midShotPath });
    console.log(`Saved mid-scroll screenshot: ${midShotPath}`);

    // Check at mid-scroll
    const midCheck = await page.evaluate(() => {
      const menuEl = document.querySelector("#menu");
      const container = menuEl.querySelector(".max-w-\\[1160px\\]") || menuEl.firstElementChild;
      const cRect = container.getBoundingClientRect();
      const all = Array.from(menuEl.querySelectorAll("*"));

      const elementsBeyondLeft = [];
      all.forEach((el) => {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) return;
        const cs = window.getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;

        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          if (r.left < cRect.left - 0.5) {
            elementsBeyondLeft.push({
              tag: el.tagName,
              id: el.id,
              class: el.className?.slice ? el.className.slice(0, 50) : "",
              text: el.textContent?.trim().slice(0, 30),
              left: r.left,
              containerLeft: cRect.left,
              diff: r.left - cRect.left,
            });
          }
        }
      });

      const aside = menuEl.querySelector("aside");
      let leftOfSticky = [];
      let activeCategory = null;
      if (aside && window.getComputedStyle(aside).display !== "none") {
        const asideRect = aside.getBoundingClientRect();
        const activeLink = aside.querySelector(".text-cream");
        activeCategory = activeLink ? activeLink.textContent.trim() : null;

        all.forEach((el) => {
          if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) return;
          const cs = window.getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && el.children.length === 0 && el.textContent.trim().length > 0) {
            if (r.top >= 0 && r.bottom <= window.innerHeight && r.right <= asideRect.left) {
              leftOfSticky.push({
                text: el.textContent.trim(),
                left: r.left,
                asideLeft: asideRect.left,
              });
            }
          }
        });
      }

      return {
        elementsBeyondLeft,
        leftOfSticky,
        activeCategory,
      };
    });

    results[w] = { topCheck, midCheck };

    console.log(`[${w}px Result]:`);
    console.log(`- Elements beyond container left (top): ${topCheck.elementsBeyondLeft.length}`);
    console.log(`- Elements beyond container left (mid): ${midCheck.elementsBeyondLeft.length}`);
    console.log(`- Elements left of sticky column: top=${topCheck.leftOfSticky.length}, mid=${midCheck.leftOfSticky.length}`);
    console.log(`- Tagline: "${topCheck.taglineText}"`);
    console.log(`- Body scrollWidth === clientWidth: ${!topCheck.hasHorizontalOverflow} (${topCheck.scrollWidth} / ${topCheck.clientWidth})`);
    if (topCheck.stickyNames.length > 0) {
      console.log(`- Sticky category names: [${topCheck.stickyNames.join(", ")}]`);
      console.log(`- Active category mid-scroll: ${midCheck.activeCategory}`);
    }
  }

  // Also verify tagline at 430px
  await page.setViewport({ width: 430, height: 900, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  const tagline430 = await page.evaluate(() => {
    return document.querySelector("#menu p")?.textContent.trim();
  });
  console.log(`\nTagline at 430px: "${tagline430}"`);

  // Measure CLS
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
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("\n================ VERIFICATION COMPLETE ================");
}

verifyStep3Fix().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
