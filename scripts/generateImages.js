import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public/images");
const outputFile = path.join(process.cwd(), "src/generated/images.ts");

function getImages(dir) {
  return fs.readdirSync(dir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext);
  });
}

const sanitizeVariableName = (filename) => {
  return filename.replace(/[^a-zA-Z0-9_]/g, "_");
};

const images = getImages(imagesDir);

const content = images
  .map((file) => {
    const ext = path.extname(file).toLowerCase().slice(1); // Get extension without the dot
    const baseName = path.basename(file, path.extname(file));
    const variableName = `${sanitizeVariableName(baseName)}_${ext}`; // Include extension in variable name
    const formattedFileName = `${baseName}.${ext}`;
    return `export const ${variableName} = "/images/${formattedFileName}";`;
  })
  .join("\n");

fs.writeFileSync(outputFile, content, "utf-8");

console.log("✅ Generated images.ts successfully!");
