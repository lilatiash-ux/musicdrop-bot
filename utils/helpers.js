function parsePrice(input) {
  if (input === null || input === undefined || input === "") return null;

  if (typeof input === "number") return input;

  if (typeof input === "object") {
    // object -> try common fields
    const val = input.amount || input.value || input.price;
    return parsePrice(val);
  }

  let s = String(input).trim();

  // remove currency letters and whitespace
  s = s.replace(/[^\d,\.\-]/g, "").replace(/\s+/g, "");

  // normalize comma decimal
  if (s.includes(",") && !s.includes(".")) {
    s = s.replace(",", ".");
  } else if (s.includes(",") && s.includes(".")) {
    // assume last separator is decimal
    const lastDot = s.lastIndexOf(".");
    const lastComma = s.lastIndexOf(",");
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function formatPrice(n) {
  if (n === null || n === undefined) return "Brak";
  if (typeof n === "string") return n;
  const num = Number(n);
  if (!Number.isFinite(num)) return String(n);
  // Polish formatting: comma as decimal separator
  return num.toFixed(2).replace(".", ",") + " zł";
}

function isSpecial(name) {
  // Basic placeholder — main special detection is based on special keywords in index.js
  if (!name) return false;
  const s = String(name).toLowerCase();
  return s.includes("signed") || s.includes("autograph") || s.includes("autograf");
}

module.exports = { parsePrice, formatPrice, isSpecial };
