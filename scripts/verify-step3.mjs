import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { menuCategories, menuNote } from "../data/menu.ts";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const artifactDir = "/Users/bunny/.gemini/antigravity/brain/5842858c-0e14-4b95-87ca-3ef1ac890ab8";

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
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

async function verifyStep3() {
  console.log("================ STEP 3 VERIFICATION ================");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. TEST IMAGESLOT IN ISOLATION (/slot-test)
  console.log("\n--- 1. Testing ImageSlot in isolation (/slot-test) ---");
  const slotPage = await browser.newPage();
  await slotPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const slotErrors = [];
  slotPage.on("console", (msg) => {
    if (msg.type() === "error") slotErrors.push(msg.text());
  });
  await slotPage.goto("http://localhost:3000/slot-test", { waitUntil: "networkidle0" });

  const slotInfo = await slotPage.evaluate(() => {
    const slotEl = document.querySelector("[data-slot-id='special-1']");
    if (!slotEl) return null;
    const rect = slotEl.getBoundingClientRect();
    const texts = Array.from(slotEl.querySelectorAll("span")).map((s) => s.textContent.trim());
    return {
      width: rect.width,
      height: rect.height,
      aspectCalculated: (rect.width / rect.height).toFixed(3),
      expectedAspect: (4 / 5).toFixed(3),
      texts,
    };
  });

  console.log("ImageSlot measurement:", slotInfo);
  console.log("ImageSlot console errors:", slotErrors.length);
  const slotShotPath = path.join(artifactDir, "step3_imageslot_isolated.png");
  await slotPage.screenshot({ path: slotShotPath });
  console.log("Saved screenshot:", slotShotPath);
  await slotPage.close();

  // 2. TEST MENU AT 1440px DESKTOP & STICKY COLUMN SCROLL
  console.log("\n--- 2. Testing Menu at 1440px & Sticky Navigation ---");
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // Scroll to Menu section
  await desktopPage.evaluate(() => {
    document.getElementById("menu").scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Measure active category initially
  const initialActive = await desktopPage.evaluate(() => {
    const activeLink = document.querySelector("aside nav a.text-cream");
    return activeLink ? activeLink.textContent.trim() : null;
  });
  console.log("Initial active category at top of menu:", initialActive);

  // Take desktop top-of-menu screenshot
  const deskShotPath = path.join(artifactDir, "step3_menu_1440px.png");
  await desktopPage.screenshot({ path: deskShotPath });
  console.log("Saved screenshot:", deskShotPath);

  // Scroll down to #category-chicken
  await desktopPage.evaluate(() => {
    const chicken = document.getElementById("category-chicken");
    if (chicken) {
      window.scrollTo({
        top: chicken.getBoundingClientRect().top + window.pageYOffset - 110,
        behavior: "instant",
      });
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  const scrolledActive = await desktopPage.evaluate(() => {
    const activeLink = document.querySelector("aside nav a.text-cream");
    return activeLink ? activeLink.textContent.trim() : null;
  });
  console.log("Active category scrolled to Chicken:", scrolledActive);

  // Take mid-scroll desktop capture showing active category
  const deskScrolledPath = path.join(artifactDir, "step3_menu_desktop_scrolled.png");
  await desktopPage.screenshot({ path: deskScrolledPath });
  console.log("Saved mid-scroll screenshot:", deskScrolledPath);

  // Extract all menu items from DOM and compare against data/menu.ts
  const domMenuData = await desktopPage.evaluate(() => {
    const menuEl = document.querySelector("#menu");
    const categories = [];
    const catEls = menuEl.querySelectorAll("[id^='category-']");

    catEls.forEach((catEl) => {
      const id = catEl.id.replace("category-", "");
      const title = catEl.querySelector("h3")?.textContent.trim();
      const items = [];
      const itemEls = catEl.querySelectorAll("li");

      itemEls.forEach((li) => {
        const nameEl = li.querySelector("span.text-body");
        const name = nameEl?.textContent.trim();
        const priceEl = li.querySelector(".tabular-nums");
        const price = priceEl?.textContent.trim();
        const noteEl = li.querySelector("p");
        const note = noteEl ? noteEl.textContent.trim() : undefined;
        const hasDiamond = !!li.querySelector(".text-turmeric");

        // Price alignment: right edge in px
        const priceRect = priceEl?.getBoundingClientRect();
        items.push({
          name,
          price,
          note,
          hasDiamond,
          priceRight: priceRect?.right,
        });
      });

      categories.push({ id, title, items });
    });

    // Check ember count inside #menu
    const all = Array.from(menuEl.querySelectorAll("*"));
    const emberItems = all.filter((el) => {
      const cs = window.getComputedStyle(el);
      const isEmber = (c) => c.includes("196, 86, 42") || c.includes("196,86,42") || c.includes("#c4562a");
      return isEmber(cs.backgroundColor) || isEmber(cs.color);
    });

    // Contrast measurements
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
      return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
    }
    function parseRgb(str) {
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [245, 239, 230];
    }
    const bgL = getLuminance(20, 16, 13); // #14100D

    const sampleItem = menuEl.querySelector("li");
    const nameColor = parseRgb(window.getComputedStyle(sampleItem.querySelector("span.text-body")).color);
    const priceColor = parseRgb(window.getComputedStyle(sampleItem.querySelector(".tabular-nums")).color);
    const noteEl = menuEl.querySelector("li p");
    const noteColor = noteEl ? parseRgb(window.getComputedStyle(noteEl).color) : [184, 174, 159];

    return {
      categories,
      emberCount: emberItems.length,
      contrast: {
        name: getRatio(getLuminance(nameColor[0], nameColor[1], nameColor[2]), bgL),
        price: getRatio(getLuminance(priceColor[0], priceColor[1], priceColor[2]), bgL),
        note: getRatio(getLuminance(noteColor[0], noteColor[1], noteColor[2]), bgL),
      },
    };
  });

  console.log("\n--- 3. Verifying Menu Data Integrity ---");
  console.log(`DOM categories count: ${domMenuData.categories.length} (expected: ${menuCategories.length})`);
  let allMatched = true;

  menuCategories.forEach((cat) => {
    const domCat = domMenuData.categories.find((c) => c.id === cat.id);
    if (!domCat) {
      console.error(`Missing category: ${cat.id}`);
      allMatched = false;
      return;
    }
    cat.items.forEach((item) => {
      const domItem = domCat.items.find((i) => i.name === item.name);
      if (!domItem) {
        console.error(`Missing item: ${item.name} in ${cat.id}`);
        allMatched = false;
      } else {
        const priceExpected = `₹${item.price}`;
        if (domItem.price !== priceExpected) {
          console.error(`Price mismatch for ${item.name}: got ${domItem.price}, expected ${priceExpected}`);
          allMatched = false;
        }
      }
    });
  });

  console.log(`All items and prices match data/menu.ts: ${allMatched}`);
  console.log("Menu section Ember count:", domMenuData.emberCount);
  console.log("Menu contrast ratios:", domMenuData.contrast);

  // Check price column alignment per category
  console.log("\n--- 4. Price Column Alignment ---");
  domMenuData.categories.forEach((cat) => {
    const rights = cat.items.map((i) => Math.round(i.priceRight));
    const isConsistent = rights.every((r) => Math.abs(r - rights[0]) <= 1);
    console.log(`Category "${cat.title}": price right-edge pixel consistency = ${isConsistent} (${rights[0]}px)`);
  });

  await desktopPage.close();

  // 5. TEST TABLET AT 768px
  console.log("\n--- 5. Testing Menu at 768px Tablet ---");
  const tabletPage = await browser.newPage();
  await tabletPage.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await tabletPage.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await tabletPage.evaluate(() => document.getElementById("menu").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1000));
  const tabletShotPath = path.join(artifactDir, "step3_menu_768px.png");
  await tabletPage.screenshot({ path: tabletShotPath });
  console.log("Saved tablet screenshot:", tabletShotPath);
  await tabletPage.close();

  // 6. TEST MOBILE AT 375px
  console.log("\n--- 6. Testing Menu at 375px Mobile ---");
  const mobile375Page = await browser.newPage();
  await mobile375Page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true });
  await mobile375Page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await mobile375Page.evaluate(() => document.getElementById("menu").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1000));
  const mob375ShotPath = path.join(artifactDir, "step3_menu_375px.png");
  await mobile375Page.screenshot({ path: mob375ShotPath });
  console.log("Saved mobile 375px screenshot:", mob375ShotPath);
  await mobile375Page.close();

  // 7. TEST MOBILE COLLISION & OVERFLOW AT 320px
  console.log("\n--- 7. Testing 320px Collision & Overflow ---");
  const mobile320Page = await browser.newPage();
  await mobile320Page.setViewport({ width: 320, height: 600, deviceScaleFactor: 2, isMobile: true });
  await mobile320Page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await mobile320Page.evaluate(() => document.getElementById("menu").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1000));

  const overflow = await mobile320Page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log("Overflow check at 320px:", overflow);

  const collisionTest = await mobile320Page.evaluate(() => {
    const menuEl = document.querySelector("#menu");
    const specialLi = Array.from(menuEl.querySelectorAll("li")).find((li) =>
      li.textContent.includes("Sathamma Special Fish Fry")
    );
    if (!specialLi) return null;
    const nameEl = specialLi.querySelector("span.text-body");
    const priceEl = specialLi.querySelector(".tabular-nums");
    const nameRect = nameEl.getBoundingClientRect();
    const priceRect = priceEl.getBoundingClientRect();

    // Check if rectangles collide
    const overlapsX = !(nameRect.right <= priceRect.left || priceRect.right <= nameRect.left);
    const overlapsY = !(nameRect.bottom <= priceRect.top || priceRect.bottom <= nameRect.top);
    const collides = overlapsX && overlapsY;

    return {
      name: nameEl.textContent.trim(),
      nameRect: { top: nameRect.top, bottom: nameRect.bottom, right: nameRect.right },
      priceRect: { top: priceRect.top, bottom: priceRect.bottom, left: priceRect.left },
      collides,
    };
  });
  console.log("Name/Price collision check for Sathamma Special Fish Fry at 320px:", collisionTest);

  const mob320ShotPath = path.join(artifactDir, "step3_menu_320px.png");
  await mobile320Page.screenshot({ path: mob320ShotPath });
  console.log("Saved mobile 320px screenshot:", mob320ShotPath);

  await mobile320Page.close();
  await browser.close();

  console.log("\n================ VERIFICATION COMPLETE ================");
}

verifyStep3().catch((err) => {
  console.error("Step 3 verification failed:", err);
  process.exit(1);
});
