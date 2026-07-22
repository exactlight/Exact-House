import { getStore } from "@netlify/blobs";

/**
 * Fires automatically on every verified Netlify Forms submission (all 22
 * forms: contact, contact-{city}, contact-{situation}, property-details).
 *
 * Channels — each one activates only when its env vars are set, and a
 * failure in one channel never blocks the others. The lead itself is
 * already stored by Netlify Forms before this function runs, so nothing
 * here can lose a lead.
 *
 *   SMS to Ken ......... TELNYX_API_KEY, TELNYX_FROM_NUMBER, LEAD_NOTIFY_SMS_TO
 *   Email to Ken ....... RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO, LEAD_FROM_EMAIL
 *   Seller autoresponder RESEND_API_KEY, LEAD_FROM_EMAIL (needs seller email)
 */

type SubmissionPayload = {
  form_name: string;
  data: Record<string, string>;
};

const STEP1_FIELDS = ["name", "phone", "email", "address", "city", "situation", "source-page"];
const DETAILS_FIELDS = [
  "lead-name",
  "lead-phone",
  "lead-address",
  "bedrooms",
  "bathrooms",
  "sqft",
  "condition",
  "mortgage-balance",
  "asking-price",
  "lowest-price",
  "accept-payoff",
  "timeline",
  "reason",
  "additional-info",
  "source-page",
];

function pick(data: Record<string, string>, keys: string[]) {
  return keys
    .map((k) => [k, (data[k] ?? "").trim()] as const)
    .filter(([, v]) => v !== "");
}

/** Which website this lead came from — shown in every notification so
 * leads from forwardhomebuyer.com are distinguishable from the other site. */
const SITE_NAME = "Forward Home Buyer";

function summarize(formName: string, data: Record<string, string>) {
  const isDetails = formName === "property-details";
  const lines = pick(data, isDetails ? DETAILS_FIELDS : STEP1_FIELDS).map(
    ([k, v]) => `${k}: ${v}`
  );

  const who = isDetails ? data["lead-name"] || "lead" : data["name"] || "lead";
  const where = isDetails ? data["lead-address"] || "" : data["address"] || "";
  const headline = isDetails
    ? `Property details (${SITE_NAME}) from ${who}${where ? ` — ${where}` : ""}`
    : `NEW LEAD (${SITE_NAME}): ${who}${where ? ` — ${where}` : ""}`;

  return { headline, lines };
}

async function sendSms(headline: string, lines: string[]) {
  const key = process.env.TELNYX_API_KEY;
  const from = process.env.TELNYX_FROM_NUMBER;
  const to = process.env.LEAD_NOTIFY_SMS_TO;
  if (!key || !from || !to) return "sms:skipped(unconfigured)";

  const text = [headline, ...lines].join("\n").slice(0, 1500);
  const res = await fetch("https://api.telnyx.com/v2/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, text }),
  });
  if (!res.ok) throw new Error(`Telnyx ${res.status}: ${await res.text()}`);
  return "sms:sent";
}

async function sendResendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from || !to) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: `Exact House <${from}>`, to: [to], subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

async function sendOwnerEmail(headline: string, lines: string[]) {
  const to = process.env.LEAD_NOTIFY_EMAIL_TO;
  if (!to) return "email:skipped(unconfigured)";
  const sent = await sendResendEmail(to, headline, lines.join("\n"));
  return sent ? "email:sent" : "email:skipped(unconfigured)";
}

async function sendAutoresponder(formName: string, data: Record<string, string>) {
  // Only for step-1 forms, and only when the seller left an email
  if (formName === "property-details") return "autoresponder:n/a";
  const sellerEmail = (data["email"] ?? "").trim();
  if (!sellerEmail) return "autoresponder:skipped(no-email)";

  const firstName = (data["name"] ?? "").trim().split(/\s+/)[0] || "there";
  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to Forward Home Buyer — we got your info.",
    "",
    "Ken will personally review your property and get back to you with a fair cash offer within 24 hours.",
    "",
    "Need us sooner? Call or text Ken directly at 920-397-2922.",
    "",
    "No pressure, no obligation — talk soon.",
    "Forward Home Buyer | forwardhomebuyer.com",
  ].join("\n");

  const sent = await sendResendEmail(
    sellerEmail,
    "We got your info — Forward Home Buyer",
    text
  );
  return sent ? "autoresponder:sent" : "autoresponder:skipped(unconfigured)";
}

/** Persist the lead to Netlify Blobs so the /admin dashboard can manage it. */
async function storeLead(formName: string, data: Record<string, string>) {
  const store = getStore("leads");
  const phone = (data["phone"] || data["lead-phone"] || "")
    .replace(/\D/g, "")
    .slice(-10);
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await store.setJSON(key, {
    key,
    formName,
    phone,
    data,
    createdAt: new Date().toISOString(),
    status: "New",
    note: "",
  });
  return "store:saved";
}

export default async (req: Request) => {
  let payload: SubmissionPayload;
  try {
    payload = (await req.json()).payload;
    if (!payload?.data) throw new Error("no payload.data");
  } catch (err) {
    console.error("submission-created: unparseable event body", err);
    return new Response("ignored", { status: 200 });
  }

  const formName = payload.form_name ?? "unknown";
  const { headline, lines } = summarize(formName, payload.data);

  const results = await Promise.allSettled([
    sendSms(headline, lines),
    sendOwnerEmail(headline, lines),
    sendAutoresponder(formName, payload.data),
    storeLead(formName, payload.data),
  ]);

  for (const r of results) {
    if (r.status === "fulfilled") console.log(r.value);
    else console.error("notification failed:", r.reason);
  }

  // Always 200 — the lead is already safe in Netlify Forms; notification
  // failures are logged for follow-up, never surfaced as submission errors.
  return new Response("ok", { status: 200 });
};
