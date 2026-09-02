import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");
const outputFile = path.join(process.cwd(), "data", "existing-images.json");

function scanImages() {
  if (!fs.existsSync(imagesDir)) {
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }

  const files = fs.readdirSync(imagesDir);
  // Store both relative filename and full /images/ path
  const normalized = files.flatMap((file) => [
    file,
    `/images/${file}`,
  ]);

  fs.writeFileSync(outputFile, JSON.stringify(normalized, null, 2));
  console.log(`[scan-images] Recorded ${files.length} images in data/existing-images.json`);
}

scanImages();
