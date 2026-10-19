const util = require("util");

function timestamp() {
  return new Date().toISOString();
}

function safeFormat(args) {
  return args.map(a => (typeof a === "string" ? a : util.inspect(a, { depth: 2 }))).join(" ");
}

function log(...args) {
  console.log(`[${timestamp()}] [INFO]`, safeFormat(args));
}

function error(...args) {
  console.error(`[${timestamp()}] [ERROR]`, safeFormat(args));
}

function debug(...args) {
  if (process.env.DEBUG || process.env.NODE_ENV === "development") {
    console.debug(`[${timestamp()}] [DEBUG]`, safeFormat(args));
  }
}

module.exports = { log, error, debug };
