"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  levelName,
  speakingRubric,
  speakingTasks,
  suggestedOverall,
  widaLevels,
  type RubricScore,
  type SpeakingTask,
  type WidaLevel,
} from "@/data/wida";
import {
  deleteRecording,
  getRecording,
  listRecordings,
  saveRecording,
  updateScore,
  type RecordingMeta,
} from "@/lib/recordings";
import { makeId, useClasses, useHydrated } from "@/lib/store";

const clusters = ["2–3", "4–5", "6–8"] as const;

function pickMimeType(): string {
  const candidates = [
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return (
    candidates.find(
      (type) =>
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported(type),
    ) ?? ""
  );
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function SpeakingPage() {
  const [tab, setTab] = useState<"record" | "review">("record");
  const [recordings, setRecordings] = useState<RecordingMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hydrated = useHydrated();

  const refresh = useCallback(() => {
    // IndexedDB may be unavailable (some private-browsing modes) — then
    // the list just stays empty.
    return listRecordings().then(setRecordings, () => {});
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">🎤 Speaking Studio</h1>
      <p className="mt-2 max-w-3xl font-semibold text-ink-soft">
        Record a student speaking sample, then score it against the WIDA
        speaking criteria (levels 1–6). Videos never leave this computer —
        they save to this browser only.
      </p>
      <p className="mt-1 text-sm font-semibold text-ink-soft">
        For progress monitoring and practice — not an official ACCESS for
        ELLs score.
      </p>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("record")}
          className={`rounded-2xl px-6 py-3 font-display text-lg font-bold shadow-pop transition-all ${
            tab === "record"
              ? "bg-coral-500 text-white"
              : "border-2 border-ink/15 bg-paper hover:-translate-y-0.5"
          }`}
        >
          🎬 Record
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("review");
            void refresh();
          }}
          className={`rounded-2xl px-6 py-3 font-display text-lg font-bold shadow-pop transition-all ${
            tab === "review"
              ? "bg-grape-500 text-white"
              : "border-2 border-ink/15 bg-paper hover:-translate-y-0.5"
          }`}
        >
          📋 Review &amp; Score
          {hydrated && recordings.length > 0 && (
            <span className="ml-2 rounded-full bg-paper/30 px-2 text-sm">
              {recordings.length}
            </span>
          )}
        </button>
      </div>

      {tab === "record" ? (
        <RecordTab
          onSaved={async (id) => {
            await refresh();
            setSelectedId(id);
            setTab("review");
          }}
        />
      ) : (
        <ReviewTab
          recordings={recordings}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onChanged={refresh}
        />
      )}
    </div>
  );
}

/* ------------------------------ Record tab ------------------------------ */

