import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

/**
 * Backend for the /admin lead dashboard.
 *   GET  -> list all leads (newest first)
 *   POST { key, status?, note? } -> update a lead
 * Auth: "Authorization: Bearer <LEADS_ADMIN_PASSWORD>" (set in Netlify env).
 */

const STATUSES = [
  "New",
  "Contacted",
  "Appointment",
  "Offer Made",
  "Under Contract",
  "Closed",
  "Dead",
];

export const handler: Handler = async (event) => {
  const password = process.env.LEADS_ADMIN_PASSWORD;
  const auth = event.headers["authorization"] ?? "";
  if (!password || auth !== `Bearer ${password}`) {
    return { statusCode: 401, body: JSON.stringify({ error: "unauthorized" }) };
  }

  const store = getStore("leads");

  if (event.httpMethod === "GET") {
    const { blobs } = await store.list();
    const leads = (
      await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })))
    ).filter(Boolean) as Record<string, unknown>[];
    leads.sort((a, b) =>
      String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""))
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leads, statuses: STATUSES }),
    };
  }

  if (event.httpMethod === "POST") {
    let update: { key?: string; status?: string; note?: string };
    try {
      update = JSON.parse(event.body ?? "{}");
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "bad json" }) };
    }
    if (!update.key) {
      return { statusCode: 400, body: JSON.stringify({ error: "key required" }) };
    }
    const lead = (await store.get(update.key, { type: "json" })) as
      | Record<string, unknown>
      | null;
    if (!lead) {
      return { statusCode: 404, body: JSON.stringify({ error: "not found" }) };
    }
    if (update.status !== undefined && STATUSES.includes(update.status)) {
      lead.status = update.status;
    }
    if (update.note !== undefined) lead.note = String(update.note).slice(0, 5000);
    lead.updatedAt = new Date().toISOString();
    await store.setJSON(update.key, lead);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, lead }),
    };
  }

  return { statusCode: 405, body: "method not allowed" };
};
