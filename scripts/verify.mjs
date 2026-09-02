import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

async function verify() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const errors = [];
  const warnings = [];

  // 1. TEST DESKTOP (1440x900)
  console.log("\n--- Testing Desktop (1440x900) ---");
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  desktopPage.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") errors.push(`[Console Error]: ${text}`);
    if (text.includes("Hydration") || text.includes("Warning:")) warnings.push(`[Warning]: ${text}`);
  });
  desktopPage.on("pageerror", (err) => errors.push(`[Page Error]: ${err.message}`));

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Measure initial CLS
  const desktopCLS = await desktopPage.evaluate(() => {
    return new Promise((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 500);
    });
  });
  console.log(`Desktop CLS: ${desktopCLS}`);

  // Check horizontal overflow
  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log("Desktop overflow check:", desktopOverflow);

  // Check MobileActionBar hidden on desktop
  const mobileBarVisibleOnDesktop = await desktopPage.evaluate(() => {
    const bar = document.querySelector('aside[aria-label="Quick Actions"]');
    if (!bar) return false;
    const style = window.getComputedStyle(bar);
    return style.display !== "none" && style.visibility !== "hidden";
  });
  console.log("MobileActionBar visible on desktop (should be false):", mobileBarVisibleOnDesktop);

  // Capture Desktop Top Screenshot
  const desktopTopPath = path.join(artifactDir, "screenshot_desktop_top.png");
  await desktopPage.screenshot({ path: desktopTopPath });
  console.log(`Saved desktop top screenshot to ${desktopTopPath}`);

  // Scroll down 200px to test header scroll transition
  await desktopPage.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 400)); // wait for 300ms transition

  const headerState = await desktopPage.evaluate(() => {
    const header = document.querySelector("header");
    const classList = header ? header.className : "";
    const computedStyle = window.getComputedStyle(header);
    return {
      classList,
      backgroundColor: computedStyle.backgroundColor,
      borderBottomColor: computedStyle.borderBottomColor,
    };
  });
  console.log("Header state after scroll:", headerState);

  const desktopScrolledPath = path.join(artifactDir, "screenshot_desktop_scrolled.png");
  await desktopPage.screenshot({ path: desktopScrolledPath });
  console.log(`Saved desktop scrolled screenshot to ${desktopScrolledPath}`);

  // Crop solid dark area to inspect grain texture
  const grainCropPath = path.join(artifactDir, "screenshot_grain_closeup.png");
  await desktopPage.screenshot({
    path: grainCropPath,
    clip: { x: 300, y: 300, width: 300, height: 300 },
  });
  console.log(`Saved grain closeup screenshot to ${grainCropPath}`);

  await desktopPage.close();

  // 2. TEST MOBILE (375x812)
  console.log("\n--- Testing Mobile (375x812) ---");
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  mobilePage.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") errors.push(`[Mobile Console Error]: ${text}`);
    if (text.includes("Hydration") || text.includes("Warning:")) warnings.push(`[Mobile Warning]: ${text}`);
  });
  mobilePage.on("pageerror", (err) => errors.push(`[Mobile Page Error]: ${err.message}`));

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200)); // wait for 400ms delay + 500ms slide up

  // Measure initial mobile CLS
  const mobileCLS = await mobilePage.evaluate(() => {
    return new Promise((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 500);
    });
  });
  console.log(`Mobile CLS: ${mobileCLS}`);

  // Check horizontal overflow on mobile
  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log("Mobile overflow check:", mobileOverflow);

  // Check MobileActionBar visible on mobile & tap targets
  const mobileBarCheck = await mobilePage.evaluate(() => {
    const bar = document.querySelector('aside[aria-label="Quick Actions"]');
    if (!bar) return { found: false };
    const style = window.getComputedStyle(bar);
    const rect = bar.getBoundingClientRect();
    const links = Array.from(bar.querySelectorAll("a")).map((a) => {
      const aRect = a.getBoundingClientRect();
      return {
        text: a.textContent?.trim(),
        href: a.href,
        width: aRect.width,
        height: aRect.height,
        satisfies48px: aRect.height >= 48 && aRect.width >= 48,
      };
    });
    return {
      found: true,
      display: style.display,
      bottom: rect.bottom,
      top: rect.top,
      links,
    };
  });
  console.log("Mobile action bar check:", JSON.stringify(mobileBarCheck, null, 2));

  // Check Telugu text rendering in header
  const teluguCheck = await mobilePage.evaluate(() => {
    const header = document.querySelector("header");
    const teluguSpan = header?.querySelector(".font-telugu");
    return {
      text: teluguSpan?.textContent,
      fontFamily: teluguSpan ? window.getComputedStyle(teluguSpan).fontFamily : null,
    };
  });
  console.log("Telugu rendering check:", teluguCheck);

  // Capture Mobile Screenshot
  const mobileScreenshotPath = path.join(artifactDir, "screenshot_mobile_375.png");
  await mobilePage.screenshot({ path: mobileScreenshotPath });
  console.log(`Saved mobile screenshot to ${mobileScreenshotPath}`);

  await mobilePage.close();
  await browser.close();

  console.log("\n--- Verification Summary ---");
  console.log(`Errors count: ${errors.length}`);
  if (errors.length > 0) console.error("Errors:", errors);
  console.log(`Warnings count: ${warnings.length}`);
  if (warnings.length > 0) console.warn("Warnings:", warnings);
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
