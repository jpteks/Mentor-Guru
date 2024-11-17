import path from "node:path";
import fs from "node:fs";

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorkerPath = path.join(pdfjsDistPath, "build", "pdf.worker.mjs");

const destinationPath = "./public/pdf.worker.mjs";

// Ensure destination directory exists
fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

// Copy the worker file
fs.copyFileSync(pdfWorkerPath, destinationPath);

console.log(`Copied pdf.worker.mjs to ${destinationPath}`);
