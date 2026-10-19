const axios = require("axios");
const { log, error } = require("./logger");

async function safeFetch(url, opts = {}, retries = 2, timeout = 20000) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const res = await axios.get(url, {
        timeout,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; MusicDropBot/1.0)",
          Accept: "application/json,text/plain,*/*",
          ...((opts && opts.headers) || {})
        },
        ...opts
      });

      return res.data;
    } catch (err) {
      error(`safeFetch error (${attempt}/${retries + 1}) for ${url}:`, err?.message || err);
      if (attempt <= retries) {
        await new Promise(r => setTimeout(r, 1000 * attempt));
      } else {
        return null;
      }
    }
  }
}

module.exports = { safeFetch };
