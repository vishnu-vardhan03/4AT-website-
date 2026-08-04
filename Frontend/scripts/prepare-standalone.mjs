import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const standaloneRoot = resolve(projectRoot, ".next", "standalone");

if (!existsSync(resolve(standaloneRoot, "server.js"))) {
  throw new Error("Standalone server output is missing. Run `next build` first.");
}

function copyDirectory(source, destination) {
  if (!existsSync(source)) return;
  mkdirSync(destination, { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}

copyDirectory(resolve(projectRoot, "public"), resolve(standaloneRoot, "public"));
copyDirectory(
  resolve(projectRoot, ".next", "static"),
  resolve(standaloneRoot, ".next", "static"),
);