function RecordTab({ onSaved }: { onSaved: (id: string) => Promise<void> }) {
  const [classes] = useClasses();
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [cluster, setCluster] = useState<(typeof clusters)[number]>("4–5");
  const [task, setTask] = useState<SpeakingTask | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const prompt = customPrompt.trim() || task?.prompt || "";
  const taskType = customPrompt.trim() ? "Custom" : (task?.type ?? "");
  const ready = studentName.trim().length > 0 && prompt.length > 0;

  const selectedClass = classes.find((c) => c.name === className);

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
        <h2 className="font-display text-2xl font-extrabold">1 · Who is speaking?</h2>
        {classes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setClassName(cls.name)}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                  className === cls.name
                    ? "border-teal-600 bg-teal-500 text-white"
                    : "border-ink/15 bg-cream"
                }`}
              >
                🏫 {cls.name}
              </button>
            ))}
          </div>
        )}
        {selectedClass && selectedClass.students.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedClass.students.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setStudentName(student.name)}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                  studentName === student.name
                    ? "border-grape-600 bg-grape-500 text-white"
                    : "border-ink/15 bg-cream"
                }`}
              >
                {student.name}
              </button>
            ))}
          </div>
        )}
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder={
            classes.length > 0
              ? "…or type a name"
              : "Type the student's name (or set up a roster in My Classes)"
          }
          className="mt-3 w-full max-w-md rounded-2xl border-2 border-ink/15 bg-cream px-4 py-2.5 font-semibold outline-none focus:border-teal-500"
        />
      </section>

      <section className="rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
        <h2 className="font-display text-2xl font-extrabold">2 · Pick a speaking task</h2>
        <div className="mt-3 flex gap-2">
          {clusters.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCluster(c);
                setTask(null);
              }}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                cluster === c
                  ? "border-sky-600 bg-sky-500 text-white"
                  : "border-ink/15 bg-cream"
              }`}
            >
              Grades {c}
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {speakingTasks
            .filter((t) => t.cluster === cluster)
            .map((t) => (
              <button
                key={t.prompt}
                type="button"
                onClick={() => {
                  setTask(t);
                  setCustomPrompt("");
                }}
                className={`rounded-2xl border-2 p-4 text-left font-semibold transition-all ${
                  task?.prompt === t.prompt && !customPrompt.trim()
                    ? "border-sky-600 bg-sky-100"
                    : "border-ink/10 bg-cream hover:-translate-y-0.5"
                }`}
              >
                <span className="mb-1 block text-xs font-black uppercase tracking-wide text-sky-600">
                  {t.emoji} {t.type}
                </span>
                {t.prompt}
              </button>
            ))}
        </div>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="…or write your own prompt"
          rows={2}
          className="mt-3 w-full resize-y rounded-2xl border-2 border-ink/15 bg-cream px-4 py-2.5 font-semibold outline-none focus:border-sky-500"
        />
      </section>

      <section className="rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
        <h2 className="font-display text-2xl font-extrabold">3 · Record</h2>
        {!ready ? (
          <p className="mt-3 rounded-2xl border-4 border-dashed border-ink/15 p-6 text-center font-semibold text-ink-soft">
            Choose a student and a task above, then the camera controls
            appear here.
          </p>
        ) : (
          <Recorder
            key={`${studentName}-${prompt}`}
            onSave={async (blob, mimeType, durationSec) => {
              const id = makeId();
              await saveRecording({
                id,
                studentName: studentName.trim(),
                className: className || "—",
                prompt,
                taskType,
                createdAt: Date.now(),
                durationSec,
                mimeType,
                byteSize: blob.size,
                blob,
              });
              await onSaved(id);
            }}
            prompt={prompt}
          />
        )}
      </section>
    </div>
  );
}

function Recorder({
  prompt,
  onSave,
}: {
  prompt: string;
  onSave: (blob: Blob, mimeType: string, durationSec: number) => Promise<void>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);

  const [phase, setPhase] = useState<
    "idle" | "live" | "recording" | "preview" | "saving"
  >("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    mimeType: string;
    durationSec: number;
  } | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopStream();
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, [stopStream]);

  useEffect(() => {
    if (phase !== "recording") return;
    const interval = window.setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAtRef.current) / 1000));
    }, 500);
    return () => window.clearInterval(interval);
  }, [phase]);

  async function enableCamera() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        void videoRef.current.play().catch(() => {});
      }
      setPhase("live");
    } catch {
      setError(
        "Could not access the camera or microphone. Check that the browser has permission (look for the camera icon in the address bar) and that no other app is using the camera.",
      );
    }
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) return;
    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const type = recorder.mimeType || mimeType || "video/webm";
      const blob = new Blob(chunksRef.current, { type });
      const durationSec = (Date.now() - startedAtRef.current) / 1000;
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResult({ blob, url, mimeType: type, durationSec });
      stopStream();
      setPhase("preview");
    };
    recorderRef.current = recorder;
    startedAtRef.current = Date.now();
    setElapsed(0);
    recorder.start(1000);
    setPhase("recording");
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  function discard() {
    if (result) URL.revokeObjectURL(result.url);
    resultUrlRef.current = null;
    setResult(null);
    setPhase("idle");
  }

  return (
    <div className="mt-4">
      <div className="rounded-2xl bg-sun-100 p-4 text-center">
        <p className="text-sm font-black uppercase tracking-wide text-ink-soft">
          Read to the student
        </p>
        <p className="mt-1 font-display text-2xl font-bold">{prompt}</p>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border-2 border-coral-500 bg-coral-100 p-4 font-semibold text-coral-600">
          {error}
        </p>
      )}

      <div className="mt-4 overflow-hidden rounded-3xl border-4 border-ink/15 bg-ink">
        {phase === "preview" && result ? (
          <video src={result.url} controls className="mx-auto max-h-96 w-full" />
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            className={`mx-auto max-h-96 w-full ${phase === "idle" ? "hidden" : ""}`}
          />
        )}
        {phase === "idle" && (
          <div className="flex h-56 items-center justify-center">
            <button
              type="button"
              onClick={enableCamera}
              className="rounded-2xl bg-teal-500 px-8 py-4 font-display text-xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
            >
              🎥 Turn on camera
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {phase === "live" && (
          <button
            type="button"
            onClick={startRecording}
            className="rounded-2xl bg-coral-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
          >
            ⏺ Start recording
          </button>
        )}
        {phase === "recording" && (
          <>
            <span className="flex items-center gap-2 rounded-full bg-coral-100 px-4 py-2 font-black text-coral-600">
              <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-coral-500" />
              REC {formatDuration(elapsed)}
            </span>
            <button
              type="button"
              onClick={stopRecording}
              className="rounded-2xl bg-ink px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
            >
              ⏹ Stop
            </button>
          </>
        )}
        {phase === "preview" && result && (
          <>
            <button
              type="button"
              onClick={discard}
              className="rounded-2xl bg-ink/10 px-6 py-4 font-display text-xl font-extrabold shadow-pop transition-transform hover:-translate-y-0.5"
            >
              🗑 Re-record
            </button>
            <button
              type="button"
              onClick={async () => {
                setPhase("saving");
                await onSave(result.blob, result.mimeType, result.durationSec);
              }}
              className="rounded-2xl bg-teal-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
            >
              💾 Save recording
            </button>
          </>
        )}
        {phase === "saving" && (
          <p className="font-display text-xl font-bold text-ink-soft">Saving…</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Review tab ------------------------------ */

function ReviewTab({
  recordings,
  selectedId,
  onSelect,
  onChanged,
}: {
  recordings: RecordingMeta[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChanged: () => Promise<void>;
}) {
  const selected = recordings.find((r) => r.id === selectedId) ?? null;

  function exportCsv() {
    const quote = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
    const rows = [
      [
        "Student",
        "Class",
        "Date",
        "Task type",
        "Prompt",
        "Duration",
        "Linguistic Complexity",
        "Vocabulary Usage",
        "Language Control",
        "Suggested overall",
        "Notes",
      ],
      ...recordings.map((r) => [
        r.studentName,
        r.className,
        new Date(r.createdAt).toISOString().slice(0, 10),
        r.taskType,
        r.prompt,
        formatDuration(r.durationSec),
        r.score?.complexity ?? "",
        r.score?.vocabulary ?? "",
        r.score?.control ?? "",
        r.score ? suggestedOverall(r.score) : "",
        r.score?.notes ?? "",
      ]),
    ];
    const csv = rows.map((row) => row.map(quote).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `speaking-scores-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (recordings.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border-4 border-dashed border-ink/15 p-10 text-center font-semibold text-ink-soft">
        No recordings yet — switch to the Record tab to capture your first
        speaking sample.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <aside>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">Recordings</h2>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700 hover:bg-teal-500 hover:text-white"
          >
            ⬇ Export CSV
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {recordings.map((rec) => (
            <li key={rec.id}>
              <button
                type="button"
                onClick={() => onSelect(rec.id)}
                className={`w-full rounded-2xl border-2 p-3 text-left transition-all ${
                  selectedId === rec.id
                    ? "border-grape-600 bg-grape-100"
                    : "border-ink/10 bg-paper hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-extrabold">
                    {rec.studentName}
                  </span>
                  {rec.score ? (
                    <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-black text-teal-700">
                      ✓ {suggestedOverall(rec.score)}
                    </span>
                  ) : (
                    <span className="rounded-full bg-sun-100 px-2.5 py-0.5 text-xs font-black text-ink-soft">
                      unscored
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                  {formatDate(rec.createdAt)} · {formatDuration(rec.durationSec)} ·{" "}
                  {rec.className}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                  {rec.prompt}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section>
        {selected ? (
          <RecordingDetail
            key={selected.id}
            meta={selected}
            onChanged={onChanged}
            onDeleted={() => {
              onSelect(null);
              void onChanged();
            }}
          />
        ) : (
          <div className="flex h-full min-h-64 items-center justify-center rounded-3xl border-4 border-dashed border-ink/15 p-10 text-center font-semibold text-ink-soft">
            Select a recording on the left to watch and score it.
          </div>
        )}
      </section>
    </div>
  );
}

function RecordingDetail({
  meta,
  onChanged,
  onDeleted,
}: {
  meta: RecordingMeta;
  onChanged: () => Promise<void>;
  onDeleted: () => void;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<WidaLevel | 0>(
    meta.score?.complexity ?? 0,
  );
  const [vocabulary, setVocabulary] = useState<WidaLevel | 0>(
    meta.score?.vocabulary ?? 0,
  );
  const [control, setControl] = useState<WidaLevel | 0>(meta.score?.control ?? 0);
  const [notes, setNotes] = useState(meta.score?.notes ?? "");
  const [saved, setSaved] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    let url: string | null = null;
    let cancelled = false;
    void getRecording(meta.id).then((record) => {
      if (record && !cancelled) {
        url = URL.createObjectURL(record.blob);
        setVideoUrl(url);
      }
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [meta.id]);

  const pickers: {
    label: string;
    value: WidaLevel | 0;
    set: (v: WidaLevel) => void;
    criterion: (typeof speakingRubric)[number];
  }[] = [
    { label: "complexity", value: complexity, set: setComplexity, criterion: speakingRubric[0] },
    { label: "vocabulary", value: vocabulary, set: setVocabulary, criterion: speakingRubric[1] },
    { label: "control", value: control, set: setControl, criterion: speakingRubric[2] },
  ];

  const complete = complexity !== 0 && vocabulary !== 0 && control !== 0;

  async function save() {
    if (!complete) return;
    const score: RubricScore = {
      complexity: complexity as WidaLevel,
      vocabulary: vocabulary as WidaLevel,
      control: control as WidaLevel,
      notes,
      scoredAt: Date.now(),
    };
    await updateScore(meta.id, score);
    await onChanged();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  function downloadVideo() {
    if (!videoUrl) return;
    const ext = meta.mimeType.includes("mp4") ? "mp4" : "webm";
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `${meta.studentName.replaceAll(/\s+/g, "-")}-${new Date(meta.createdAt).toISOString().slice(0, 10)}.${ext}`;
    a.click();
  }

  return (
    <div className="rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold">
            {meta.studentName}
          </h2>
          <p className="text-sm font-semibold text-ink-soft">
            {formatDate(meta.createdAt)} · {meta.className} · {meta.taskType}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={downloadVideo}
            className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-bold text-sky-600 hover:bg-sky-500 hover:text-white"
          >
            ⬇ Video
          </button>
          {confirmingDelete ? (
            <>
              <button
                type="button"
                onClick={async () => {
                  await deleteRecording(meta.id);
                  onDeleted();
                }}
                className="rounded-full bg-coral-500 px-3 py-1.5 text-sm font-bold text-white"
              >
                Really delete?
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="rounded-full bg-ink/10 px-3 py-1.5 text-sm font-bold"
              >
                Keep
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="rounded-full px-3 py-1.5 text-sm font-bold text-ink-soft hover:bg-coral-100 hover:text-coral-600"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 rounded-2xl bg-sun-100 p-3 font-semibold">
        🗣️ {meta.prompt}
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl bg-ink">
        {videoUrl ? (
          <video src={videoUrl} controls className="mx-auto max-h-80 w-full" />
        ) : (
          <div className="flex h-48 items-center justify-center font-bold text-paper">
            Loading video…
          </div>
        )}
      </div>

      <h3 className="mt-6 font-display text-xl font-extrabold">
        WIDA speaking rubric
      </h3>
      <div className="mt-3 space-y-5">
        {pickers.map(({ criterion, value, set }) => (
          <div key={criterion.key}>
            <p className="font-bold">
              {criterion.name}
              <span className="ml-2 text-sm font-semibold text-ink-soft">
                {criterion.question}
              </span>
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {widaLevels.map(({ level, name }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => set(level)}
                  title={criterion.descriptors[level]}
                  className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition-all ${
                    value === level
                      ? "border-grape-600 bg-grape-500 text-white"
                      : "border-ink/15 bg-cream hover:-translate-y-0.5"
                  }`}
                >
                  {level} · {name}
                </button>
              ))}
            </div>
            {value !== 0 && (
              <p className="mt-2 rounded-xl bg-grape-100 px-3 py-2 text-sm font-semibold">
                {criterion.descriptors[value as WidaLevel]}
              </p>
            )}
          </div>
        ))}
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes — evidence you heard, next steps, goals…"
        rows={3}
        className="mt-4 w-full resize-y rounded-2xl border-2 border-ink/15 bg-cream px-4 py-2.5 font-semibold outline-none focus:border-grape-500"
      />

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={!complete}
          className="rounded-2xl bg-grape-500 px-8 py-3 font-display text-xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        >
          {saved ? "✓ Saved!" : "💾 Save score"}
        </button>
        {complete && (
          <p className="font-bold">
            Suggested overall:{" "}
            <span className="rounded-full bg-teal-100 px-3 py-1 font-black text-teal-700">
              {suggestedOverall({
                complexity: complexity as WidaLevel,
                vocabulary: vocabulary as WidaLevel,
                control: control as WidaLevel,
              })}{" "}
              ·{" "}
              {levelName(
                Math.max(
                  1,
                  Math.min(
                    6,
                    Math.floor(
                      suggestedOverall({
                        complexity: complexity as WidaLevel,
                        vocabulary: vocabulary as WidaLevel,
                        control: control as WidaLevel,
                      }),
                    ),
                  ),
                ) as WidaLevel,
              )}
            </span>
          </p>
        )}
      </div>
      <p className="mt-4 text-xs font-semibold text-ink-soft">
        Recordings and scores stay in this browser. Use ⬇ Video / Export CSV
        to keep copies, and follow your district&apos;s student-media policy.
      </p>
      <p className="mt-2 text-xs font-semibold text-ink-soft">
        <Link href="/classes" className="underline">
          Manage rosters
        </Link>{" "}
        to make student selection one click.
      </p>
    </div>
  );
}
