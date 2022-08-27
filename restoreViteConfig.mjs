import { moveFile } from "move-file";
import { existsSync } from "fs";

try {
  if (existsSync("./vite.ignore.js")) {
    moveFile("./vite.ignore.js", "./vite.config.js");
  }
} catch (err) {
  console.error(err);
}
