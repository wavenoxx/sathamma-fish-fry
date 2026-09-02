import puppeteer from "puppeteer-core";
import path from "path";
import http from "http";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function auditStep6() {
  console.log("================ STEP 6 COMPREHENSIVE AUDIT ================");

  // 1. Robots.txt & Sitemap.xml
  console.log("\n--- 1. Robots.txt & Sitemap.xml ---");
  const robotsRes = await fetchText("http://localhost:3000/robots.txt");
  console.log("robots.txt (status " + robotsRes.status + "):\n" + robotsRes.data.trim());

  const sitemapRes = await fetchText("http://localhost:3000/sitemap.xml");
  console.log("sitemap.xml (status " + sitemapRes.status + "):\n" + sitemapRes.data.trim());

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  const fontRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
  page.on("requestfailed", (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on("response", async (res) => {
    const url = res.url();
    if (url.endsWith(".woff2") || url.includes("/_next/static/media/")) {
      try {
        const buffer = await res.buffer();
        fontRequests.push({ url: path.basename(url), sizeKB: (buffer.length / 1024).toFixed(2) });
      } catch {}
    }
  });

  // 2. Load Home Page & Metadata
  console.log("\n--- 2. Metadata & JSON-LD Structured Data ---");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const metadataAudit = await page.evaluate(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute("content");
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
    const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content");
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content");
    const ogLocale = document.querySelector('meta[property="og:locale"]')?.getAttribute("content");
    const ogSiteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute("content");
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
    const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute("content");
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute("content");
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')?.getAttribute("content");
    const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute("content");

    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    let jsonLd = null;
    if (jsonLdScript) {
      try {
        jsonLd = JSON.parse(jsonLdScript.textContent || "{}");
      } catch (e) {
        jsonLd = { error: e.message };
      }
    }

    return {
      title,
      metaDesc,
      openGraph: { ogType, ogTitle, ogDesc, ogUrl, ogLocale, ogSiteName, ogImage },
      twitter: { twitterCard, twitterTitle, twitterDesc, twitterImage },
      jsonLd,
    };
  });

  console.log("Title:", metadataAudit.title);
  console.log("Description:", metadataAudit.metaDesc);
  console.log("Open Graph:", metadataAudit.openGraph);
  console.log("Twitter Card:", metadataAudit.twitter);
  console.log("JSON-LD @type:", metadataAudit.jsonLd?.["@type"]);
  console.log("JSON-LD name:", metadataAudit.jsonLd?.name);
  console.log("JSON-LD alternateName (Telugu):", metadataAudit.jsonLd?.alternateName);
  console.log("JSON-LD geo property present?:", "geo" in (metadataAudit.jsonLd || {}));
  console.log("JSON-LD reviewCount present?:", "reviewCount" in (metadataAudit.jsonLd?.aggregateRating || {}));
  console.log("JSON-LD hasMenu categories count:", metadataAudit.jsonLd?.hasMenu?.hasMenuSection?.length);

  // 3. Accessibility & Heading Hierarchy
  console.log("\n--- 3. Accessibility Pass ---");
  const a11yAudit = await page.evaluate(() => {
    // Heading hierarchy
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: h.textContent?.trim().slice(0, 50),
    }));

    // Skip to content
    const firstA = document.querySelector("a");
    const skipLink = {
      href: firstA?.getAttribute("href"),
      text: firstA?.textContent?.trim(),
      isFirstFocusable: firstA?.getAttribute("href") === "#main-content",
    };

    // Main landmark
    const mainContent = document.querySelector("#main-content");

    // Icon buttons aria-labels
    const headerMobileCall = document.querySelector("header a[href^=\"tel:\"][aria-label]");
    const mobileActions = Array.from(document.querySelectorAll("aside a[aria-label]")).map((a) => ({
      href: a.getAttribute("href"),
      ariaLabel: a.getAttribute("aria-label"),
    }));

    // Map iframe title
    const mapIframe = document.querySelector("#visit iframe");

    return {
      headings,
      h1Count: headings.filter((h) => h.tag === "h1").length,
      h2Count: headings.filter((h) => h.tag === "h2").length,
      skipLink,
      mainHasId: Boolean(mainContent),
      headerMobileCallAria: headerMobileCall?.getAttribute("aria-label"),
      mobileActions,
      mapIframeTitle: mapIframe?.getAttribute("title"),
    };
  });

  console.log("Heading Hierarchy (h1 count: " + a11yAudit.h1Count + ", h2 count: " + a11yAudit.h2Count + "):");
  a11yAudit.headings.forEach((h) => console.log(`  <${h.tag}>: ${h.text}`));
  console.log("Skip link check:", a11yAudit.skipLink);
  console.log("Main content landmark:", a11yAudit.mainHasId);
  console.log("Mobile header call aria-label:", a11yAudit.headerMobileCallAria);
  console.log("Mobile sticky bar actions:", a11yAudit.mobileActions);
  console.log("Map iframe title:", a11yAudit.mapIframeTitle);

  // 4. Keyboard Tab Navigation Sequence
  console.log("\n--- 4. Keyboard Tab Sequence ---");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.focus("body");

  const tabSequence = [];
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
    const activeInfo = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        href: el.getAttribute("href") || null,
        ariaLabel: el.getAttribute("aria-label") || null,
        text: el.textContent?.trim().slice(0, 30),
      };
    });
    if (activeInfo) tabSequence.push(activeInfo);
  }
  console.log("Tab sequence first 20 elements:");
  tabSequence.forEach((item, idx) => {
    console.log(`  [${idx + 1}] <${item.tag}> ${item.text || item.ariaLabel || item.href || item.id}`);
  });

  // 5. Check 404 Page
  console.log("\n--- 5. 404 Error State Verification ---");
  const p404 = await browser.newPage();
  const res404 = await p404.goto("http://localhost:3000/this-page-does-not-exist", { waitUntil: "networkidle0" });
  console.log("404 HTTP status code:", res404.status());

  const audit404 = await p404.evaluate(() => {
    const label = document.querySelector(".font-ui.text-micro")?.textContent?.trim();
    const h2 = document.querySelector("h2")?.textContent?.trim();
    const text = document.querySelector("p.font-display")?.textContent?.trim();
    const backBtn = document.querySelector("a[href=\"/\"]");
    const hasHeader = Boolean(document.querySelector("header"));
    const hasFooter = Boolean(document.querySelector("footer"));
    return {
      label,
      h2,
      text,
      backBtnText: backBtn?.textContent?.trim(),
      backBtnHref: backBtn?.getAttribute("href"),
      hasHeader,
      hasFooter,
    };
  });
  console.log("404 Page Audit:", audit404);

  // Screenshot 404
  const shot404 = path.join(artifactDir, "step6_404_page.png");
  await p404.screenshot({ path: shot404, fullPage: false });
  console.log(`Saved: ${shot404}`);
  await p404.close();

  // 6. Network & Font Payload Audit
  console.log("\n--- 6. Font & Network Payload ---");
  console.log("Font files downloaded on first load:", fontRequests);
  const totalFontKB = fontRequests.reduce((acc, f) => acc + parseFloat(f.sizeKB), 0);
  console.log(`Total Font Payload: ${totalFontKB.toFixed(2)} KB`);
  console.log(`Failed Network Requests: ${failedRequests.length}`, failedRequests);
  console.log(`Console Errors: ${consoleErrors.length}`, consoleErrors);

  // 7. CLS Measurement
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

  // 8. 320px Horizontal Overflow
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
  console.log("320px Horizontal Overflow Check:", overflow320);

  await browser.close();
  console.log("\n================ STEP 6 AUDIT COMPLETE ================");
}

auditStep6().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
