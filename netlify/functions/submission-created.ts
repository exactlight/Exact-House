import type { Handler } from "@netlify/functions";

/**
 * Fires automatically on every verified Netlify Forms submission (all 22
 * forms: contact, contact-{city}, contact-{situation}, property-details).
 *
 * Channels — each one activates only when its env vars are set, and a
 * failure in one channel never blocks the others. The lead itself is
 * already stored by Netlify Forms before this function runs, so nothing
 * here can lose a lead.
 *
 *   SMS to Ken ......... TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *                        TWILIO_FROM_NUMBER, LEAD_NOTIFY_SMS_TO
 *   Slack .............. SLACK_WEBHOOK_URL
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

function summarize(formName: string, data: Record<string, string>) {
  const isDetails = formName === "property-details";
  const fields = pick(data, isDetails ? DETAILS_FIELDS : STEP1_FIELDS);
  const lines = fields.map(([k, v]) => `${k}: ${v}`);

  const who = isDetails ? data["lead-name"] || "lead" : data["name"] || "lead";
  const where = isDetails ? data["lead-address"] || "" : data["address"] || "";
  const headline = isDetails
    ? `Property details from ${who}${where ? ` — ${where}` : ""}`
    : `NEW LEAD: ${who}${where ? ` — ${where}` : ""}`;

  return { headline, lines, fields };
}

async function sendSms(headline: string, lines: string[]) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.LEAD_NOTIFY_SMS_TO;
  if (!sid || !token || !from || !to) return "sms:skipped(unconfigured)";

  const body = [headline, ...lines].join("\n").slice(0, 1500);
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
    }
  );
  if (!res.ok) throw new Error(`Twilio ${res.status}: ${await res.text()}`);
  return "sms:sent";
}

async function sendSlack(headline: string, fields: (readonly [string, string])[]) {
  // LEAD_SLACK_WEBHOOK preferred — Netlify's env API rejects the key
  // SLACK_WEBHOOK_URL, so both names are supported.
  const url = process.env.LEAD_SLACK_WEBHOOK || process.env.SLACK_WEBHOOK_URL;
  if (!url) return "slack:skipped(unconfigured)";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: headline,
      blocks: [
        { type: "header", text: { type: "plain_text", text: headline.slice(0, 150) } },
        {
          type: "section",
          fields: fields.slice(0, 10).map(([k, v]) => ({
            type: "mrkdwn",
            text: `*${k}:*\n${v}`,
          })),
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Slack ${res.status}: ${await res.text()}`);
  return "slack:sent";
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
    "Thanks for reaching out to Exact House — we got your info.",
    "",
    "Ken will personally review your property and get back to you with a fair cash offer, usually the same day during business hours.",
    "",
    "Need us sooner? Call or text Ken directly at 920-650-8300.",
    "",
    "No pressure, no obligation — talk soon.",
    "Exact House | exacthouse.com",
  ].join("\n");

  const sent = await sendResendEmail(
    sellerEmail,
    "We got your info — Exact House",
    text
  );
  return sent ? "autoresponder:sent" : "autoresponder:skipped(unconfigured)";
}

export const handler: Handler = async (event) => {
  let payload: SubmissionPayload;
  try {
    payload = JSON.parse(event.body ?? "{}").payload;
    if (!payload?.data) throw new Error("no payload.data");
  } catch (err) {
    console.error("submission-created: unparseable event body", err);
    return { statusCode: 200, body: "ignored" };
  }

  const formName = payload.form_name ?? "unknown";
  const { headline, lines, fields } = summarize(formName, payload.data);

  const results = await Promise.allSettled([
    sendSms(headline, lines),
    sendSlack(headline, fields),
    sendOwnerEmail(headline, lines),
    sendAutoresponder(formName, payload.data),
  ]);

  for (const r of results) {
    if (r.status === "fulfilled") console.log(r.value);
    else console.error("notification failed:", r.reason);
  }

  // Always 200 — the lead is already safe in Netlify Forms; notification
  // failures are logged for follow-up, never surfaced as submission errors.
  return { statusCode: 200, body: "ok" };
};
