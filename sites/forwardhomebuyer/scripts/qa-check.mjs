#!/usr/bin/env node
/**
 * Launch QA for forwardhomebuyer: every page responds 200 on the target
 * origin and form pages carry the consent disclosure.
 * Usage: node scripts/qa-check.mjs [origin]
 */
const ORIGIN = process.argv[2] ?? "https://forwardhomebuyer-rebuild.netlify.app";

if (process.env.HTTPS_PROXY) {
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
}

const cities = ["madison","milwaukee","waukesha","racine","janesville","beloit","brookfield","new-berlin","menomonee-falls","muskego","pewaukee","sussex","elkhorn","whitewater","watertown","fort-atkinson","oconomowoc","beaver-dam","waupun","sun-prairie","fitchburg","middleton","verona","oregon","stoughton","deforest","waunakee"];
const situations = ["foreclosure","behind-on-payments","divorce","inherited-property","tired-landlord","needs-repairs","relocating","tax-liens","vacant-property"];

const pages = ["", "details", "thank-you", "privacy", "terms", "get-offer",
  "how-it-works", "about", "faq", "compare", "admin", "logo.png",
  "sitemap.xml", "robots.txt", ...cities, ...situations];

let fail = 0;
async function check(path, { expectConsent = false } = {}) {
  const url = `${ORIGIN}/${path}`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) { console.log(`FAIL ${res.status} /${path}`); fail++; return; }
    if (expectConsent) {
      const text = await res.text();
      if (!text.includes("Reply STOP")) { console.log(`FAIL consent-missing /${path}`); fail++; }
    }
  } catch (err) {
    console.log(`FAIL error /${path}: ${err.message}`); fail++;
  }
}

const formPages = ["", "get-offer", ...cities, ...situations];
await Promise.all(pages.map((p) => check(p, { expectConsent: formPages.includes(p) })));
console.log(fail === 0 ? `QA PASS — ${pages.length} checks OK on ${ORIGIN}` : `QA: ${fail} FAILURES on ${ORIGIN}`);
process.exit(fail === 0 ? 0 : 1);
