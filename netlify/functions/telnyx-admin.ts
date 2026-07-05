import type { Handler } from "@netlify/functions";

/**
 * TEMPORARY setup utility — remove once the Telnyx number is purchased,
 * verified, and tested. Relays whitelisted API calls to Telnyx using the
 * account's API key from env, so setup can be driven from the dev sandbox
 * (which cannot reach api.telnyx.com directly).
 *
 * Guarded by a long random token and restricted to specific API paths.
 */
const ADMIN_TOKEN = "eh-telnyx-4c1f8e2a9b7d3065";

const ALLOWED_PATHS = [
  /^\/v2\/balance$/,
  /^\/v2\/available_phone_numbers/,
  /^\/v2\/number_orders/,
  /^\/v2\/phone_numbers/,
  /^\/v2\/messaging_profiles/,
  /^\/v2\/messages(\/|$)/,
  /^\/v2\/messaging_tollfree\/verification\/requests/,
];

export const handler: Handler = async (event) => {
  if (event.headers["x-admin-token"] !== ADMIN_TOKEN) {
    return { statusCode: 404, body: "not found" };
  }
  const key = process.env.TELNYX_API_KEY;
  if (!key) return { statusCode: 200, body: JSON.stringify({ error: "no TELNYX_API_KEY" }) };

  let req: { path?: string; method?: string; body?: unknown };
  try {
    req = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: "bad request" };
  }
  const path = req.path ?? "";
  if (!ALLOWED_PATHS.some((re) => re.test(path))) {
    return { statusCode: 400, body: JSON.stringify({ error: `path not allowed: ${path}` }) };
  }

  const res = await fetch(`https://api.telnyx.com${path}`, {
    method: req.method ?? "GET",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: req.body ? JSON.stringify(req.body) : undefined,
  });
  const text = await res.text();
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: res.status, body: text.slice(0, 20000) }),
  };
};
