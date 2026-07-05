import { getStore } from "@netlify/blobs";

/**
 * Backend for the /admin lead dashboard (Netlify Functions 2.0 API, which
 * is required for automatic Netlify Blobs configuration).
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

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request) => {
  const password = process.env.LEADS_ADMIN_PASSWORD;
  const auth = req.headers.get("authorization") ?? "";
  if (!password || auth !== `Bearer ${password}`) {
    return json({ error: "unauthorized" }, 401);
  }

  const store = getStore("leads");

  if (req.method === "GET") {
    const { blobs } = await store.list();
    const leads = (
      await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })))
    ).filter(Boolean) as Record<string, unknown>[];
    leads.sort((a, b) =>
      String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""))
    );
    return json({ leads, statuses: STATUSES });
  }

  if (req.method === "POST") {
    let update: { key?: string; status?: string; note?: string };
    try {
      update = await req.json();
    } catch {
      return json({ error: "bad json" }, 400);
    }
    if (!update.key) return json({ error: "key required" }, 400);

    const lead = (await store.get(update.key, { type: "json" })) as
      | Record<string, unknown>
      | null;
    if (!lead) return json({ error: "not found" }, 404);

    if (update.status !== undefined && STATUSES.includes(update.status)) {
      lead.status = update.status;
    }
    if (update.note !== undefined) lead.note = String(update.note).slice(0, 5000);
    lead.updatedAt = new Date().toISOString();
    await store.setJSON(update.key, lead);
    return json({ ok: true, lead });
  }

  return json({ error: "method not allowed" }, 405);
};
