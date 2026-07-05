"use client";

import { useCallback, useEffect, useState } from "react";

type Lead = {
  key: string;
  formName: string;
  phone: string;
  data: Record<string, string>;
  createdAt: string;
  status: string;
  note: string;
};

const API = "/.netlify/functions/admin-leads";

const statusColors: Record<string, string> = {
  New: "bg-accent-500 text-white",
  Contacted: "bg-brand-500 text-white",
  Appointment: "bg-brand-800 text-white",
  "Offer Made": "bg-emerald-600 text-white",
  "Under Contract": "bg-emerald-700 text-white",
  Closed: "bg-[#444] text-white",
  Dead: "bg-[#bbb] text-white",
};

function LeadCard({
  lead,
  statuses,
  token,
  onUpdated,
}: {
  lead: Lead;
  statuses: string[];
  token: string;
  onUpdated: (l: Lead) => void;
}) {
  const [note, setNote] = useState(lead.note);
  const [saving, setSaving] = useState(false);
  const d = lead.data;
  const isDetails = lead.formName === "property-details";
  const name = d.name || d["lead-name"] || "(no name)";
  const address = d.address || d["lead-address"] || "";
  const phoneDisplay = d.phone || d["lead-phone"] || "";

  async function update(fields: { status?: string; note?: string }) {
    setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: lead.key, ...fields }),
      });
      const json = await res.json();
      if (json.lead) onUpdated(json.lead as Lead);
    } finally {
      setSaving(false);
    }
  }

  const detailEntries = Object.entries(d).filter(
    ([k, v]) => v && !["name", "phone", "address", "lead-name", "lead-phone", "lead-address"].includes(k)
  );

  return (
    <div className="rounded-[15px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-brand-800">
            {name}
            {isDetails ? (
              <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800">
                step 2 details
              </span>
            ) : null}
          </p>
          {address ? <p className="text-sm text-[#666]">{address}</p> : null}
          <p className="mt-1 text-xs text-[#999]">
            {new Date(lead.createdAt).toLocaleString("en-US")} · via {lead.formName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {phoneDisplay ? (
            <>
              <a
                href={`tel:${phoneDisplay}`}
                className="rounded-full bg-accent-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-600"
              >
                Call
              </a>
              <a
                href={`sms:${phoneDisplay}`}
                className="rounded-full border-2 border-accent-500 px-4 py-1.5 text-sm font-semibold text-accent-600 hover:bg-accent-500/10"
              >
                Text
              </a>
            </>
          ) : null}
          <select
            value={lead.status}
            disabled={saving}
            onChange={(e) => update({ status: e.target.value })}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusColors[lead.status] ?? "bg-brand-100"}`}
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-white text-brand-800">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {detailEntries.length > 0 ? (
        <div className="mt-3 grid gap-x-6 gap-y-1 text-sm text-[#555] sm:grid-cols-2">
          {detailEntries.map(([k, v]) => (
            <p key={k}>
              <span className="font-semibold text-brand-800">{k}:</span> {v}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex gap-2">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notes (call outcomes, appointment times, offer amounts…)"
          className="w-full rounded-[10px] border-2 border-[#e0e0e0] px-3 py-2 text-sm focus:border-accent-500 focus:outline-none"
        />
        <button
          onClick={() => update({ note })}
          disabled={saving || note === lead.note}
          className="rounded-full bg-brand-800 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {saving ? "…" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Active");

  const load = useCallback(async (tok: string) => {
    setError("");
    const res = await fetch(API, { headers: { Authorization: `Bearer ${tok}` } });
    if (res.status === 401) {
      setError("Wrong password.");
      setLeads(null);
      return false;
    }
    const json = await res.json();
    setLeads(json.leads as Lead[]);
    setStatuses(json.statuses as string[]);
    return true;
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("fhb-admin-token");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(saved);
      void load(saved);
    }
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (await load(input)) {
      setToken(input);
      sessionStorage.setItem("fhb-admin-token", input);
    }
  }

  if (!token || leads === null) {
    return (
      <section className="bg-brand-50 px-4 py-24">
        <form
          onSubmit={login}
          className="mx-auto max-w-sm rounded-[20px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
        >
          <h1 className="heading-display text-4xl text-brand-800">Lead Dashboard</h1>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className="mt-5 w-full rounded-[10px] border-2 border-[#e0e0e0] px-4 py-3 focus:border-accent-500 focus:outline-none"
          />
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <button className="heading-display mt-4 w-full rounded-full bg-accent-500 py-3.5 text-lg tracking-[1px] text-white hover:bg-accent-600">
            Open Dashboard
          </button>
        </form>
      </section>
    );
  }

  const counts: Record<string, number> = {};
  for (const l of leads) counts[l.status] = (counts[l.status] ?? 0) + 1;
  const shown = leads.filter((l) =>
    filter === "All"
      ? true
      : filter === "Active"
        ? !["Closed", "Dead"].includes(l.status)
        : l.status === filter
  );

  return (
    <section className="bg-brand-50 px-4 py-10">
      <div className="mx-auto max-w-[900px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="heading-display text-5xl text-brand-800">Lead Dashboard</h1>
          <button
            onClick={() => load(token)}
            className="rounded-full border-2 border-brand-800 px-5 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-800 hover:text-white"
          >
            Refresh
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Active", "All", ...statuses].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                filter === f
                  ? "bg-brand-800 text-white"
                  : "bg-white text-brand-800 ring-1 ring-brand-100"
              }`}
            >
              {f}
              {f !== "Active" && f !== "All" && counts[f] ? ` (${counts[f]})` : ""}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {shown.length === 0 ? (
            <p className="rounded-[15px] bg-white p-8 text-center text-[#666] shadow-sm">
              No leads here yet. New submissions appear automatically.
            </p>
          ) : (
            shown.map((l) => (
              <LeadCard
                key={l.key}
                lead={l}
                statuses={statuses}
                token={token}
                onUpdated={(nl) =>
                  setLeads((cur) => cur?.map((x) => (x.key === nl.key ? nl : x)) ?? null)
                }
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
