import { moveFile } from "move-file";
import { existsSync } from "fs";

try {
  if (existsSync("./vite.config.js")) {
    moveFile("./vite.config.js", "./vite.ignore.js");
  }
} catch (err) {
  console.error(err);
}
