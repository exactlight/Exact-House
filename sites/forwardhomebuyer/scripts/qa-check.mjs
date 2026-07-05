#!/usr/bin/env node
/**
 * Launch QA: verifies every legacy live-site URL and every rebuild page
 * responds 200 on the target origin, and that form pages carry the consent
 * disclosure. Usage: node scripts/qa-check.mjs [origin]
 */
const ORIGIN = process.argv[2] ?? "https://exacthouse-rebuild.netlify.app";

// Honor HTTPS_PROXY when present (needed in sandboxed dev environments;
// no-op elsewhere). Node's built-in fetch ignores proxy env vars.
if (process.env.HTTPS_PROXY) {
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
}

const cities = ["madison","sun-prairie","watertown","fort-atkinson","stoughton","oconomowoc","beaver-dam","deforest","waunakee","whitewater"];
const situations = ["foreclosure","divorce","inherited","job-relocation","senior-transition","financial-strain","tired-landlord","double-mortgage","repairs","tax-liens"];

// Madison has no city icon of its own — it uses bucky-badger.png
const legacyAssets = ["logo.png","wisconsin-icon.png","bucky-badger.png",
  ...cities.filter((c) => c !== "madison").map((c) => `${c.replace(/-/g, "_")}-icon.png`),
  ...cities.map((c) => `${c.replace(/-/g, "_")}-photo.jpg`)];

const pages = ["", "details", "thank-you", "privacy", "terms", "get-offer",
  "how-it-works", "about", "faq", "compare", "testimonials", "blog", "admin",
  "sitemap.xml", "robots.txt", ...cities, ...situations];

let fail = 0;
async function check(path, { expectConsent = false } = {}) {
  const url = `${ORIGIN}/${path}`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      console.log(`FAIL ${res.status} /${path}`);
      fail++;
      return;
    }
    if (expectConsent) {
      const text = await res.text();
      if (!text.includes("Reply STOP")) {
        console.log(`FAIL consent-missing /${path}`);
        fail++;
      }
    }
  } catch (err) {
    console.log(`FAIL error /${path}: ${err.message}`);
    fail++;
  }
}

const formPages = ["", "get-offer", ...cities, ...situations];
await Promise.all([
  ...pages.map((p) => check(p, { expectConsent: formPages.includes(p) })),
  ...legacyAssets.map((a) => check(a)),
]);

console.log(fail === 0 ? `QA PASS — ${pages.length} pages + ${legacyAssets.length} assets OK on ${ORIGIN}` : `QA: ${fail} FAILURES on ${ORIGIN}`);
process.exit(fail === 0 ? 0 : 1);
