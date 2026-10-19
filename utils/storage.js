const fs = require("fs");
const path = require("path");
const { log, error } = require("./logger");

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadJSON(filePath, fallback = null) {
  try {
    if (!fs.existsSync(filePath)) {
      return typeof fallback === "function" ? fallback() : fallback;
    }
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw) return typeof fallback === "function" ? fallback() : fallback;
    return JSON.parse(raw);
  } catch (err) {
    error("loadJSON error:", filePath, err?.message || err);
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

function saveJSON(filePath, data) {
  try {
    ensureDirForFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    error("saveJSON error:", filePath, err?.message || err);
    return false;
  }
}

module.exports = { loadJSON, saveJSON };
